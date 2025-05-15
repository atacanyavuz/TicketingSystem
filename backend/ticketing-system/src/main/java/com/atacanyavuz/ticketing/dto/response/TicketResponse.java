package com.atacanyavuz.ticketing.dto.response;

import com.atacanyavuz.ticketing.enums.TicketStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TicketResponse{
    private Long id;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private TicketStatus status;
    private UserSummaryResponse user;
    private TicketReplyResponse reply;
}
