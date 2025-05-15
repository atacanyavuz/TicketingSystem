package com.atacanyavuz.ticketing.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = false)
@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateTicketStatusResponse extends BaseResponse{
}
