package de.jannisaziz.backend.database;

import de.jannisaziz.backend.model.MongoUser;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MongoUserRepository extends MongoRepository<MongoUser, ObjectId> {
    Optional<MongoUser> findByUsername(String username);
}
