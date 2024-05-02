"useServer"

import { UUID } from "crypto";
import { fetchAPI } from "./fetchAPI";
import { ListType } from "@/types";

export const getAllLists = async () => {
	const data = await fetchAPI('lists')
	return data.json()
}

export const createList = async (name: string) => {

	const data = await fetchAPI('lists', {
		method: 'POST',

		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name })
	});

	return data.json();
}

export const deleteList = async (idList: UUID) => {

	const data = await fetchAPI(`lists/${idList}`, {
		method: 'DELETE',

		headers: {
			'Content-Type': 'application/json',
		}
	});

	return data;
}

export const renameList = async (idList: UUID, name: String) => {
	const data = await fetchAPI(`lists/${idList}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name })
	})

	return data;
}

