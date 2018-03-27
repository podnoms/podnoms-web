using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace PodNoms.Api {
    public class Program {
        static bool isDevelopment =
            Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == EnvironmentName.Development;

        public static void Main (string[] args) {
            CreateWebHostBuilder (args).Build ().Run ();
        }
        public static IWebHostBuilder CreateWebHostBuilder (string[] args) =>
            WebHost.CreateDefaultBuilder (args)
            .UseStartup<Startup> ();
            // .UseKestrel(options => {
            //         options.Listen(IPAddress.Any, 5000);
            //         if (isDevelopment){
            //             options.Listen(IPAddress.Any, 5001, listenOptions => {
            //                 listenOptions.UseHttps("certs/dev2.podnoms.com.pfx", "secret");
            //             });
            //         }
            // });
    }
}
