import { ref, effectScope, provide } from 'vue'
import { piniaSymbol } from './rootStore'

export const createPinia = () => {
	// scoped 主要作用在于定义一个 store 响应式的作用域  可以实现开启关闭  stroe的响应式  调用scoped.stop()
	let scoped = effectScope(true)

	// 用来存储所有store中的state
	const state = ref({})

	const pinia = {
		install(app) {
			// 抛出全局store
			app.provide(piniaSymbol, pinia)
		},
		_s: new Map(), // 用来存放每一个id => store 的集合
		state,
		_e: scoped
	}

	return pinia
}
