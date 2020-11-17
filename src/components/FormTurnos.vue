<template>
    <div>
        <b-form @submit.prevent="!editMode ? registrar() : editar()">
            <b-row>
                <b-col cols="12"> 
                    <b-form-group
                        label="Turno"
                    >
                        <b-form-input
                            type="text"
                            required
                            v-model="turno.turno"
                            autocomplete="off"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" class="text-center mt-4">
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
                turno: {
                    turno: null,
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
                .post(process.env.VUE_APP_API_URL + '/turnos/detalle.php', data)
				.then((response) => {

                    this.turno = response.data

                })

            },
            registrar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + '/turnos/registrar.php', this.turno)
				.then((response) => {

                    console.log(response.data);

                    if (response.data) {
                        
                        this.$emit('updateTable')

                    }

                })

            },
            editar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + '/turnos/editar.php', this.turno)
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