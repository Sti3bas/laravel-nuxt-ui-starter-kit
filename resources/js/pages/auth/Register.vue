<script setup lang="ts">
import PasswordInput from '@/components/form/PasswordInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <AuthLayout title="Create an account" description="Enter your details below to create your account">
        <Head title="Register" />

        <UForm :state="form" @submit.prevent="submit" class="w-full space-y-4">
            <UFormField label="Name" name="name" :error="form.errors.name">
                <UInput type="text" class="w-full" :tabindex="1" autocomplete="name" placeholder="Full name" v-model="form.name" autofocus required />
            </UFormField>

            <UFormField label="Email" name="email" :error="form.errors.email">
                <UInput
                    type="email"
                    class="w-full"
                    :tabindex="2"
                    autocomplete="email"
                    placeholder="email@example.com"
                    v-model="form.email"
                    required
                />
            </UFormField>

            <UFormField label="Password" name="password" :error="form.errors.password">
                <PasswordInput :tabindex="3" v-model="form.password" class="w-full" autocomplete="new-password" placeholder="Password" required />
            </UFormField>

            <UFormField label="Confirm password" name="password_confirmation" :error="form.errors.password_confirmation">
                <PasswordInput
                    :tabindex="5"
                    v-model="form.password_confirmation"
                    class="w-full"
                    autocomplete="new-password"
                    placeholder="Confirm password"
                    required
                />
            </UFormField>

            <UButton type="submit" label="Create account" :tabindex="6" :loading="form.processing" block />
        </UForm>

        <div class="mt-2 text-center text-sm text-muted">
            Already have an account? <ULink :to="route('login')" class="font-medium text-primary">Log in</ULink>.
        </div>
    </AuthLayout>
</template>
