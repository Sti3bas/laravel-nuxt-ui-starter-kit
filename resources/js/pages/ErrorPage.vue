<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps<{ status: number }>();

const title = computed(() => {
    return {
        503: 'Service Unavailable',
        500: 'Server Error',
        404: 'Page Not Found',
        403: 'Forbidden',
    }[props.status];
});

const description = computed(() => {
    return {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
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
            <UButton to="/">Back to home</UButton>
        </template>
    </UError>
</template>
