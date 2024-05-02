import { AppContext } from '@/context/appContext';
import { getAllLists } from '@/services/listService';
import { ListType } from '@/types';
import { ReactNode, useContext, useEffect } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const { setLists } = useContext(AppContext);

  useEffect(() => {
    const fetchLists = async () => {
      const lists: ListType[] = await getAllLists();
      setLists(lists);
    };

    fetchLists();
  }, [setLists]);

  return (
    <main className="p-9 font-Inter h-screen">
      {children}
    </main>
  );
};
