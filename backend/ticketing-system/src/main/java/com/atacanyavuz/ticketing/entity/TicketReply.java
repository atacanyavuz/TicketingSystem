package com.atacanyavuz.ticketing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ticket_replies")
public class TicketReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "ticket_id", nullable = false, unique = true)
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User responder;
}
