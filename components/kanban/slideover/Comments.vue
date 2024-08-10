<script setup lang="ts">

import {useDealSlideStore} from "~/store/deal-slide.store";
import type {IDeal} from "@/types/deals.types";
import {useCommentMutation} from "~/components/kanban/slideover/useCreateComment";
import {useCommentsByDeal} from "~/components/kanban/slideover/useComments";
import dayjs from "dayjs";


const {data, refetch, isLoading} = useCommentsByDeal()
const {commentRef, writeComment} = useCommentMutation({refetch})

const card = data as unknown as IDeal

</script>

<template>

    <UiInput placeholder="Оставьте комментарий" v-model="commentRef" @keyup.enter="writeComment"/>

    <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5"/>

    <div v-else-if="card">
        <div
            v-for="comment in card?.comments"
            :key="comment.$id"
            class="flex items-start mt-5">

            <Icon name="radix-icons:chat-bubble" class="mr-3 mt-1" size="20"/>

            <div class="border-border bg-black/20 rounded p-3 w-full">

                <div class="flex justify-between mb-2 text-sm text-gray-500">
                    Комментарий <span>{{ dayjs(comment.$createdAt).format('HH:mm') }}</span>
                </div>

                <p>{{ comment.text }}</p>

            </div>

        </div>
    </div>

</template>

<style scoped>

</style>