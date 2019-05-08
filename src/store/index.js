import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let config = {
  state: {
    //异步加载相关
    loading: false,
    globalLoadingTimer: false,
    promiseObj: [] //请求队列
  },
  mutations: {
    updateLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    globalLoading({ state }, promise) {
      if (!state.globalLoadingTimer) {
        state.promiseObj.push(promise);
        setTimeout(() => {
          state.globalLoadingTimer = true;
          Promise.all(state.promiseObj)
            .then(() => {
              state.globalLoadingTimer = false;
              state.loading = false;
            })
            .catch(() => {
              state.globalLoadingTimer = false;
              state.loading = false;
            });
          state.promiseObj = [];
        }, 1000);
      }
    }
  },
  getters: {}
};

let store = new Vuex.Store(config);

export default store;
