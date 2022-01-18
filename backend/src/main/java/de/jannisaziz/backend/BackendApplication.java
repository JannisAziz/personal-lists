package de.jannisaziz.backend;

import com.mongodb.DuplicateKeyException;
import de.jannisaziz.backend.database.MongoUserRepository;
import de.jannisaziz.backend.model.MongoUser;
import de.jannisaziz.backend.service.MongoUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Autowired
    MongoUserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        final String encodedPassword = encoder.encode ( "admin") ;

        final MongoUser user = new MongoUser(
                "Admin",
                encodedPassword,
                List.of (new SimpleGrantedAuthority(MongoUserDetailsService.AUTHORITY_API_READWRITE)));

        if (userRepository.findByUsername(user.getUsername()).isEmpty())
            userRepository.save(user);
        else
            System.out.println("User '" + user.getUsername() + "' already exists");
    }
}
