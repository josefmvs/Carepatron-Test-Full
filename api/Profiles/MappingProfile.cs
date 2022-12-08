using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using api.Models;
using api.Dtos;

namespace api.Profiles
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<ClientDto, Client>()
                .ForMember(dest => dest.FirstName, act => act.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, act => act.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Email, act => act.MapFrom(src => src.Email))
                .ForMember(dest => dest.PhoneNumber, act => act.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.Id, act => act.MapFrom(src => DateTime.Now.ToString()));
        }
    }
}
