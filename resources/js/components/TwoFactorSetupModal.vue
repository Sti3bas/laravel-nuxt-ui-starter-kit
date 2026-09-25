<script setup lang="ts">
import AlertError from '@/components/AlertError.vue';
import InputError from '@/components/InputError.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { confirm } from '@/routes/two-factor';
import type { TwoFactorConfigContent } from '@/types';
import { Form } from '@inertiajs/vue3';
import { useClipboard, useDark } from '@vueuse/core';
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';

type Props = {
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
};

const props = defineProps<Props>();
const isOpen = defineModel<boolean>('open');

const isDark = useDark();
const { copy, copied } = useClipboard();
const { qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors } = useTwoFactorAuth();

const showVerificationStep = ref(false);
const code = ref<number[]>([]);

const pinInputContainerRef = useTemplateRef('pinInputContainerRef');

const modalConfig = computed<TwoFactorConfigContent>(() => {
    if (props.twoFactorEnabled) {
        return {
            title: 'Two-factor authentication enabled',
            description: 'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
            buttonText: 'Close',
        };
    }

    if (showVerificationStep.value) {
        return {
            title: 'Verify authentication code',
            description: 'Enter the 6-digit code from your authenticator app',
            buttonText: 'Continue',
        };
    }

    return {
        title: 'Enable two-factor authentication',
        description: 'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
        buttonText: 'Continue',
    };
});

const handleModalNextStep = () => {
    if (props.requiresConfirmation) {
        showVerificationStep.value = true;

        nextTick(() => {
            pinInputContainerRef.value?.querySelector('input')?.focus();
        });

        return;
    }

    clearSetupData();
    isOpen.value = false;
};

const resetModalState = () => {
    if (props.twoFactorEnabled) {
        clearSetupData();
    }

    showVerificationStep.value = false;
    code.value = [];
};

watch(isOpen, async (open) => {
    if (!open) {
        resetModalState();

        return;
    }

    if (!qrCodeSvg.value) {
        await fetchSetupData();
    }
});
</script>

<template>
    <UModal v-model:open="isOpen" :title="modalConfig.title" :description="modalConfig.description" :ui="{ footer: 'justify-end' }">
        <template #body>
            <div class="relative flex w-full flex-col items-center justify-center space-y-5">
                <template v-if="!showVerificationStep">
                    <AlertError v-if="errors?.length" :errors="errors" />
                    <template v-else>
                        <div class="relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border border-default">
                            <div v-if="!qrCodeSvg" class="absolute inset-0 z-10 flex items-center justify-center bg-default">
                                <UIcon name="i-lucide-loader-circle" class="size-6 animate-spin text-muted" />
                            </div>
                            <div
                                v-else
                                v-html="qrCodeSvg"
                                class="flex aspect-square size-full items-center justify-center p-5"
                                :style="{ filter: isDark ? 'invert(1) brightness(1.5)' : undefined }"
                            />
                        </div>

                        <UButton :label="modalConfig.buttonText" block @click="handleModalNextStep" />

                        <USeparator label="or, enter the code manually" />

                        <div class="flex w-full items-stretch overflow-hidden rounded-xl border border-default">
                            <div v-if="!manualSetupKey" class="flex h-full w-full items-center justify-center bg-elevated p-3">
                                <UIcon name="i-lucide-loader-circle" class="size-4 animate-spin text-muted" />
                            </div>
                            <template v-else>
                                <input type="text" readonly :value="manualSetupKey" class="h-full w-full bg-default p-3 text-default" />
                                <button
                                    type="button"
                                    @click="copy(manualSetupKey || '')"
                                    class="relative block h-auto border-l border-default px-3 hover:bg-elevated"
                                >
                                    <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" :class="['w-4', copied && 'text-success']" />
                                </button>
                            </template>
                        </div>
                    </template>
                </template>

                <template v-else>
                    <Form
                        v-bind="confirm.form()"
                        error-bag="confirmTwoFactorAuthentication"
                        reset-on-error
                        @finish="code = []"
                        @success="isOpen = false"
                        v-slot="{ errors, processing }"
                        class="w-full"
                    >
                        <div ref="pinInputContainerRef" class="relative w-full space-y-3">
                            <div class="flex w-full flex-col items-center justify-center space-y-3 py-2">
                                <UPinInput v-model="code" name="code" :length="6" type="number" otp :disabled="processing" autofocus />
                                <InputError :message="errors?.code" />
                            </div>

                            <div class="flex w-full items-center gap-3">
                                <UButton
                                    label="Back"
                                    color="neutral"
                                    variant="outline"
                                    class="flex-1"
                                    :disabled="processing"
                                    @click="showVerificationStep = false"
                                />
                                <UButton label="Confirm" type="submit" class="flex-1" :loading="processing" :disabled="code.length < 6" />
                            </div>
                        </div>
                    </Form>
                </template>
            </div>
        </template>
    </UModal>
</template>
