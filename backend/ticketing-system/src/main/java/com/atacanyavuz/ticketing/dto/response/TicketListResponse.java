package com.atacanyavuz.ticketing.dto.response;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class TicketListResponse extends BaseResponse{
    private List<TicketResponse> tickets;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
}
