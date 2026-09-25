<script setup lang="ts">
import Heading from '@/components/Heading.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Appearance settings" />

    <h1 class="sr-only">Appearance settings</h1>

    <div class="space-y-6">
        <Heading variant="small" title="Appearance settings" description="Update your account's appearance settings" />

        <UPageCard variant="subtle">
            <UFormField
                name="color-mode"
                label="Color mode"
                description="Select your preferred color mode."
                required
                class="flex items-start justify-between gap-4 max-sm:flex-col"
            >
                <UColorModeSelect />
            </UFormField>
        </UPageCard>
    </div>
</template>
