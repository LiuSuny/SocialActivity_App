using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
        //Testing CancellationToken and what it does
        // [HttpGet]
        // public async Task<ActionResult<List<Activity>>> GetAllActivity(CancellationToken ct)
        // {
        //     return await Mediator.Send(new List.Query(), ct);
        // } 

         [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAllActivity()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        } 

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivityById(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id =id}));
        }


         [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            var result = await Mediator.Send(new Create.Command {Activity = activity});
            return HandleResult(result);
        }

        
         [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
           return HandleResult( await Mediator.Send(new Edit.Command {Activity = activity}));
           
        }

        
         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            
            var result = await Mediator.Send(new Delete.Command {Id = id});
            return HandleResult(result);
        }
    }
}