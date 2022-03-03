<template>
    <hot-table :settings="settings" class="ma-5" :key='key' ref='hot'/>
</template>

<script>
import { HotTable } from '@handsontable/vue'

import traderClassNames from '../assets/traderClassNames.json';

export default {
    name: 'TraderEditor',

    components: {
        HotTable
    },

    methods: {
        onUpdate(records) {
            // Update each record
            records.forEach(record => {
                if (record.name !== 'order') {
                    this.currentCategory.entries[record.keys[0]][record.name] = record.newVal
                }
            })
        },

        beforeChange(changes) {
            for(let i = 0; i < changes.length; i++) {

                // BUY PRICE
                if (changes[i][1] == 'buyPrice') {

                    let sellPrice = this.currentCategory.entries[changes[i][0]].sellPrice;

                    if ((changes[i][3] != -1 && parseInt(changes[i][3]) < parseInt(sellPrice))) {
                        this.$store.commit('addNotification', 'You have put the buy price less than the sell price.')
                        return true;
                    }
                }
                // SELL PRICE 
                else if (changes[i][1] == 'sellPrice') {

                    let buyPrice = this.currentCategory.entries[changes[i][0]].buyPrice;

                    if ((changes[i][3] != -1 && parseInt(changes[i][3]) > parseInt(buyPrice))) {
                        this.$store.commit('addNotification', 'You have put the sell price more than the buy price.');
                        return true;
                    }
                }
                // QUANTITY
                else if (changes[i][1] == 'quantity') {
                    let quantity = changes[i][3]
                    if (quantity !== null && !quantity.match(/(\*|V|S|M|VNK|W|K|[-0-9])/g)) {
                        this.$store.commit('addNotification', 'Invalid value for Quantity.');
                        return true;
                    }
                }
            }
        }
    },

    computed: {
        currentCategory: function() {
            return this.$store.state.traderModule.currentCategory
        },
        key: function() {
            return this.currentCategory.categoryName
        },
        settings: function() {
            return {
                stretchH: 'all',
                contextMenu: true,
                colWidths: 47,
                data: this.$store.state.traderModule.currentCategory.entries,
                manualColumnResize: true,
                manualRowResize: true,
                dataSchema: {
                    className: null,
                    quantity: null,
                    buyPrice: null,
                    sellPrice: null
                },
                colHeaders: ['Class Name', 'Quantity', 'Buy Price', 'Sell Price'],
                columns: [
                    { 
                        type: 'autocomplete',
                        data: 'className',
                        source: [...new Set(traderClassNames)]
                    },
                    { 
                        data: 'quantity',
                        type: 'autocomplete',
                        source: ['V', 'S', 'M', 'VNK', 'W', 'K', '*']
                    },
                    { data: 'buyPrice' },
                    { data: 'sellPrice' }
                ],
                minSpareRows: 1,
                maxSpareRows: 1,
                columnSorting: true,
                licenseKey: 'non-commercial-and-evaluation',
                beforeChange: this.beforeChange
            }
        }
    }
}
</script>
