<template>
    <div>
        <v-snackbar
            app
            top
            multi-line
            v-model='snackbar'
        >
            <v-icon class="mr-5">fas fa-exclamation</v-icon>

            <span>{{ notification }}</span>

            <template v-slot:action="{ attrs }">
                <v-btn
                    text
                    v-bind="attrs"
                    @click="closeSnackbar()"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'toast-notifier',

    data() {
        return {
            snackbar: false
        }
    },
    
    methods: {
        closeSnackbar() {
            this.snackbar = false;
        }
    },

    computed: {
        notification: function() {
            return this.$store.state.notification
        }
    },

    watch: {
        notification: function(newVal) {
            this.snackbar = newVal.length > 0
        },

        snackbar: function(newVal) {
            if (!newVal) this.$store.state.notification = "";
        }
    }
}
</script>