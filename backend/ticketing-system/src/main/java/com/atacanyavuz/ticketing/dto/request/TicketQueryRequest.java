package com.atacanyavuz.ticketing.dto.request;

import com.atacanyavuz.ticketing.enums.TicketStatus;
import lombok.Data;

@Data
public class TicketQueryRequest {
    private int page = 0;
    private int size = 10;
    private TicketStatus status;
}