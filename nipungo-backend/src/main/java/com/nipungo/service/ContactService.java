package com.nipungo.service;

import com.nipungo.dto.ContactDto;

import java.util.List;

public interface ContactService {
    ContactDto submitContact(ContactDto dto);
    List<ContactDto> getAllContacts();
    ContactDto markAsReplied(Long id);
}
