<script setup lang="ts">
import type { Passkey } from '@/types/auth';
import { ref } from 'vue';

const props = defineProps<{
    passkey: Passkey;
}>();

const emit = defineEmits<{
    remove: [id: number, onError: () => void];
}>();

const open = ref(false);
const isDeleting = ref(false);

const handleDelete = () => {
    isDeleting.value = true;
    emit('remove', props.passkey.id, () => {
        isDeleting.value = false;
    });
};
</script>

<template>
    <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elevated">
                <UIcon name="i-lucide-key-round" class="h-5 w-5 text-muted" />
            </div>
            <div class="space-y-1">
                <div class="flex items-center gap-2.5">
                    <p class="font-medium tracking-tight text-highlighted">{{ passkey.name }}</p>
                    <UBadge v-if="passkey.authenticator" color="neutral" variant="subtle" size="sm" :label="passkey.authenticator" />
                </div>
                <p class="text-sm text-muted">
                    Added {{ passkey.created_at_diff }}
                    <template v-if="passkey.last_used_at_diff">
                        <span class="mx-1 text-dimmed">/</span>
                        Last used {{ passkey.last_used_at_diff }}
                    </template>
                </p>
            </div>
        </div>

        <UModal
            v-model:open="open"
            title="Remove passkey"
            :description="`Are you sure you want to remove the &quot;${passkey.name}&quot; passkey? You will no longer be able to use it to sign in.`"
            :ui="{ footer: 'justify-end' }"
        >
            <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="sm" aria-label="Remove" />

            <template #footer="{ close }">
                <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
                <UButton color="error" :label="isDeleting ? 'Removing...' : 'Remove passkey'" :loading="isDeleting" @click="handleDelete" />
            </template>
        </UModal>
    </div>
</template>
