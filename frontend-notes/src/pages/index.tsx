import { useContext } from "react";
import { useRouter } from "next/router";
import { Plus } from 'phosphor-react'
import { UUID } from "crypto";
import { createList, deleteList, renameList } from "@/services/listService";
import { AppContext } from "@/context/appContext";
import ListCard from "@/components/listCard";

export default function Home() {
	const { lists, setLists } = useContext(AppContext)
	const router = useRouter();

	const handleNewList = async () => {
		try {
			const data = await createList(`Nova lista ${lists.length + 1}`);
			setLists([...lists, data]);

			router.push({
				pathname: '/list',
				query: {
					idList: data.idList
				}
			});
		} catch (error) {
			console.error('Erro ao criar nova lista:', error);
			window.alert('Erro ao criar nova lista.')
		}
	};

	const handleDeleteList = async (idList: UUID) => {
		try {
			await deleteList(idList);
			const updatedLists = lists.filter(list => list.idList !== idList);
			setLists(updatedLists);
		} catch (error) {
			console.error('Erro ao deletar lista:', error);
			window.alert('Erro ao deletar lista.')
		}
	};

	const handleRenameList = async (idList: UUID, name: String) => {
		try {
			await renameList(idList, name);
			setLists((prevLists) =>
				prevLists.map((list) =>
					list.idList === idList ? { ...list, name: name } : list
				)
			);
		} catch (error) {
			console.error('Erro ao renomear lista:', error);
			window.alert('Erro ao renomear lista.')
		}
	};


	return (
		<div className="flex gap-3 flex-wrap">

			<button className="text-text w-48 h-48 bg-secondary rounded-xl justify-center items-center p-3 group"
				onClick={() => handleNewList()}
			>
				<div className="bg-primary inline-block p-3 rounded-full group-hover:scale-110 duration-200 ease-out">
					<Plus size={32} weight="bold" />
				</div>
				<p className="text-lg font-bold">Nova lista</p>
			</button>

			{lists.map((list) => (
				<ListCard
					key={list.idList}
					list={list}
					handleDeleteList={handleDeleteList}
					handleRenameList={handleRenameList}
				/>
			))}
		</div>
	);
}
