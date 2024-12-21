using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator /* if this part is null*/??= 
        HttpContext.RequestServices.GetService<IMediator>(); //then get the mediator
    }
}