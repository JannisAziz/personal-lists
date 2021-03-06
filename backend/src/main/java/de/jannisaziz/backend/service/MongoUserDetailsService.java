package de.jannisaziz.backend.service;

import de.jannisaziz.backend.database.MongoUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    public final static String AUTHORITY_API_READWRITE = "API_READWRITE";

    private final MongoUserRepository repository;

    public MongoUserDetailsService(MongoUserRepository repository){
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + "not found"));
    }

}