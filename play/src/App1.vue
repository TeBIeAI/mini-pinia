<template>
	{{ counter.count }}
</template>

<script setup>
import { counterStore } from '../store/counter'

const counter = counterStore()
console.log(counter)
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
