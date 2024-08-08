<script setup lang="ts">

import { v4 as uuid } from 'uuid'

// Title with useHead
useHead({
		title: 'Login | CRM System'
})

// Title with useSeoMeta
// useSeoMeta({
// 		title: 'Login | CRM System'
// })

const userLogin = reactive({
		email: '',
		password: '',
})

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
		isLoadingStore.set(true)
		await account.createEmailPasswordSession(userLogin.email, userLogin.password)
		const response = await account.get()
		if (response) {
				authStore.set({
						email: response.email,
						name: response.name,
						status: response.status,
				})
		}

		userLogin.email = ''
		userLogin.password = ''

		await router.push('/')
		isLoadingStore.set(false)
}

const register = async () => {
		await account.create(uuid(), userLogin.email, userLogin.password)
		await login()
}

</script>

<template>

		<div class="flex items-center justify-center min-h-screen w-full">
				<div class="rounded-lg bg-sidebar w-1/4 p-5">
						<h1 class="text-2xl font-bold text-center mb-5">Login</h1>

						<form>
								<UiInput placeholder="Email" type="email" class="mb-3" v-model="userLogin.email" />
								<UiInput placeholder="Password" type="password" class="mb-3" v-model="userLogin.password" />
								<div class="flex items-center justify-center gap-5">
										<UiButton type="button" @click="login" >Login</UiButton>
										<UiButton type="button" @click="register" >Register</UiButton>
								</div>
						</form>

				</div>
		</div>

</template>

<style scoped>

</style>