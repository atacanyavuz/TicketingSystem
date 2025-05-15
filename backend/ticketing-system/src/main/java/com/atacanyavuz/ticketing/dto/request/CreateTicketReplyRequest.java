package com.atacanyavuz.ticketing.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTicketReplyRequest {
    @NotBlank(message = "TickedId is required")
    private Long ticketId;

    @NotBlank(message = "Message is required")
    private String message;
}