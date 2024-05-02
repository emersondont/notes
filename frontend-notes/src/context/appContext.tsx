import React, { createContext, useState } from 'react';
import { ListType } from '@/types';
import { getAllLists } from '@/services/listService';

interface AppContextType {
	lists: ListType[];
	setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
	hideCompleted: Boolean;
	setHidecompleted: React.Dispatch<React.SetStateAction<Boolean>>;
	updateLists: () => void
}

const initialContext: AppContextType = {
	lists: [],
	setLists: () => { },
	hideCompleted: false,
	setHidecompleted: () => { },
	updateLists: () => { }
}

export const AppContext = createContext<AppContextType>(initialContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [lists, setLists] = useState(initialContext.lists);
	const [hideCompleted, setHidecompleted] = useState(initialContext.hideCompleted);

	const updateLists = async () => { setLists(await getAllLists())}

	return (
		<AppContext.Provider value={{ lists, setLists, hideCompleted, setHidecompleted, updateLists }}>
			{children}
		</AppContext.Provider>
	);
};