package com.atacanyavuz.ticketing.dto.response;

import com.atacanyavuz.ticketing.enums.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = false)
@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponse extends BaseResponse{
    public String accessToken;
    public String username;
    public String email;
    public Role role;
}
