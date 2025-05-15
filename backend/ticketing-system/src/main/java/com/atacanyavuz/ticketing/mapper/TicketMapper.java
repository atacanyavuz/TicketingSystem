package com.atacanyavuz.ticketing.mapper;

import com.atacanyavuz.ticketing.dto.request.CreateTicketRequest;
import com.atacanyavuz.ticketing.dto.response.TicketResponse;
import com.atacanyavuz.ticketing.dto.response.UserSummaryResponse;
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

    public static TicketResponse toResponse(Ticket ticket) {
        return TicketResponse.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .description(ticket.getDescription())
                .createdAt(ticket.getCreatedAt())
                .status(ticket.getStatus())
                .user(UserSummaryResponse.builder()
                        .id(ticket.getUser().getId())
                        .username(ticket.getUser().getUsername())
                        .email(ticket.getUser().getEmail())
                        .build())
                .reply(ticket.getReply() != null ? ReplyMapper.toResponse(ticket.getReply()) : null)
                .build();
    }


}
