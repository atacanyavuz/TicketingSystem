package com.atacanyavuz.ticketing.service;

import com.atacanyavuz.ticketing.dto.request.CreateTicketRequest;
import com.atacanyavuz.ticketing.dto.response.*;
import com.atacanyavuz.ticketing.entity.Ticket;
import com.atacanyavuz.ticketing.entity.TicketReply;
import com.atacanyavuz.ticketing.entity.User;
import com.atacanyavuz.ticketing.enums.TicketStatus;
import com.atacanyavuz.ticketing.mapper.TicketMapper;
import com.atacanyavuz.ticketing.repository.TicketRepository;
import com.atacanyavuz.ticketing.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketService(TicketRepository ticketRepository, UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    public CreateTicketResponse createTicket(CreateTicketRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        Ticket ticket = TicketMapper.toTicket(request, user);
        Ticket savedTicket = ticketRepository.save(ticket);

        log.info("Ticket created: id={}, user={}", savedTicket.getId(), user.getEmail());

        return CreateTicketResponse.builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Ticket created successfully")
                .ticketId(savedTicket.getId())
                .build();
    }

    public TicketListResponse getMyTickets(int page, int size) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        Pageable pageable = PageRequest.of(page, size, Sort.by("updatedAt").descending());
        Page<Ticket> ticketPage = ticketRepository.findAllByUserEmail(email, pageable);

        List<TicketResponse> ticketDTOs = ticketPage.getContent().stream()
                .map(TicketMapper::toResponse)
                .toList();

        return TicketListResponse.builder()
                .statusCode(HttpStatus.OK.value())
                .message("Tickets fetched successfully")
                .tickets(ticketDTOs)
                .pageNumber(ticketPage.getNumber())
                .pageSize(ticketPage.getSize())
                .totalElements(ticketPage.getTotalElements())
                .totalPages(ticketPage.getTotalPages())
                .build();
    }
}
