import { createStore } from 'vuex'
import { App } from 'vue'

interface State {
    menus: { parentId: number }[]
}
const store = createStore<State>({
    state() {
        return {
            menus: []
        }
    },
    getters: {
        getNewMenus(state) {
            const newMenus = []
            // 获取旧的菜单
            const menus = state.menus;
            for (let i = 0; i < menus.length; i++) {
                if (menus[i].parentId === 0) {
                    // 一级菜单对象
                    newMenus.push(menus[i])
                } else {

                }
            }
            return newMenus
        }
    },
    mutations: {
        updateMenus(state, menus) {
            state.menus = menus
        }
    },
    actions: {},
    modules: {}
})

export const initStore = (app: App<Element>) => {
    app.use(store)
}