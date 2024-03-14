<script setup>
import { inject } from 'vue'
import BaseDrawerCard from './BaseDrawerCard.vue'

const { cart, removeFromCart } = inject('cart')
</script>

<template>
	<div class="flex flex-col flex-1 gap-4" v-auto-animate>
		<BaseDrawerCard
			v-for="item in cart"
			:key="item.id"
			:title="item.title"
			:img-url="item.imageUrl"
			:price="item.price"
			@on-click-remove="() => removeFromCart(item)"
		/>
	</div>
</template>
