using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Logging;
using PodNoms.Api.Models;
using PodNoms.Api.Persistence;
using RestSharp;

namespace PodNoms.Api.Services.Auth {
    public class AuthenticationMiddleware {
        public async static Task<bool> OnTokenValidated(TokenValidatedContext context) {
            var userRepository = (IUserRepository)context.HttpContext.RequestServices.GetService(typeof(IUserRepository));
            var unitOfWork = (IUnitOfWork)context.HttpContext.RequestServices.GetService(typeof(IUnitOfWork));
            var claimsIdentity = context.Principal.Identity as ClaimsIdentity;
            if (claimsIdentity != null && context.Request.Headers.ContainsKey("Authorization")) {
                var claimToken = context.Request.Headers["Authorization"][0].Substring(context.Scheme.Name.Length + 1);
                claimsIdentity.AddClaim(new Claim("id_token", claimToken));

                var picture = claimsIdentity.Claims.FirstOrDefault(c => c.Type == "picture")?.Value;
                var name = claimsIdentity.Claims.FirstOrDefault(c => c.Type == "name")?.Value;

                var data = new {
                    Name = name,
                    EmailAddress = claimsIdentity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                    Sid = claimsIdentity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Sid)?.Value,
                    UserId = claimsIdentity.Claims.FirstOrDefault(c => c.Type == "subject")?.Value,
                    ProfileImage = picture
                };
                var refreshToken = await _getRefreshToken();
                userRepository.UpdateRegistration(data.EmailAddress, data.Name, data.Sid, data.UserId,
                    data.ProfileImage, refreshToken);

                await unitOfWork.CompleteAsync();
                return true;
            }
            return false;
        }

        private static async Task<string> _getRefreshToken() {
            var client = new RestClient("https://podnoms.eu.auth0.com/oauth/token");
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/json");
            request.AddParameter(
                "application/json",
                "{\"grant_type\":\"authorization_code\"," +
                "\"client_id\": \"Fx6Z3kZoheEpXhZO97ioAg1asbHDdCtr\"," +
                "\"client_secret\": \"g9wwXHppw7eNOIpD_r9z-7ttcvuzYz-8QlxXd_n6l8QiSW5VpIrlSwTn7w5uflP_\"," +
                "\"code\": \"YOUR_AUTHORIZATION_CODE\"," +
                "\"redirect_uri\": \"http://localhost:4200/callback\"}",
                ParameterType.RequestBody);

            IRestResponse response = await client.ExecuteTaskAsync(request);
            if (response.IsSuccessful) {
                return response.Content;
            }

            return string.Empty;
        }
    }
}