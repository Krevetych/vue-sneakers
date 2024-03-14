<script setup>
import { ref, inject, computed } from 'vue'
import axios from 'axios'
import BaseDrawerHead from './BaseDrawerHead.vue'
import BaseDrawerCardList from './BaseDrawerCardList.vue'
import InfoBlock from './InfoBlock.vue'

const { cart } = inject('cart')

const props = defineProps({
	totalPrice: Number,
	vatPrice: Number
})

const isCreating = ref(false)
const orderId = ref(null)

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value)

const createOrder = async () => {
	try {
		isCreating.value = true
		const { data } = await axios.post(
			'https://bfe7e54d752dad44.mokky.dev/orders',
			{
				items: cart.value,
				totalPrice: props.totalPrice
			}
		)

		cart.value = []

		orderId.value = data.id
	} catch (error) {
		console.log(error)
	} finally {
		isCreating.value = false
	}
}
</script>

<template>
	<div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
	<div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
		<BaseDrawerHead />

		<div v-if="!totalPrice || orderId" class="flex h-full items-center">
			<InfoBlock
				v-if="!totalPrice && !orderId"
				title="Корзина пустая"
				desc="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
				image-url="/package-icon.png"
			/>
			<InfoBlock
				v-if="orderId"
				title="Заказ оформлен!"
				:desc="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
				image-url="/order-success-icon.png"
			/>
		</div>

		<div v-else>
			<BaseDrawerCardList />

			<div class="flex flex-col gap-4 mt-7">
				<div class="flex gap-2">
					<span>Итого:</span>
					<div class="flex-1 border-b border-dashed border-slate-200"></div>
					<b>{{ totalPrice }} ₽</b>
				</div>

				<div class="flex gap-2">
					<span>Налог 5%:</span>
					<div class="flex-1 border-b border-dashed border-slate-200"></div>
					<b>{{ vatPrice }} ₽</b>
				</div>
				<button
					@click="createOrder"
					:disabled="cartButtonDisabled"
					class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white transition cursor-pointer hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400"
				>
					Оформить заказ
				</button>
			</div>
		</div>
	</div>
</template>
