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

    public Collection<CustomList<T>> getAllLists() {
        return database.findAll();
    }

    public String addList(CustomList<T> newList) {
        database.save(newList);
        return "List added";
    }

    /*
    public CustomList<T> getListById(ObjectId id) {
        return null;
    }
    public CustomList<T> getListByName(String name) {
        return null;
    }


    public String removeList(CustomList<T> oldList) {
        return null;
    }
    public String updateList(CustomList<T> updatedList) {
        return null;
    }

    */
}