<template>
	<div>
		<div>
			<h1>原版pinia</h1>
			<p>----- options -------</p>
			{{ counterPinia1.count }} || {{ counterPinia1.getCount }}
			<div>
				<button @click="handleAddPinia">添加</button>
				<button @click="handleResetPinia">重置state</button>
				<button @click="stopReactiveHandle">停止响应式</button>
			</div>
		</div>
		<h1>mini pinia</h1>
		<p>----- options -------</p>
		{{ counter.count }} || {{ counter.getCount }}
		<div>
			<button @click="handleAdd">添加</button>
			<button @click="handleMiniResetPinia">重置state</button>
			<button @click="stopMiniReactiveHandle">停止响应式</button>
		</div>
		<p>----- setup -------</p>
		{{ counterSetup.countSetup }} || {{ counterSetup.getCountSetup }}
		<div>
			<button @click="handleSetupAdd">添加</button>
		</div>
	</div>

	<Child />
</template>

<script setup>
import { counterPinia } from '../store/counterPinia'
import { counterSetupPinia } from '../store/counterSetupPinia'
import { counterStore } from '../store/counter'
import { counterSetupStore } from '../store/counterSetup'
import Child from './components/HelloWorld.vue'

const counterPinia1 = counterPinia()
const counterSetupPinia1 = counterSetupPinia()
const counter = counterStore()
const counterSetup = counterSetupStore()
console.log(counterPinia1)
console.log(counterSetupPinia1)
console.log(counter)
console.log(counterSetup)

const handleAdd = () => {
	counter.add(100)

	// counter.$patch({
	// 	count: 2000
	// })
}

const handleSetupAdd = () => {
	// counterSetup.add(20)
	counterSetup.$patch(() => {
		counterSetup.countSetup += 2000
	})
}

const handleAddPinia = () => {
	// counterPinia1.$patch({
	// 	count: 1000
	// })
	counterPinia1.$patch(() => {
		counterPinia1.count += 1000
	})
}

const handleResetPinia = () => {
	counterPinia1.$reset()
}

const handleMiniResetPinia = () => {
	counter.$reset()
}

const stopReactiveHandle = () => {
	counterPinia1._p._e.scopes[0].stop()
}

const stopMiniReactiveHandle = () => {
	counter.$stop()
}
</script>

<style scoped></style>
