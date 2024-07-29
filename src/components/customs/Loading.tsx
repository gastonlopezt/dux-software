
export default function Loading(){
    return(
        <div className="flex flex-column">
            <div className="mt-2 flex flex-wrap justify-content-center">
                <i className="pi pi-spin pi-spinner ml-2 h-4rem" style={{ fontSize: '2rem' }}></i>
            </div>
            <p className="text-lg flex justify-content-center mt-2 align-items-center">Esperando registros...</p>
        </div>

    )
}