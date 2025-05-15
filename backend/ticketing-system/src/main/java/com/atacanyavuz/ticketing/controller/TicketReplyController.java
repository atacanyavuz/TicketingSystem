package com.atacanyavuz.ticketing.controller;

import com.atacanyavuz.ticketing.dto.request.CreateTicketReplyRequest;
import com.atacanyavuz.ticketing.dto.response.CreateTicketReplyResponse;
import com.atacanyavuz.ticketing.service.TicketReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/replies")
@RequiredArgsConstructor
public class TicketReplyController {
    private final TicketReplyService ticketReplyService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateTicketReplyResponse> createReply(@RequestBody CreateTicketReplyRequest request) {
        return ResponseEntity.ok(ticketReplyService.createUpdateReply(request));
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateTicketReplyResponse> updateReply(@RequestBody CreateTicketReplyRequest request) {
        return ResponseEntity.ok(ticketReplyService.createUpdateReply(request));
    }

}
