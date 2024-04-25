package com.example.backendnotes.repositories;

import com.example.backendnotes.models.NoteModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NoteRepository extends JpaRepository<NoteModel, UUID>  {
}
