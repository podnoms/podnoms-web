using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Utils;

namespace PodNoms.Api.Controllers {
    [Route("[controller]")]
    public class BoilerplateController : Controller {
        [HttpGet]
        public async Task<ActionResult<string>> Get(string key) {
            var html = await ResourceReader.ReadResource($"{key}.html");
            return Content(html, "text/plain");
        }
    }
}