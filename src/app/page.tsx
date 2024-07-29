import Table from "../components/Layout/Table";
import SidebarComponent from "../components/Layout/Sidebar";
import HeaderComponent from "../components/Layout/Header";
import { Button } from "primereact/button";
import Modal from "../components/customs/modal";
import LateralIcons from "../components/Layout/lateralcons";


export default function Home() {


  return (
    <div className="">
      <HeaderComponent />
      <LateralIcons />
      <div className="main-content" style={{ marginLeft: '4rem' }}>
        <div className="flex justify-content-between flex-wrap">
          <h1 className="ml-2">Usuarios</h1>
          <Modal />
        </div>
        <Table />
      </div>
    </div>
  );
}
