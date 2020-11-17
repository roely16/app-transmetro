<template>
    <div>

        <!-- Campo de busqueda -->
        <b-row>
            <b-col cols="4">
                <b-input-group>
                    <template v-slot:append>
                        <b-input-group-text>
                            <font-awesome-icon icon="search" />
                        </b-input-group-text>
                    </template>
                    <b-form-input autocomplete="off" v-model="busqueda"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col class="text-right">
                <!-- Sección para botón de agregar -->
                <slot name="add-section"></slot>
            </b-col>
        </b-row>
        

        <b-row class="mt-4">
            <b-col>
                <b-table :filter="busqueda" striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" show-empty empty-text="Sin registros" empty-filtered-text="No se han encontrado registros que coincidan con su criterio de búsqueda">

                    <template v-slot:cell()="data">
                        
                        {{ !data.field.slot ? data.value : null }} 

                        <slot v-if="data.field.slot" v-bind="data" :name="data.field.key">
                            
                        </slot>

                    </template>

                </b-table>
            </b-col>
        </b-row>

        <!-- Paginación -->

        <b-row align-v="center">
                
            <b-col cols="12" class="pt-2 text-center" v-if="rows > 0">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    align="center"
                ></b-pagination>
            </b-col>

        </b-row>

    </div>
</template>

<script>
    export default {
        props: {
            data_url: String,
            post_data: Object,
            custom_columns: Array
        },
        data(){
            return{
                items: [],
                fields: [],
                busqueda: null,
                currentPage: 1,
                perPage: 10,
                rows: null,
            }
        },
        methods: {
            obtener_datos(){

                this.axios
                .post(this.data_url, this.post_data)
				.then((response) => {

                    this.items = response.data.items
                    this.fields = response.data.fields

                    this.rows = this.items.length
					
                })

            },
            resultados_ensayo(){
                
            }
        },
        mounted(){
            
            this.obtener_datos()

        }
    }
</script>