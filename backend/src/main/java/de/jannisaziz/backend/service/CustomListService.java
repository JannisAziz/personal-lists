package de.jannisaziz.backend.service;

import de.jannisaziz.backend.database.CustomListDatabase;
import de.jannisaziz.backend.model.CustomList;
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
    public CustomList<T> getListById(String id) {
        return database.findById(id).orElseThrow();
    }

    // ADD & REMOVE
    public CustomList<T> addList(CustomList<T> newList) {
        return database.insert(newList);
    }

    public String removeList(String oldListId) {

        if (database.existsById(oldListId)){
            database.deleteById(oldListId);
            return "List removed";
        }

        return "List doesnt exist";
    }

    // UPDATE
    public String updateList(CustomList<T> updatedList) {
        if (database.existsById(updatedList.getListId())){
            database.save(updatedList);
            return "List updated";
        }
        else {
            return "List doesnt exist";
        }
    }
}