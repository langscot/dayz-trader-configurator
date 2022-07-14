<template>
    <v-dialog v-model="dialog" width="500">

        <template v-slot:activator='{ on }'>
            <v-list-item link v-on='on' :disabled='!isConfigImported'>
                <v-list-item-icon>
                    <v-icon>fas fa-save</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Export Config</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-card>
            <v-card-title>Export Config</v-card-title>
            <v-card-subtitle>How would you like your config formatted?</v-card-subtitle>
            <v-divider class="mb-5"></v-divider>

            <v-card-text>

                <v-select filled label="Sort items by"
                    :items="sortOptions"
                    item-value="id"
                    item-text="name"
                    v-model="sortEntriesBy"
                />
            </v-card-text>

            <v-card-actions class="d-flex flex-row flex-justify-right">
                <v-btn depressed class="flex-grow-1" @click='dialog = false'>Cancel</v-btn>
                <v-btn depressed class="flex-grow-1" @click='exportConfig()' color="primary">Export</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

import { mapGetters } from 'vuex'

import TraderConfig from '../classes/TraderConfig';

export default {
    name: 'TraderExportDialog',

    data() {
        return {
            dialog: false,
            sortEntriesBy: '',
            sortOptions: [
                {
                    id: 'asc buyPrice',
                    name: 'Buy Price Ascending'
                },
                {
                    id: 'desc buyPrice',
                    name: 'Buy Price Descending'
                },
                {
                    id: 'asc sellPrice',
                    name: 'Sell Price Ascending'
                },
                {
                    id: 'desc sellPrice',
                    name: 'Sell Price Descending'
                },
                {
                    id: 'asc className',
                    name: 'Name'
                }
            ]
        }
    },

    computed: {
        ...mapGetters([
            'isConfigImported'
        ])
    },

    methods: {

        /**
         * Creates a new category and appends to the trader
         */
        exportConfig()
        {
            // Start loading
            this.$store.state.loading = true;

            const text = this.$store.state.traderModule.traderConfig.formatConfig();

            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'TraderConfig.txt');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);

            // Stop loading
            this.$store.state.loading = false;

            this.dialog = false;
        }
    },

    watch: {
        sortEntriesBy: function(newVal) {
            TraderConfig.sortEntriesBy = newVal;
        }
    }
}
</script>