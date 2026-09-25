<script setup lang="ts">
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController';
import Heading from '@/components/Heading.vue';
import PasskeyItem from '@/components/PasskeyItem.vue';
import PasskeyRegister from '@/components/PasskeyRegister.vue';
import type { Passkey } from '@/types/auth';
import { router } from '@inertiajs/vue3';

export type Props = {
    canManagePasskeys?: boolean;
    passkeys?: Passkey[];
};

withDefaults(defineProps<Props>(), {
    canManagePasskeys: false,
    passkeys: () => [],
});

const handleDelete = (id: number, onError: () => void) => {
    router.delete(destroy.url(id), {
        preserveScroll: true,
        onError,
    });
};

const handleRegisterSuccess = () => {
    router.reload();
};
</script>

<template>
    <div v-if="canManagePasskeys" class="space-y-6">
        <Heading variant="small" title="Passkeys" description="Manage your passkeys for passwordless sign-in" />

        <div class="divide-y divide-default overflow-hidden rounded-lg border border-default">
            <template v-if="passkeys.length">
                <PasskeyItem v-for="passkey in passkeys" :key="passkey.id" :passkey="passkey" @remove="handleDelete" />
            </template>

            <div v-else class="p-8 text-center">
                <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-elevated">
                    <UIcon name="i-lucide-key-round" class="h-7 w-7 text-muted" />
                </div>
                <p class="font-medium text-highlighted">No passkeys yet</p>
                <p class="mt-1 text-sm text-muted">Add a passkey to sign in without a password</p>
            </div>
        </div>

        <PasskeyRegister @success="handleRegisterSuccess" />
    </div>
</template>
