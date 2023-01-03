import { defineStore } from '@pinia/core'
// import { defineStore } from 'pinia'

export const counterStore = defineStore('counter', {
	state: () => {
		return {
			count: 1
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
