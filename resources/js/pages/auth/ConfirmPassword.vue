<script setup lang="ts">
import PasswordInput from '@/components/PasswordInput.vue';
import { Form, Head } from '@inertiajs/vue3';
import { store } from '@/routes/password/confirm';
/* @chisel-passkeys */
import { index as confirmOptions, store as confirmStore } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import PasskeyVerify from '@/components/PasskeyVerify.vue';
/* @end-chisel-passkeys */

defineOptions({
    layout: {
        title: 'Confirm password',
        description: 'This is a secure area of the application. Please confirm your password before continuing.',
    },
});
</script>

<template>
    <Head title="Confirm password" />

    <!-- @chisel-passkeys -->
    <PasskeyVerify
        :routes="{
            options: confirmOptions(),
            submit: confirmStore(),
        }"
        label="Confirm with passkey"
        loading-label="Confirming..."
        separator="Or confirm with password"
    />
    <!-- @end-chisel-passkeys -->

    <Form v-bind="store.form()" reset-on-success v-slot="{ errors, processing }">
        <div class="space-y-6">
            <UFormField label="Password" name="password" :error="errors.password">
                <PasswordInput name="password" class="w-full" required autocomplete="current-password" autofocus />
            </UFormField>

            <UButton type="submit" label="Confirm password" class="w-full" :loading="processing" data-test="confirm-password-button" />
        </div>
    </Form>
</template>
