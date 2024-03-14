<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
	id: Number,
	title: String,
	imgUrl: String,
	price: Number
})
</script>

<template>
	<div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
		<img class="w-16 h-16" :src="imgUrl" :title="title" />
		<div class="flex flex-col flex-1">
			<p>{{ title }}</p>
			<div class="flex justify-between mt-2">
				<b class="flex-1">{{ price }} руб.</b>
				<img
					@click="emit('onClickRemove')"
					class="opacity-30 cursor-pointer transition hover:opacity-100"
					src="/close.svg"
					alt="Close"
				/>
			</div>
		</div>
	</div>
</template>
