<template>
    <div>
        <div class="mt-3">
            <h4 class="text-start">Registro de Productos</h4>
            <div class="text-start my-4">
                <button class="btn text-primary" @click.prevent="nuevoProducto()">
                    Nuevo Producto
                    <font-awesome-icon class="mx-2" icon="plus"></font-awesome-icon>
                </button>
            </div>
        </div>

        <!-- Buscar Cliente-->
        <div class="row g-2 align-items-center">
            <div class="col-auto">
                <label for="buscarProducto" class="col-form-label">Buscar Producto:</label>
            </div>
            <div class="col-auto">
                <input
                    type="text"
                    class="form-control"
                    @input="buscarProducto()"
                    v-model="buscar.descripcion"
                    placeholder="Descripción"
                />
            </div>
        </div>

        <!--Tabla Productos -->
        <div class="tabla mt-2">
            <table class="table">
                <thead>
                    <tr class="bg-dark text-white">
                        <th scope="col">#</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="producto in productos" :key="producto.id_producto">
                        <th scope="row">{{ producto.id_producto }}</th>
                        <td scope="row">{{ producto.descripcion }}</td>
                        <td scope="row">{{ producto.stock }}</td>
                        <td scope="row">{{ producto.precio }}</td>
                        <td scope="row">
                            <button
                                class="btn text-primary"
                                @click.prevent="editarProducto(producto)"
                            >
                                <font-awesome-icon icon="edit"></font-awesome-icon>Editar
                            </button>
                            <button class="btn text-danger"
                            @click.prevent="eliminarProducto(producto)">
                                <font-awesome-icon icon="trash"></font-awesome-icon>Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
const urlProductos = "http://localhost/facturacion/apis/productos.php"
export default {
    data() {
        return {
            productos: {},
            buscar:{
                descripcion:''
            }
        }
    },
    created() {
        this.obtenerProductos();
    },
    methods: {
        async obtenerProductos() {
            const peticion = await fetch(urlProductos)
            const { Productos } = await peticion.json()
            this.productos = Productos
        },
        nuevoProducto() {
            this.$swal({
                html: `<h3>Registrar Producto</h3>
            <input type="text" class="form-control mt-2" id="descripcion" placeholder="Descripcion" >
            <input type="number" class="form-control mt-2" id ="stock" placeholder="stock" >
            <input type="text" class="form-control mt-2" id="precio" placeholder="precio" >
        `,
                confirmButtonText: 'Registrar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const datos = {
                        descripcion: document.getElementById('descripcion').value,
                        stock: document.getElementById('stock').value,
                        precio: document.getElementById('precio').value * 1.21
                    }
                    fetch(urlProductos, {
                        method: 'POST',
                        body: JSON.stringify(datos)
                    }).then(res => res.json()).then(data => {
                        if (data.registro == 'ok') {
                            this.$swal({
                                icons: 'success',
                                text: 'Producto Registrado..'
                            })
                            this.obtenerProductos();
                        }
                    })

                }
            })
        },
        async editarProducto(producto) {
            this.$swal({
                html: `<h3>Editar Cliente</h3>
            <input type="text" class="form-control mt-2" id="descripcion" value="${producto.descripcion}" placeholder="Descripcion" >
            <input type="number" class="form-control mt-2" id ="stock" value="${producto.stock}" placeholder="stock" >
            <input type="text" class="form-control mt-2" id="precio" value="${producto.precio}" placeholder="precio" >
        `,
                  background:'#d5f5e3',
                confirmButtonText: 'EDITAR'
            }).then(result => {
                if (result.isConfirmed) {
                    const datos = {
                        id_producto: producto.id_producto,
                        descripcion: document.getElementById('descripcion').value,
                        stock: document.getElementById('stock').value,
                        precio: document.getElementById('precio').value*1.21,
                    }
                    fetch(urlProductos, {
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
                            this.obtenerProductos();
                        }
                    })
                }
            })
        },
        async eliminarProducto(producto) {
            this.$swal({
                title: '¿Esta seguro que desea eliminar?',
                text: 'esta operación es irreversible',
                icon: 'warning',
                iconColor:' #ec7063',
                background:'#f9ebea'
            }).then(result => {
                if (result.isConfirmed) {
                    const id = {
                        id_producto: producto.id_producto
                    }
                    fetch(urlProductos, {
                        method: 'POST',
                        body: JSON.stringify(id)
                    }).then(res => res.json()).then(resp => {
                        if (resp.eliminado = "ok") {
                            this.$swal({
                                toast: true,
                                icon: 'success',
                                position: 'top-end',
                                text: 'Producto Eliminado..',
                                timerProgressBar: true,
                                showConfirmButton: false,
                                timer: 3000,
                            })
                            this.obtenerProductos();
                        }
                    })

                }
            })
        },
        async buscarProducto() {
            const peticion = await fetch(urlProductos, {
                method: 'POST',
                body: JSON.stringify(this.buscar)
            })
            const { productos } = await peticion.json()
            if (productos != null) {
                this.productos = productos
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
