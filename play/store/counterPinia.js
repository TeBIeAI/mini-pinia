// import { defineStore } from '@pinia/core'
import { defineStore } from 'pinia'

export const counterPinia = defineStore('counterPinia', {
	state: () => {
		return {
			count: 1,
			shuxing: 'shuxing'
		}
	},
	getters: {
		getCount() {
			return this.count * 2
		}
	},
	actions: {
		add(payload) {
			this.count += payload
		}
	}
})
