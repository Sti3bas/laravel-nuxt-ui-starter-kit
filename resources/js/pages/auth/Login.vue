<script setup lang="ts">
import PasswordInput from '@/components/PasswordInput.vue';
/* @chisel-passkeys */
import PasskeyVerify from '@/components/PasskeyVerify.vue';
/* @end-chisel-passkeys */
import TextLink from '@/components/TextLink.vue';
import { Form, Head } from '@inertiajs/vue3';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */
import { store } from '@/routes/login';
import { request } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Log in to your account',
        description: 'Enter your email and password below to log in',
    },
});

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();
</script>

<template>
    <Head title="Log in" />

    <UAlert v-if="status" :description="status" icon="i-lucide-circle-check" color="success" variant="subtle" class="mb-4" />

    <!-- @chisel-passkeys -->
    <PasskeyVerify />
    <!-- @end-chisel-passkeys -->

    <Form v-bind="store.form()" :reset-on-success="['password']" v-slot="{ errors, processing }" class="flex flex-col gap-6">
        <div class="grid gap-4">
            <UFormField label="Email" name="email" :error="errors.email">
                <UInput
                    type="email"
                    name="email"
                    required
                    v-focus
                    :tabindex="1"
                    autocomplete="email"
                    placeholder="email@example.com"
                    class="w-full"
                />
            </UFormField>

            <UFormField label="Password" name="password" :error="errors.password">
                <template #hint>
                    <TextLink v-if="canResetPassword" :href="request()" :tabindex="5" class="text-sm"> Forgot password? </TextLink>
                </template>
                <PasswordInput name="password" required :tabindex="2" autocomplete="current-password" placeholder="Password" class="w-full" />
            </UFormField>

            <UCheckbox name="remember" label="Remember me" :tabindex="3" />

            <UButton type="submit" label="Log in" class="mt-2" block :tabindex="4" :loading="processing" data-test="login-button" />
        </div>

        <!-- @chisel-registration -->
        <div class="text-center text-sm text-muted">
            Don't have an account?
            <TextLink :href="register()" :tabindex="5">Sign up</TextLink>
        </div>
        <!-- @end-chisel-registration -->
    </Form>
</template>
