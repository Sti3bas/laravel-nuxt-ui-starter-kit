<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();
        },
    });
};
</script>

<template>
    <AuthLayout title="Confirm your password" description="This is a secure area of the application. Please confirm your password before continuing.">
        <Head title="Confirm password" />

        <UForm :state="form" @submit.prevent="submit" class="w-full space-y-4">
            <UFormField label="Password" name="password" :error="form.errors.password">
                <UInput
                    type="password"
                    class="w-full"
                    autocomplete="current-password"
                    placeholder="Password"
                    v-model="form.password"
                    autofocus
                    required
                />
            </UFormField>

            <UButton type="submit" label="Confirm password" :tabindex="4" :loading="form.processing" block />
        </UForm>
    </AuthLayout>
</template>
