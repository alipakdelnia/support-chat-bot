var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

builder.Services.AddSingleton<WebSocketService>();


builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors("AllowAll"); 

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


app.MapGet("/",()=> "ali api");

app.UseWebSockets();
app.UseMiddleware<WebSocketMiddleware>();

app.Run();


