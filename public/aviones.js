document.addEventListener('DOMContentLoaded', () => {
const register = document.querySelector('#formAviones')
register.addEventListener('submit', async(e) => {
    e.preventDefault()
    const id_avion = e.target.id_avion.value
    const modelo = e.target.modelo.value
    const fabricante = e.target.fabricante.value
    const capacidad_pasajeros = e.target.capacidad.value
    const anio_fabricacion = e.target.anio.value
    const descripcion = e.target.descripcion.value

    try{
        const response = await axios.post('/api/v1/aviones/create', {
            id_avion,
            modelo,
            fabricante,
            capacidad_pasajeros,
            anio_fabricacion,
            descripcion
        })
        console.log(response.data)
        Swal.fire({
            title: '¡Agregado!',
            text: 'El avión se ha creado correctamente',
            icon: 'success',
        })
    }catch(error){
        if(error.response){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data.message
            })
         }else if(error.request){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo conectar con el servidor'
            })
        
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al agregar el avion'
            })
        }
    }
});
async function verAviones(){
    try{
        const tableBody = document.getElementById('avionesTBd')
        const response = await axios.get('/api/v1/aviones/list')
        const aviones = response.data
        tableBody.innerHTML = ` `
        aviones.forEach(avion => {
            const row = document.createElement('tr')
            row.innerHTML = `
            <td>${avion.id_avion}</td>
            <td>${avion.modelo}</td>
            <td>${avion.fabricante}</td>
            <td>${avion.capacidad_pasajeros}</td>
            <td>${avion.anio_fabricacion}</td>
            <td>${avion.estado}</td>
            <td>${avion.descripcion}</td>
            <td><button class="btn btn-primary" onclick="editarAvion(${avion.id})">Editar</button></td>
            <td><button class="btn btn-danger" onclick="eliminarAvion(${avion.id})">Eliminat</button></td>
            `;
            tableBody.appendChild(row)
        });
    }catch(error){
        console.error('Error al cargar aviones:', error.message);
        Swal.fire({
            title: 'Error',
            text: 'No se han podido cargar los aviones',
            icon: 'error'
        })
    }
}
verAviones()
window.verAviones = verAviones;
})