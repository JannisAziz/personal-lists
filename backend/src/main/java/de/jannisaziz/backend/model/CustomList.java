package de.jannisaziz.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "customLists")
public class CustomList<T> {

    @Id
    ObjectId listId;

    String listName;
    Collection<T> listItems = new ArrayList<>();

    public CustomList(String name, Collection<T> items) {
        listName = name;
        listItems = items;
    }
}