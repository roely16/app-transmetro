<template>
    <div>

        <b-container>
            <b-row class="mt-4">
                <b-col>
                    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
                </b-col>
            </b-row>

            <!-- Datos de la auditoria -->

            <b-row>
                <b-col>
                    <b-card>
                        <b-row>
                            <b-col cols="4">
                                <b-form-group
                                    label="Nombre"
                                >
                                    <b-form-input
                                        type="text"
                                        v-model="simulacro.nombre"
                                        :readonly="!enabledEdit"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                               <b-form-group
                                    label="Fecha Inicio"
                                >
                                    <b-form-datepicker 
                                        v-model="simulacro.fecha_inicio" 
                                        locale="es" 
                                        placeholder=""
                                        :readonly="!enabledEdit"
                                        required
                                    ></b-form-datepicker>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                               <b-form-group
                                    label="Fecha Fin"
                                >
                                    <b-form-datepicker 
                                        v-model="simulacro.fecha_fin" 
                                        locale="es" 
                                        placeholder=""
                                        :readonly="!enabledEdit"
                                        required
                                    ></b-form-datepicker>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Estado"
                                >
                                    <b-form-select v-model="simulacro.id_estado" value-field="id" text-field="nombre"  :options="estados" :disabled="!enabledEdit"></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Observaciones"
                                >
                                    <b-form-textarea
                                        type="text"
                                        rows="3"
                                        :readonly="!enabledEdit"
                                        v-model="simulacro.observaciones"
                                    ></b-form-textarea>
                                </b-form-group>
                            </b-col>

                            <!-- Botones de acción -->
                            <b-col class="text-right" align-self="center" cols="4">
                                <b-button @click="editar()" :variant="!enabledEdit ? 'primary' : 'success'" size="sm">
                                    <font-awesome-icon :icon="!enabledEdit ? 'edit' : 'save'"></font-awesome-icon>
                                </b-button>

                                <b-button @click="mostrarEliminarAuditoria()" class="ml-2" variant="danger" size="sm">
                                    <font-awesome-icon icon="trash"></font-awesome-icon>
                                </b-button>

                            </b-col>

                        </b-row>
                    </b-card>
                </b-col>
            </b-row>

            <!-- Tabs Compañias de Transporte, Horarios -->

            <b-row class="mt-4">
                <b-col>
                    <b-tabs content-class="mt-3">
                        <b-tab title="Compañias de Transporte" active>

                            <Table ref="table_transporte" class="mt-4" :data_url="url_data" :post_data="post_data_com">

                                <template v-slot:action="data">
                                    <b-button @click="mostrarEdit(data.item.id)" variant="primary" size="sm">
                                        <font-awesome-icon icon="edit"></font-awesome-icon>
                                    </b-button>

                                    <b-button @click="mostrarEliminar(data.item.id)" class="ml-2" variant="danger" size="sm">
                                        <font-awesome-icon icon="trash"></font-awesome-icon>
                                    </b-button>

                                </template>

                                <template v-slot:tipo_ruta="data">
                                    <b-badge
                                        :variant="data.value == 'C' ? 'primary' : 'success'"
                                    >
                                        {{ data.value == 'C' ? 'Ruta Corta' : 'Ruta Larga' }}
                                    </b-badge>
                                </template>

                                <template v-slot:resultado_ensayo="data">
                                    <b-badge v-if="data.value" :variant="data.value == 'P' ? 'primary' : data.value == 'A' ? 'success' : data.value == 'R' ? 'danger' : null">
                                        {{ data.value == 'P' ? 'Pendiente' : data.value == 'A' ? 'Aprobado' : data.value == 'R' ? 'Rechazado' : null }}
                                    </b-badge>
                                </template>

                                <template v-slot:add-section>
                                    <b-button variant="primary" @click="mostrarModal()">Agregar
                                        <font-awesome-icon icon="plus"></font-awesome-icon>
                                    </b-button>
                                </template>

                            </Table>

                        </b-tab>
                        <b-tab title="Turnos">

                            <Table ref="table_turnos" class="mt-4" :data_url="url_data_turnos" :post_data="post_data_turnos">

                                <template v-slot:action="data">
                                    <b-button @click="mostrarEditTurno(data.item.id)" variant="primary" size="sm">
                                        <font-awesome-icon icon="edit"></font-awesome-icon>
                                    </b-button>

                                    <b-button @click="mostrarEliminarTurno(data.item.id)" class="ml-2" variant="danger" size="sm">
                                        <font-awesome-icon icon="trash"></font-awesome-icon>
                                    </b-button>

                                </template>

                                <template v-slot:add-section>
                                    <b-button variant="primary" @click="mostrarModalTurno()">Agregar
                                        <font-awesome-icon icon="plus"></font-awesome-icon>
                                    </b-button>
                                </template>
                                

                            </Table>

                        </b-tab>

                        <b-tab title="Resultados">
                            <ResultadoAuditoria></ResultadoAuditoria>
                        </b-tab>
                    </b-tabs>
                </b-col>
            </b-row>

            <!-- Modal -->
            <Modal :titleModal="titleModal" :sizeModal="sizeModal" @closeModal="closeModal()" :modalShow="showModal">

                <template v-slot:form-modal>
                    <FormEmpresaTrans  @closeModal="closeModal()" @updateTable="updateTable()" :idItem="idItem" :editMode="editMode"></FormEmpresaTrans>
                </template>

            </Modal>

            <!-- Modal turno -->
            <Modal :titleModal="titleModal" :sizeModal="sizeModal" @closeModal="closeModalTurno()" :modalShow="showModalTurno">

                <template v-slot:form-modal>
                    <FormTurnos  @closeModal="closeModalTurno()" @updateTable="updateTableTurnos()" :idItem="idItem" :editMode="editMode"></FormTurnos>
                </template>

            </Modal>

        </b-container>

    </div>
