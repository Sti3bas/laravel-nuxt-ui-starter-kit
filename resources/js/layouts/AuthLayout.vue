<script setup lang="ts">
import FlashToasts from '@/components/FlashToasts.vue';
import { useI18n } from '@/composables/useI18n';
import AuthLayout from '@/layouts/auth/AuthSimpleLayout.vue';

const { uiLocale } = useI18n();

const { title = '', description = '' } = defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <UApp :locale="uiLocale">
        <FlashToasts />
        <AuthLayout :title="title" :description="description">
            <slot />
        </AuthLayout>
    </UApp>
</template>
