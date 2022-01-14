package de.jannisaziz.backend.database;

import de.jannisaziz.backend.model.CustomList;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomListDatabase<T> extends MongoRepository<CustomList<T>, ObjectId> {

    boolean existsByListId(ObjectId id);

}