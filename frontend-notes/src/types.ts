import { UUID } from "crypto";

export type NoteType = {
    idNote: UUID,
    name: String,
    isChecked: Boolean,
    description: String,
    date: String
}

export type ListType = {
    idList: UUID,
    name: String
    notes: NoteType[]
}