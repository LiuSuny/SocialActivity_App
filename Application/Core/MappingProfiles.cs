using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
           CreateMap<Activity, Activity>();
           CreateMap<Activity, ActivityDto>()
           .ForMember(dest => dest.HostUsername,
            opt => opt.MapFrom(src => src.Attendees
                 .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            
             CreateMap<ActivityAttendee, Porfiles.Profile>()
                .ForMember(destinationMember => destinationMember.DisplayName, 
                opt => opt.MapFrom(src => src.AppUser.DisplayName))
                .ForMember(destinationMember => destinationMember.Username, 
                opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(destinationMember => destinationMember.Bio, 
                opt => opt.MapFrom(src => src.AppUser.Bio));
        }
    }
}