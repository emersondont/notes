package com.example.backendnotes.dtos;

import jakarta.validation.constraints.NotBlank;

public record ListRecordDto(@NotBlank String name) {
}
