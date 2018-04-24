<template>
    <div id="app">
        <div>
            <router-view name='header'></router-view>
            <router-view v-wechat-title='$route.meta.title'></router-view>
            <router-view name='footer'></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name: "app",
};

</script>
