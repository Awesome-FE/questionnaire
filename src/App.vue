<template>
    <div id="app">
        <div>
            <router-view v-wechat-title='$route.meta.title'></router-view>
        </div>
    </div>
</template>

<script>
// import Header from "./component/Header.vue"
// import foot from "./component/foot.vue"
// import login from "./component/login.vue"
// import register from "./component/register.vue"
// import forgetPassword from "./component/forgetPassword.vue";

export default {
    name: "app",
    components: {

    }
};


</script>


