'use client'
import { useState } from "react"
import { Button } from "primereact/button"

export default function ButtonModal(visible: boolean) {
    // const [visible, setVisible] = useState<boolean>(false)

    return(
        <Button 
                icon="pi pi-check" 
                className="mr-4 justify-content-center mt-2 p-2 bg-blue-600 border-round-md hover:bg-blue-800" 
                label=" Usuario nuevo"
                onClick={()=> visible}
        />
    )
}