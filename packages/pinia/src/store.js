import { isFunction, isObject } from './utils'
import {
	reactive,
	getCurrentInstance,
	inject,
	effectScope,
	computed
} from 'vue'
import { piniaSymbol } from './rootStore'

const createSetupStore = (id, setup, pinia) => {
	let scoped
	// 定义一个store
	let store = reactive({})
	if (!pinia._s.get(id)) {
		pinia._s.set(id, options)
	}

	const setupStore = pinia._e.run(() => {
		scoped = effectScope()
		return scoped.run(() => setup())
	})

	const wrapAction = (action, name) => {
		return function () {
			action.apply(store, arguments)
		}
	}

	for (const key in setupStore) {
		const current = setupStore[key]
		if (isFunction(current)) {
			setupStore[key] = wrapAction(current, key)
		}
	}

	Object.assign(store, setupStore)
	pinia._s.set(id, store)

	return store
}

const createOptionStore = (id, options, pinia) => {
	const { state, actions, getters } = options
	let scoped
	// 定义一个store
	let store = reactive({})
	if (!pinia._s.get(id)) {
		pinia._s.set(id, options)
	}

	const setup = () => {
		const localState = (pinia.state.value[id] = state ? state() : {})

		return Object.assign(
			localState,
			actions,
			Object.keys(getters).reduce((memo, key) => {
				memo[key] = computed(() => getters[key].call(store))
				return memo
			}, {})
		)
	}

	// const setupStore = pinia._e.run(() => {
	// 	scoped = effectScope()
	// 	return scoped.run(() => setup())
	// })

	// const wrapAction = (action, name) => {
	// 	return function () {
	// 		debugger
	// 		action.apply(store, arguments)
	// 	}
	// }

	// for (const key in setupStore) {
	// 	const current = setupStore[key]
	// 	if (isFunction(current)) {
	// 		setupStore[key] = wrapAction(current, key)
	// 	}
	// }

	// Object.assign(store, setupStore)
	// pinia._s.set(id, store)
	// 将所有
	store = createSetupStore(id, setup, pinia)

	return store
}

export const defineStore = (idOrOptions, setup) => {
	let id, options

	if (typeof idOrOptions === 'string') {
		id = idOrOptions
		options = setup
	}

	const useStroe = () => {
		const currentCompInstance = getCurrentInstance()

		const pinia = currentCompInstance && inject(piniaSymbol)

		if (isObject(setup)) {
			createOptionStore(id, options, pinia)
		} else {
			createSetupStore(id, setup, pinia)
		}

		const store = pinia._s.get(id)
		return store
	}

	return useStroe
}
