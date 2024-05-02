import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router';
import { UUID } from "crypto";
import { DotsThree, PencilSimple, TrashSimple } from 'phosphor-react'
import { ListType } from "@/types";
import Button from "./button";

interface Props {
	list: ListType
	handleDeleteList: (idList: UUID) => void
	handleRenameList: (idList: UUID, name: String) => void
}

export default function ListCard(props: Props) {
	const [notes, setNotes] = useState(props.list.notes)
	const [percentage, setPercentage] = useState<number | string>(0)
	const [openModel, setOpenModel] = useState(false);
	const [name, setName] = useState(props.list.name)
	const [isEditing, setIsEditing] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const handleIsEditing = () => {
		setIsEditing(true)
		setOpenModel(false)
	}

	const handleOnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code == 'Escape') {
			setName(props.list.name)
			setIsEditing(false)
		}
		else if (e.code == 'Enter') {
			setIsEditing(false)
			props.handleRenameList(props.list.idList, name)
		}
	}

	const handleOpenList = () => {
		if (!isEditing)
			router.push({
				pathname: '/list',
				query: {
					idList: props.list.idList
				}
			});
	}

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
		}
		else {
			inputRef.current?.blur()
		}
	}, [isEditing]);

	useEffect(() => {
		if (notes && notes.length !== 0) {
			const p = ((notes.filter((note) => note.isChecked === true).length * 100) / notes.length).toFixed(1);
			setPercentage(p);
		} else {
			setPercentage(0);
		}
	}, [notes]);

	useEffect(() => {
		setNotes(props.list.notes);
	}, [props.list.notes]);

	return (
		<div onClick={handleOpenList}
			className='w-48 h-48 rounded-xl bg-primary text-text p-3 flex flex-col justify-between items-end cursor-pointer relative shadow-md'
		>
			<Button onClick={(e) => { e.stopPropagation(); setOpenModel(!openModel); }}>
				<DotsThree size={32} weight="bold" />
			</Button>

			{
				openModel &&
				<div className="flex flex-col bg-background rounded-lg w-40 p-1 gap-1 absolute top-14 left-32 z-10 shadow-md">
					<Button onClick={(e) => { e.stopPropagation(); handleIsEditing(); }}>
						<span>Editar</span>
						<PencilSimple size={24} />
					</Button>
					<Button onClick={(e) => { e.stopPropagation(); props.handleDeleteList(props.list.idList) }} className="text-red-500">
						<span>Apagar</span>
						<TrashSimple size={24} />
					</Button>
				</div>
			}

			<div className="gap-3 w-full">
				<input
					type="text"
					ref={inputRef}
					value={name as string}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={(e) => handleOnKeyDown(e)}
					disabled={!isEditing} // Desabilita o input se não estiver editando
					className="font-bold text-lg bg-transparent w-full border-2 border-transparent rounded
          focus:outline-none focus:border-text truncate"
				/>
				{/* barra de porcentagem */}
				<div className="flex items-center gap-1">
					<div className="w-full border-2 border-text rounded-full h-3">
						<div className="h-full bg-text rounded-full" style={{ width: percentage + '%' }}></div>
					</div>
					<p className="text-text">{percentage}%</p>
				</div>
			</div>
		</div>
	);
}
