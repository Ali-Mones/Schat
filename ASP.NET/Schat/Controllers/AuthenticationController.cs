using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Schat.Models;
using System.Security.Claims;
using RegisterRequest = Schat.Models.RegisterRequest;

namespace Schat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthenticationController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // POST: api/Authentication/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Model");
            }

            User? existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return BadRequest("email already exists");
            }

            User user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Nationality = request.Nationality,
                Gender = request.Gender,
                UserName = request.Email
            };

            IdentityResult result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                return BadRequest("registration constraints not met!");
            }

            await _userManager.AddToRoleAsync(user, "User");

            return Ok();
        }

        // POST: api/Authentication/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Model");
            }

            User? user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return BadRequest("Email Not Found!");
            }

            bool correctPassword = await _userManager.CheckPasswordAsync(user, request.Password);
            if (!correctPassword)
            {
                return BadRequest("Incorrect Password!");
            }

            await _signInManager.SignInAsync(user, false, CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        // GET: api/Authentication
        [HttpGet]
        public ActionResult<string> Username()
        {
            return HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}
