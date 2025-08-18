<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const links = [
    [
        {
            label: 'Profile',
            icon: 'i-lucide-user',
            to: '/settings/profile',
        },
        {
            label: 'Password',
            icon: 'i-lucide-shield',
            to: '/settings/password',
        },
        {
            label: 'Appearance',
            icon: 'i-lucide-cloud-sun',
            to: '/settings/appearance',
        },
    ],
    [
        {
            label: 'Documentation',
            icon: 'i-lucide-book-open',
            to: 'https://ui.nuxt.com/getting-started/installation/pro/nuxt',
            target: '_blank',
        },
    ],
] satisfies NavigationMenuItem[][];
</script>

<template>
    <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
        <template #header>
            <UDashboardNavbar title="Settings">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
            </UDashboardNavbar>

            <UDashboardToolbar>
                <!-- NOTE: The `-mx-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
                <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
            </UDashboardToolbar>
        </template>

        <template #body>
            <div class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-2xl lg:gap-12">
                <slot />
            </div>
        </template>
    </UDashboardPanel>
</template>
