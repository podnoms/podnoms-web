using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Hangfire;
using Hangfire.Dashboard;
using Hangfire.MemoryStorage;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using FluentValidation.AspNetCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Persistence;
using PodNoms.Api.Providers;
using PodNoms.Api.Services;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Services.Hubs;
using PodNoms.Api.Services.Jobs;
using PodNoms.Api.Services.Processor;
using PodNoms.Api.Services.Realtime;
using PodNoms.Api.Services.Storage;
using PodNoms.Api.Utils;
using PodNoms.Api.Services.Push.Extensions;

using Swashbuckle.AspNetCore.Swagger;
using PodNoms.Api.Services.Push.Formatters;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace PodNoms.Api {
    public class Startup {
        private const string SecretKey = "QGfaEMNASkNMGLKA3LjgPdkPfFEy3n40"; // todo: get this from somewhere secure
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public void ConfigureProductionServices(IServiceCollection services) {
            ConfigureServices(services);
            services.AddHangfire(config => {
                config.UseSqlServerStorage(Configuration["ConnectionStrings:DefaultConnection"]);
            });

            services.AddPushSubscriptionStore(Configuration)
                .AddPushNotificationService(Configuration)
                .AddMvc(options => {
                    options.InputFormatters.Add(new TextPlainInputFormatter());
                })
                .AddJsonOptions(options => {
                    options.SerializerSettings.Converters.Add(new StringEnumConverter());
                });
        }
        public void ConfigureDevelopmentServices(IServiceCollection services) {
            ConfigureServices(services);
            services.AddHangfire(config => {
                config.UseMemoryStorage();
            });

            services.AddPushSubscriptionStore(Configuration)
                .AddPushNotificationService(Configuration)
                .AddMvc(options => {
                    options.InputFormatters.Add(new TextPlainInputFormatter());
                })
                .AddJsonOptions(options => {
                    options.SerializerSettings.Converters.Add(new StringEnumConverter());
                });
        }
        public void ConfigureServices(IServiceCollection services) {
            Console.WriteLine($"Configuring services: {Configuration.ToString()}");

            services.AddDbContext<PodnomsDbContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddOptions();
            services.Configure<AppSettings>(Configuration.GetSection("App"));
            services.Configure<StorageSettings>(Configuration.GetSection("Storage"));
            services.Configure<ApplicationsSettings>(Configuration.GetSection("ApplicationsSettings"));
            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));
            services.Configure<FacebookAuthSettings>(Configuration.GetSection("FacebookAuthSettings"));
            services.Configure<ImageFileStorageSettings>(Configuration.GetSection("ImageFileStorageSettings"));
            services.Configure<AudioFileStorageSettings>(Configuration.GetSection("AudioFileStorageSettings"));
            services.Configure<FormOptions>(options => {
                options.ValueCountLimit = 10;
                options.ValueLengthLimit = int.MaxValue;
                options.MemoryBufferThreshold = Int32.MaxValue;
                options.MultipartBodyLengthLimit = long.MaxValue;
            });

            services.AddAutoMapper(e => {
                e.AddProfile(new MappingProvider(Configuration));
            });

            services.AddHttpClient();
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options => {
                //TODO: Remove this in production, only for testing
                options.ValidFor = TimeSpan.FromDays(28);
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });
            var tokenValidationParameters = new TokenValidationParameters {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions => {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
                configureOptions.Events = new JwtBearerEvents() {
                    //Don't need this now we've removed Auth0
                    // OnTokenValidated = AuthenticationMiddleware.OnTokenValidated
                };
                configureOptions.Events.OnMessageReceived = context => {
                    StringValues token;
                    if (context.Request.Path.Value.StartsWith("/hubs/") && context.Request.Query.TryGetValue("token", out token)) {
                        context.Token = token;
                    }
                    return Task.CompletedTask;
                };
            });

            services.AddAuthorization(j => {
                j.AddPolicy("ApiUser", policy => policy.RequireClaim(
                    Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
            });
            // add identity
            var identityBuilder = services.AddIdentityCore<ApplicationUser>(o => {
                // configure identity options
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            });
            identityBuilder = new IdentityBuilder(identityBuilder.UserType, typeof(IdentityRole), identityBuilder.Services);
            identityBuilder.AddEntityFrameworkStores<PodnomsDbContext>().AddDefaultTokenProviders();
            identityBuilder.AddUserManager<PodNomsUserManager>();

            services.AddMvc(options => {
                options.OutputFormatters.Add(new XmlSerializerOutputFormatter());
                options.OutputFormatters
                    .OfType<StringOutputFormatter>()
                    .Single().SupportedMediaTypes.Add("text/html");
            })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options => {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
                })
                .AddXmlSerializerFormatters()
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new Info { Title = "Podnoms.API", Version = "v1" });
                c.DocumentFilter<LowercaseDocumentFilter>();
            });

            services.Configure<FormOptions>(x => {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue; // In case of multipart
            });
            services.AddSignalR(config => { });

            services.AddCors(options => {
                options.AddPolicy("AllowAllOrigins",
                    builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });


            services.AddTransient<IFileUploader, AzureFileUploader>();
            services.AddTransient<IRealTimeUpdater, SignalRUpdater>();
            services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IJwtFactory, JwtFactory>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IPodcastRepository, PodcastRepository>();
            services.AddScoped<IEntryRepository, EntryRepository>();
            services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            services.AddScoped<IUrlProcessService, UrlProcessService>();
            services.AddScoped<INotifyJobCompleteService, NotifyJobCompleteService>();
            services.AddScoped<IAudioUploadProcessService, AudioUploadProcessService>();
            services.AddScoped<IMailSender, MailgunSender>();
            services.AddHttpClient<Services.Gravatar.GravatarHttpClient>();

            //register the codepages (required for slugify)
            var instance = CodePagesEncodingProvider.Instance;
            Encoding.RegisterProvider(instance);

        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, IServiceProvider serviceProvider) {

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Home/Error");
            }

            Console.WriteLine("Performing migrations");
            //TODO: Fix this when EF sucks less
            // using (var context = new PodnomsDbContext(
            //     app.ApplicationServices.GetRequiredService<DbContextOptions<PodnomsDbContext>>()))
            // {
            //     context.Database.Migrate();
            // }
            Console.WriteLine("Successfully migrated");

            // app.UseHsts();
            // app.UseHttpsRedirection();
            app.UseStaticFiles();

            GlobalConfiguration.Configuration.UseActivator(new ServiceProviderActivator(serviceProvider));

            if ((env.IsProduction() || true)) {
                app.UseHangfireServer();
                app.UseHangfireDashboard("/hangfire", new DashboardOptions {
                    Authorization = new[] { new HangFireAuthorizationFilter() }
                });
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseAuthentication();

            app.UseCors("AllowAllOrigins");

            app.UseSignalR(routes => {
                routes.MapHub<AudioProcessingHub>("/hubs/audioprocessing");
                routes.MapHub<ChatterHub>("/hubs/chatter");
                routes.MapHub<DebugHub>("/hubs/debug");
            });

            app.UseSwagger();
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "PodNoms.API");
                c.RoutePrefix = "";
            });

            app.UseSqlitePushSubscriptionStore();

            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            //start hangfire jobs
            JobBootstrapper.BootstrapJobs();
        }
    }
}
