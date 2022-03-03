<template>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-title>New Category</v-card-title>
            <v-card-subtitle>Create a new category in {{ traderName }}</v-card-subtitle>
            <v-divider class="mb-5"></v-divider>

            <v-card-text>
                <v-text-field
                    label="Category Name"
                    filled
                    clearable
                    hint="This will appear in your Trader menu."
                    required
                    v-model='categoryName'
                />
            </v-card-text>

            <v-card-actions class="d-flex flex-row flex-justify-right">
                <v-btn depressed class="flex-grow-1" @click='dialog = false'>Cancel</v-btn>
                <v-btn depressed class="flex-grow-1" @click='createCategory' color="primary">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'TraderNewCategoryDialog',

    props: {
        showDialog: Boolean,
        traderId: Number
    },

    data() {
        return {
            categoryName: ''
        }
    },

    computed: {
        trader: function() {
            return this.traderId >= 0 ? 
            this.$store.state.traderModule.traderConfig.types[this.traderId] :
            false
        },

        traderName: function() {
            return this.trader ? this.trader.typeName : 'None selected'
        },

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
         * Creates a new category and appends to the trader
         */
        createCategory()
        {
            this.dialog = false;

            this.trader.createCategory(this.categoryName)
        }
    }
}
</script>