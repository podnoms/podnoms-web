using Microsoft.AspNetCore.Mvc;

namespace PodNoms.Api.Controllers {
    [Route("[controller]")]
    public class PingController : Controller {
        [HttpGet]
        public string Get() {
            return "Pong";
        }
    }
}