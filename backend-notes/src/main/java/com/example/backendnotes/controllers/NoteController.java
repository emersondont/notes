package com.example.backendnotes.controllers;

import com.example.backendnotes.dtos.ListRecordDto;
import com.example.backendnotes.dtos.NoteRecordDto;
import com.example.backendnotes.models.ListModel;
import com.example.backendnotes.models.NoteModel;
import com.example.backendnotes.repositories.ListRepository;
import com.example.backendnotes.repositories.NoteRepository;
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
public class NoteController {

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    ListRepository listRepository;

    @PostMapping("/lists/{id}/notes")
    public ResponseEntity<Object> saveNote(@PathVariable(value = "id") UUID listId,
                                           @RequestBody @Valid NoteRecordDto noteRecordDto) {
        Optional<ListModel> optionalList = listRepository.findById(listId);
        if (optionalList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("List not found.");
        }

        NoteModel noteModel = new NoteModel();
        BeanUtils.copyProperties(noteRecordDto, noteModel);
        noteModel.setList(optionalList.get());
        noteModel.setIsChecked(false);
        return ResponseEntity.status(HttpStatus.CREATED).body(noteRepository.save(noteModel));
    }

    @GetMapping("/lists/{id}/notes")
    public ResponseEntity<Object> getAllNotesForList(@PathVariable(value = "id") UUID listId) {
        Optional<ListModel> listO = listRepository.findById(listId);
        if(listO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("List not found.");
        }

        List<NoteModel> notesList = listO.get().getNotes();
        if(!notesList.isEmpty()) {
            for(NoteModel note : notesList) {
                UUID id = note.getIdNote();
                note.add(linkTo(methodOn(ListController.class).getOneList(id)).withSelfRel());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(notesList);
    }

    @GetMapping("/notes/{id}")
    public ResponseEntity<Object> getOneNote(@PathVariable(value = "id") UUID noteId) {
        Optional<NoteModel> noteO = noteRepository.findById(noteId);
        if(noteO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found.");
        }

        noteO.get().add(linkTo(methodOn(NoteController.class).getAllNotesForList(noteId)).withRel("Lists"));
        return ResponseEntity.status(HttpStatus.OK).body(noteO.get());
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<Object> updateNote(@PathVariable(value = "id") UUID id,
                                             @RequestBody @Valid NoteRecordDto noteRecordDto) {
        Optional<NoteModel> noteO = noteRepository.findById(id);
        if(noteO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found.");
        }
        var noteModel = noteO.get();
        BeanUtils.copyProperties(noteRecordDto, noteModel);
        return ResponseEntity.status(HttpStatus.OK).body(noteRepository.save(noteModel));
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Object> deleteNote(@PathVariable(value = "id") UUID id) {
        Optional<NoteModel> noteO = noteRepository.findById(id);
        if(noteO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Note not found.");
        }
        noteRepository.delete(noteO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Note deleted successfully.");
    }
}
