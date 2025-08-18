<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
</script>

<template>
    <AppLayout>
        <Head title="Appearance settings" />

        <SettingsLayout>
            <div>
                <UPageCard
                    title="Appearance settings"
                    description="Update your account's appearance settings"
                    variant="naked"
                    orientation="horizontal"
                    class="mb-4"
                >
                </UPageCard>

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
        </SettingsLayout>
    </AppLayout>
</template>
