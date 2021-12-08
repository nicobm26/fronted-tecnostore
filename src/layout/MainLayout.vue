<template>
    <div class="main-layout" >
        <header @click="evento">
            {{username}}
            <i class="fas fa-user-circle ml-5px"></i>
        </header>
        <div class="layout-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MainLayout',
    data: function() {
        return {
            username: ''
        }
    },
    mounted:function(){
        this.username = localStorage.getItem('username')|| '';
    },
    methods: {
        evento: function(){
            console.log('mievento');
            this.$emit('mievento');
        }
    }
}
</script>
<style scoped>
.main-layout {
    display: grid;
    grid-template-rows: 50px auto;
}
.main-layout > header {
    display: flex;
    justify-content: right;
    align-items: center;
    box-shadow: 0 3px 6px rgb(0 0 0 / 12%);
    padding-right: 15px;
}
.layout-content {
    padding: 15px;
}
</style>