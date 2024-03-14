<script setup>
import { ref, inject, reactive, watch, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import BaseCardList from '../components/BaseCardList.vue'

const items = ref([])

const { cart, addToCart, removeFromCart } = inject('cart')

const filters = reactive({
	sortBy: 'title',
	searchQuery: ''
})

const onClickAddPlus = item => {
	if (!item.isAdded) {
		addToCart(item)
	} else {
		removeFromCart(item)
	}
}

const onChangeSelect = e => {
	filters.sortBy = e.target.value
}

const onChangeSearchInput = debounce(e => {
	filters.searchQuery = e.target.value
}, 300)

const addToFavorite = async item => {
	try {
		if (!item.isFavorite) {
			const obj = {
				item,
				parentId: item.id
			}

			item.isFavorite = true

			const { data } = await axios.post(
				'https://bfe7e54d752dad44.mokky.dev/favorites',
				obj
			)
			item.favoriteId = data.id
		} else {
			item.isFavorite = false

			await axios.delete(
				`https://bfe7e54d752dad44.mokky.dev/favorites/${item.favoriteId}`
			)

			item.favoriteId = null
		}
	} catch (error) {
		console.log(error)
	}
}

const fetchItems = async () => {
	try {
		const params = {
			sortBy: filters.sortBy
		}

		if (filters.searchQuery) {
			params.title = `*${filters.searchQuery}*`
		}

		const { data } = await axios.get(
			'https://bfe7e54d752dad44.mokky.dev/items',
			{
				params: params
			}
		)

		items.value = data.map(obj => ({
			...obj,
			isFavorite: false,
			favoriteId: null,
			isAdded: false
		}))
	} catch (error) {
		console.log(error)
	}
}

const fetchFavorites = async () => {
	try {
		const { data: favorites } = await axios.get(
			'https://bfe7e54d752dad44.mokky.dev/favorites'
		)

		items.value = items.value.map(item => {
			const favorite = favorites.find(favorite => favorite.parentId === item.id)

			if (!favorite) {
				return item
			}

			return {
				...item,
				isFavorite: true,
				favoriteId: favorite.id
			}
		})
	} catch (error) {
		console.log(error)
	}
}

onMounted(async () => {
	const localCart = localStorage.getItem('cart')
	cart.value = localCart ? JSON.parse(localCart) : []

	await fetchItems()
	await fetchFavorites()

	items.value = items.value.map(item => ({
		...item,
		isAdded: cart.value.some(cartItem => cartItem.id === item.id)
	}))
})

watch(cart, () => {
	items.value = items.value.map(item => ({
		...item,
		isAdded: false
	}))
})

watch(filters, fetchItems)
</script>

<template>
	<div class="flex justify-between items-center">
		<h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

		<div class="flex gap-4">
			<select
				@change="onChangeSelect"
				name=""
				id=""
				class="py-2 px-3 border rounded-md outline-none bg-transparent"
			>
				<option value="name">По названию</option>
				<option value="price">По цене (дешевые)</option>
				<option value="-price">По цене (дорогие)</option>
			</select>

			<div class="relative">
				<img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
				<input
					@input="onChangeSearchInput"
					class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
					type="text"
					placeholder="Поиск..."
				/>
			</div>
		</div>
	</div>
	<div class="mt-10">
		<BaseCardList
			:items="items"
			@add-to-favorite="addToFavorite"
			@add-to-cart="onClickAddPlus"
		/>
	</div>
</template>