</template>

<script>

    import Table from '@/components/Table.vue'
    import Modal from '@/components/Modal.vue'

    import Swal from 'sweetalert2'

    import FormEmpresaTrans from '@/components/FormEmpresaTrans.vue'
    import FormTurnos from '@/components/FormTurnos.vue'

    import ResultadoAuditoria from '@/components/ResultadoAuditoria'

    export default {
        components: {
            Table,
            Modal,
            FormEmpresaTrans,
            FormTurnos,
            ResultadoAuditoria
        },  
        data(){

            return{
                breadcrumb: [
                    {
                        text: 'Auditorias',
                        to: {name: 'auditorias'}
                    },
                    {
                        text: 'Detalle de Auditoria',
                        active: true
                    }
                ],
                estados: [],
                simulacro: {},
                url_data: process.env.VUE_APP_API_URL + '/com_transporte/listar.php',
                post_data_com: {
                    id_com: this.$route.params.id
                },
                url_data_turnos: process.env.VUE_APP_API_URL + '/turnos/listar.php',
                post_data_turnos: {
                    id_com: this.$route.params.id
                },
                showModal: false,
                titleModal: "",
                sizeModal: "",
                editMode: false,
                idItem: null,
                tableUpdate: false,
                enabledEdit: false,
                showModalTurno: false
            }

        },
        methods: {

            obtener_detalle(){

                // Obtener estados

                this.axios
                .post(process.env.VUE_APP_API_URL + '/auditorias/obtener_estados.php')
				.then((response) => {

                    this.estados = response.data

                })

                let data = {
                    id_simulacro: this.$route.params.id
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/auditorias/detalle.php', data)
				.then((response) => {

                    this.simulacro = response.data

                })

            },
            mostrarModal(){

                this.editMode = false
                this.showModal = true
                this.titleModal = "Agregar Empresa de Transporte"
                this.sizeModal = "xl"

            },
            mostrarEdit(id){
                
                this.editMode = true
                this.titleModal = "Editar Empresa de Transporte"
                this.sizeModal = "xl"
                this.idItem = id
                this.showModal = true

            },
            mostrarModalTurno(){

                this.editMode = false
                this.showModalTurno = true
                this.titleModal = "Agregar Turno"
                this.sizeModal = "sm"

            },
            mostrarEditTurno(id){
                
                this.editMode = true
                this.titleModal = "Editar Turno"
                this.sizeModal = "sm"
                this.idItem = id
                this.showModalTurno = true

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
                        .post(process.env.VUE_APP_API_URL + '/com_transporte/eliminar.php', data)
                        .then((response) => {

                            if (response.data) {

                                this.$bvToast.toast('La empresa de transporte a sido eliminada exitosamente.', {
                                    title: 'Eliminación exitosa',
                                    variant: 'success',
                                    solid: true
                                })

                                this.$refs.table_transporte.obtener_datos()

                            }

                        })
                    }
                })


            },
            editar(){

                if (!this.enabledEdit) {
                    
                    this.enabledEdit = true

                }else{

                    // Editar

                    this.axios
                    .post(process.env.VUE_APP_API_URL + '/auditorias/editar.php', this.simulacro)
                    .then((response) => {

                        if (response.data) {
                            
                            this.$bvToast.toast('El simulacro a sido actualizado exitosamente.', {
                                title: 'Actualización exitosa',
                                variant: 'success',
                                solid: true
                            })

                            this.enabledEdit = false

                        }

                    })

                }

            },
            eliminar(){

                
            },
            closeModal(){

                this.enabledEdit = false
                this.showModal = false

            },
            closeModalTurno(){

                this.showModalTurno = false

            },
            updateTable(){

                this.$bvToast.toast(!this.editMode ? 'La empresa de transporte a sido registrada exitosamente.' : 'La empresa de transporte a sido actualizada exitosamente.', {
                    title: !this.editMode ? 'Registro exitoso' : 'Actualización exitosa',
                    variant: 'success',
                    solid: true
                })

                this.$refs.table_transporte.obtener_datos()

                this.closeModal()

            },
            updateTableTurnos(){

                this.$bvToast.toast(!this.editMode ? 'El turno a sido registrada exitosamente.' : 'El turno a sido actualizada exitosamente.', {
                    title: !this.editMode ? 'Registro exitoso' : 'Actualización exitosa',
                    variant: 'success',
                    solid: true
                })

                this.$refs.table_turnos.obtener_datos()

                this.closeModalTurno()

            },
            mostrarEliminarTurno(id){

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
                            .post(process.env.VUE_APP_API_URL + '/turnos/eliminar.php', data)
                            .then((response) => {

                                console.log(response.data)
                                
                                if (response.data) {

                                    this.$bvToast.toast('El turno a sido eliminada exitosamente.', {
                                        title: 'Eliminación exitosa',
                                        variant: 'success',
                                        solid: true
                                    })

                                    this.$refs.table_turnos.obtener_datos()

                                }

                            })
                            
                        }

                })

            },
            mostrarEliminarAuditoria(){

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
                                id: this.$route.params.id
                            }

                            this.axios
                            .post(process.env.VUE_APP_API_URL + '/auditorias/eliminar.php', data)
                            .then((response) => {
                                
                                if (response.data) {

                                    this.$bvToast.toast('La auditoria a sido eliminada exitosamente.', {
                                        title: 'Eliminación exitosa',
                                        variant: 'success',
                                        solid: true
                                    })

                                    this.$router.push({name: 'auditorias'})

                                }

                            })
                            
                        }

                })

            }

        },
        mounted(){
            
            this.obtener_detalle()

        }
    }
</script>