<template>

    <div>

        <v-navigation-drawer permanent app clipped>
            
            <v-list-item>

                <v-list-item-content>
                    <v-list-item-title class="title">Trader Configurator</v-list-item-title>

                    <p class="mt-1 text-caption">Use this tool to safely manipulate your TraderConfig.txt file.</p>
                </v-list-item-content>

            </v-list-item>

            <v-divider></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-item link @click="importFile">
                    <v-list-item-icon>
                        <v-icon>fas fa-file-import</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Import Config</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <trader-export-dialog/>
            </v-list>

            <v-divider></v-divider>

            <v-treeview
                :active.sync='currentCategory'
                v-if="treeViewTrader"
                :items="treeViewTrader"
                item-key="key"
                item-text="name"
                item-children="items"
                :open-on-click="true"
                :multiple-active="false"
                activatable
                dense
                hoverable
            >
                <template v-slot:append="{item, open}">
                    <v-btn fab x-small text color="primary"
                        @click='(e) => createCategory(e, item.key)'
                        v-if="item.type === 'trader' && (open || item.items.length === 0)">
                        <v-icon>
                            fas fa-plus
                        </v-icon>
                    </v-btn>

                    <boolean-dialog v-if="item.type === 'trader' && open"
                        title="Remove Trader"
                        :subtitle="`Remove trader ${ trader(item.typeId).typeName }?`"
                        message="This is irreversible and you will lose the trader along with all of the categories within it. You have been warned."
                        yes-text="Remove"
                        @yes-click="deleteTrader(item.typeId)"
                    >
                        <template v-slot:default='on'>
                            <v-btn fab x-small text color="grey" v-on="on">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                        </template>
                    </boolean-dialog>


                    <boolean-dialog v-if="item.type === 'category'"
                        title="Remove Category"
                        :subtitle="`Remove category ${ category(item.typeId, item.categoryId).categoryName } from trader ${ trader(item.typeId).typeName }?`"
                        message="This is irreversible and you will lose the category along with all of the entries within it. You have been warned."
                        yes-text="Remove"
                        @yes-click="deleteCategory(item.typeId, item.categoryId)"
                    >
                        <template v-slot:default='on'>
                            <v-btn fab x-small text color="grey" v-on="on">
                                <v-icon>fas fa-trash-alt</v-icon>
                            </v-btn>
                        </template>
                    </boolean-dialog>
                </template>
            </v-treeview>

            <v-divider></v-divider>
            <v-list
                dense
                nav
            >
                <v-list-item link @click="createTrader()" :disabled="!isConfigImported">
                    <v-list-item-icon>
                        <v-icon>fas fa-plus</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>New Trader</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>

        <trader-new-category-dialog 
            :showDialog.sync='newCategory.dialog'
            :traderId='newCategory.traderId'
        />

        <trader-new-trader-dialog
            :showDialog.sync='newTrader.dialog'
        />
    </div>
</template>

<script>
import TraderConfig from '../classes/TraderConfig';
import TraderNewCategoryDialog from './TraderNewCategoryDialog';
import TraderNewTraderDialog from './TraderNewTraderDialog';
import TraderExportDialog from './TraderExportDialog';

import { BooleanDialog } from './Dialogs/index';

import { mapGetters } from 'vuex';

export default {
    name: "trader-nav-drawer",

    components: {
        BooleanDialog,

        TraderNewCategoryDialog,
        TraderNewTraderDialog,
        TraderExportDialog
    },

    data() {
        return {
            currentCategory: [],

            newCategory: {
                dialog: false,
                traderId: -1
            },

            newTrader: {
                dialog: false
            }
        }
    },

    computed: {
        ...mapGetters([
            'trader',
            'category',
            'isConfigImported'
        ]),

        treeViewTrader: function() {
            if (!this.isConfigImported) return false;
            return this.$store.state.traderModule.traderConfig.types.map((type, typeIndex) => {
                return {
                    name: type.typeName,
                    type: 'trader',
                    items: type.categories.map((category, categoryIndex) => {
                        return {
                            name: category.categoryName,
                            type: 'category',
                            key: typeIndex + " " + categoryIndex,
                            typeId: typeIndex,
                            categoryId: categoryIndex
                        }
                    }),
                    key: typeIndex,
                    typeId: typeIndex
                }
            });
        }
    },

    methods: {
        /**
         * Imports the TraderConfig.txt file and stores it in traderModule store
         */
        importFile()
        {
            // Create file input
            const input = document.createElement("input");
            input.type = "file";

            input.onchange = e => {
                // Start loading
                this.$store.state.loading = true;

                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        this.$store.commit('setTraderConfig', new TraderConfig(reader.result.replace(/\r/g, "\n")));
                    } catch (err)
                    {
                        this.$store.commit('addNotification', "Config is malformed. DM @0lunarmare#9262 on Discord for help.");
                    }

                    // Stop loading
                    this.$store.state.loading = false;
                }
                reader.readAsText(file, 'UTF-8');
            }

            input.click();
        },

        /**
         * Creates a new category
         */
        createCategory(event, traderId) {
            event.stopPropagation();
            this.newCategory.traderId = traderId;
            this.newCategory.dialog = true;
        },

        /**
         * Deletes a category
         */
        deleteCategory(typeId, categoryId) {
            console.log(typeId);
            console.log(this.trader(typeId));

            this.trader(typeId).deleteCategory(categoryId);
        },

        /**
         * Creates a trader
         */
        createTrader() {
            this.newTrader.dialog = true;
        },

        /**
         * Deletes a trader
         */
        deleteTrader(traderId) {
            this.$store.state.traderModule.traderConfig.deleteTrader(traderId);
        }
    },

    watch: {
        currentCategory: function(newVal) {
            if (newVal.length == 0) return;
            let indices = newVal[0].toString().split(" ");
            if (indices.length === 1) return;
            let category = this.$store.state.traderModule.traderConfig.types[indices[0]].categories[indices[1]];
            this.$store.commit('setCurrentCategory', category);
        }
    }
}
</script>