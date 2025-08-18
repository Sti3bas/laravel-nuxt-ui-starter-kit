<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const passwordInput = ref<HTMLInputElement | null>(null);
const currentPasswordInput = ref<HTMLInputElement | null>(null);

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const toast = useToast();

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();

            toast.add({
                title: 'Password updated',
                description: 'Your password has been updated.',
                color: 'success',
            });
        },
        onError: (errors: any) => {
            if (errors.password) {
                form.reset('password', 'password_confirmation');
                if (passwordInput.value instanceof HTMLInputElement) {
                    passwordInput.value.focus();
                }
            }

            if (errors.current_password) {
                form.reset('current_password');
                if (currentPasswordInput.value instanceof HTMLInputElement) {
                    currentPasswordInput.value.focus();
                }
            }
        },
    });
};
</script>

<template>
    <AppLayout>
        <Head title="Password settings" />

        <SettingsLayout>
            <UPageCard title="Update password" description="Ensure your account is using a long, random password to stay secure" variant="subtle">
                <UForm :state="form" @submit="updatePassword" class="flex max-w-xs flex-col gap-4">
                    <UFormField label="Current password" name="current_password" :error="form.errors.current_password">
                        <UInput
                            v-model="form.current_password"
                            ref="currentPasswordInput"
                            type="password"
                            autocomplete="current-password"
                            placeholder="Current password"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField label="New password" name="password" :error="form.errors.password">
                        <UInput
                            v-model="form.password"
                            type="password"
                            ref="passwordInput"
                            autocomplete="new-password"
                            placeholder="New password"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField label="Confirm password" name="password_confirmation" :error="form.errors.password_confirmation">
                        <UInput
                            v-model="form.password_confirmation"
                            type="password"
                            autocomplete="new-password"
                            placeholder="Confirm password"
                            class="w-full"
                        />
                    </UFormField>

                    <UButton label="Save password" class="w-fit" type="submit" :loading="form.processing" />
                </UForm>
            </UPageCard>
        </SettingsLayout>
    </AppLayout>
</template>
