<script setup lang="ts">
import PasswordInput from '@/components/PasswordInput.vue';
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
</script>

<template>
    <Head title="Reset password" />

    <Form
        v-bind="update.form()"
        :transform="(data) => ({ ...data, token, email })"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
    >
        <div class="grid gap-4">
            <UFormField label="Email" name="email" :error="errors.email">
                <UInput id="email" type="email" name="email" autocomplete="email" v-model="inputEmail" class="w-full" readonly />
            </UFormField>

            <UFormField label="Password" name="password" :error="errors.password">
                <PasswordInput
                    name="password"
                    autocomplete="new-password"
                    class="w-full"
                    autofocus
                    placeholder="Password"
                    :passwordrules="passwordRules"
                />
            </UFormField>

            <UFormField label="Confirm password" name="password_confirmation" :error="errors.password_confirmation">
                <PasswordInput
                    name="password_confirmation"
                    autocomplete="new-password"
                    class="w-full"
                    placeholder="Confirm password"
                    :passwordrules="passwordRules"
                />
            </UFormField>

            <UButton type="submit" label="Reset password" class="mt-2 w-full" :loading="processing" data-test="reset-password-button" />
        </div>
    </Form>
</template>
