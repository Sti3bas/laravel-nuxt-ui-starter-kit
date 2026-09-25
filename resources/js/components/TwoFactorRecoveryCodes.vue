<script setup lang="ts">
import AlertError from '@/components/AlertError.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { regenerateRecoveryCodes } from '@/routes/two-factor';
import { Form } from '@inertiajs/vue3';
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';

const { recoveryCodesList, fetchRecoveryCodes, errors } = useTwoFactorAuth();
const isRecoveryCodesVisible = ref<boolean>(false);
const recoveryCodeSectionRef = useTemplateRef('recoveryCodeSectionRef');

const toggleRecoveryCodesVisibility = async () => {
    if (!isRecoveryCodesVisible.value && !recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }

    isRecoveryCodesVisible.value = !isRecoveryCodesVisible.value;

    if (isRecoveryCodesVisible.value) {
        await nextTick();
        recoveryCodeSectionRef.value?.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(async () => {
    if (!recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }
});
</script>

<template>
    <UCard class="w-full">
        <template #header>
            <div class="flex items-center gap-3 font-medium">
                <UIcon name="i-lucide-lock-keyhole" class="size-4" />
                2FA recovery codes
            </div>
            <p class="mt-1 text-sm text-muted">
                Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager.
            </p>
        </template>

        <div class="flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between">
            <UButton
                :icon="isRecoveryCodesVisible ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :label="`${isRecoveryCodesVisible ? 'Hide' : 'View'} recovery codes`"
                color="neutral"
                variant="outline"
                class="w-fit"
                @click="toggleRecoveryCodesVisibility"
            />

            <Form
                v-if="isRecoveryCodesVisible && recoveryCodesList.length"
                v-bind="regenerateRecoveryCodes.form()"
                :options="{ preserveScroll: true }"
                @success="fetchRecoveryCodes"
                #default="{ processing }"
            >
                <UButton type="submit" color="neutral" variant="subtle" icon="i-lucide-refresh-cw" label="Regenerate codes" :loading="processing" />
            </Form>
        </div>

        <div :class="['relative overflow-hidden transition-all duration-300', isRecoveryCodesVisible ? 'h-auto opacity-100' : 'h-0 opacity-0']">
            <div v-if="errors?.length" class="mt-6">
                <AlertError :errors="errors" />
            </div>
            <div v-else class="mt-3 space-y-3">
                <div ref="recoveryCodeSectionRef" class="grid gap-1 rounded-lg bg-elevated p-4 font-mono text-sm">
                    <div v-if="!recoveryCodesList.length" class="space-y-2">
                        <USkeleton v-for="n in 8" :key="n" class="h-4" />
                    </div>
                    <div v-else v-for="(code, index) in recoveryCodesList" :key="index">
                        {{ code }}
                    </div>
                </div>
                <p class="text-xs text-muted select-none">
                    Each recovery code can be used once to access your account and will be removed after use. If you need more, click
                    <span class="font-bold">Regenerate codes</span> above.
                </p>
            </div>
        </div>
    </UCard>
</template>
