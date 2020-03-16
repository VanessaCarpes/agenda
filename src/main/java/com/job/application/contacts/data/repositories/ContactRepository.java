package com.job.application.contacts.data.repositories;

import com.job.application.contacts.data.Contact;
import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author Nessa
 */
@CrossOrigin(origins = "http://localhost:8080")
public interface ContactRepository extends PagingAndSortingRepository<Contact, Long> {

    List<Contact> findByName(@Param("name") String name);

}
