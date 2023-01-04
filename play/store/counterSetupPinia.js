import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const counterSetupPinia = defineStore('counterSetupPinia', () => {
	const countSetup = ref(1)
	const shuxing = ref('shuxing')

	const add = payload => {
		countSetup.value += payload
	}

	const getCountSetup = computed(() => {
		return countSetup.value * 2
	})

	return {
		shuxing,
		countSetup,
		add,
		getCountSetup
	}
})
