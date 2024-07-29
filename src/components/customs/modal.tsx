'use client'
import { useState, useRef, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { User } from '../../interface/UserInterface';
import { createUser, deleteUser, updateUser } from "../../services/api";
import { Toast, ToastMessage } from 'primereact/toast';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useUserStore } from "../../store/userStorage";
import { useModalStore } from "@/store/modalStorage";
import { classNames } from "primereact/utils";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";


interface IFormInput {
    id: string,
    usuario: string,
    estado: string,
    sector: number
}

export default function Modal() {
    const { selectedUser, visible, isEditing, setSelectedUser, setVisible, setIsEditing } = useModalStore();
    const { setUsers, removeUser } = useUserStore();
    const initialValues: User = { id: '', usuario: '', estado: '', sector: 0 };
    const toastTopLeft = useRef<Toast>(null);

    const { control, handleSubmit, reset, } = useForm({
        defaultValues: selectedUser || initialValues
    })

    //-------------------aseguro que se resetee el form-------------------
    useEffect(() => {
        if (visible) {
            reset(selectedUser || initialValues);
        }
    }, [visible, selectedUser, reset]);

    const deleteUsers = async () => {
        try {
            deleteUser(selectedUser?.id as string)
            removeUser(selectedUser?.id as string)
            setVisible(false)
            reset(initialValues);
            toastTopLeft.current?.show({ severity: 'warn', summary: ' Éxito!', detail: 'Usuario eliminado correctamente', life: 3000 });
        } catch (error) {
            console.error("error al eliminar el registro")
            toastTopLeft.current?.show({ severity: 'error', summary: ' Error!', detail: 'Error al eliminar usuario', life: 3000 });

        }
    }
    const confirmDelete = (event: React.MouseEvent) => {
        event.preventDefault();
        confirmPopup({
            message: '¿Estás seguro de que deseas eliminar este usuario?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteUsers(),
            reject: () => { setVisible(false) },
        })
    }

    const onCancel = (event: React.MouseEvent) => {
        event.preventDefault();
        setSelectedUser(null as any);
        setVisible(false);
        reset(initialValues);
    }


    const onSubmit: SubmitHandler<IFormInput> = async (values: User) => {
        let user = values;
        user.usuario = values.usuario.toUpperCase();
        user.id = values.id.toString();
        try {
            //CONDICIÓN PARA DETERMINAR SI VOY A EDITAR O NO
            if (isEditing) {
                // console.log(values)
                await updateUser(user)
                toastTopLeft.current?.show({ severity: 'success', summary: ' Éxito!', detail: 'Usuario editado correctamente', life: 3000 });
            } else {
                // console.log(values)
                await createUser(user);
                toastTopLeft.current?.show({ severity: 'success', summary: '!Éxito', detail: 'Usuario creado correctamente', life: 3000 });
            }
            setVisible(false);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            // setVisible(false);
            toastTopLeft.current?.show({ severity: 'error', summary: ' Error!', detail: 'Error al crear o editar usuario', life: 3000 });
        }
    }

    const modal = (
        <div className="h-3rem flex flex-wrap justify-content-between">
            <p className="ml-1 mt-2">Usuario</p>
            <Button icon="pi pi-cog"
                disabled
                className="mt-2 text-white p-button-rounded p-button-text align-items-center gap-2"
            />
        </div>
    )

    return (
        <div className="">
            <Toast ref={toastTopLeft} position="top-left" />
            <ConfirmPopup />
            <Button
                icon="pi pi-check"
                className="mr-4 justify-content-center 
                    mt-2 p-2
                    border-round-md hover:bg-blue-800
                    md:
                "
                style={{ backgroundColor: '#0763E7' }}
                label=" Usuario nuevo"
                onClick={() => {
                    setSelectedUser(initialValues);
                    setVisible(true);
                    setIsEditing(false);
                    // reset()
                }}
            />
            <Dialog
                position="center"
                style={{ backgroundColor: '#0763E7', border: 'none', color: '#fff', width: '541px' }}
                closeIcon="pi pi-minus mb-4 p-2 bg-blue-500"
                headerClassName="bg-primary-500 flex vertical-align-middle h-3rem text-white"
                visible={visible} header={modal}
                onHide={() => { setSelectedUser(null as any); setVisible(false); reset() }}
            >

                <form
                    id="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="p-field mt-3">
                        <label htmlFor="id">ID:</label>
                        {/* --------------- EL ID NO SE MODIFICA CUANDO EDITAMOS EL USUARIO, ID ÚNICO --------------*/}
                        <Controller
                            name="id"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="w-full p-2 border-solid surface-border mt-1 text-600"
                                    placeholder="ID"
                                    type="number"
                                    maxLength={15}
                                    required
                                    disabled={isEditing}

                                />
                            )}
                        />
                    </div>
                    <div className="p-field mt-3">
                        <label htmlFor="usuario">Nombre:</label>
                        <Controller
                            name="usuario"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="w-full p-2 border-solid surface-border mt-1 text-600"
                                    placeholder="Usuario"
                                    type="text"
                                    maxLength={15}
                                    required
                                />
                            )}
                        />
                    </div>
                    <div className="p-field mt-3">
                        <label htmlFor="estado">Estado:</label>
                        <Controller
                            name="estado"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className='w-full p-2 surface-border mt-1 text-600'
                                    required
                                >
                                    <option value="" disabled defaultValue={'Selecciona el Estado'}>Selecciona el Estado</option>
                                    <option value="ACTIVO">Activo</option>
                                    <option value="INACTIVO">Inactivo</option>
                                </select>
                            )}
                        />
                    </div>
                    <div className="p-field mt-3">
                        <label htmlFor="sector">Sector:</label>
                        <Controller
                            name="sector"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="w-full p-2 surface-border mt-1 text-600"
                                    required
                                >
                                    <option value={0} defaultValue={'selecciona el sector'} disabled>Selecciona el Sector</option>
                                    <option value={1000}>1000</option>
                                    <option value={2000}>2000</option>
                                </select>
                            )}
                        />
                    </div>
                    <div className="flex justify-content-center mt-5">
                        <Button
                            icon="pi pi-check"
                            className="p-2 border-round w-3"
                            style={{ backgroundColor: '#0763E7' }}
                            type="submit"
                            label={isEditing ? 'Editar' : 'Confirmar'}
                        />
                        <Button
                            icon="pi pi-times"
                            className="p-2 border-round w-3 ml-1 bg-white text-blue-500"
                            label={isEditing ? 'Eliminar' : 'Cancelar'}
                            // text
                            onClick={isEditing ? confirmDelete : onCancel}
                        />
                    </div>
                </form>
            </Dialog>

        </div>

    )
}