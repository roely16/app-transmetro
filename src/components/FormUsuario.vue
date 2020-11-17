<template>
    <div>
        <b-form @submit.prevent="!editMode ? registrar() : editar()">
            <b-card title="Datos del Usuario">
                <b-row>
                    <b-col cols="6">
                        <b-form-group
                            label="Nombres"
                        >
                            <b-form-input
                                type="text"
                                required
                                v-model="usuario.nombre"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group
                            label="Apellidos"
                        >
                            <b-form-input
                                type="text"
                                required
                                v-model="usuario.apellido"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group
                            label="Telefono"
                        >
                            <b-form-input
                                type="text"
                                required
                                v-model="usuario.telefono"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group
                            label="Email"
                        >
                            <b-form-input
                                type="text"
                                required
                                v-model="usuario.email"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group
                            label="Auditoria"
                        >
                            <b-form-select @change="obtener_turnos()" value-field="id" text-field="nombre" v-model="usuario.id_simulacro" 
                            :options="auditorias">
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group
                            label="Etapa"
                        >
                            <b-form-select @change="obtener_roles()" value-field="id" text-field="nombre" v-model="usuario.id_etapa" 
                            :options="etapas">
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group
                            label="Rol"
                        >
                            <b-form-select :disabled="roles.length <= 0" value-field="id" text-field="nombre" v-model="usuario.id_rol" 
                            :options="roles">
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    
                    <b-col cols="6">
                        <b-form-group
                            label="Turno"
                        >
                            <b-form-select :disabled="turnos.length <= 0" value-field="id" text-field="nombre" v-model="usuario.id_turno" 
                            :options="turnos">
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>

            <!-- Permisos -->
            <b-row class="mt-4">
                <b-col>
                    <b-card title="Permisos">
                        <small>Seleccione los modulos a los cuales el usuario puede tener acceso.</small>
                        
                        <b-row class="mt-4">
                            <b-col v-for="(item, key) in menu" :key="key" cols="4">
                                <b-button @click="item.checked = !item.checked" :variant="!item.checked ? 'outline-secondary' : 'success'" block>{{ item.nombre }}</b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>

            <!-- Botones de acción -->
            <b-row>
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
                usuario: {
                    nombre: null,
                    apellido: null,
                    telefono: null,
                    email: null,
                    id_etapa: null,
                    id_rol: null,
                    id_turno: null,
                    id_simulacro: null,
                },
                menu: [],
                auditorias: [],
                etapas: [],
                roles: [],
                turnos: []
            }
        },
        methods: {
            obtener_menu(){

                this.axios
                .post(process.env.VUE_APP_API_URL + '/usuarios/obtener_menu.php')
				.then((response) => {

                    this.menu = response.data

                })

            },
            obtener_detalle(){

                let data = {

                    id: this.idItem

                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/usuarios/detalle.php', data)
				.then((response) => {

                    this.usuario = response.data.usuario
                    this.menu = response.data.menu

                })

            },
            registrar(){

                let permisos = this.menu.filter(item => item.checked)
                this.usuario.permisos = permisos

                this.axios
                .post(process.env.VUE_APP_API_URL + '/usuarios/registrar.php', this.usuario)
				.then((response) => {

                    console.log(response.data);

                    if (response.data) {
                        
                        this.$emit('updateTable')

                    }

                })

            },
            editar(){

                let permisos = this.menu.filter(item => item.checked)
                this.usuario.permisos = permisos

                this.axios
                .post(process.env.VUE_APP_API_URL + '/usuarios/editar.php', this.usuario)
				.then((response) => {

                    if (response.data) {
                        
                        this.$emit('updateTable')

                    }

                })

            },
            obtener_datos(){

                this.axios
                .post(process.env.VUE_APP_API_URL + '/usuarios/datos_form.php')
				.then((response) => {

                    this.auditorias = response.data.simulacros
                    this.etapas = response.data.etapas

                })

            },
            obtener_roles(){

                let data = {
                    id_etapa: this.usuario.id_etapa
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/obtener_roles.php', data)
				.then((response) => {

                    this.roles = response.data

                    if (this.roles.length <= 0) {

                        this.usuario.id_rol = null

                    }

                })

            },
            obtener_turnos(){

                let data = {
                    id_simulacro: this.usuario.id_simulacro
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/obtener_turnos.php', data)
				.then((response) => {

                    this.turnos = response.data

                    if (this.turnos.length <= 0) {

                        this.usuario.id_turno = null
                        
                    }

                })
            }   
        },
        watch: {

            'usuario.id_etapa'(val){

                if (val) {
                    this.obtener_roles(val)
                }
                
            },
            'usuario.id_simulacro'(val){

                if (val) {
                    this.obtener_turnos()
                }

            }

        },
        mounted(){

            if (!this.editMode) {

                this.obtener_menu()

            }

            this.obtener_datos()

            if (this.editMode) {
                
                this.obtener_detalle()

            }

        }
    }
</script>