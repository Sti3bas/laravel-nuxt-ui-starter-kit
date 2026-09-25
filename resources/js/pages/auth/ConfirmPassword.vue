<script setup lang="ts">
import PasswordInput from '@/components/PasswordInput.vue';
import { useI18n } from '@/composables/useI18n';
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

const { t } = useI18n();
</script>

<template>
    <Head :title="t('Confirm password')" />

    <!-- @chisel-passkeys -->
    <PasskeyVerify
        :routes="{
            options: confirmOptions(),
            submit: confirmStore(),
        }"
        :label="t('Confirm with passkey')"
        :loading-label="t('Confirming...')"
        :separator="t('Or confirm with password')"
    />
    <!-- @end-chisel-passkeys -->

    <Form v-bind="store.form()" reset-on-success v-slot="{ errors, processing }">
        <div class="space-y-6">
            <UFormField :label="t('Password')" name="password" :error="errors.password">
                <PasswordInput name="password" class="w-full" required autocomplete="current-password" autofocus />
            </UFormField>

            <UButton type="submit" :label="t('Confirm password')" block :loading="processing" data-test="confirm-password-button" />
        </div>
    </Form>
</template>
