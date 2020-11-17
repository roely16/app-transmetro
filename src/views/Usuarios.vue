<template>
    <div>
        <b-container>
            <b-row class="mt-4">
                <b-col cols="12">
                    <Table ref="table" :data_url="url_data">

                        <template v-slot:add-section>
                            <b-button variant="primary" @click="mostrarModal()">Agregar
                                <font-awesome-icon icon="plus"></font-awesome-icon>
                            </b-button>
                        </template>

                        <template v-slot:action="data">
                            <b-button @click="mostrarEdit(data.item.id)" variant="primary" size="sm">
                                <font-awesome-icon icon="edit"></font-awesome-icon>
                            </b-button>

                            <b-button @click="mostrarEliminar(data.item.id)" class="ml-2" variant="danger" size="sm">
                                <font-awesome-icon icon="trash"></font-awesome-icon>
                            </b-button>

                        </template>

                    </Table>
                </b-col>
            </b-row>
        </b-container>

        <Modal :titleModal="titleModal" :sizeModal="sizeModal" @closeModal="closeModal()" :modalShow="showModal">

            <template v-slot:form-modal>
                <FormUsuario  @closeModal="closeModal()" @updateTable="updateTable()" :idItem="idItem" :editMode="editMode"></FormUsuario>
            </template>

        </Modal>

    </div>
</template>

<script>

    import Table from '@/components/Table.vue'
    import FormUsuario from '@/components/FormUsuario.vue'
    import Modal from '@/components/Modal.vue'

    import Swal from 'sweetalert2'

    export default {
        components: {
            Table,
            FormUsuario,
            Modal
        },
        data(){
            return{
                url_data: process.env.VUE_APP_API_URL + '/usuarios/listar.php',
                showModal: false,
                titleModal: null,
                sizeModal: null,
                idItem: null,
                editMode: false
            }
        },
        methods: {
            mostrarModal(){

                this.titleModal = 'Agregar Usuario'
                this.sizeModal = 'lg'
                this.editMode = false
                this.showModal = true
            },
            mostrarEdit(id){

                this.titleModal = 'Editar Usuario'
                this.sizeModal = 'lg'
                this.editMode = true
                this.showModal = true
                this.idItem = id
            },
            closeModal(){

                this.editMode = false
                this.showModal = false
            },
            updateTable(){

                this.$bvToast.toast(!this.editMode ? 'El usuario a sido registrado exitosamente.' : 'El usuario a sido actualizado exitosamente.', {
                    title: !this.editMode ? 'Registro exitoso' : 'Actualización exitosa',
                    variant: 'success',
                    solid: true
                })

                this.$refs.table.obtener_datos()

                this.closeModal()

            },
            mostrarEliminar(id){


                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Esta acción no se puede deshacer y borrara todos los registros relacionados!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {

                    if (result.isConfirmed) {

                        let data = {
                            id: id
                        }

                        this.axios
                        .post(process.env.VUE_APP_API_URL + '/usuarios/eliminar.php', data)
                        .then((response) => {

                            if (response.data) {

                                this.$bvToast.toast('El usuario a sido eliminada exitosamente.', {
                                    title: 'Eliminación exitosa',
                                    variant: 'success',
                                    solid: true
                                })

                                this.$refs.table.obtener_datos()

                            }

                        })

                    }
                })

            }
        }
    }
</script>