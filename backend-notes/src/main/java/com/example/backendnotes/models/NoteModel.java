package com.example.backendnotes.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "TD_NOTES")

public class NoteModel extends RepresentationModel<NoteModel> implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idNote;
    private String name;
    private Boolean isChecked;
    private String description;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "list_id")
    @JsonIgnore
    private ListModel list;

    public UUID getIdNote() {
        return idNote;
    }

    public void setIdNote(UUID idList) {
        this.idNote = idList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean getIsChecked() {
        return isChecked;
    }

    public void setIsChecked(Boolean isChecked) {
        this.isChecked = isChecked;
    }

    public ListModel getList() {
        return list;
    }

    public void setList(ListModel list) {
        this.list = list;
    }
}
