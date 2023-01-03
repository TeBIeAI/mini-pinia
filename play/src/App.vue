<template>
	<div>
		<p>----- options -------</p>
		{{ counter.count }} || {{ counter.getCount }}
		<div>
			<button @click="handleAdd">添加</button>
		</div>
	</div>
</template>

<script setup>
import { counterStore } from '../store/counter'

const counter = counterStore()
const { add } = counterStore()
console.log(counter)

const handleAdd = () => {
	counter.add(10)
}
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
