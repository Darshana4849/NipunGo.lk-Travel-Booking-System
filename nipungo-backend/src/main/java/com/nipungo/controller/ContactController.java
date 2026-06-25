package com.nipungo.controller;

import com.nipungo.dto.ContactDto;
import com.nipungo.payload.ApiResponse;
import com.nipungo.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Contact form submission")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    @Operation(summary = "Submit a contact message")
    public ResponseEntity<ApiResponse<ContactDto>> submitContact(
            @Valid @RequestBody ContactDto dto) {
        ContactDto saved = contactService.submitContact(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Message sent successfully! We'll be in touch soon.", saved));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all contact messages (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<List<ContactDto>>> getAllContacts() {
        return ResponseEntity.ok(
                ApiResponse.success("Contacts retrieved successfully",
                        contactService.getAllContacts()));
    }

    @PutMapping("/{id}/reply")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Mark contact as replied (Admin only)",
               security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse<ContactDto>> markAsReplied(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Marked as replied", contactService.markAsReplied(id)));
    }
}
