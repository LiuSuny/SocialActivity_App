using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options => {
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

 // Add Cors
 builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
        {
           
          builder.AllowAnyMethod().AllowAnyHeader()
                   .WithOrigins("http://localhost:4200");
        }));

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("CorsPolicy");
  
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
      await Seed.SeedData(context);
    }
      catch (Exception ex)
    {
                
      var logger  = app.Services.GetRequiredService<ILogger<Program>>();
      logger.LogError(ex, "An error occured during migration");
    }

app.Run();
