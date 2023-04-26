<template class = "q-pa-md q-gutter-md">
    <div class="text-h4">템플릿 문법</div>
      <!-- 컴포넌트가 사용될 때  -->
    <class-child></class-child>
    <!-- 컴포넌트가 사용시 클래스 추가 -->
    <class-child :class="[baz, boo]"></class-child>
    <!-- 컴포넌트가 사용시 active 클래스 추가 -->
    <class-child :class="{ active: isActive }"></class-child>
    <class-child id="hi"></class-child>
</template>
    
<script>
    export default {
        data(){
            return{            
            }
        },
        computed:{
        
        },
        watch:{

        },
        mounted(){

        },
        methods:{
        
        }

    }
</script>

<style scoped>
    #hi{
  font-size:3em;
  color:darkorchid;
}
</style>