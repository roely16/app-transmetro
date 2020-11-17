<template>
    <div class="mb-4">
        <b-row class="mt-4 mb-4" align-h="center">
            <b-col cols="6">
                <b-form-group
                    label="Compañia de Transporte"
                >
                    <b-select 
                        :options="com_transporte"
                        value-field="id"
                        text-field="nombre"
                    >
                        <template #first>
                            <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                        </template>
                    </b-select>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="12">
                <b-card>
                    <highcharts :options="chartOptions"></highcharts>
                </b-card>
            </b-col>
        </b-row>
        
    </div>
</template>

<script>

    import {Chart} from 'highcharts-vue'

    export default {
        components: {
            highcharts: Chart 
        },
        data(){
            return{
                com_transporte: [],
                chartOptions: {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Historic World Population by Region'
                    },
                    subtitle: {
                        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
                    },
                    xAxis: {
                        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Population (millions)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' millions'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Year 1800',
                        data: [107, 31, 635, 203, 2]
                    }, {
                        name: 'Year 1900',
                        data: [133, 156, 947, 408, 6]
                    }, {
                        name: 'Year 2000',
                        data: [814, 841, 3714, 727, 31]
                    }, {
                        name: 'Year 2016',
                        data: [1216, 1001, 4436, 738, 40]
                    }]
                }
            }
        },
        methods: {

            obtener_com_transporte(){

                let data = {
                    id_com: this.$route.params.id
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/com_transporte/listar.php', data)
				.then((response) => {

                    this.com_transporte = response.data.items

                })

            }

        },
        mounted(){

            this.obtener_com_transporte()

        }
    }
</script>