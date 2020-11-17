<template>
    <div>

        <b-container>
            
            <b-row class="mt-4">
                <b-col>
                    <Table ref="table" :data_url="url_data">

                        <template v-slot:action="data">
                            
                            <b-button @click="mostrarEdit(data.item.id)" variant="primary" size="sm">
                                <font-awesome-icon icon="edit"></font-awesome-icon>
                            </b-button>

                            <b-button :to="{name: 'detalle_auditoria', params: {id: data.item.id}}" class="ml-2" variant="success" size="sm">
                                <font-awesome-icon icon="info-circle"></font-awesome-icon>
                            </b-button>

                        </template>

                        <template v-slot:add-section>
                            <b-button variant="primary" @click="mostrarModal()">Agregar
                                <font-awesome-icon icon="plus"></font-awesome-icon>
                            </b-button>
                        </template>

                        <!-- Template para personalizar columnas -->
                        <template #estado="data">
                            <b-badge :variant="data.item.variant">{{ data.item.estado }}</b-badge>
                        </template>

                    </Table>
                </b-col>
            </b-row>

            <!-- Modal -->
            <Modal :titleModal="titleModal" :sizeModal="sizeModal" @closeModal="closeModal()" :modalShow="showModal">

                <template v-slot:form-modal>
                    <FormSimulacro  @closeModal="closeModal()" @updateTable="updateTable()" :idItem="idItem" :editMode="editMode"></FormSimulacro>
                </template>

            </Modal>

        </b-container>

    </div>
</template>

<script>

    import Table from '@/components/Table.vue'
    import Modal from '@/components/Modal.vue'
    import FormSimulacro from '@/components/FormSimulacro.vue'

    export default {
        components: {
            Table,
            Modal,
            FormSimulacro
        },
        data(){
            return{
                busqueda: null,
                url_data: process.env.VUE_APP_API_URL + '/auditorias/listar.php',
                showModal: false,
                titleModal: "",
                sizeModal: "",
                editMode: false,
                idItem: null,
                tableUpdate: false
            }
        },
        methods: {
            mostrarModal(){

                this.editMode = false
                this.titleModal = "Agregar Simulacro"
                this.sizeModal = "lg"
                this.showModal = true

            },
            mostrarEdit(id){
                
                this.editMode = true
                this.titleModal = "Editar Simulacro"
                this.sizeModal = "lg"
                this.idItem = id
                this.showModal = true

            },
            closeModal(){

                this.editMode = false
                this.showModal = false

            },
            updateTable(){

                this.$bvToast.toast(!this.editMode ? 'El simulacro a sido registrado exitosamente.' : 'El simulacro a sido actualizado exitosamente.', {
                    title: !this.editMode ? 'Registro exitoso' : 'Actualización exitosa',
                    variant: 'success',
                    solid: true
                })

                this.$refs.table.obtener_datos()

                this.closeModal()

            }
        }
    }
</script>