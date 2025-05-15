package com.atacanyavuz.ticketing.dto.request;

import com.atacanyavuz.ticketing.enums.TicketStatus;
import lombok.Data;

@Data
public class UpdateTicketStatusRequest {
    private Long ticketId;
    private TicketStatus status;
}