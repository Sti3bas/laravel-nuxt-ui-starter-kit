<script setup lang="ts">
import PasswordInput from '@/components/form/PasswordInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

interface Props {
    token: string;
    email: string;
}

const props = defineProps<Props>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
};
</script>

<template>
    <AuthLayout title="Reset password" description="Please enter your new password below">
        <Head title="Reset password" />

        <UForm :state="form" @submit.prevent="submit" class="w-full space-y-4">
            <UFormField label="Email" name="email" :error="form.errors.email">
                <UInput type="email" class="w-full" autocomplete="email" v-model="form.email" readonly />
            </UFormField>

            <UFormField label="Password" name="password" :error="form.errors.password">
                <PasswordInput
                    :tabindex="1"
                    v-model="form.password"
                    class="w-full"
                    autocomplete="new-password"
                    placeholder="Password"
                    autofocus
                    required
                />
            </UFormField>

            <UFormField label="Confirm password" name="password_confirmation" :error="form.errors.password_confirmation">
                <PasswordInput
                    :tabindex="3"
                    v-model="form.password_confirmation"
                    class="w-full"
                    autocomplete="new-password"
                    placeholder="Confirm password"
                    required
                />
            </UFormField>

            <UButton type="submit" :tabindex="5" label="Reset password" :loading="form.processing" block />
        </UForm>
    </AuthLayout>
</template>
