<template>
    <div>
        <b-modal hide-footer @hidden="closeModal()" v-model="show" :title="titleModal" :size="sizeModal">
            
            <!-- Cuerpo del modal -->
            <slot name="form-modal"></slot>

        </b-modal>
    </div>
</template>

<script>
    export default {
        props: {
            modalShow: {
                type: Boolean,
                default: false
            },
            titleModal: String,
            sizeModal: String
        },
        data(){
            return{
                show: false
            }
        },
        methods: {
            closeModal(){

                this.$emit('closeModal')

            }
        },
        watch: {

            modalShow(val){

                this.show = val

            }

        }        
    }
</script>