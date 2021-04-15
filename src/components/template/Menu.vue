<template>
    <b-container>
        <b-navbar toggleable="lg" type="dark" variant="danger">
            <router-link to="/" v-slot="{ navigate, href, route }" custom>
                <b-navbar-brand :href="href" @click="navigate">{{
                    route.name
                }}</b-navbar-brand>
            </router-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                        <router-link
                            to="/form"
                            v-slot="{ navigate, href, route }"
                            custom
                        >
                            <b-nav-item text :href="href" @click="navigate">{{
                                route.name
                            }}</b-nav-item>
                        </router-link>
                        <router-link
                            to="/listar"
                            v-slot="{ navigate, href, route }"
                            custom
                        >
                            <b-nav-item text :href="href" @click="navigate">{{
                                route.name
                            }}</b-nav-item>
                        </router-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </b-container>
</template>

<script>
export default {};
</script>
