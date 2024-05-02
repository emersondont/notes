package com.example.backendnotes.controllers;


import com.example.backendnotes.dtos.ListRecordDto;
import com.example.backendnotes.models.ListModel;
import com.example.backendnotes.repositories.ListRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@CrossOrigin
@RestController
public class ListController {

    @Autowired
    ListRepository listRepository;

    @PostMapping("/lists")
    public ResponseEntity<ListModel> saveList(@RequestBody @Valid ListRecordDto listRecordDto) {
        var listModel = new ListModel();
        BeanUtils.copyProperties(listRecordDto, listModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(listRepository.save(listModel));
    }

    @GetMapping("/lists")
    public ResponseEntity<List<ListModel>> getAllLists() {
        List<ListModel> listsList = listRepository.findAll();
        if(!listsList.isEmpty()) {
            for(ListModel list : listsList) {
                UUID id = list.getIdList();
                list.add(linkTo(methodOn(ListController.class).getOneList(id)).withSelfRel());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(listsList);
    }

    @GetMapping("/lists/{id}")
    public ResponseEntity<Object> getOneList(@PathVariable(value = "id") UUID id) {
        Optional<ListModel> listO = listRepository.findById(id);
        if(listO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("List not found.");
        }
        listO.get().add(linkTo(methodOn(ListController.class).getAllLists()).withRel("Lists"));
        return ResponseEntity.status(HttpStatus.OK).body(listO.get());
    }

    @PutMapping("/lists/{id}")
    public ResponseEntity<Object> updateList(@PathVariable(value = "id") UUID id,
                                             @RequestBody @Valid ListRecordDto listRecordDto) {
        Optional<ListModel> listO = listRepository.findById(id);
        if(listO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("List not found.");
        }
        var listModel = listO.get();
        BeanUtils.copyProperties(listRecordDto, listModel);
        return ResponseEntity.status(HttpStatus.OK).body(listRepository.save(listModel));
    }

    @DeleteMapping("/lists/{id}")
    public ResponseEntity<Object> deleteList(@PathVariable(value = "id") UUID id) {
        Optional<ListModel> listO = listRepository.findById(id);
        if(listO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("List not found.");
        }
        listRepository.delete(listO.get());
        return ResponseEntity.status(HttpStatus.OK).body("List deleted successfully.");
    }
}
