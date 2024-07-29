'use client'
import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

const SidebarComponent = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const items = [
        {label: 'Usuarios', icon: 'pi pi-fw pi-users'},
    ];

    return (
        <div className='grid'>
            <div className='col-1 bg-gray-800'>
                <Button icon="pi pi-cog" className="text-white p-button-rounded p-button-text align-items-center gap-2" />
            </div>
        </div>
    );
};

export default SidebarComponent;