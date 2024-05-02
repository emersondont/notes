import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Plus, Minus, ArrowLeft } from 'phosphor-react'
import { UUID } from "crypto";
import { createNote, deleteNote } from "@/services/noteService";
import { AppContext } from '@/context/appContext';
import NoteCard from "@/components/noteCard";
import Button from '@/components/button';

export default function List() {
	const router = useRouter();
	const { idList } = router.query;
	const { lists, updateLists, hideCompleted, setHidecompleted } = useContext(AppContext);
	const selectedList = lists.find((list) => list.idList === idList);
	const [notes, setNotes] = useState(selectedList?.notes)
	const [nameNewNote, setNameNewNote] = useState('')
	const [inputIsFocused, setInputIsFocused] = useState(false);


	const handleOnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code == 'Enter' && nameNewNote != '') {
			const newNote = await createNote(nameNewNote, idList as UUID)

			if (notes)
				setNotes([...notes, newNote])
			else
				setNotes([newNote])

			setNameNewNote('')
		}
	}

	const handleDeleteNote = async (idNote: UUID) => {
		const data = await deleteNote(idNote);
		const updatedNotes = notes?.filter(note => note.idNote !== idNote);

		setNotes(updatedNotes);
	}

	useEffect(() => {
		setNotes(selectedList?.notes)
	}, [lists])

	return (
		<>
			<Button className="fixed text-text2" onClick={() => {updateLists(); router.back()}}>
				<ArrowLeft size={28} />
			</Button>

			<div className="flex gap-3 flex-col h-full items-center justify-between">

				{/* input new note and notes */}
				<div className="flex gap-3 flex-col items-center w-full">

					<div className={`w-2/3 bg-primary rounded-lg px-3 py-2 flex gap-3 text-text2 items-center 
                text-opacity-${inputIsFocused ? '100' : '50'} duration-200 ease-out shadow-md
                `}>
						<Plus size={24} />

						<input
							type="text"
							className="w-full bg-transparent px-1 text-base focus:outline-none placeholder:text-opacity-50"
							placeholder="Nova Tarefa..."
							value={nameNewNote as string}
							onChange={(e) => setNameNewNote(e.target.value)}
							onFocus={() => { setInputIsFocused(true) }}
							onBlur={() => { setInputIsFocused(false) }}
							onKeyDown={(e) => handleOnKeyDown(e)}
						/>
					</div>

					<div
						className="flex gap-3 flex-col items-center overflow-y-auto w-full"
						style={{ maxHeight: 'calc(100vh - 11rem)' }}
					>
						{notes?.map((note) => (
							<NoteCard
								key={note.idNote}
								note={note}
								idList={idList as UUID}
								handleDeleteNote={handleDeleteNote}
							/>
						))}
					</div>

				</div>

				{/* hide/show completed note */}
				<Button className="text-text2" onClick={(e) => setHidecompleted(!hideCompleted)}>
					{
						hideCompleted ?
							<>
								<Plus size={20} />
								<span>Mostrar Concluídas</span>
							</> :
							<>
								<Minus size={20} />
								<span>Ocultar Concluídas</span>
							</>
					}
				</Button>
			</div>
		</>
	)
}