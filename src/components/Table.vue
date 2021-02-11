<template>
    <v-container>
        <v-data-table :headers="headers" :items="peoples" class="elevation-1">
            <template v-slot:[`item.fullName`]="{ item }">
                {{ item.firstName }} {{ item.lastName }}
            </template>
            <template v-slot:[`item.isCNPJ`]="{ item }">
                {{ item.isCNPJ ? "Sim" : "Não" }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
                color="red"
            ></v-progress-circular>
            <v-spacer></v-spacer>
            {{ index == -1 ? "Carregando Dados" : "Deletando Registro" }}
        </v-overlay>
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="headline"
                    >Tem certeza de excluir o registro?</v-card-title
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        class="text-capitalize"
                        text
                        @click="closeDelete"
                        >Cancelar</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                        >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline">
                    {{ message }}
                </v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="close">
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modal" width="500">
                <v-card>
                    <d-modal></d-modal>
                </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import dModal from "@/components/Modal";

export default {
    components: {dModal},
    data() {
        return {
            headers: [
                {
                    text: "Nome Completo",
                    align: "start",
                    value: "fullName",
                },
                { text: "E-mail", value: "email" },
                { text: "Pessoa Jurídica", value: "isCNPJ" },
                { text: "CNPJ", value: "cnpj" },
                { text: "CPF", value: "cpf" },
                { text: "Ações", value: "actions" },
                { text: "ID", value: "id" },
            ],
            overlay: false,
            message: "",
            messageLoading: "Carregando Dados",
            dialogDelete: false,
            dialog: false,
            modal: false,
            index: -1,
            itemSelected: null,
        };
    },
    created() {
        this.inicial();
    },
    methods: {
        deleteItem(item) {
            this.dialogDelete = true;
            this.index = this.peoples.indexOf(item);
            this.itemSelected = this.peoples[this.index].id;
        },

        deleteItemConfirm() {
            this.closeDelete();
            this.overlay = true;
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            };
            fetch(
                `https://app.desdiogo.com/api/people/${this.itemSelected}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => (this.message = data.msg))
                .then(() => {
                    this.overlay = false;
                    this.dialog = true;
                })
                .then(() => {
                    this.index = -1;
                    this.inicial();
                });
        },

        closeDelete() {
            this.dialogDelete = false;
        },

        close() {
            this.dialog = false;
            this.message = "Carregando Dados";
        },

        inicial() {
            // this.overlay = true;
            // const headers = { "Content-Type": "application/json" };
            // fetch("https://app.desdiogo.com/api/people", { headers })
            //     .then((response) => response.json())
            //     .then((data) => (this.peoples = data))
            this.$store.dispatch('loadPeoples')
                // .then(() => (this.overlay = false));
        },
        editItem(item) {
            this.modal = true
            console.log(item)
        }
    },
    computed: mapState([
        'peoples'
    ]),
};
</script>

<style></style>
