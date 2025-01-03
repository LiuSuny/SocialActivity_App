using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        //Query that get all list of activity
        public class Query : IRequest<Result<List<ActivityDto>>>{}

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
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

               //eager loading
            //    var activity = await context.Activities
            //                 .Include(a => a.Attendees)
            //                 .ThenInclude(u => u.AppUser)
            //                 .ToListAsync(cancellationToken);
             // var activityToReturn = mapper.Map<List<ActivityDto>>(activity);
              //  return Result<List<ActivityDto>>.Success(activityToReturn);

                 //using automapper projectTo  to optimize query instead of eager loading entities
                var activity = await context.Activities
                            .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                            .ToListAsync(cancellationToken);

                return Result<List<ActivityDto>>.Success(activity);
            }
        }
    }
}