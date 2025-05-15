package com.atacanyavuz.ticketing.mapper;

import com.atacanyavuz.ticketing.dto.request.CreateTicketRequest;
import com.atacanyavuz.ticketing.entity.Ticket;
import com.atacanyavuz.ticketing.entity.User;
import com.atacanyavuz.ticketing.enums.TicketStatus;

import java.time.LocalDateTime;

public class TicketMapper {
    public static Ticket toTicket(CreateTicketRequest request, User user) {
        return Ticket.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .createdAt(LocalDateTime.now())
                .status(TicketStatus.OPEN)
                .user(user)
                .build();
    }
}
