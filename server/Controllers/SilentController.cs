using Microsoft.AspNetCore.Mvc;

namespace PodNoms.Api.Controllers {

    [Route ("silent")]
    public class SilentController : Controller {
        const string HTML = @"<!doctype html>
        <html>
        <head>
        <meta charset='utf-8'>
        <script src='https://cdn.auth0.com/js/auth0/8.12.0/auth0.min.js'></script>
        <script>
            var webAuth = new auth0.WebAuth({
            domain: 'podnoms.eu.auth0.com',
            clientID: 'Fx6Z3kZoheEpXhZO97ioAg1asbHDdCtr',
            scope: 'openid profile',
            responseType: 'token id_token',
            redirectUri: 'http://dev.podnoms.com:4200'
            });
        </script>
        <script>
            webAuth.parseHash(window.location.hash, function (err, response) {
            parent.postMessage(err || response, 'http://localhost:4200');
            });
        </script>
        </head>
        <body></body>
        </html>";

        [Produces ("text/html")]
        [HttpGet]
        public IActionResult Index () { 
            return Ok (HTML);
        }
    }
}