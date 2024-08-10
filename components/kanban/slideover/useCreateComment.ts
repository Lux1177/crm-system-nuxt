import {useMutation} from "@tanstack/vue-query";
import {v4 as uuidv4} from "uuid";
import {COLLECTION_COMMENTS, COLLECTION_DEALS, DB_ID} from "~/app.constants";


export function useCommentMutation({ refetch }: { refetch: () => void }) {
	const store = useDealSlideStore()
	const commentRef = ref<string>()

	const {mutate} = useMutation({
		mutationKey: ['add comment', commentRef.value],
		mutationFn: () => DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuidv4(), {
			text: commentRef.value,
			deal: store.card?.id
		}),
		onSuccess: () => {
			refetch()
			commentRef.value = ''
		},
	})
	const writeComment = () => {
		if (!commentRef.value) return
		mutate()
	}
	return {
		writeComment,
		commentRef
	}

}

