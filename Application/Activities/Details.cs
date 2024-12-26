using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
         public class Query : IRequest<Result<Activity>>
         {
            public Guid Id {get; set;}
         }

        public class Handler(DataContext context) : 
        IRequestHandler<Query, Result<Activity>>
        {
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
              var activity = await context.Activities.FindAsync(request.Id);
            //   if(activity == null) throw new Exception("Activity not found");

            //     return activity;

               return Result<Activity>.Success(activity);

            }
        }

    }
}