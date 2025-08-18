<script setup lang="ts">
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout>
        <UDashboardPanel id="home">
            <template #header>
                <UDashboardNavbar title="Dashboard" :ui="{ right: 'gap-3' }">
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
    </AppLayout>
</template>
