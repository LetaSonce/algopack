export const state = () => ({
    stacks: [
        {
            id: window.btoa('mean_reversion.py'),
            name: "mean_reversion.py"
        },
        {
            id: window.btoa('nlp.py'),
            name: "nlp.py"
        },
    ],
    accounts: [],
    strategies: [],
})

export const mutations = {
    ADD_STACK(state, stack) {
        state.stacks = [{ id: window.btoa(stack), name: stack }, ...state.stacks];
    },

    ADD_ACCOUNT(state, account) {
        state.accounts = [{ id: window.btoa(unescape(encodeURIComponent(Math.random()))), name: account, balance: 5000 }, ...state.accounts];
    },

    ADD_STRATEGY(state, strategy) {
        state.strategies = [strategy, ...state.strategies];
    },

    REMOVE_STACK(state, stack) {
        state.stacks = state.stacks.filter((item) => item.id !== stack)
    },

    REMOVE_ACCOUNT(state, account) {
        // state.accounts.splice(state.accounts.indexOf(account), 1);
        state.accounts = state.accounts.filter((item) => item.id !== account)
    },

    REMOVE_STRATEGY(state, strategy) {
        state.strategies = state.strategies.filter((item) => item.id !== strategy)
    }


}