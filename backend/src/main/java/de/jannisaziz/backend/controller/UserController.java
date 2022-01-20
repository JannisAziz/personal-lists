package de.jannisaziz.backend.controller;

import de.jannisaziz.backend.service.MongoUserDetailsService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping
    public String getHello(Principal principal) {
        final Collection<? extends GrantedAuthority> authorities = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getAuthorities();

        final boolean isAllowed = authorities
                .stream()
                .anyMatch(g -> MongoUserDetailsService.AUTHORITY_API_READWRITE.equals(g.getAuthority()));

        if (isAllowed) {
            return "Hello " + principal.getName();
        } else {
            return "Unauthorized user";
        }
    }
}
