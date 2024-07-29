Proyecto de Gestión de Usuarios

Este proyecto es una aplicación web para la gestión de usuarios, que permite crear, editar, eliminar y listar usuarios. La aplicación está construida utilizando React, Next.js, TypeScript, PrimeReact y Zustand para el manejo del estado global.

Características Creación de Usuarios: Permite crear nuevos usuarios con campos de ID, nombre, estado y sector. 
Edición de Usuarios: Permite editar los detalles de usuarios existentes. Eliminación de Usuarios: Permite eliminar usuarios seleccionados. Listado de Usuarios: Muestra una tabla con todos los usuarios, con opciones de búsqueda y filtrado. Validación de Formularios: Utiliza react-hook-form para la validación de formularios. Cargas Diferidas: Utiliza React.lazy y Suspense para la carga diferida de componentes. Instalación Seguir estos pasos para instalar y ejecutar el proyecto localmente.

Pasos de Instalación Clona el repositorio: Copiar código git clone https://github.com/tu-usuario/nombre-del-repositorio.git Navega al directorio del proyecto: 
Copiar código cd nombre-del-repositorio Instala las dependencias: Copiar código npm install o si prefieres yarn: Copiar código yarn install. 
Crea un archivo .env.local en la raíz del proyecto y agrega tu clave de API: 
Copiar código NEXT_PUBLIC_API_KEY='COLOCAR EL URL DE LA API'. 
Inicia la aplicación: Copiar código npm run dev o con yarn: Copiar código yarn dev

Uso Modal de Usuarios El modal permite crear y editar usuarios. Se abre al hacer clic en el botón "Usuario nuevo" o al hacer clic en el nombre de un usuario en la tabla.

Tabla de Usuarios La tabla muestra todos los usuarios con opciones de búsqueda y filtrado. Puedes buscar usuarios por nombre y filtrar por estado.

Tecnologías Utilizadas React Next.js TypeScript PrimeReact Zustand Axios react-hook-form

Ten en cuenta que el proyecto solo permite la creación o edición de usuarios hacia el Sector 1000 como fue indicado en el mail
