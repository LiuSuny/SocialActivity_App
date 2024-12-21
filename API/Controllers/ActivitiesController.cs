using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Application.Activities.Create;

namespace API.Controllers
{
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
            return await Mediator.Send(new List.Query());
        } 


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityById(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id =id});
           
        }


         [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new Create.Command {Activity = activity});
            return Ok();
        }

        
         [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command {Activity = activity});
            return Ok();
        }

        
         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            
            await Mediator.Send(new Delete.Command {Id = id});
            return Ok();
        }
    }
}