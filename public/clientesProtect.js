document.addEventListener('DOMContentLoaded', () => {
    const registrar = document.querySelector('#formCliente')
    registrar.addEventListener('submit', async(e) => {
        e.preventDefault()
        const id_cliente = e.target.id_cliente.value
        const nombre_1 = e.target.primer_nombre.value
        const nombre_2 = e.target.segundo_nombre.value
        const apellido_1 = e.target.primer_apellido.value
        const apellido_2 = e.target.segundo_apellido.value
        const telefono_1 = e.target.telefono_1.value
        const telefono_2 = e.target.telefono_2.value
        const email = e.target.email.value
        const edad = e.target.edad.value
        const numero_pasaporte = e.target.pte.value
    
        try{
            const {data} = await axios.post('/api/v1/client/create', {
                id_cliente, nombre_1, nombre_2, apellido_1, apellido_2, telefono_1, telefono_2, email, edad, numero_pasaporte
            });
            registrar.reset()
            Swal.fire({
                title: '¡Cliente creado con éxito!',
                text: 'El cliente ha sido creado con éxito',
                icon: 'success'
            })
        }catch(error){
            if(error.response){
                console.error('Error de respuesta del servidor:', error.response.data);
                Swal.fire({
                    title: 'Error',
                    text: 'El cliente no ha sido creado',
                    icon: 'error'
                })
            }else if(error.request){
                console.error('Error de solicitud:', error.request);
                Swal.fire({
                    title: 'Error',
                    text: 'El cliente no ha sido creado',
                    icon: 'error'
                })
            }else{
                console.error('Error en la solicitud:', error.message);
                Swal.fire({
                    title: 'Error',
                    text: 'El cliente no ha sido creado',
                    icon: 'error'
                })
            }
    
        }
    
    })
    
    async function cargarClientes(){
        try{
        const tableBody = document.getElementById('clientesTBd')
        const response = await axios.get('/api/v1/client/list')
        const clientes = response.data
        console.log(clientes);
        tableBody.innerHTML = '';
        clientes.forEach(cliente => {
            if (!cliente.hasOwnProperty('estado')) { 
                console.warn(`El cliente con ID ${cliente.id_cliente} no tiene la propiedad 'estado'`); 
            } 
            else { 
                console.log('Cliente estado:', cliente.estado); 
            }
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${cliente.id_cliente}</td>
                <td>${cliente.nombre_1}</td>
                <td>${cliente.nombre_2}</td>
                <td>${cliente.apellido_1}</td>
                <td>${cliente.apellido_2}</td>
                <td>${cliente.telefono_1}</td>
                <td>${cliente.telefono_2}</td>
                <td>${cliente.email}</td>
                <td>${cliente.edad}</td>
                <td>${cliente.numero_pasaporte}</td>
                <td>
                <div class="d-flex flex-column mb-3">
               
                    <button class="btn btn-primary" onclick="editarCliente('${cliente.id_cliente}')">Actualizar</button>
                    <button class="btn btn-danger mt-1" onclick="cambiarEstado('${cliente.id_cliente}')">Inhabilitar</button>
                    <button class="btn btn-danger mt-1" onclick="eliminarCliente('${cliente.id_cliente}')">Eliminar</button>
                    </div>
                </td>
                <td>${cliente.estado}</td>
            `;
            
            tableBody.appendChild(row)
        });
        }catch(error){
            console.error('Error al cargar clientes:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'No se han podido cargar los clientes',
                icon: 'error'
            })
        }
    }
    
    async function editarCliente(id_cliente){
        const token = localStorage.getItem('token')
        const cliente = await axios.get(`/api/v1/client/${id_cliente}`)
    
        let primer_nombre = prompt('Nuevo nombre') || cliente.nombre_1
        let segundo_nombre = prompt('Nuevo nombre') || cliente.nombre_2
        let primer_apellido =  prompt('Nuevo apellido') || cliente.apellido_1
        let segundo_apellido = prompt('Nuevo apellido') || cliente.apellido_2
        let telefono_uno = prompt('Nuevo telefono') || cliente.telefono_1
        let telefono_dos = prompt('Nuevo telefono') || cliente.telefono_2
        let correo_electronico = prompt('Nuevo email') || cliente.email
        let edad_cliente = prompt('Nueva edad') || cliente.edad
        let pasaporte = prompt('Nuevo numero pasaporte') || cliente.numero_pasaporte
    
        const updateFields = {
            nombre_1: primer_nombre,
            nombre_2: segundo_nombre,
            apellido_1: primer_apellido,
            apellido_2: segundo_apellido,
            telefono_1: telefono_uno,
            telefono_2: telefono_dos,
            email: correo_electronico,
            edad: edad_cliente,
            numero_pasaporte: pasaporte       
        }
        try{
            const clienteUpdated = await axios.patch(`/api/v1/client/update/${id_cliente}`, updateFields, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("cliente actualizado");
            Swal.fire({
                title: 'Cliente actualizado',
                text: 'El cliente ha sido actualizado correctamente',
                icon: 'success'
            })
          
           
        }catch(error){
            console.error('Error al editar cliente:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido editar el cliente',
                icon: 'error'
            })
        } 
    }

    async function cambiarEstado(id_cliente){
        const token = localStorage.getItem('token')
        const estado = prompt('ingrese el nuevo estado del cliente')
        try{
            const cliente = await axios.patch(`/api/v1/client/updateState/${id_cliente}`, {
                estado: estado
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("cliente actualizado");
            Swal.fire({
                title: 'Cliente actualizado',
                text: 'El cliente ha sido actualizado correctamente',
                icon: 'success'
            })
        }catch(error){
            console.error('Error al editar cliente:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido editar el cliente',
                icon: 'error'
            })
        }
       

    }

    async function eliminarCliente(id_cliente){
        const token = localStorage.getItem('token')
        try{
            const cliente = await axios.delete(`/api/v1/client/delete/${id_cliente}`)
            console.log("cliente eliminado");
            Swal.fire({
                title: 'Cliente eliminado',
                text: 'El cliente ha sido eliminado correctamente',
                icon: 'success'
            })
        }catch(error){
            console.error('Error al eliminar cliente:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'No se ha podido eliminar el cliente',
                icon: 'error'
            })
        }
    }


    cargarClientes()
    window.cargarClientes = cargarClientes;
    window.editarCliente = editarCliente;
    window.cambiarEstado = cambiarEstado;
    window.eliminarCliente = eliminarCliente;

    });