<script setup lang="ts">

import {useDealSlideStore} from "~/store/deal-slide.store";

const store = useDealSlideStore();

const isLocalOpened = computed({
    get: () => store.isOpen,
    set: value => {
        store.isOpen = value
    }
})

</script>

<template>

    <div>

        <USlideover v-model="isLocalOpened">

            <UCard
                class="flex flex-col flex-1 overflow-y-auto"
                :ui="{
                    body: { base: 'flex-1' },
                    ring: '',
                    divide: 'divide-y divide-border'
                   }"
            >

                <template #header>

                    <KanbanSlideoverTop/>

                </template>

                <KanbanSlideoverComments />

            </UCard>

        </USlideover>

    </div>

</template>

<style scoped>

</style>