using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PodNoms.Api.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Services.Auth;
using PodNoms.Api.Utils;

namespace PodNoms.Api.Controllers {
    [Route("[controller]")]
    public class AuthController : Controller {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly IEmailSender _emailSender;
        private readonly AppSettings _appSettings;
        private readonly JwtIssuerOptions _jwtOptions;

        public AuthController(UserManager<ApplicationUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions,
                    IOptions<AppSettings> appSettings, IEmailSender emailSender) {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _emailSender = emailSender;
            _appSettings = appSettings.Value;
            _jwtOptions = jwtOptions.Value;
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]CredentialsViewModel credentials) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null) {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }

            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, credentials.UserName, _jwtOptions,
                new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password) {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password)) {
                await _userManager.UpdateAsync(userToVerify);

                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
        [HttpPost("forgot")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordViewModel model) {
            if (ModelState.IsValid) {
                var user = await _userManager.FindByNameAsync(model.Email);
                if (user == null) {
                    return BadRequest(model);
                }
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = $"{_appSettings.SiteUrl}/reset?token={WebUtility.UrlEncode(code)}&email={WebUtility.UrlEncode(user.Email)}";
                await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                   "Please reset your password by clicking here: <a href=\"" + callbackUrl + "\">link</a>");
                return Ok(model);
            }
            return BadRequest(model);
        }

        [HttpPost("reset")]
        [AllowAnonymous]
        public async Task<ActionResult> ResetPassword([FromBody]ResetPasswordViewModel model) {
            if (!ModelState.IsValid) {
                return BadRequest("Unable to reset your password at this time");
            }
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user == null) {
                return BadRequest("Unable to reset your password at this time");
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded) {
                return Ok(model);
            }
            return BadRequest();
        }
    }
}
