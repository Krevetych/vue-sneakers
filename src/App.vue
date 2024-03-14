<script setup>
import { ref, watch, provide, computed } from 'vue'

import BaseHeader from './components/BaseHeader.vue'
import BaseDrawer from './components/BaseDrawer.vue'

const cart = ref([])

const drawerOpen = ref(false)

const totalPrice = computed(() =>
	cart.value.reduce((acc, item) => acc + item.price, 0)
)

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
	drawerOpen.value = false
}

const openDrawer = () => {
	drawerOpen.value = true
}

const addToCart = item => {
	cart.value.push(item)
	item.isAdded = true
}

const removeFromCart = item => {
	cart.value.splice(cart.value.indexOf(item), 1)
	item.isAdded = false
}

watch(
	cart,
	() => {
		localStorage.setItem('cart', JSON.stringify(cart.value))
	},
	{
		deep: true
	}
)

provide('cart', {
	cart,
	closeDrawer,
	openDrawer,
	addToCart,
	removeFromCart
})
</script>

<template>
	<BaseDrawer
		v-if="drawerOpen"
		:total-price="totalPrice"
		:vat-price="vatPrice"
	/>

	<div class="w-4/5 h-fit m-auto bg-white rounded-xl shadow-xl mt-14">
		<BaseHeader :total-price="totalPrice" @open-drawer="openDrawer" />

		<div class="p-10">
			<router-view></router-view>
		</div>
	</div>
</template>
