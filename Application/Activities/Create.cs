using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
            
        }

        public class CommandValidator : AbstractValidator<Command>
        {

            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }

        }

        public class Handler(DataContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //this will give us the current user name
                var user = await context.Users.FirstOrDefaultAsync
                (x => x.UserName == userAccessor.GetUsername());
                 //create attendee

                 var attendee = new ActivityAttendee
                 {
                    AppUser = user,
                    Activity = request.Activity,
                    IsHost = true
                 };
                 
                 request.Activity.Attendees.Add(attendee);
                 
                  context.Activities.Add(request.Activity);
                 var result = await context.SaveChangesAsync() > 0;
                if(!result)return Result<Unit>.Failure("Falied to create activity");
                return Result<Unit>.Success(Unit.Value);
                 
            }
        }
    }
}