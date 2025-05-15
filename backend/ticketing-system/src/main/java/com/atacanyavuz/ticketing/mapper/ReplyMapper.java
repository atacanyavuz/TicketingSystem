package com.atacanyavuz.ticketing.mapper;

import com.atacanyavuz.ticketing.dto.response.TicketReplyResponse;
import com.atacanyavuz.ticketing.entity.TicketReply;

public class ReplyMapper {
    public static TicketReplyResponse toResponse(TicketReply reply) {
        return TicketReplyResponse.builder()
                .message(reply.getMessage())
                .createdAt(reply.getCreatedAt())
                .responderId(reply.getResponder().getId())
                .responderEmail(reply.getResponder().getEmail())
                .build();
    }
}