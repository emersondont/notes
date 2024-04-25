package com.example.backendnotes.dtos;

import com.example.backendnotes.models.ListModel;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public record NoteRecordDto(@NotBlank String name, Boolean isChecked, String description, Date date) {
}
