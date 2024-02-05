using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Schat.Models;
using Schat.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options => options.Filters.Add(new AuthorizeFilter()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SchatContext>(options => options.UseSqlServer());
builder.Services.AddSingleton<AuthenticationService>();


builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme);

builder.Services.AddIdentity<User, IdentityRole<int>>(options =>
{
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<SchatContext>();

builder.Services.AddCors(options => options.AddPolicy(name: "Angular", policy => policy
                                                    .WithOrigins("http://localhost:4200")
                                                    .AllowAnyHeader()
                                                    .AllowAnyMethod()
                                                    .AllowCredentials()));

var app = builder.Build();

// Seeding the user database with roles and the admin
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    var ctx = scope.ServiceProvider.GetRequiredService<SchatContext>();
    var roles = new[] { "Admin", "User" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole<int>(role));
        }
    }

    if (!ctx.Users.Any(u => u.Email == "admin@schat.com"))
    {
        User adminUser = new User
        {
            FirstName = "Ali",
            LastName = "Mones",
            Nationality = "egypt",
            Email = "admin@schat.com",
            UserName = "admin"
        };

        await userManager.CreateAsync(adminUser, "Password@123");
        await userManager.AddToRoleAsync(adminUser, "Admin");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Angular");

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.Run();
