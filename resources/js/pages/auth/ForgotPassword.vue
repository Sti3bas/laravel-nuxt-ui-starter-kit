<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

defineProps<{
    status?: string;
}>();

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link" :status="status">
        <Head title="Forgot password" />

        <UForm :state="form" @submit.prevent="submit" class="w-full space-y-4">
            <UFormField label="Email address" name="email" :error="form.errors.email">
                <UInput type="email" class="w-full" autocomplete="off" placeholder="email@example.com" v-model="form.email" autofocus required />
            </UFormField>

            <UButton type="submit" label="Email password reset link" :loading="form.processing" block />
        </UForm>

        <div class="mt-2 text-center text-sm text-muted">
            Or, return to <ULink :to="route('login')" class="font-medium text-primary">Log in</ULink>.
        </div>
    </AuthLayout>
</template>
