package com.atacanyavuz.ticketing.controller;

import com.atacanyavuz.ticketing.dto.request.CreateTicketRequest;
import com.atacanyavuz.ticketing.dto.request.TicketQueryRequest;
import com.atacanyavuz.ticketing.dto.request.UpdateTicketStatusRequest;
import com.atacanyavuz.ticketing.dto.response.CreateTicketResponse;
import com.atacanyavuz.ticketing.dto.response.TicketListResponse;
import com.atacanyavuz.ticketing.dto.response.UpdateTicketStatusResponse;
import com.atacanyavuz.ticketing.service.TicketService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/tickets")
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

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TicketListResponse> getMyTickets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(ticketService.getMyTickets(page, size));
    }

    @PostMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TicketListResponse> getAllTickets(@RequestBody TicketQueryRequest request) {
        return ResponseEntity.ok(ticketService.getAllTicketsAsAdmin(request));
    }

    @PostMapping("/update-status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UpdateTicketStatusResponse> updateTicketStatus(@RequestBody UpdateTicketStatusRequest request) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(request));
    }

}
