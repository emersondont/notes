import { updateNote } from "@/services/noteService"
import { NoteType } from "@/types"
import { UUID } from "crypto"
import { Square, CheckSquare, CaretDown, TrashSimple } from 'phosphor-react'
import { useContext, useEffect, useRef, useState } from "react"
import Button from "./button"
import { AppContext } from "@/context/appContext"

interface Props {
	note: NoteType
	idList: UUID
	handleDeleteNote: (idNote: UUID) => void
}

export default function NoteCard(props: Props) {
	const [name, setName] = useState(props.note.name)
	const [description, setDescription] = useState(props.note.description ? props.note.description : '')
	const [date, setDate] = useState(
		props.note.date ?
			props.note.date.split('T')[0] :
			''
	)
	const [isChecked, setIsChecked] = useState(props.note.isChecked)
	const [openOptions, setOpenOptions] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null);
	const { hideCompleted } = useContext(AppContext);

	const handleUpdateDescription = async () => {
		if (props.note.description != description) {
			const updatedNote: NoteType = { ...props.note };
			updatedNote.description = description;

			await updateNote(updatedNote);
		}
	}

	const handleCheckNote = async () => {
		const updatedIsChecked = !isChecked
		const updatedNote: NoteType = { ...props.note };

		updatedNote.isChecked = updatedIsChecked;

		await updateNote(updatedNote);
		setIsChecked(updatedIsChecked)
	}

	const handleOnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code == 'Escape') {
			setName(props.note.name)
			inputRef.current?.blur()
		}
		else if (e.code == 'Enter') {
			const updatedNote: NoteType = { ...props.note };
			updatedNote.name = name;

			await updateNote(updatedNote);

			inputRef.current?.blur()
		}
	}

	const handleOpenOptions = () => {
		setOpenOptions(!openOptions)
	}

	const handleDeleteList = async () => {
		await props.handleDeleteNote(props.note.idNote)
	}

	useEffect(() => {
		const handleUpdateDate = async () => {
			if ((!props.note.date && date) || (props.note.date != date)) {
				const updatedNote: NoteType = { ...props.note };
				updatedNote.date = date;

				await updateNote(updatedNote);
			}
		};

		handleUpdateDate();
	}, [date]);

	return (
		(hideCompleted && !isChecked) || !hideCompleted ? (
			<div className="w-2/3 bg-primary rounded-lg p-2 flex flex-col gap-3 shadow-md">
				<div className={`flex gap-1 text-text2 items-center ${isChecked ? 'text-opacity-50' : 'text-opacity-100'} duration-200 ease-out`}>
					<Button onClick={() => { handleCheckNote() }}>
						{
							isChecked ?
								<CheckSquare size={24} /> :
								<Square size={24} />
						}

					</Button>

					<input
						type="text"
						ref={inputRef}
						className={`w-full bg-transparent border-2 border-transparent rounded px-1 text-base
                    focus:outline-none focus:border-text2 ${isChecked && 'line-through'}
										duration-200 ease-out hover:border-secondary`}
						value={name as string}
						onChange={(e) => setName(e.target.value)}
						onKeyDown={(e) => handleOnKeyDown(e)}
					/>

					<Button onClick={handleOpenOptions} >
						<CaretDown
							size={24}
							className={`${openOptions && 'rotate-180'}`}
						/>
					</Button>

				</div>
				{
					openOptions &&
					<div className="flex gap-6 text-text w-full justify-between">
						{/* description */}
						<div className="w-full">
							<label
								htmlFor="description"
								className="text-sm"
							>
								Descrição:
							</label>
							<textarea
								id="description"
								value={description as string}
								onChange={(e) => setDescription(e.target.value)}
								onBlur={handleUpdateDescription}
								className="w-full bg-secondary focus:outline-none text-text2 rounded-md min-h-32 p-1"
							/>
						</div>

						{/* date and button delete */}
						<div className="flex flex-col justify-between items-end">
							{/* date */}
							<div className="w-full">
								<label
									htmlFor="date"
									className="text-sm"
								>
									Data de conclusão:
								</label>
								<input
									type="date"
									id="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
									className="w-full bg-secondary focus:outline-none text-text2 rounded-md p-1 flex"
								/>
							</div>

							{/* button delete */}
							<Button
								className='text-red-500'
								onClick={handleDeleteList}
							>
								<span>Apagar</span>
								<TrashSimple size={24} />
							</Button>
						</div>
					</div>
				}
			</div>
		) :
			null
	)
}