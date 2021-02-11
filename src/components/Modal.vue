<template>
    <v-container>
        <d-forms>
        </d-forms>
                    <v-btn color="orange" class="mr-4 text-capitalize" @click="reset">
                Limpar
            </v-btn>
    </v-container>
</template>

<script>
import dForms from "@/components/Forms";

export default {
    components: { dForms },
};
</script>

<style></style>
