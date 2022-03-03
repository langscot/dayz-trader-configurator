<template>
    <v-dialog v-model="dialog" width="500">

        <template v-slot:activator="{ on }">
            <slot v-bind="on"/>
        </template>

        <v-card>
            <v-card-title v-text="title"/>
            <v-card-subtitle v-text="subtitle"/>

            <v-divider class="mb-5"/>

            <v-card-text v-text="message"/>

            <v-card-actions class="d-flex flex-row flex-justify-right">

                <v-btn depressed class="flex-grow-1" @click='dialog = false' v-text="noText"/>

                <v-btn depressed class="flex-grow-1" @click='onYesClick' color="primary" v-text="yesText"/>

            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    name: 'boolean-dialog',

    props: {
        title: String,
        subtitle: String,
        message: String,
        yesText: {
            type: String,
            default: 'Okay'
        },
        noText: {
            type: String,
            default: 'Cancel'
        }
    },

    data() {
        return {
            dialog: false,
        }
    },

    methods: {
        onYesClick() {
            this.dialog = false;
            this.$emit('yes-click');
        }
    }
}
</script>