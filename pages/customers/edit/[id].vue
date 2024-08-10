<script setup lang="ts">

import {storage} from "@/utils/appwrite"
import {useMutation, useQuery} from "@tanstack/vue-query"
import {v4 as uuidv4} from "uuid"
import {COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID} from "~/app.constants"
import type {ICustomer} from "~/types/deals.types";

interface InputFileEvent extends Event {
    target: HTMLInputElement
}

interface ICustomerFormState extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {
}

useSeoMeta({
    title: 'Редактирование компании'
})

const route = useRoute()
const customerId = route.params.id as string

const {handleSubmit, defineField, setFieldValue, setValues, values} = useForm<ICustomerFormState>()

const {data, isSuccess} = useQuery({
    queryKey: ['get customer', customerId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
})

watch(isSuccess, () => {
    const initialData = data.value as unknown as ICustomerFormState
    setValues({
        email: initialData.email,
        avatar_url: initialData.avatar_url,
        from_source: initialData.from_source || '',
        name: initialData.name,
    })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromSource, fromSourceAttrs] = defineField('from_source')

const {mutate, isPending} = useMutation({
    mutationKey: ['update customer', customerId],
    mutationFn: (data: ICustomerFormState) => DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
})

const {mutate: uploadImage, isPendeing: isUploadImagePending} = useMutation({
    mutationKey: ['upload image'],
    mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuidv4(), file),

    onSuccess(data) {
        const response = storage.getFileDownload(STORAGE_ID, data.$id)
        setFieldValue('avatar_url', response.href)
    },
})

const onSubmit = handleSubmit(values => {
    mutate(values)
})

</script>

<template>

    <div class="p-10">

        <h1 class="font-bold text-2xl mb-10">
            Редактирование {{ (data as unknown as ICustomerFormState)?.name }}
        </h1>

        <form @submit="onSubmit" class="form">

            <UiInput
                placeholder="Наименование"
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                class="input"
            />

            <UiInput
                placeholder="Email"
                v-model="email"
                v-bind="emailAttrs"
                type="email"
                class="input"
            />

            <UiInput
                placeholder="Откуда пришел"
                v-model="fromSource"
                v-bind="fromSourceAttrs"
                type="text"
                class="input"
            />

            <img
                v-if="values.avatar_url || isUploadImagePending"
                :src="values.avatar_url"
                alt="avatar"
                width="50px"
                height="50px"
                class="rounded-full my-4"
            >
            <div class="grid w-full max-w-sm items-center gap-1.5 input">
                <label>
                    <div class="text-sm mb-2">Логотип</div>
                    <UiInput
                        type="file"
                        :onchange="(e:InputFileEvent) => e?.target.files?.length && uploadImage(e.target.files[0])"
                        :disabled="isUploadImagePending"
                    />
                </label>
            </div>

            <button :disabled="isPending" type="submit"
                    class="mt-3 inline-flex h-9 px-4 py-2 items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer bg-secondary text-secondary-foreground shadow-sm hover:bg-[#354359]">
                {{ isPending ? 'Загрузка...' : 'Сохранить' }}
            </button>

        </form>

    </div>

</template>

<style scoped>

.input {
    @apply border-[#161c26] mb-4 placeholder:text-[#748092] focus:border-border transition-colors;
}

</style>