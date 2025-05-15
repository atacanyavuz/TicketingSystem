package com.atacanyavuz.ticketing.dto.response;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TicketReplyResponse {
    private String message;
    private LocalDateTime createdAt;
    private Long responderId;
    private String responderEmail;
}