'use client'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import TablePaginator from './TablePaginator';

import { useUserStore } from '@/store/userStorage';
import { useModalStore } from '@/store/modalStorage';
import { User } from '../../interface/UserInterface';

import useDebounce from '@/hooks/useDebounce'

export default function TableContent() {
    //ESTADO DE USUARIO CON LIMIT Y PAGE
    const [input, setInput] = useState<string>('');
    const debouncedValue = useDebounce<string>(input, 1000);

    const [usersWithLimit, setusersWithLimits] = useState<User[]>([]);
    // const [totalRecords, setTotalRecords] = useState<number>(0);
    const { totalRecords ,users ,rows, page, searchFilter, stateFilter, 
        setSearchFilter, setPage, setRows, setUsers, setStateFilter, setTotalRecords} 
    = useUserStore();
    const { setVisible, setSelectedUser, setIsEditing, isEditing, selectedUser } = useModalStore();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchUsers();
    }, [page, rows, stateFilter, searchFilter]);


    //Llamado a la API para traer solo los elementos que se necesitan para la paginación
    const fetchUsers = async () => {
        try {
            let url: string = `${process.env.NEXT_PUBLIC_API_KEY}?`
            if(searchFilter !== ''){
                url += `&usuario=${searchFilter}`;
            }
            if(stateFilter !== 'select'){
                url += `&estado=${stateFilter}`;
            }
            let response = await axios.get(url);
            setTotalRecords(response.data.length)

            url += `&_limit=${rows}&_page=${page}`
            console.log({url})
            response = await axios.get(url);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        if (debouncedValue || debouncedValue === '') {
            setSearchFilter(debouncedValue.toUpperCase().trim());
        }
    }, [debouncedValue]);

    const onClickUser = (e: React.MouseEvent<HTMLAnchorElement>, rowData: any) => {
        e.preventDefault();
        setIsEditing(true);
        setVisible(true);
        setSelectedUser(rowData);
    }

    const filterState = (value: string) => {
        setStateFilter(value)
    }
    
    const statusOptions = [
        { label: 'Selecciona un Estado', value: 'select' },
        { label: 'Activo', value: 'ACTIVO' },
        { label: 'Inactivo', value: 'INACTIVO' },
    ];



    //BUSCADORES DEL HEADER DE LA TABLA
    const renderHeader = () => {
        return (
            <div className="md:flex md:gap-2">
                <IconField iconPosition='left' className='w-full'>
                    <InputIcon className="pi pi-search" > </InputIcon>
                    <InputText
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Buscar usuario"
                        className='w-full'
                        style={{ minWidth: '12rem' }}

                    />
                </IconField>
                <Dropdown
                    value={stateFilter}
                    options={statusOptions}
                    onChange={(e: DropdownChangeEvent) => filterState(e.value)}
                    placeholder="Selecciona un Estado"
                    className="mr-2 w-full hidden md:flex"
                />
                <Dropdown
                    value={statusOptions}
                    options={statusOptions}
                    disabled
                    // onChange={(e: DropdownChangeEvent) => statusOptions.filterApplyCallback(e.value)}
                    placeholder="Selecciona un Sector"
                    className="mr-2 w-3 hidden lg:flex"
                />
                <div className='hidden lg:flex'>
                    <i className='pi pi-filter ml-2 bg-gray-700 w-3rem flex flex-wrap justify-content-center align-content-center text-white border-round-sm'></i>
                    <i className='pi pi-sliders-v ml-2 border bg-gray-700 w-3rem flex flex-wrap justify-content-center align-content-center text-white border-round-sm'></i>
                </div>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <section className='w-full h-full flex flex-column'>
            <div className="card">
                <div className='px-2 mt-2'>
                    <DataTable
                        header={header}
                        value={users}
                        tableStyle={{ minWidth: '50rem' }}
                        totalRecords={rows}
                        dataKey='id'
                        emptyMessage="No se encontraron usuarios."
                    >
                        <Column field="id" headerClassName='font-bold' header="Id" sortable style={{ width: '25%'}}></Column>
                        <Column field="usuario"
                            className='text-blue-600 font-bold underline' header="Usuario"
                            sortable style={{ width: '25%' , fontWeight: 'bold' }}
                            body={(rowData: User) => <a onClick={(e) => { onClickUser(e, rowData) }} >{rowData.usuario}</a>}
                        >
                        </Column>
                        <Column field="estado" headerClassName='font-bold' header="Estado" sortable style={{ width: '25%' }}></Column>
                        <Column field="sector" headerClassName='font-bold'  header="Sector" sortable style={{ width: '25%' }}></Column>
                        {/* <Column body={actionBodyTemplate} header="Acciones" style={{ width: '10%' }}></Column> */}
                    </DataTable>
                </div>
            </div>
        </section>
    );
}