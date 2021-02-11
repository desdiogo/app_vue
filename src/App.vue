<template>
    <div id="app">
        <v-app>
            <d-menu />
            <router-view/>
        </v-app>
    </div>
</template>

<script>
import dMenu from "@/components/template/Menu";
export default {
    name: "App",
    components: { dMenu }
};
</script>

<style></style>
