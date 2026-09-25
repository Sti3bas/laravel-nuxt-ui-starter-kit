<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';
import type { Passkey } from '@/types/auth';
import { ref } from 'vue';

const { t } = useI18n();

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
                    {{ t('Added {time}', { time: passkey.created_at_diff }) }}
                    <template v-if="passkey.last_used_at_diff">
                        <span class="mx-1 text-dimmed">/</span>
                        {{ t('Last used {time}', { time: passkey.last_used_at_diff }) }}
                    </template>
                </p>
            </div>
        </div>

        <UModal
            v-model:open="open"
            :title="t('Remove passkey')"
            :description="
                t('Are you sure you want to remove the {name} passkey? You will no longer be able to use it to sign in.', {
                    name: `&quot;${passkey.name}&quot;`,
                })
            "
            :ui="{ footer: 'justify-end' }"
        >
            <UButton icon="i-lucide-trash-2" color="error" variant="ghost" size="sm" :aria-label="t('Remove')" />

            <template #footer="{ close }">
                <UButton :label="t('Cancel')" color="neutral" variant="outline" @click="close" />
                <UButton color="error" :label="isDeleting ? t('Removing...') : t('Remove passkey')" :loading="isDeleting" @click="handleDelete" />
            </template>
        </UModal>
    </div>
</template>
