'use client'
import { useEffect } from "react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { getUsers } from "@/services/api";
import { useUserStore } from "../../store/userStorage";

export default function TablePaginator() {
    const { stateFilter, searchFilter, rows, page, totalRecords, setPage, setRows, setTotalRecords, setUsers } = useUserStore()
    const users = useUserStore((state) => state.users);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsers();
            setTotalRecords(data.length);
            return;
        };
        if (stateFilter === 'select' && searchFilter === '') {
            fetchData();
        }
    }, [stateFilter, searchFilter]);


    //Logica para cuando cambia de página con el paginador
    const onPageChange = (event: any) => {
        setPage(event.page + 1);
        setRows(event.rows);
    };

    return (
        <div className="card">
            <Paginator className='mt-4'
                rows={rows}
                first={(page - 1) * rows}
                rowsPerPageOptions={[5, 10]}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
            />
        </div>
    );
}