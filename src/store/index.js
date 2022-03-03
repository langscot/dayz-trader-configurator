import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import traderModule from './trader.module';

export default new Vuex.Store({
    state: {
        notification: '',
        loading: false
    },
    mutations: {
        addNotification(state, message) {
            state.notification = message
        }
    },
    actions: {
    },
    modules: {
        traderModule
    }
});