<script setup lang="ts">
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { useI18n } from '@/composables/useI18n';
import { Form, Head } from '@inertiajs/vue3';
import { login } from '@/routes';
import { store } from '@/routes/register';

defineProps<{
    passwordRules: string;
}>();

defineOptions({
    layout: {
        title: 'Create an account',
        description: 'Enter your details below to create your account',
    },
});

const { t } = useI18n();
</script>

<template>
    <Head :title="t('Register')" />

    <Form v-bind="store.form()" :reset-on-success="['password', 'password_confirmation']" v-slot="{ errors, processing }" class="flex flex-col gap-6">
        <div class="grid gap-4">
            <UFormField :label="t('Name')" name="name" :error="errors.name">
                <UInput type="text" name="name" required v-focus :tabindex="1" autocomplete="name" :placeholder="t('Full name')" class="w-full" />
            </UFormField>

            <UFormField :label="t('Email')" name="email" :error="errors.email">
                <UInput type="email" name="email" required :tabindex="2" autocomplete="email" placeholder="email@example.com" class="w-full" />
            </UFormField>

            <UFormField :label="t('Password')" name="password" :error="errors.password">
                <PasswordInput
                    name="password"
                    required
                    :tabindex="3"
                    autocomplete="new-password"
                    :placeholder="t('Password')"
                    :passwordrules="passwordRules"
                    class="w-full"
                />
            </UFormField>

            <UFormField :label="t('Confirm password')" name="password_confirmation" :error="errors.password_confirmation">
                <PasswordInput
                    name="password_confirmation"
                    required
                    :tabindex="4"
                    autocomplete="new-password"
                    :placeholder="t('Confirm password')"
                    class="w-full"
                />
            </UFormField>

            <UButton
                type="submit"
                :label="t('Create account')"
                class="mt-2"
                block
                :tabindex="5"
                :loading="processing"
                data-test="register-user-button"
            />
        </div>

        <div class="text-center text-sm text-muted">
            {{ t('Already have an account?') }}
            <TextLink :href="login()" :tabindex="6">{{ t('Log in') }}</TextLink>
        </div>
    </Form>
</template>
