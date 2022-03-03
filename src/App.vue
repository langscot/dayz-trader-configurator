<template>
    <v-app>
        <toast-notifier/>

        <v-app-bar
            style="z-index:9999;"
            app
            color="primary"
            dark
            dense
            flat
            clipped-left
        >

        <h2 class="title font-weight-regular">
            <b>DayZ</b> Server Tools
        </h2>

        <v-spacer></v-spacer>

        <!-- <a class="support-link" href="https://www.buymeacoffee.com/lunarmare" target="_blank" rel="noreferrer">Please support me by; Buy me a coffee</a> -->
        <h3 class="title">Made by @0lunarmare#9262</h3>

        <nav>
            <v-btn 
                depressed 
                outlined 
                v-for="nav in navList" 
                :key="nav.name" 
                :href="nav.path"
                v-text="nav.name"
            />
        </nav>

        </v-app-bar>

        <trader-nav-drawer/>

        <v-main>
            <v-progress-linear indeterminate color="secondary" v-if='$store.state.loading'/>

            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import TraderNavDrawer from './components/TraderNavDrawer'
import ToastNotifier from './components/ToastNotifier'

export default {
    name: 'App',

    components: { TraderNavDrawer, ToastNotifier },

    data() {
        return {
            navList: [
               // { name: "Trader Configurator", path: "/trader" }
            ]
        }
    }
};
</script>

<style lang="scss" scoped>
.support-link {
    color: white;
    font-size: 1.5em;
    margin-right: 100px;
}
</style>