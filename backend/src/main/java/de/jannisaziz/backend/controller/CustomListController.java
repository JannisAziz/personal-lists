package de.jannisaziz.backend.controller;

import de.jannisaziz.backend.model.CustomList;
import de.jannisaziz.backend.service.CustomListService;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("api/lists")
public class CustomListController<T> {

    private final CustomListService<T> listService;

    public CustomListController(CustomListService<T> listService){
        this.listService = listService;
    }

    // GET
    @GetMapping("all")
    public Collection<CustomList<T>> getAllLists(){
        return listService.getAllLists();
    }
    /*
    @GetMapping("type={type}")
    public Collection<CustomList<T>> getAllListsByType(@PathVariable LIST_TYPE type){
        return listService.getAllListsByType(type);
    }
    */
    @GetMapping("id={id}")
    public CustomList<T> getListById(@PathVariable ObjectId id){
        return listService.getListById(id);
    }

    // ADD & REMOVE
    @PutMapping("all")
    public CustomList<T> addList(@RequestBody CustomList<T> newList){
        return listService.addList(newList);
    }
    @DeleteMapping("all")
    public String removeList(@RequestBody CustomList<T> oldList){
         return listService.removeList(oldList);
    }

    // UPDATE
    @PatchMapping("all")
    public  String updateList(@RequestBody CustomList<T> updatedList) {
        return listService.updateList(updatedList);
    }
}