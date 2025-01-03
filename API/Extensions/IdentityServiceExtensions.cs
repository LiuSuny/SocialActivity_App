using System.Text;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
         public static IServiceCollection AddIdentityServices
         (this IServiceCollection services, IConfiguration config)
         {
            //Adding injecting authentication service for users
            services.AddIdentityCore<AppUser>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<DataContext>();
        
         var key =  new SymmetricSecurityKey(                                  
                        Encoding.UTF8.GetBytes(config["TokenKey"]));
                               
           services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(
                        options => {
                             options.TokenValidationParameters = new TokenValidationParameters
                            {

                                ValidateIssuerSigningKey = true,   

                                IssuerSigningKey = key,
                             
                                ValidateIssuer = false, 
                              
                                ValidateAudience = false 
                           };

                    }); 
                    
             services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            
            services.AddScoped<TokenService>();
                        
             return services;                                        
         
        }
    }
}
