package com.atacanyavuz.ticketing.controller;

import com.atacanyavuz.ticketing.dto.request.CreateTicketRequest;
import com.atacanyavuz.ticketing.dto.response.CreateTicketResponse;
import com.atacanyavuz.ticketing.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CreateTicketResponse> createTicket(@Valid @RequestBody CreateTicketRequest request) {
        return ResponseEntity.ok(ticketService.createTicket(request));
    }

}
