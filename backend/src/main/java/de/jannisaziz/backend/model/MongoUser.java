package de.jannisaziz.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "mongoUsers")
public class MongoUser implements UserDetails {

    @Id
    ObjectId _id;

    Collection<GrantedAuthority> authorities;

    // Login data // Todo: replace with 'LoginData'
    String username = "NULL_NAME";
    String password = "NULL_PW";

    // User data // Todo: replace with 'UserData'
    String fullName = "John Doe";
    String email = "john@doe.com";
    LocalDate birthDate = LocalDate.of(2000, 1, 1);

    // Account data
    boolean isAccountNonExpired = true;
    boolean isAccountNonLocked = true;
    boolean isCredentialsNonExpired = true;
    boolean isEnabled = true;

    public MongoUser(String username, String password, Collection<GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }
}
