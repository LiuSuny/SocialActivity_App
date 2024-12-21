using Application.Activities;
using Application.Core;
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
                                .WithOrigins("http://localhost:4200");
                        }));

                services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
                services.AddAutoMapper(typeof(MappingProfiles).Assembly);

                return services;
        }
    }
}