package com.atacanyavuz.ticketing.service;

import com.atacanyavuz.ticketing.dto.request.CreateTicketReplyRequest;
import com.atacanyavuz.ticketing.dto.response.CreateTicketReplyResponse;
import com.atacanyavuz.ticketing.entity.Ticket;
import com.atacanyavuz.ticketing.entity.TicketReply;
import com.atacanyavuz.ticketing.entity.User;
import com.atacanyavuz.ticketing.enums.TicketStatus;
import com.atacanyavuz.ticketing.exception.TicketNotFoundException;
import com.atacanyavuz.ticketing.repository.TicketReplyRepository;
import com.atacanyavuz.ticketing.repository.TicketRepository;
import com.atacanyavuz.ticketing.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
public class TicketReplyService {
    private final TicketReplyRepository ticketReplyRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketReplyService(TicketReplyRepository ticketReplyRepository, TicketRepository ticketRepository, UserRepository userRepository) {
        this.ticketReplyRepository = ticketReplyRepository;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    public CreateTicketReplyResponse createUpdateReply(CreateTicketReplyRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User responder = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Responder not found: " + email));

        Ticket ticket = ticketRepository.findById(request.getTicketId())
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found with id: " + request.getTicketId()));

        LocalDateTime now = LocalDateTime.now();
        ticket.setUpdatedAt(now);
        ticket.setStatus(TicketStatus.ANSWERED);
        ticketRepository.save(ticket);

        TicketReply reply;
        if (ticket.getReply() != null) {
            reply = ticket.getReply();
            reply.setMessage(request.getMessage());
            reply.setCreatedAt(now);
            reply.setResponder(responder);

            log.info("Reply updated for ticket {} by {}", ticket.getId(), responder.getEmail());
            TicketReply savedReply = ticketReplyRepository.save(reply);
            return CreateTicketReplyResponse.builder()
                    .statusCode(HttpStatus.OK.value())
                    .message("Reply updated successfully")
                    .replyId(savedReply.getId())
                    .build();
        }
        else {
            reply = TicketReply.builder()
                    .message(request.getMessage())
                    .createdAt(now)
                    .ticket(ticket)
                    .responder(responder)
                    .build();

            log.info("Reply created for ticket {} by {}", ticket.getId(), responder.getEmail());
            TicketReply savedReply = ticketReplyRepository.save(reply);
            return CreateTicketReplyResponse.builder()
                    .statusCode(HttpStatus.CREATED.value())
                    .message("Reply created successfully")
                    .replyId(savedReply.getId())
                    .build();
        }
    }
}
