<script setup>
import BaseCard from './BaseCard.vue'

defineProps({
	items: Array,
	isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
	<div class="grid grid-cols-4 gap-5" v-auto-animate>
		<BaseCard
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:title="item.title"
			:img-url="item.imageUrl"
			:price="item.price"
			:is-favorite="item.isFavorite"
			:is-added="item.isAdded"
			:on-click-favorite="
				isFavorites ? null : () => emit('addToFavorite', item)
			"
			:on-click-add="isFavorites ? null : () => emit('addToCart', item)"
		/>
	</div>
</template>
