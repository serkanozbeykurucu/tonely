using AutoMapper;
using Tonely.Dto;
using Tonely.Entity.Concrete;

namespace Tonely.Business.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Conversation, ConversationDto>();
        CreateMap<Message, MessageDto>()
            .ForMember(d => d.Role, o => o.MapFrom(s => s.Role.ToString().ToLowerInvariant()));
    }
}