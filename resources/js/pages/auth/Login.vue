<script setup lang="ts">
import PasswordInput from '@/components/form/PasswordInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <AuthLayout title="Log in to your account" description="Enter your email and password below to log in" :status="status">
        <Head title="Log in" />

        <UForm :state="form" @submit.prevent="submit" class="w-full space-y-4">
            <UFormField label="Email" name="email" :error="form.errors.email">
                <UInput
                    type="email"
                    class="w-full"
                    :tabindex="1"
                    autocomplete="email"
                    placeholder="email@example.com"
                    v-model="form.email"
                    autofocus
                    required
                />
            </UFormField>

            <UFormField label="Password" name="password" :error="form.errors.password">
                <PasswordInput :tabindex="2" v-model="form.password" class="w-full" autocomplete="current-password" placeholder="Password" required />

                <template #hint>
                    <ULink v-if="canResetPassword" :to="route('password.request')" class="font-medium text-primary" :tabindex="5">
                        Forgot password?
                    </ULink>
                </template>
            </UFormField>

            <UCheckbox label="Remember me" :tabindex="3" v-model="form.remember" />

            <UButton type="submit" label="Log in" :tabindex="4" :loading="form.processing" block />
        </UForm>

        <div class="mt-2 text-center text-sm text-muted">
            Don't have an account? <ULink :to="route('register')" class="font-medium text-primary">Sign up</ULink>.
        </div>
    </AuthLayout>
</template>
