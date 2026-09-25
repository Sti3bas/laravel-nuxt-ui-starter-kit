<script setup lang="ts">
import TextLink from '@/components/TextLink.vue';
import { useI18n } from '@/composables/useI18n';
import { Form, Head } from '@inertiajs/vue3';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

defineOptions({
    layout: {
        title: 'Email verification',
        description: 'Please verify your email address by clicking on the link we just emailed to you.',
    },
});

defineProps<{
    status?: string;
}>();

const { t } = useI18n();
</script>

<template>
    <Head :title="t('Email verification')" />

    <UAlert
        v-if="status === 'verification-link-sent'"
        :description="t('A new verification link has been sent to the email address you provided during registration.')"
        icon="i-lucide-circle-check"
        color="success"
        variant="subtle"
        class="mb-4"
    />

    <Form v-bind="send.form()" class="space-y-6 text-center" v-slot="{ processing }">
        <UButton type="submit" :label="t('Resend verification email')" color="neutral" variant="outline" :loading="processing" />

        <TextLink :href="logout()" as="button" class="mx-auto block text-sm"> {{ t('Log out') }} </TextLink>
    </Form>
</template>
