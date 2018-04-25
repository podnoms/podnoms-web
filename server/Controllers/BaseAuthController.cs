using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PodNoms.Api.Services.Auth;

public class BaseAuthController : Controller {
    private readonly ClaimsPrincipal _caller;
    protected readonly UserManager<ApplicationUser> _userManager;
    protected readonly string _userId;
    protected readonly ApplicationUser _applicationUser;

    public BaseAuthController(IHttpContextAccessor contextAccessor, UserManager<ApplicationUser> userManager) {
        _caller = contextAccessor.HttpContext.User;
        _userManager = userManager;
        _userId = _caller.Claims.Single(c => c.Type == "id").Value;
        _applicationUser = userManager.FindByIdAsync(_userId).Result;
    }
}