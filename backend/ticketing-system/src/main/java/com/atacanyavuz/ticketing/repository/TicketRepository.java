package com.atacanyavuz.ticketing.repository;

import com.atacanyavuz.ticketing.entity.Ticket;
import com.atacanyavuz.ticketing.enums.TicketStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Page<Ticket> findAllByUserEmail(String email, Pageable pageable);
    Page<Ticket> findAll(Pageable pageable);
    Page<Ticket> findAllByStatus(TicketStatus status, Pageable pageable);
}
