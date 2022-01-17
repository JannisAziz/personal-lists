package de.jannisaziz.backend.service;

import de.jannisaziz.backend.database.CustomListDatabase;
import de.jannisaziz.backend.model.CustomList;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class CustomListService<T>{

    @Autowired
    CustomListDatabase<T> database;

    // GET
    public Collection<CustomList<T>> getAllLists() {
        return database.findAll();
    }
    public CustomList<T> getListById(ObjectId id) {
        return database.findById(id).orElseThrow();
    }

    // ADD & REMOVE
    public String addList(CustomList<T> newList) {
        database.insert(newList);
        return "List added";
    }
    public String removeList(CustomList<T> oldList) {
        database.delete(oldList);
        return "List removed";
    }

    // UPDATE
    public String updateList(CustomList<T> updatedList) {
        database.save(updatedList);
        return "List updated";
    }
}