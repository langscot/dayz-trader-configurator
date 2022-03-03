import Vue from 'vue';


const state = {
    traderConfig: null,
    currentCategory: null
}

const getters = {
    isConfigImported: state => {
        return state.traderConfig !== null;
    },

    trader: state => traderId => {
        return state.traderConfig ? state.traderConfig.types[traderId] : false
    },

    category: state => (traderId, categoryId) => {
        return (state.traderConfig && state.traderConfig.types[traderId]) ? state.traderConfig.types[traderId].categories[categoryId] : false
    },

    currentCategory: state => {
        return state.currentCategory || false
    }
}

const actions = {

}

const mutations = {
    /**
     * Sets a new TraderConfig object
     * 
     * @param { TraderConfig } traderConfig 
     */
    setTraderConfig(state, traderConfig)
    {
        state.traderConfig = traderConfig;
    },

    /**
     * Stores a reference to the current category
     * 
     * @param { TraderCategory } currentCategory 
     */
    setCurrentCategory(state, currentCategory)
    {
        Vue.set(state, 'currentCategory', currentCategory);
    }
}

export default {
    state, mutations, actions, getters
}