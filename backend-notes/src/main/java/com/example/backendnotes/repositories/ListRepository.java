package com.example.backendnotes.repositories;

import com.example.backendnotes.models.ListModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ListRepository extends JpaRepository<ListModel, UUID>  {
}
