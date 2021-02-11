<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                v-model="form.firstName"
                :rules="firstNameRules"
                label="Nome"
                required
            ></v-text-field>

            <v-text-field
                v-model="form.lastName"
                :rules="lastNameRules"
                label="Sobrenome"
                required
            ></v-text-field>

            <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="form.phone"
                :rules="phoneRules"
                label="Telefone"
                required
            ></v-text-field>

            <v-switch
                v-model="form.isCNPJ"
                :label="`É pessoa Jurídica? ${isCheckCNPJ}`"
            ></v-switch>

            <v-text-field
                v-if="form.isCNPJ"
                v-model="form.cnpj"
                :rules="cnpjRules"
                :counter="14"
                label="CNPJ"
                required
            ></v-text-field>

            <v-text-field
                v-else
                v-model="form.cpf"
                :rules="cpfRules"
                :counter="11"
                label="CPF"
                required
            ></v-text-field>

            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 text-capitalize"
                @click="validate"
            >
                Salvar
            </v-btn>

            <v-btn color="orange" class="mr-4 text-capitalize" @click="reset">
                Limpar
            </v-btn>
        </v-form>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2">
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

        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
                color="red"
            ></v-progress-circular>
            <v-spacer></v-spacer>
            Salvando
        </v-overlay>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        form: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            isCNPJ: false,
            cnpj: "",
            cpf: "",
        },
        valid: true,
        peoples: null,

        firstNameRules: [
            (v) => !!v || "Nome é obrigatório",
            (v) =>
                (v && v.length >= 3) ||
                "O nome deve possuir no minimo 3 caracteres",
        ],

        lastNameRules: [
            (v) => !!v || "Nome é obrigatório",
            (v) =>
                (v && v.length >= 3) ||
                "O sobrenome deve possuir no minimo 3 caracteres",
        ],

        emailRules: [
            (v) => !!v || "E-mail é obrigatório",
            (v) => /.+@.+\..+/.test(v) || "O e-mail não é válido",
        ],

        phoneRules: [(v) => !!v || "Telefone é obrigatório"],
        cnpjRules: [
            (v) => !!v || "CNPJ é obrigatório",
            (v) => (v && v.length == 14) || "O CNPJ possui 14 digitos",
        ],

        cpfRules: [
            (v) => !!v || "CPF é obrigatório",
            (v) => (v && v.length == 11) || "O CPF possui 11 digitos",
        ],

        dialog: false,
        overlay: false,
        message: "",
    }),

    methods: {
        validate() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
            } else {
                this.overlay = true;
                this.save();
                this.close;
                this.clear;
                this.$forceUpdate();
            }
        },
        reset() {
            this.$refs.form.reset();
        },
        close() {
            this.dialog = false;
            this.message = "";
            this.reset();
        },

        save() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.form),
            };
            fetch("http://localhost:8000/api/people", requestOptions)
                .then((response) => response.json())
                .then((data) => (this.message = data.msg))
                .then(() => {
                    this.overlay = false;
                    this.dialog = true;
                });
        },

        clear() {
            this.form = null;
        },
    },
    computed: {
        isCheckCNPJ() {
            return this.form.isCNPJ ? "Sim" : "Não";
        },
    },
};
</script>

<style></style>
