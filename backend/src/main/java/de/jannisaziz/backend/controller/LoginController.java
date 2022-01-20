package de.jannisaziz.backend.controller;

import de.jannisaziz.backend.database.MongoUserRepository;
import de.jannisaziz.backend.model.LoginData;
import de.jannisaziz.backend.model.MongoUser;
import de.jannisaziz.backend.service.JWTUtilService;
import de.jannisaziz.backend.service.MongoUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired JWTUtilService jwtUtilsService;
    @Autowired AuthenticationManager authenticationManager;
    @Autowired MongoUserRepository userRepository;
    @Autowired PasswordEncoder encoder;

    @PostMapping("login")
    public String login(@RequestBody LoginData loginData) {
        try {
            final UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword());
            authenticationManager.authenticate(token);

            return jwtUtilsService.createToken(new HashMap<>(), loginData.getUsername());
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Credentials");
        }
    }

    @PostMapping("register")
    public String register(@RequestBody LoginData loginData) {
        if (userRepository.findByUsername(loginData.getUsername()).isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists");
        else {
            final MongoUser newUser = new MongoUser(
                    loginData.getUsername(),
                    encoder.encode(loginData.getPassword()),
                    List.of (new SimpleGrantedAuthority(MongoUserDetailsService.AUTHORITY_API_READWRITE)));

            userRepository.save(newUser);
            return "User '" + loginData.getUsername() + "' registered";
        }
    }
}
