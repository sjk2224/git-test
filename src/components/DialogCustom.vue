<template>
    <q-dialog v-model="dialog">
        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class = "text-h6">내용 수정</div>
                <div class="text-subtitle2">{{ editTask.id }}</div>
            </q-card-section>
            <q-card-section>
                <q-input
                v-model="editTask.title"
                @Keyup.enter="onOKClick"
                ></q-input>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn
                    color="primary"
                    unelevated
                    dense
                    label="OK"
                    @click="onOKClick"
                ></q-btn>
                <q-btn
                    unelevated
                    dense
                    color="primary"
                    label="Cancel"
                    @click="onCancleClick"
                ></q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>

export default{
    name: "DialogCustom",
    props:['editTask','origin'],
    emits:['onInput'],
    data(){
        return{
            dialog: false,
        };
    },
    mounted(){
    },
    methods:{
        onOKClick(){
            if(!this.editTask.title) this.editTask.title = this.origin;
            this.$emit("onInput",this.editTask);
            this.dialog = false;
        },
        onCancleClick(){
            this.editTask.title = this.origin;
            this.dialog = false;
        },
    }
}
</script>

<style>
    
</style>