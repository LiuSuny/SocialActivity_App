using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//this means every controller will require authentication
builder.Services.AddControllers(
  opt => {
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
  }
);


builder.Services.AddApplicationService(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionsMiddleware>();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//config our db to seed data automatically without using the dotnet tools   
  using var scope = app.Services.CreateScope(); 
  var services = scope.ServiceProvider;    
  try
     {
           
     //Returns a service object of type DataContext.
      var context = services.GetRequiredService<DataContext>();
               
      await context.Database.MigrateAsync(); 
      var userManager = services.GetRequiredService<UserManager<AppUser>>(); 
      await Seed.SeedData(context, userManager);
    }
      catch (Exception ex)
    {
                
      var logger  = app.Services.GetRequiredService<ILogger<Program>>();
      logger.LogError(ex, "An error occured during migration");
    }

app.Run();
