using System.Security.Claims;
using API.DTOs;
using API.Services;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController(UserManager<AppUser> userManager, TokenService tokenService) : ControllerBase
    {


          [AllowAnonymous]
          [HttpPost("login")]
         public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
         {

           //getting the user                 
              var user = await userManager.FindByEmailAsync(loginDto.Email);
                        
              if(user == null) return Unauthorized("Invalid username");

              var result = await userManager.CheckPasswordAsync(user, loginDto.Password);
              
               if(result) {

              return CreateUserObject(user);

             }
              return Unauthorized("Invalid password");
         }

          

         [AllowAnonymous]
         [HttpPost("register")]
         public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
         {
              
            if(await UserNameExists(registerDto.Username)) 
             return BadRequest("Username is already taken");

             if(await UserEmailExists(registerDto.Email)) 
             return BadRequest("Email is already taken");
            
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username     
            };
             
            
            //creating user and password
             var result = await userManager.CreateAsync(user, registerDto.Password);
                            
            if(result.Succeeded)
            {
                return CreateUserObject(user);

            }

            return BadRequest(result.Errors);      
         }

     
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> CurrentUser()
       {
            var user = User.FindFirstValue(ClaimTypes.Email);
            var email = await userManager.FindByEmailAsync(user);
            
            return CreateUserObject(email);
                 
       }
          private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
         private async Task<bool> UserNameExists(string username)
        {
           return await userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
                 
        }

        private async Task<bool> UserEmailExists(string email)
        {
            return await userManager.Users.AnyAsync(x => x.Email == email.ToLower());
                 
        }
        
    }
}