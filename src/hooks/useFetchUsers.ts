import { useEffect } from 'react';
import { useUserStore } from '../store/userStorage';
import { getUsers } from '../services/api';

export const useFetchUsers = () => {
  const setUsers = useUserStore((state) => state.setUsers);

  useEffect(() => {   
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);
      return
    };
    fetchData();
  }, [setUsers]);
};