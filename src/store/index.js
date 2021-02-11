import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        peoples: [],
    },
    getters: {
        peoples: (state) => state.peoples,
    },
    mutations: {
        SET_People(state, peoples) {
            state.peoples = peoples;
        },
    },
    actions: {
        loadPeoples({ commit }) {
            const headers = { "Content-Type": "application/json" };
            fetch("https://app.desdiogo.com/api/people", {
                headers,
            })
                .then((response) => response.json())
                .then((peoples) => {
                    console.log(peoples)
                    commit("SET_People", peoples);
                });
        },
    },
});
