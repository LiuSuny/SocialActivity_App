using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        //Query that get all list of activity
        public class Query : IRequest<Result<List<Activity>>>{}

        public class Handler(DataContext context) : IRequestHandler<Query, Result<List<Activity>>>
        {
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {

                // //testing the cancellationToken and how it works
                // try
                // {
                //     for (int i = 0; i < 10; i++)
                //     {
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000, cancellationToken);
                //         logger.LogInformation($"Task {i} has completed");
                //     }
                // }
                // catch (System.Exception)
                // {                  
                //     logger.LogInformation("Task was cancelled");
                // }

               var activity = await context.Activities.ToListAsync();
                return Result<List<Activity>>.Success(activity);
            }
        }
    }
}