import { Menubar } from 'primereact/menubar';
// import { Image } from 'primereact/image';
import Image from 'next/image';
import { Button } from 'primereact/button';
import logo from '../../assets/icons/dux_logo.png'

const HeaderComponent = () => {
  
    return (
            <div 
                className='h-3rem flex flex-wrap justify-content-between align-content-center w-screen'
                style={{ backgroundColor: '#0763E7', border: 'none', color: '#fff', width: '100%' }}
            >
                <Image alt='dux-logo' src={logo} className='ml-2' />
                <Button icon="pi pi-cog" className="text-white p-button-rounded p-button-text align-items-center " />
            </div>
    );
};

export default HeaderComponent;