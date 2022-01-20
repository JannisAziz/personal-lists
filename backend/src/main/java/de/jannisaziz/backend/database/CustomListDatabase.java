package de.jannisaziz.backend.database;

import de.jannisaziz.backend.model.CustomList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomListDatabase<T> extends MongoRepository<CustomList<T>, String> {
}