<template>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-title>New Trader</v-card-title>
            <v-card-subtitle>Create a new Trader</v-card-subtitle>
            <v-divider class="mb-5"></v-divider>

            <v-card-text>
                <v-text-field
                    label="Trader Name"
                    filled
                    clearable
                    hint="This will appear in your Trader menu."
                    required
                    v-model='traderName'
                />
            </v-card-text>

            <v-card-actions class="d-flex flex-row flex-justify-right">
                <v-btn depressed class="flex-grow-1" @click='dialog = false'>Cancel</v-btn>
                <v-btn depressed class="flex-grow-1" @click='createTrader' color="primary">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'TraderNewTraderDialog',

    props: {
        showDialog: Boolean
    },

    data() {
        return {
            traderName: ''
        }
    },

    computed: {
        dialog: {
            get: function() {
                return this.showDialog
            },
            set: function(val) {
                this.$emit('update:showDialog', val);
            }
        }
    },

    methods: {

        /**
         * Creates a new trader and appends to the traderConfig
         */
        createTrader()
        {
            this.dialog = false;

            this.$store.state.traderModule.traderConfig.createTrader(this.traderName);
        }
    }
}
</script>