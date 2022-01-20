package de.jannisaziz.backend.controller;

import de.jannisaziz.backend.database.MongoUserRepository;
import de.jannisaziz.backend.model.LoginData;
import de.jannisaziz.backend.model.MongoUser;
import de.jannisaziz.backend.service.MongoUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {

    @LocalServerPort
    private int port;
    @MockBean
    private MongoUserRepository mongoUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final WebClient webTestClient = WebClient.create();

    // GetHello Tests

    @Test
    void getHelloValidTokenValidAuthority() {
        //GIVEN
        LoginData loginData = new LoginData("some-user", "some-password");
        when(mongoUserRepository.findByUsername("some-user")).thenReturn(getTestUser(loginData, true));
        String token = getTestLoginToken(loginData);

        //WHEN
        ResponseEntity<String> getHello = getTestHello(token);

        //THEN
        assertThat(getHello.getStatusCode(), is(HttpStatus.OK));
        assertThat(getHello.getBody(), is("Hello " + loginData.getUsername()));
    }

    @Test
    void getHelloValidTokenInvalidAuthority() {
        //GIVEN
        LoginData loginData = new LoginData("some-user", "some-password");
        when(mongoUserRepository.findByUsername("some-user")).thenReturn(getTestUser(loginData, false));
        String token = getTestLoginToken(loginData);

        //WHEN
        ResponseEntity<String> getHello = getTestHello(token);

        //THEN
        assertThat(getHello.getStatusCode(), is(HttpStatus.OK));
        assertThat(getHello.getBody(), is("Unauthorized user"));
    }

    @Test
    void getHelloInvalidToken() {
        //GIVEN
        LoginData loginData = new LoginData("some-user", "some-password");
        when(mongoUserRepository.findByUsername("some-user")).thenReturn(getTestUser(loginData, true));
        // String token = getTestLoginToken(loginData);

        //WHEN
        ResponseEntity<String> getHello = getTestHello("invalid-token");

        //THEN
        assertThat(getHello.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    // Helper & Setup functions
    private Optional<MongoUser> getTestUser(LoginData loginData, boolean isAuthorized) {
        return Optional.of(new MongoUser(
                        loginData.getUsername(),
                        passwordEncoder.encode(loginData.getPassword()),
                        isAuthorized
                                ? List.of(new SimpleGrantedAuthority(MongoUserDetailsService.AUTHORITY_API_READWRITE))
                                : List.of()
                )
        );
    }

    private String getTestLoginToken(LoginData loginData) {
        return webTestClient
                .post()
                .uri("http://localhost:" + port + "/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(loginData)
                .retrieve()
                .toEntity(String.class)
                .block()
                .getBody();
    }

    private ResponseEntity<String> getTestHello(String token) {
        return webTestClient.get()
                .uri("http://localhost:" + port + "/user")
                .header("Authorization", "Bearer" + token)
                .retrieve()
                .onStatus(HttpStatus.FORBIDDEN::equals, clientResponse -> Mono.empty())
                .toEntity(String.class)
                .block();
    }

}