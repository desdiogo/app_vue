import Vue from "vue";
import Router from "vue-router";
import dHome from "@/components/Home";
import dForms from "@/components/Forms";
import dTable from "@/components/Table";


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: dHome,
            name: 'Home'
        },
        {
            path: "/form",
            component: dForms,
            name: 'Cadastro'
        },
        {
            path: "/listar",
            component: dTable,
            name: 'Listar'
        },
    ],
});