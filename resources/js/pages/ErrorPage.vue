<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps<{ status: number }>();
const { t } = useI18n();

const title = computed(() => {
    return {
        503: t('Service Unavailable'),
        500: t('Server Error'),
        404: t('Page Not Found'),
        403: t('Forbidden'),
    }[props.status];
});

const description = computed(() => {
    return {
        503: t('Sorry, we are doing some maintenance. Please check back soon.'),
        500: t('Whoops, something went wrong on our servers.'),
        404: t('Sorry, the page you are looking for could not be found.'),
        403: t('Sorry, you are forbidden from accessing this page.'),
    }[props.status];
});
</script>

<template>
    <Head :title="title" />

    <UHeader>
        <template #left>
            <ULink to="/">
                <AppLogo />
            </ULink>
        </template>

        <template #right>
            <UColorModeButton />
        </template>
    </UHeader>

    <UError
        :error="{
            statusCode: status,
            statusMessage: title,
            message: description,
        }"
    >
        <template #links>
            <UButton to="/">{{ t('Back to home') }}</UButton>
        </template>
    </UError>
</template>
