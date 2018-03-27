using Microsoft.AspNetCore.Mvc;

namespace server.Controllers {
    public class PingController : Controller {
        [HttpGet]
        public string Get() {
            return "Pong";
        }
    }   
}