<template>
    <div>
        <div class="mt-3">
            <h4 class="text-start">Registro de clientes</h4>

            <div class="text-start my-4">
                <button class="btn text-primary" @click.prevent="nuevoCliente()">
                    Nuevo Cliente
                    <font-awesome-icon class="mx-2" icon="plus"></font-awesome-icon>
                </button>
            </div>
        </div>
        <!-- Buscar Cliente-->
        <div class="row g-2 align-items-center">
            <div class="col-auto">
                <label for="buscarCliente" class="col-form-label">Buscar Cliente:</label>
            </div>
            <div class="col-auto">
                <input
                    type="text"
                    class="form-control"
                    @input="buscarCliente()"
                    v-model="buscar.cedula"
                    placeholder="Numero de cedula"
                />
            </div>
        </div>

        <!-- Tabla de los Cleintes-->
        <div class="tabla mt-2">
            <table class="table">
                <thead>
                    <tr class="bg-dark text-white">
                        <th scope="col">#</th>
                        <th scope="col">Cedula</th>
                        <th scope="col">Nombre y Apellido</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientes" :key="cliente.id_cliente">
                        <th scope="row">{{ cliente.id_cliente }}</th>
                        <td scope="row">{{ cliente.cedula }}</td>
                        <td scope="row">{{ cliente.nombre_completo }}</td>
                        <td scope="row">{{ cliente.telefono }}</td>
                        <td scope="row">{{ cliente.direccion }}</td>
                        <th scope="row">
                            <button
                                class="btn text-primary"
                                @click.prevent="editarCliente(cliente)"
                            >
                                <font-awesome-icon icon="edit"></font-awesome-icon>Editar
                            </button>
                            <button
                                class="btn text-danger"
                                @click.prevent="eliminarCliente(cliente)"
                            >
                                <font-awesome-icon icon="trash"></font-awesome-icon>Eliminar
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
const urlCliente = "http://localhost/facturacion/apis/cliente.php"
export default {
    data() {
        return {
            clientes: {},
            buscar: {
                cedula: ''
            }
        };
    },
    created() {
        this.obtenerClientes();
    },
    methods: {
        async obtenerClientes() {
            const peticion = await fetch(
                urlCliente
            );
            const { clientes } = await peticion.json();
            this.clientes = clientes;
        },
        nuevoCliente() {
            this.$swal({
                html: `<h3>Registrar Cliente</h3>
            <input type="number" class="form-control mt-2" id="cedula"  placeholder="Cedula" >
            <input type="text" class="form-control mt-2" id="nombreCompleto" placeholder="Nombre completo" >
            <input type="number" class="form-control mt-2" id ="telefono" placeholder="Telefono" >
            <input type="text" class="form-control mt-2" id="direccion" placeholder="Dirección" >
        `,
                confirmButtonText: 'Registrar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const datos = {
                        cedula: document.getElementById('cedula').value,
                        nombre_completo: document.getElementById('nombreCompleto').value,
                        telefono: document.getElementById('telefono').value,
                        direccion: document.getElementById('direccion').value,
                    }
                    fetch(urlCliente, {
                        method: 'POST',
                        body: JSON.stringify(datos)
                    }).then(res => res.json()).then(data => {
                        if (data.registro == 'ok') {
                            this.$swal({
                                icons: 'success',
                                text: 'Cliente Registrado..'
                            })
                            this.obtenerClientes();
                        }
                    })

                }
            })
        },
        async editarCliente(cliente) {
            this.$swal({
                html: `<h3>Editar Cliente</h3>
            <input type="number" class="form-control mt-2" id="cedula" value = "${cliente.cedula}" placeholder="Cedula" >
            <input type="text" class="form-control mt-2" id="nombreCompleto"  value = "${cliente.nombre_completo}" placeholder="Nombre completo" >
            <input type="number" class="form-control mt-2" id ="telefono"  value = "${cliente.telefono}" placeholder="Telefono" >
            <input type="text" class="form-control mt-2" id="direccion"  value = "${cliente.direccion}" placeholder="Dirección" >
        `,
                background:'#aed6f1',
                confirmButtonText: 'EDITAR'
            }).then(result => {
                if (result.isConfirmed) {
                    const datos = {
                        id_cliente: cliente.id_cliente,
                        cedula: document.getElementById('cedula').value,
                        nombre_completo: document.getElementById('nombreCompleto').value,
                        telefono: document.getElementById('telefono').value,
                        direccion: document.getElementById('direccion').value,
                    }
                    fetch(urlCliente, {
                        method: 'POST',
                        body: JSON.stringify(datos)
                    }).then(res => res.json()).then(data => {

                        if (data.actualizado == 'ok') {
                            this.$swal({
                                toast: true,
                                icon: 'success',
                                position: 'top-end',
                                text: 'Cliente Actualizado..',
                                timerProgressBar: true,
                                showConfirmButton: false,
                                timer: 3000,
                            })
                            this.obtenerClientes();
                        }
                    })
                }
            })
        },
        async eliminarCliente(cliente) {
            this.$swal({
                title: '¿Esta seguro que desea eliminar?',
                text: 'esta operación es irreversible',
                icon: 'warning'
            }).then(result => {
                if (result.isConfirmed) {
                    const id = {
                        id_cliente: cliente.id_cliente
                    }
                    fetch(urlCliente, {
                        method: 'POST',
                        body: JSON.stringify(id)
                    }).then(res => res.json()).then(resp => {
                        if (resp.eliminado = "ok") {
                            this.$swal({
                                toast: true,
                                icon: 'success',
                                position: 'top-end',
                                text: 'Cliente Eliminado..',
                                timerProgressBar: true,
                                showConfirmButton: false,
                                timer: 3000,
                            })
                            this.obtenerClientes();
                        }
                    })

                }
            })
        },
        async buscarCliente() {
            const peticion = await fetch(urlCliente, {
                method: 'POST',
                body: JSON.stringify(this.buscar)
            })
            const { clientes } = await peticion.json()
            if (clientes != null) {
                this.clientes = clientes
            }
        }
    }
}
</script>

<style scoped>
.tabla {
    width: 100%;
    height: 330px;
    overflow: scroll;
}
</style>
