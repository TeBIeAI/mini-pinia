<template>
	<div class="child">
		<h1>我是子组件</h1>
		<div>{{ countStore.countSetup }} || {{ countStore.getCountSetup }}</div>
		<button @click="handleClick">切换全局state</button>
	</div>
</template>
<script setup>
import { counterSetupStore } from '../../store/counterSetup'

const countStore = counterSetupStore()

const handleClick = () => {
	countStore.add(500)
}
</script>

<style scoped>
.child {
	margin-top: 50px;
	background-color: #666;
	color: #fff;
}
</style>
