using MemberMicroservice.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Web;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using EmailService;
using Microsoft.AspNetCore.WebUtilities;

namespace MemberMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {

        private readonly AuthenticationContext _context;
        private readonly IEmailSender _emailSender;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _appSettings;

        public ApplicationUserController(AuthenticationContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings, IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context = context;
            _emailSender = emailSender;

        }
        [HttpGet]
        [Route("GetUserNames")]
        public JsonResult GetUserNames()
        {
            return new JsonResult(_context.ApplicationUsers.Select(c => c.UserName));
        }
        [HttpPost]
        [Route("Register")]
        public async Task<Object> PostApplicationUser(ApplicationCustomerModel model)
        {
            model.Role = "Customer";
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                First_Name = model.First_Name,
                Last_Name = model.Last_Name,
                Email = model.Email,
                Date_Of_Birth = model.Date_Of_Birth,
                PhoneNumber = model.PhoneNumber,
                Country = model.Country,
                Region = model.Region,
                City = model.City,
                Gender = model.Gender
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                await _userManager.AddToRoleAsync(applicationUser, model.Role);
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                var param = new Dictionary<string, string>
                {
                    {"token", token },
                    {"email", applicationUser.Email }
                };
                var callback = QueryHelpers.AddQueryString(model.ClientURI, param);
                var message = new Message(new string[] { applicationUser.Email }, "Email Confirmation token", callback);
                await _emailSender.SendEmailAsync(message);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost]
        [Route("RegisterSeller")]
        public async Task<Object> PostApplicationSeller(ApplicationSellerModel model)
        {
            model.Role = "Seller";
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                First_Name = model.First_Name,
                Last_Name = model.Last_Name,
                Email = model.Email,
                Date_Of_Birth = model.Date_Of_Birth,
                PhoneNumber = model.PhoneNumber,
                Country = model.Country,
                Region = model.Region,
                City = model.City,
                Company_Name = model.Company_Name,
                Gender = model.Gender
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                await _userManager.AddToRoleAsync(applicationUser, model.Role);
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(applicationUser);
                var param = new Dictionary<string, string>
                {
                    {"token", token },
                    {"email", applicationUser.Email }
                };
                var callback = QueryHelpers.AddQueryString(model.ClientURI, param);
                var message = new Message(new string[] { applicationUser.Email }, "Email Confirmation token", callback);
                await _emailSender.SendEmailAsync(message);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
                return BadRequest("Invalid Request");
            if (!await _userManager.IsEmailConfirmedAsync(user))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Email is not confirmed" });
            if (!await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim("UserID",user.Id.ToString()),
                new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }
        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IdentityResult> ChangePasswordAsync(ChangePasswordModel model)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
        }
        [HttpGet]
        [Route("GetUserID")]
        public string GetUserID()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            return userId;
        }

        [HttpPost]
        [Route("LogOut")]
        public async Task<ActionResult> Logout()
        {
            await this._signInManager.SignOutAsync();

            return Ok();
        }
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("Invalid Request");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string>
    {
        {"token", token },
        {"email", model.Email }
    };

            var callback = QueryHelpers.AddQueryString(model.ClientURI, param);

            var message = new Message(new string[] { user.Email }, "Reset password token", callback);
            await _emailSender.SendEmailAsync(message);

            return Ok();
        }
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("Invalid Request");

            var resetPassResult = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);

                return BadRequest(new { Errors = errors });
            }

            return Ok();
        }
        [HttpGet("EmailConfirmation")]
        public async Task<IActionResult> EmailConfirmation([FromQuery] string email, [FromQuery] string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest("Invalid Email Confirmation Request");

            var confirmResult = await _userManager.ConfirmEmailAsync(user, token);
            if (!confirmResult.Succeeded)
                return BadRequest("Invalid Email Confirmation Request");

            return Ok("Email Confirmed");
        }
    }
}