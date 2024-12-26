using Application.Core;
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

        //method that handle activity error exception
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if(result == null) return NotFound();
            if(result.IsSuccess && result.Value != null)
            return Ok(result.Value);
           if(result.IsSuccess && result.Value == null)
            return NotFound();

            return BadRequest(result.Error);
        }
    }
}