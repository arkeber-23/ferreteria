<template>
    <div>
        <h4 class="text-start mb-4">Nueva Factura</h4>
        <div class="row g">
            <h6 class="text-start">Cliente</h6>
            <div class="col-md-2">
                <input
                    type="number"
                    list="clientes"
                    placeholder="Cedula"
                    @input="buscar()"
                    v-model.number.trim="cliente.cedula"
                    class="form-control"
                />
                <datalist id="clientes">
                    <option v-for="cliente in clientes" :key="cliente.id_cliente">{{cliente.cedula}}</option>
                </datalist>
            </div>
            <div class="col-md-4">
                <input
                    type="text"
                    class="form-control"
                    v-model="cliente.nombre_completo"
                    placeholder="Nombre completo"
                    readonly
                />
            </div>
            <div class="col-md-2">
                <input
                    type="number"
                    class="form-control"
                    v-model="cliente.telefono"
                    placeholder="Teléfono"
                    readonly
                />
            </div>
            <div class="col-md-4">
                <input
                    type="text"
                    class="form-control"
                    v-model="cliente.direccion"
                    placeholder="Dirección"
                    readonly
                />
            </div>
        </div>
        <div class="row g mt-3">
            <h6 class="text-start">Producto</h6>
            <div class="col-md-2">
                <input
                    list="productos"
                    type="text"
                    id="descripcion"
                    class="form-control"
                    @input="buscar_P()"
                    v-model.trim="producto.descripcion"
                    placeholder="Descripción"
                />
                <datalist id="productos">
                    <option
                        v-for="producto in productos"
                        :key="producto.id_producto"
                    >{{ producto.descripcion }}</option>
                </datalist>
            </div>
            <div class="col-md-2">
                <input
                    type="number"
                    class="form-control"
                    v-model="producto.stock"
                    placeholder="Stock"
                    readonly
                />
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control" placeholder="Cantidad" />
            </div>
            <div class="col-md-2">
                <input
                    type="text"
                    class="form-control"
                    v-model="producto.precio"
                    placeholder="Precio"
                    readonly
                />
            </div>
            <div class="col-md-2">
                <input type="text" class="form-control" placeholder="Precio Total" readonly />
            </div>
            <div class="col-md-2">
                <button class="btn text-success">
                    <font-awesome-icon icon="plus" class="mx-2"></font-awesome-icon>Agregar
                </button>
            </div>
        </div>
        <div class="tabla mt-5">
            <table class="table">
                <thead>
                    <tr class="bg-dark text-white">
                        <th scope="col">Descripción</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio Unitario</th>
                        <th scope="col">Precio Total</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row"></td>
                        <td scope="row"></td>
                        <td scope="row"></td>
                        <td scope="row"></td>
                        <td scope="row">
                            <button class="btn text-danger">
                                <font-awesome-icon icon="trash"></font-awesome-icon>Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="row g mt-3">
            <div class="col-md-3">
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" id="floatingInput" />
                    <label for="floatingInput">SubTotal</label>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" id="floatingInput" />
                    <label for="floatingInput">Iva</label>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" id="floatingInput" />
                    <label for="floatingInput">Total</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

const urlCliente = "http://localhost/facturacion/apis/cliente.php"
const urlProductos = "http://localhost/facturacion/apis/productos.php"
export default {
    data() {
        return {
            clientes: [],
            cliente: {
                id_cliente: '',
                cedula: '',
                nombre_completo: '',
                telefono: '',
                direccion: ''
            },
            productos: [],
            producto: {
                id_producto: '',
                descripcion: '',
                stock: '',
                precio: ''
            }



        }
    },
    created() {
        this.obtenerClientes();
        this.obtenerProductos();
    },
    methods: {
        async obtenerClientes() {
            const peticion = await fetch(
                urlCliente
            );
            const { clientes } = await peticion.json();
            clientes.forEach(cliente => {
                this.clientes.push(cliente)
            })
        },
        buscar() {
            if (this.buscarCliente != undefined) {
                const { id_cliente, nombre_completo, telefono, direccion } = this.buscarCliente
                this.cliente.id_cliente = id_cliente
                this.cliente.nombre_completo = nombre_completo
                this.cliente.telefono = telefono
                this.cliente.direccion = direccion
            } else {
                this.cliente.id_cliente = ""
                this.cliente.nombre_completo = ""
                this.cliente.telefono = ""
                this.cliente.direccion = ""
            }
        },  //METODOS PARA EL PRODUCTO

        async obtenerProductos() {
            const peticion = await fetch(urlProductos)
            const { Productos } = await peticion.json()
            Productos.forEach(producto => {
                this.productos.push(producto)
            })
        },
        buscar_P() {
            if (this.buscarProducto != undefined) {
                const { id_producto, stock, precio } = this.buscarProducto
                this.producto.id_producto = id_producto
                this.producto.stock = stock
                this.producto.precio = precio
            } else {
                this.producto.id_producto = ""
                this.producto.stock = ""
                this.producto.precio = ""
            }
        }

    },
    computed: {
        buscarCliente() {
            const busqueda = this.clientes.find(cliente => cliente.cedula == this.cliente.cedula)
            return busqueda
        },

        buscarProducto() {
            const busqueda = this.productos.find(producto => producto.descripcion == this.producto.descripcion)
            return busqueda
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