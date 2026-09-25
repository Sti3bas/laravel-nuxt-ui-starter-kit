<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { useI18n } from '@/composables/useI18n';
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import { computed, ref, watchEffect } from 'vue';
import { store } from '@/routes/two-factor/login';
import type { TwoFactorConfigContent } from '@/types';

const { t } = useI18n();
const showRecoveryInput = ref<boolean>(false);
const code = ref<number[]>([]);

const authConfigContent = computed<TwoFactorConfigContent>(() => {
    if (showRecoveryInput.value) {
        return {
            title: t('Recovery code'),
            description: t('Please confirm access to your account by entering one of your emergency recovery codes.'),
            buttonText: t('login using an authentication code'),
        };
    }

    return {
        title: t('Authentication code'),
        description: t('Enter the authentication code provided by your authenticator application.'),
        buttonText: t('login using a recovery code'),
    };
});

watchEffect(() => {
    setLayoutProps({
        title: authConfigContent.value.title,
        description: authConfigContent.value.description,
    });
});

const toggleRecoveryMode = (clearErrors: () => void): void => {
    showRecoveryInput.value = !showRecoveryInput.value;
    clearErrors();
    code.value = [];
};
</script>

<template>
    <Head :title="t('Two-factor authentication')" />

    <div class="space-y-6">
        <template v-if="!showRecoveryInput">
            <Form v-bind="store.form()" class="space-y-4" reset-on-error @error="code = []" #default="{ errors, processing, clearErrors }">
                <div class="flex flex-col items-center justify-center space-y-3 text-center">
                    <div class="flex w-full items-center justify-center">
                        <UPinInput v-model="code" name="code" :length="6" type="number" otp :disabled="processing" autofocus />
                    </div>
                    <InputError :message="errors.code" />
                </div>
                <UButton type="submit" :label="t('Continue')" block :loading="processing" :disabled="code.join('').length < 6" />
                <div class="text-center text-sm text-muted">
                    <span>{{ t('or you can') }} </span>
                    <button
                        type="button"
                        class="font-medium text-default underline underline-offset-4 hover:text-highlighted"
                        @click="() => toggleRecoveryMode(clearErrors)"
                    >
                        {{ authConfigContent.buttonText }}
                    </button>
                </div>
            </Form>
        </template>

        <template v-else>
            <Form v-bind="store.form()" class="space-y-4" reset-on-error #default="{ errors, processing, clearErrors }">
                <UInput name="recovery_code" type="text" :placeholder="t('Enter recovery code')" v-focus required class="w-full" />
                <InputError :message="errors.recovery_code" />
                <UButton type="submit" :label="t('Continue')" block :loading="processing" />

                <div class="text-center text-sm text-muted">
                    <span>{{ t('or you can') }} </span>
                    <button
                        type="button"
                        class="font-medium text-default underline underline-offset-4 hover:text-highlighted"
                        @click="() => toggleRecoveryMode(clearErrors)"
                    >
                        {{ authConfigContent.buttonText }}
                    </button>
                </div>
            </Form>
        </template>
    </div>
</template>
