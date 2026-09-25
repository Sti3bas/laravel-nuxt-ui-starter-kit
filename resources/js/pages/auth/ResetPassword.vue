<script setup lang="ts">
import PasswordInput from '@/components/PasswordInput.vue';
import { useI18n } from '@/composables/useI18n';
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import { update } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Reset password',
        description: 'Please enter your new password below',
    },
});

const props = defineProps<{
    token: string;
    email: string;
    passwordRules: string;
}>();

const inputEmail = ref(props.email);
const { t } = useI18n();
</script>

<template>
    <Head :title="t('Reset password')" />

    <Form
        v-bind="update.form()"
        :transform="(data) => ({ ...data, token, email })"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
    >
        <div class="grid gap-4">
            <UFormField :label="t('Email')" name="email" :error="errors.email">
                <UInput id="email" type="email" name="email" autocomplete="email" v-model="inputEmail" class="w-full" readonly />
            </UFormField>

            <UFormField :label="t('Password')" name="password" :error="errors.password">
                <PasswordInput
                    name="password"
                    autocomplete="new-password"
                    class="w-full"
                    autofocus
                    :placeholder="t('Password')"
                    :passwordrules="passwordRules"
                />
            </UFormField>

            <UFormField :label="t('Confirm password')" name="password_confirmation" :error="errors.password_confirmation">
                <PasswordInput
                    name="password_confirmation"
                    autocomplete="new-password"
                    class="w-full"
                    :placeholder="t('Confirm password')"
                    :passwordrules="passwordRules"
                />
            </UFormField>

            <UButton type="submit" :label="t('Reset password')" class="mt-2" block :loading="processing" data-test="reset-password-button" />
        </div>
    </Form>
</template>
