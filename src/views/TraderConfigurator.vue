<template>
    <div class="trader-configurator">

        <trader-error-list
            v-if='errorEntries'
            :entries='errorEntries'
        />

        <trader-editor v-if="$store.state.traderModule.currentCategory"/>

    </div>
</template>

<script>

import TraderEditor from '../components/TraderEditor';
import TraderErrorList from '../components/TraderErrorList';

export default {
    name: 'TraderConfigurator',
    components: { TraderEditor, TraderErrorList },

    computed: {
        isConfigImported: function() {
            return this.$store.state.traderModule.traderConfig !== null
        },
        

        currentCategory: function() {
            return this.$store.state.traderModule.currentCategory;
        },

        errorEntries: function() {
            return this.currentCategory !== null ? this.currentCategory.entries.filter(entry => {
                return entry.errors && entry.errors.length > 0
            }) : []
        }
    },

    beforeMount() {
        window.onload = () => {
            window.addEventListener("beforeunload", (e) => {
                if (this.isConfigImported) {
                    let msg = "You may have unsaved changes. Please make sure to export your config file before leaving.";
                    (e || window.event).returnValue = msg;
                    return msg;
                }
            })
        }
    }
}
</script>
