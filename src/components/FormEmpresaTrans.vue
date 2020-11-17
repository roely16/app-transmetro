<template>
    <div>

        <b-form @submit.prevent="!editMode ? registrar() : editar()">
            <b-row>
                <b-col cols="12">
                    <b-card title="Empresa de Transporte">
                        <b-row>
                            <b-col cols="4">
                                <b-form-group
                                    label="Nombre de Contacto"
                                >
                                    <b-form-input
                                        type="text"
                                        required
                                        v-model="com_transporte.nombre_contacto"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Empresa"
                                >
                                    <b-form-input
                                        type="text"
                                        required
                                        v-model="com_transporte.nombre"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Telefono"
                                >
                                    <b-form-input
                                        type="text"
                                        required
                                        v-model="com_transporte.telefono_contacto"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Email"
                                >
                                    <b-form-input
                                        type="email"
                                        v-model="com_transporte.email_contacto"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Fecha de ingreso"
                                >
                                    <b-form-datepicker v-model="com_transporte.fecha_ingreso" locale="es" placeholder="" required></b-form-datepicker>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Proveniente de"
                                >
                                    <b-form-input
                                        type="text"
                                        v-model="com_transporte.proveniente"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Extremos"
                                >
                                    <b-form-input
                                        type="text"
                                        v-model="com_transporte.extremos"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Tipo de ruta"
                                >
                                    <b-form-select v-model="com_transporte.tipo_ruta" value-field="id" text-field="name" :options="tipos_ruta">
                                        <template #first>
                                            <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Fecha de revisión"
                                >
                                    <b-form-datepicker v-model="com_transporte.fecha_revision" locale="es" placeholder=""></b-form-datepicker>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Horario"
                                >
                                    <b-form-input
                                        type="text"
                                        v-model="com_transporte.horario"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Estado Ensayo"
                                >
                                    <b-form-select v-model="com_transporte.estado_ensayo" value-field="id" text-field="name" :options="estado_ensayo">
                                        <template #first>
                                            <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Vehículos en prueba"
                                >
                                    <b-form-textarea
                                        type="text"
                                        v-model="com_transporte.vehiculos_prueba"
                                        autocomplete="off"
                                    ></b-form-textarea>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Resultado del ensayo"
                                >
                                    <b-form-select v-model="com_transporte.resultado_ensayo" value-field="id" text-field="name" :options="resultado_ensayo">
                                        <template #first>
                                            <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Notificación de ensayo"
                                >
                                    <b-form-select v-model="com_transporte.notificacion_ensayo" value-field="id" text-field="name" :options="notificacion_ensayo">
                                        <template #first>
                                            <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Declaración Jurada"
                                >
                                    <b-form-select v-model="com_transporte.declaracion_jurada" value-field="id" text-field="name" :options="declaracion_jurada">
                                        <template #first>
                                            <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Notificación"
                                >
                                    <b-form-select value-field="id" text-field="name" v-model="com_transporte.estado_notificacion" 
                                    :options="declaracion_jurada">
                                        <template #first>
                                            <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Fecha de notificación"
                                >
                                    <b-form-datepicker v-model="com_transporte.fecha_notificacion" locale="es" placeholder=""></b-form-datepicker>
                                </b-form-group>
                            </b-col>
                            <b-col cols="4">
                                <b-form-group
                                    label="Observaciones"
                                >
                                    <b-form-textarea
                                        type="text"
                                        rows="4"
                                        v-model="com_transporte.observaciones"
                                        autocomplete="off"
                                    ></b-form-textarea>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
                <b-col cols="12" class="text-center mt-4">
                    <b-button size="lg" @click="() => { this.$emit('closeModal') }" variant="secondary">Cancelar
                        <font-awesome-icon icon="times-circle"></font-awesome-icon>
                    </b-button>

                    <b-button size="lg" type="submit" class="ml-2" variant="success">Registrar
                        <font-awesome-icon icon="save"></font-awesome-icon>
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
        
    </div>
</template>

<script>
    export default {
        props: {
            editMode: {
                type: Boolean,
                default: false
            },
            idItem: String
        },
        data(){
            return{
                tipos_ruta: [
                    {id: 'C', name: 'Ruta Corta'},
                    {id: 'L', name: 'Ruta Larga'}
                ],
                estado_ensayo: [
                    {id: 'P', name: 'Pendiente'},
                    {id: 'R', name: 'Realizado'}
                ],
                notificacion_ensayo: [
                    {id: 'P', name: 'Pendiente'},
                    {id: 'A', name: 'Aprobado'}
                ],
                declaracion_jurada: [
                    {id: 'P', name: 'Pendiente'},
                    {id: 'E', name: 'Entregada'}
                ],
                resultado_ensayo: [
                    {id: 'P', name: 'Pendiente'},
                    {id: 'A', name: 'Aprobado'},
                    {id: 'R', name: 'Rechazado'}
                ],
                com_transporte: {
                    nombre_contacto: null,
                    nombre: null,
                    telefono_contacto: null,
                    email_contacto: null,
                    fecha_ingreso: null,
                    proveniente: null,
                    extremos: null,
                    tipo_ruta: null,
                    fecha_revision: null,
                    horario: null,
                    estado_ensayo: null,
                    vehiculos_prueba: null,
                    resultado_ensayo: null,
                    notificacion_ensayo: null,
                    declaracion_jurada: null,
                    estado_notificacion: null,
                    fecha_notificacion: null,
                    observaciones: null,
                    id_simulacro: this.$route.params.id
                }
            }
        },
        methods: {

            obtener_detalle(){

                let data = {
                    id: this.idItem
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/com_transporte/detalle.php', data)
				.then((response) => {

                    this.com_transporte = response.data

                })

            },
            registrar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + '/com_transporte/registrar.php', this.com_transporte)
				.then((response) => {

                    console.log(response.data);

                    if (response.data) {
                        
                        this.$emit('updateTable')

                    }

                })

            },
            editar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + '/com_transporte/editar.php', this.com_transporte)
				.then((response) => {

                    if (response.data) {
                        
                        this.$emit('updateTable')

                    }

                })

            }

        },
        mounted(){

            if (this.editMode) {

                this.obtener_detalle()   

            }

        }
    }
</script>