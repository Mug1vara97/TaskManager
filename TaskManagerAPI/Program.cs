using System.Text.Json;
using TaskManagerAPI.DTO;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");

var tasks = new List<TaskItem>
{
    new TaskItem { 
        Id = 1,
        Title = "Изучить React",
        Description = "Изучить основы React", 
        IsCompleted = false, 
        Priority = "High", 
        CreatedAt = DateTime.Now.AddDays(-2) 
        },

    new TaskItem { 
        Id = 2, 
        Title = "Создать API", 
        Description = "Создать Web API на C#", 
        IsCompleted = true,
        Priority = "Medium", 
        CreatedAt = DateTime.Now.AddDays(-1) 
        }

};

var nextId = 3;

app.MapGet("/api/tasks", () => Results.Ok(tasks));

app.MapGet("/api/tasks/{id}", (int id) =>
{
    var task = tasks.FirstOrDefault(t => t.Id == id);
    return task != null ? Results.Ok(task) : Results.NotFound();
});

app.MapPost("/api/tasks", (CreateTaskRequest request) =>
{
    var task = new TaskItem
    {
        Id = nextId++,
        Title = request.Title,
        Description = request.Description,
        Priority = request.Priority,
        IsCompleted = false,
        CreatedAt = DateTime.Now
    };
    tasks.Add(task);
    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.MapPut("/api/tasks/{id}", (int id, UpdateTaskRequest request) =>
{
    var task = tasks.FirstOrDefault(t => t.Id == id);
    if (task == null) return Results.NotFound();

    task.Title = request.Title;
    task.Description = request.Description;
    task.Priority = request.Priority;
    task.IsCompleted = request.IsCompleted;

    return Results.Ok(task);
});

app.MapDelete("/api/tasks/{id}", (int id) =>
{
    var task = tasks.FirstOrDefault(t => t.Id == id);
    if (task == null) return Results.NotFound();

    tasks.Remove(task);
    return Results.NoContent();
});

app.MapGet("/api/tasks/stats", () =>
{
    var total = tasks.Count;
    var completed = tasks.Count(t => t.IsCompleted);
    var pending = total - completed;
    var highPriority = tasks.Count(t => t.Priority == "High" && !t.IsCompleted);

    return Results.Ok(new TaskStats
    {
        Total = total,
        Completed = completed,
        Pending = pending,
        HighPriority = highPriority
    });
});

app.Run();
