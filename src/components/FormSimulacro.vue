<template>
    <div>

        <b-form @submit.prevent="!editMode ? registrar() : editar()">
            <b-row>
                <b-col cols="6">
                    <b-form-group
                        label="Nombre"
                    >
                        <b-form-input
                            type="text"
                            v-model="simulacro.nombre"
                            required
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group
                        label="Fecha Inicio"
                    >
                        <b-form-datepicker v-model="simulacro.fecha_inicio" locale="es" placeholder="" required></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group
                        label="Fecha Fin"
                    >
                        <b-form-datepicker v-model="simulacro.fecha_fin" locale="es" placeholder="" required></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col cols="6" v-if="editMode">
                    <b-form-group
                        label="Estado"
                    >
                        <b-form-select v-model="simulacro.id_estado" value-field="id" text-field="nombre"  :options="estados"></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group
                        label="Observaciones"
                    >
                        <b-form-textarea
                            type="text"
                            rows="5"
                            v-model="simulacro.observaciones"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>

                <!-- Botones -->
                <b-col cols="12" class="text-center">
                    <b-button @click="() => { this.$emit('closeModal') }" variant="secondary">Cancelar
                        <font-awesome-icon icon="times-circle"></font-awesome-icon>
                    </b-button>

                    <b-button type="submit" class="ml-2" variant="success">Registrar
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
                simulacro: {
                    nombre: null,
                    fecha: null,
                    observaciones: null
                },
                estados: []
            }
        },
        methods: {
            registrar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + '/auditorias/registrar.php', this.simulacro)
				.then((response) => {

                    if (response.data) {
                        
                        this.$emit('updateTable')

                    }

                })

            },
            obtener_detalle(){

                let data = {
                    id_simulacro: this.idItem
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/auditorias/detalle.php', data)
				.then((response) => {

                    this.simulacro = response.data

                })

            },
            editar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + '/auditorias/editar.php', this.simulacro)
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

                // Obtener los estados

                this.axios
                .post(process.env.VUE_APP_API_URL + '/auditorias/obtener_estados.php')
				.then((response) => {

                    this.estados = response.data

                })

            }

        }
    }
</script>