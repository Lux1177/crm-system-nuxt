<script setup lang="ts">

import {account} from '@/utils/appwrite'

const isLoadingStore = useIsLoadingStore()
const store = useAuthStore()
const router = useRouter()

onMounted(async () => {
		try {
				const user = await account.get()
				if (user) store.set(user)
		} catch (error) {
				await router.push('/login')
		} finally {
				isLoadingStore.set(false)
		}
})


</script>

<template>

		<LayoutLoader v-if="isLoadingStore.isLoading"/>
		<section v-else :class="{grid: store.isAuth}" style="min-height: 100vh">
				<aside>
						<LayoutSidebar v-if="store.isAuth" />
				</aside>
				<div>
						<slot/>
				</div>
		</section>

</template>

<style scoped>

.grid {
		display: grid;
		grid-template-columns: 1fr 6fr;
}

</style>