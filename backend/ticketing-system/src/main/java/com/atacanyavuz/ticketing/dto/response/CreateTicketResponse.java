package com.atacanyavuz.ticketing.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class CreateTicketResponse extends BaseResponse{
    private Long ticketId;
}
