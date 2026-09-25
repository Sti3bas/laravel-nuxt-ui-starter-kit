<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import type { UrlMethodPair } from '@inertiajs/core';
import { router } from '@inertiajs/vue3';
import { usePasskeyVerify } from '@laravel/passkeys/vue';

type Props = {
    routes?: {
        options: UrlMethodPair;
        submit: UrlMethodPair;
    };
    label?: string;
    loadingLabel?: string;
    separator?: string;
};

const props = defineProps<Props>();

const { verify, isLoading, error, isSupported } = usePasskeyVerify({
    ...(props.routes
        ? {
              routes: {
                  options: props.routes.options.url,
                  submit: props.routes.submit.url,
              },
          }
        : {}),
    onSuccess: (response) => {
        router.visit(response.redirect ?? '/dashboard');
    },
});
</script>

<template>
    <div v-if="isSupported">
        <div class="grid gap-2">
            <UButton
                type="button"
                color="neutral"
                variant="outline"
                class="w-full"
                icon="i-lucide-key-round"
                :label="isLoading ? (props.loadingLabel ?? 'Authenticating...') : (props.label ?? 'Sign in with a passkey')"
                :loading="isLoading"
                @click="verify"
            />

            <div v-if="error" class="text-center">
                <InputError :message="error" />
            </div>
        </div>

        <USeparator :label="props.separator ?? 'Or continue with email'" class="my-6" />
    </div>
</template>
