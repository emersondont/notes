"useServer"

import { UUID } from "crypto";
import { fetchAPI } from "./fetchAPI";
import { ListType, NoteType } from "@/types";

export const createNote = async (name: string, idList: UUID) => {

	const data = await fetchAPI(`lists/${idList}/notes`, {
		method: 'POST',

		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, description: '' })
	});

	return data.json();
}

export const updateNote = async (note: NoteType) => {
	const data = await fetchAPI(`notes/${note.idNote}`, {
		method: 'PUT',

		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note)
	});

	return data.json();
}

export const deleteNote = async (idNote: UUID) => {
	const data = await fetchAPI(`notes/${idNote}`, {
		method: 'DELETE',

		headers: {
			'Content-Type': 'application/json',
		}
	});

	return data;
}