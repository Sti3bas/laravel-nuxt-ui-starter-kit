<script setup lang="ts">
import TextLink from '@/components/TextLink.vue';
import { Form, Head } from '@inertiajs/vue3';
import { login } from '@/routes';
import { email } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Forgot password',
        description: 'Enter your email to receive a password reset link',
    },
});

defineProps<{
    status?: string;
}>();
</script>

<template>
    <Head title="Forgot password" />

    <UAlert v-if="status" :description="status" icon="i-lucide-circle-check" color="success" variant="subtle" class="mb-4" />

    <div class="space-y-6">
        <Form v-bind="email.form()" v-slot="{ errors, processing }">
            <UFormField label="Email" name="email" :error="errors.email">
                <UInput type="email" name="email" autocomplete="off" v-focus placeholder="email@example.com" class="w-full" />
            </UFormField>

            <div class="my-6 flex items-center justify-start">
                <UButton
                    type="submit"
                    label="Email password reset link"
                    class="w-full"
                    :loading="processing"
                    data-test="email-password-reset-link-button"
                />
            </div>
        </Form>

        <div class="space-x-1 text-center text-sm text-muted">
            <span>Or, return to</span>
            <TextLink :href="login()">log in</TextLink>
        </div>
    </div>
</template>
