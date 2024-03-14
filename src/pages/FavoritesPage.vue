<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import BaseCardList from '../components/BaseCardList.vue'

const favorites = ref([])

onMounted(async () => {
	try {
		const { data } = await axios.get(
			'https://bfe7e54d752dad44.mokky.dev/favorites'
		)
		favorites.value = data.map(obj => obj.item)
	} catch (error) {
		console.log(error)
	}
})
</script>

<template>
	<h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
	<BaseCardList :items="favorites" is-favorites />
</template>
