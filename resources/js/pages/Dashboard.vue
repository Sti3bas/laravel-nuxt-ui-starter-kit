<script setup lang="ts">
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import { useI18n } from '@/composables/useI18n';
import { Head } from '@inertiajs/vue3';

const { t } = useI18n();
</script>

<template>
    <Head :title="t('Dashboard')" />

    <UDashboardPanel id="home">
        <template #header>
            <UDashboardNavbar :title="t('Dashboard')" :ui="{ right: 'gap-3' }">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div class="flex flex-1 flex-col gap-4">
                <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                    <UCard class="aspect-video" :ui="{ body: 'size-full p-0 sm:p-0' }">
                        <PlaceholderPattern />
                    </UCard>

                    <UCard class="aspect-video" :ui="{ body: 'size-full p-0 sm:p-0' }">
                        <PlaceholderPattern />
                    </UCard>

                    <UCard class="aspect-video" :ui="{ body: 'size-full p-0 sm:p-0' }">
                        <PlaceholderPattern />
                    </UCard>
                </div>

                <UCard class="min-h-[100vh] flex-1 md:min-h-min" :ui="{ body: 'size-full p-0 sm:p-0' }">
                    <PlaceholderPattern />
                </UCard>
            </div>
        </template>
    </UDashboardPanel>
</template>
