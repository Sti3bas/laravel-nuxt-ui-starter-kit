<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps<{
    status?: string;
}>();

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};
</script>

<template>
    <AuthLayout
        title="Verify email"
        description="Please verify your email address by clicking on the link we just emailed to you."
        :status="
            status === 'verification-link-sent'
                ? 'A new verification link has been sent to the email address you provided during registration.'
                : undefined
        "
    >
        <Head title="Email verification" />

        <UForm :state="form" @submit.prevent="submit" class="w-full space-y-4">
            <UButton type="submit" label="Resend verification email" color="neutral" :loading="form.processing" block />
        </UForm>

        <div class="mt-2 text-center text-sm text-muted">
            <Link :href="route('logout')" method="post" as="button" class="font-medium text-primary"> Log out </Link>
        </div>
    </AuthLayout>
</template>
