using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
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
        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Activity.Id);
                 if(activity == null) return null;
                //activity.Title = request.Activity.Title ?? activity.Title; //tyring to map
                mapper.Map(request.Activity, activity);
                
               var result = await context.SaveChangesAsync() > 0;
                 if(!result) return Result<Unit>.Failure("Falied to edit activity");
                  return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}