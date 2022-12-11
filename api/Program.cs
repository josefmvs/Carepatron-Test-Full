using api.Data;
using api.Models;
using api.Repositories;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using api.Dtos;
using FluentValidation;
using api.Validations;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddAutoMapper(typeof(Program).Assembly);
services.AddScoped<IValidator<ClientDto>, ClientValidator>();

// cors
services.AddCors(options =>
{
    options.AddDefaultPolicy(builder => builder
        .SetIsOriginAllowedToAllowWildcardSubdomains()
        .WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .Build());
});

// ioc
services.AddDbContext<DataContext>(options => options.UseInMemoryDatabase(databaseName: "Test"));

services.AddScoped<DataSeeder>();
services.AddScoped<IClientRepository, ClientRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/clients", async (IClientRepository clientRepository) =>
{
    return await clientRepository.Get();
})
.WithName("get clients");


app.MapGet("/search", async (string name, IClientRepository clientRepository) =>
{
    return await clientRepository.Search(name);
})
.WithName("search client");

app.MapPost("/addclient", async (IValidator <ClientDto> validator, ClientDto client, IClientRepository clientRepository, IMapper mapper) =>
{
    var validationResult = await validator.ValidateAsync(client);
    if (!validationResult.IsValid)
    {
        return Results.ValidationProblem(validationResult.ToDictionary());
    }

    var newClient = mapper.Map<Client>(client);
    await clientRepository.Create(newClient);
    return Results.Created($"/{newClient.Id}", newClient);

}).WithName("add client");

app.MapPut("/updateclient/{id}", async (string id, ClientDto inputClient, IValidator<ClientDto> validator, IClientRepository clientRepository, IMapper mapper) =>
{

    var validationResult = await validator.ValidateAsync(inputClient);
    if (!validationResult.IsValid)
    {
        return Results.ValidationProblem(validationResult.ToDictionary());
    }

    var client = await clientRepository.GetOne(id);

    if (client is null) return Results.NotFound();

    client.FirstName = inputClient.FirstName;
    client.LastName = inputClient.LastName;
    client.Email = inputClient.Email;
    client.PhoneNumber = inputClient.PhoneNumber;

    await clientRepository.Update(client);
    return Results.Accepted($"/{client.Id}", client);

}).WithName("update client");

app.UseCors();

// seed data
using (var scope = app.Services.CreateScope())
{
    var dataSeeder = scope.ServiceProvider.GetRequiredService<DataSeeder>();

    dataSeeder.Seed();
}

// run app
app.Run();