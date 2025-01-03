using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id {get; set;}
        }

         public class Handler(DataContext context, IUserAccessor userAccessor) : 
        IRequestHandler<Command, Result<Unit>>
        {         
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //get list of activities with attendee
               var activity = await context.Activities
               .Include(a => a.Attendees)
               .ThenInclude(u => u.AppUser)
               .FirstOrDefaultAsync(x => x.Id ==request.Id);
               
               if(activity == null) return null;

               //get user
               var user = await context.Users.FirstOrDefaultAsync
               (x => x.UserName == userAccessor.GetUsername());

               if(user == null) return null;

               //populate the hostname 
               var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;
             
              //get attendance status for particular username
              var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

               if (attendance != null && hostUsername == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                if (attendance != null && hostUsername != user.UserName)
                    activity.Attendees.Remove(attendance);
                    
                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };
                    activity.Attendees.Add(attendance);
                }
                var result = await context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");

            }
        }
    }
}