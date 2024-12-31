using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationService (this IServiceCollection services, 
        IConfiguration config) 
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                services.AddEndpointsApiExplorer();
                services.AddSwaggerGen();

               services.AddDbContext<DataContext>(options => {
                    options.UseSqlite(config.GetConnectionString("DefaultConnection"));
                });

                // Add Cors
               services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
                        {
                        
                        builder.AllowAnyMethod().AllowAnyHeader()
                                .WithOrigins("http://localhost:4200", "http://localhost:3000");
                        }));

                services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
                services.AddAutoMapper(typeof(MappingProfiles).Assembly);
               services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();

                return services;
        }
    }
}