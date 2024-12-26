using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
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

        public class Handler(DataContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                  context.Activities.Add(request.Activity);
                 var result = await context.SaveChangesAsync() > 0;
                if(!result)return Result<Unit>.Failure("Falied to create activity");
                return Result<Unit>.Success(Unit.Value);
                 
            }
        }
    }
}