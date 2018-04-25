

using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Util.Store;
using Google.Apis.Plus.v1;
using Google.Apis.Plus.v1.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Utils;
using Google.Apis.Auth;

namespace PodNoms.Api.Controllers {
    [Route("[controller]/[action]")]
    public class ExternalAuthController : Controller {
        //TODO: Refactor these somewhere better
        public static ClientSecrets secrets = new ClientSecrets() {
            ClientSecret = "wPXd9Sw9Z04bnGrobkZoZoGz"
        };

        // Configuration that you probably don't need to change.
        static public string APP_NAME = "PodNoms Web API";

        static public string[] SCOPES = {
            PlusService.Scope.PlusLogin,
            PlusService.Scope.UserinfoEmail,
            PlusService.Scope.UserinfoProfile
        };
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly FacebookAuthSettings _fbAuthSettings;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private static readonly HttpClient Client = new HttpClient();

        public ExternalAuthController(IOptions<FacebookAuthSettings> fbAuthSettingsAccessor, UserManager<ApplicationUser> userManager,
         IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions) {
            _fbAuthSettings = fbAuthSettingsAccessor.Value;
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }
        // POST api/externalauth/google
        [HttpPost]
        public async Task<IActionResult> Google([FromBody]SocialAuthViewModel model) {
            //1. Validate access token
            //2. Generate JWT
            //3. Update details
            try {
                var payload = await GoogleJsonWebSignature.ValidateAsync(model.AccessToken);
                return await _processUserDetails(new FacebookUserData {
                    Email = payload.Email,
                    FirstName = payload.GivenName,
                    LastName = payload.FamilyName,
                    Name = payload.Name,
                        Picture = new FacebookPictureData {
                        Data = new FacebookPicture {
                            Url = payload.Picture
                        }
                    }
                });
            } catch (Exception) {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid google token.", ModelState));
            }
        }

        // POST api/externalauth/facebook
        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody]SocialAuthViewModel model) {
            // 1.generate an app access token
            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_fbAuthSettings.AppId}&client_secret={_fbAuthSettings.AppSecret}&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
            // 2. validate the user access token
            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if (!userAccessTokenValidation.Data.IsValid) {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid facebook token.", ModelState));
            }

            // 3. we've got a valid token so we can request user data from fb
            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={model.AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            return await _processUserDetails(userInfo);
        }
        private async Task<IActionResult> _processUserDetails(FacebookUserData userInfo) {
            // 4. ready to create the local user account (if necessary) and jwt
            var user = await _userManager.FindByEmailAsync(userInfo.Email);
            if (user == null) {
                var appUser = new ApplicationUser {
                    FirstName = userInfo.FirstName,
                    LastName = userInfo.LastName,
                    FacebookId = userInfo.Id,
                    Email = userInfo.Email,
                    UserName = userInfo.Email,
                    PictureUrl = userInfo.Picture.Data.Url
                };
                var result = await _userManager.CreateAsync(appUser, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));
                if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
            } else {
                user.PictureUrl = userInfo.Picture.Data.Url;
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
            }

            // generate the jwt for the local user...
            var localUser = await _userManager.FindByNameAsync(userInfo.Email);

            if (localUser == null) {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Failed to create local user account.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(_jwtFactory.GenerateClaimsIdentity(localUser.UserName, localUser.Id),
              _jwtFactory, localUser.UserName, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });

            return new OkObjectResult(jwt);
        }
    }
}
