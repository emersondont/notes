package com.example.backendnotes.models;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "TD_LISTS")

public class ListModel extends RepresentationModel<ListModel> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idList;
    private String name;

    @OneToMany(mappedBy = "list", cascade = CascadeType.ALL)
    private List<NoteModel> notes;

    public UUID getIdList() {
        return idList;
    }

    public void setIdList(UUID idList) {
        this.idList = idList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<NoteModel> getNotes() {
        return notes;
    }

    public void setNotes(List<NoteModel> notes) {
        this.notes = notes;
    }
}
