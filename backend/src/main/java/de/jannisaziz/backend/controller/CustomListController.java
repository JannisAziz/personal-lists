package de.jannisaziz.backend.controller;

import de.jannisaziz.backend.model.CustomList;
import de.jannisaziz.backend.service.CustomListService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("lists")
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

    @PutMapping("all")
    public String addList(@RequestBody CustomList<T> newList){
        return listService.addList(newList);
    }

//    @GetMapping("id={id}")
//    public CustomList getListById(@PathVariable ObjectId id){
//        return todoListService.getListById(id);
//    }
//
//    @GetMapping("name={name}")
//    public CustomList getListByName(@PathVariable String name){
//        return todoListService.getListByName(name);
//    }
//
//    // ADD & REMOVE
//
//    @PutMapping("all")
//    public String addList(@RequestBody CustomList newList){
//        return todoListService.addList(newList);
//    }
//
//    @DeleteMapping("all")
//    public String removeList(@RequestBody CustomList oldList){
//         return todoListService.removeList(oldList);
//    }
//
//    // UPDATE
//
//    @PatchMapping("all")
//    public  String updateList(@RequestBody CustomList updatedList) { return todoListService.updateList(updatedList); }
}