import { isFunction, isObject, isComputed, mergeState } from './utils'
import {
	reactive,
	getCurrentInstance,
	inject,
	effectScope,
	computed,
	isRef,
	isReactive,
	toRefs
} from 'vue'
import { piniaSymbol } from './rootStore'

const createSetupStore = (id, setup, pinia, isOption) => {
	let scoped

	const initialState = {
		$id: id,
		_p: pinia,
		$patch(optionsOrFn) {
			if (isFunction(optionsOrFn)) {
				optionsOrFn(pinia.state.value[id])
			} else {
				mergeState(pinia.state.value[id], optionsOrFn)
			}
		},
		$stop() {
			debugger
			scoped.stop()
		}
	}

	// 定义一个store
	let store = reactive(initialState)

	pinia.state.value[id] = pinia.state.value[id] || {}

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
		if (!isOption) {
			if ((isRef(current) && !isComputed(current)) || isReactive(current)) {
				pinia.state.value[id][key] = current
			}
		}
	}

	Object.assign(store, setupStore)
	if (!pinia._s.get(id)) {
		pinia._s.set(id, store)
	}
	return store
}

const createOptionStore = (id, options, pinia) => {
	let { state, actions, getters } = options
	// 定义一个store
	let store

	const setup = () => {
		pinia.state.value[id] = state ? state() : {}
		const localState = toRefs(pinia.state.value[id])
		const getGetters = Object.keys(getters).reduce((memo, key) => {
			memo[key] = computed(() => getters[key].call(store))
			return memo
		}, {})

		return Object.assign(localState, actions, getGetters)
	}

	store = createSetupStore(id, setup, pinia, true)
	store.$reset = () => {
		const newValue = state()
		store.$patch(state => {
			Object.assign(state, newValue)
		})
	}

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
