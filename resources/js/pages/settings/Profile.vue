<script setup lang="ts">
import { Head, useForm, usePage } from '@inertiajs/vue3';

import DeleteUser from '@/components/DeleteUser.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { type User } from '@/types';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

defineProps<Props>();

const page = usePage();
const user = page.props.auth.user as User;

const form = useForm({
    name: user.name,
    email: user.email,
});

const resendVerificationEmailForm = useForm({});

const toast = useToast();

const submit = () => {
    form.patch(route('profile.update'), {
        preserveScroll: true,
        onSuccess: () => {
            toast.add({
                title: 'Profile updated',
                description: 'Your profile has been updated.',
                color: 'success',
            });
        },
    });
};

const resendVerificationEmail = () => {
    resendVerificationEmailForm.post(route('verification.send'), {
        onSuccess: () => {
            toast.add({
                title: 'Verification email sent',
                description: 'A new verification email has been sent to your email address.',
                color: 'success',
            });
        },
    });
};
</script>

<template>
    <AppLayout>
        <Head title="Profile settings" />

        <SettingsLayout>
            <UForm id="settings" :state="form" @submit="submit">
                <UPageCard
                    title="Profile information"
                    description="Update your name and email address"
                    variant="naked"
                    orientation="horizontal"
                    class="mb-4"
                >
                    <UButton form="settings" label="Save changes" :loading="form.processing" color="neutral" type="submit" class="w-fit lg:ms-auto" />
                </UPageCard>

                <UPageCard variant="subtle">
                    <UFormField
                        name="name"
                        label="Name"
                        description="Will appear on receipts, invoices, and other communication."
                        required
                        class="flex items-start justify-between gap-4 max-sm:flex-col"
                        :error="form.errors.name"
                    >
                        <UInput v-model="form.name" autocomplete="name" placeholder="Full name" />
                    </UFormField>

                    <USeparator />

                    <UFormField
                        name="email"
                        label="Email"
                        description="Used to sign in, for email receipts and product updates."
                        required
                        class="flex items-start justify-between gap-4 max-sm:flex-col"
                        :error="form.errors.email"
                    >
                        <UInput v-model="form.email" type="email" placeholder="Email address" autocomplete="username" />
                    </UFormField>

                    <UAlert
                        v-if="mustVerifyEmail && !user.email_verified_at"
                        color="warning"
                        variant="subtle"
                        icon="i-lucide-alert-circle"
                        title="Your email address is unverified."
                        orientation="horizontal"
                        :actions="[
                            {
                                label: 'Resend verification email',
                                color: 'neutral',
                                variant: 'subtle',
                                loading: resendVerificationEmailForm.processing,
                                onClick: resendVerificationEmail,
                            },
                        ]"
                    />
                </UPageCard>
            </UForm>

            <DeleteUser />
        </SettingsLayout>
    </AppLayout>
</template>
