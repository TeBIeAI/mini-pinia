import { isRef } from 'vue'

export const isObject = v => typeof v === 'object' && v !== null

export const isFunction = fn => typeof fn === 'function'

export const isComputed = val => isRef(val) && val.effect

export const mergeState = (target, state) => {
	for (const key in state) {
		const oldValue = target[key]
		const newValue = state[key]
		if (isObject(newValue) && isObject(oldValue)) {
			target[key] = mergeState(target[key], state[key])
		} else {
			target[key] = newValue
		}
	}

	return target
}
