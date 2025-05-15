package com.atacanyavuz.ticketing.mapper;

import com.atacanyavuz.ticketing.dto.request.RegisterRequest;
import com.atacanyavuz.ticketing.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "id", ignore = true)
    User registerRequestToUser(RegisterRequest dto);
}
