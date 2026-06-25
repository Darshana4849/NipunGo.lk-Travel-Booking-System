package com.nipungo.service.impl;

import com.nipungo.dto.ContactDto;
import com.nipungo.entity.Contact;
import com.nipungo.exception.ResourceNotFoundException;
import com.nipungo.repository.ContactRepository;
import com.nipungo.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;

    @Override
    @Transactional
    public ContactDto submitContact(ContactDto dto) {
        Contact contact = Contact.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .replied(false)
                .build();

        Contact saved = contactRepository.save(contact);
        log.info("Contact message received from: {}", saved.getEmail());
        return toDto(saved);
    }

    @Override
    public List<ContactDto> getAllContacts() {
        return contactRepository.findAll()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContactDto markAsReplied(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact", "id", id));
        contact.setReplied(true);
        return toDto(contactRepository.save(contact));
    }

    private ContactDto toDto(Contact c) {
        ContactDto dto = new ContactDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setEmail(c.getEmail());
        dto.setPhone(c.getPhone());
        dto.setSubject(c.getSubject());
        dto.setMessage(c.getMessage());
        dto.setReplied(c.getReplied());
        dto.setCreatedAt(c.getCreatedAt());
        return dto;
    }
}
