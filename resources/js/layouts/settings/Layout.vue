<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed } from 'vue';

const { t } = useI18n();

const links = computed<NavigationMenuItem[][]>(() => [
    [
        {
            label: t('Profile'),
            icon: 'i-lucide-user',
            to: editProfile().url,
        },
        {
            label: t('Security'),
            icon: 'i-lucide-shield',
            to: editSecurity().url,
        },
        {
            label: t('Appearance'),
            icon: 'i-lucide-cloud-sun',
            to: editAppearance().url,
        },
    ],
    [
        {
            label: t('Documentation'),
            icon: 'i-lucide-book-open',
            to: 'https://ui.nuxt.com/getting-started/installation/pro/nuxt',
            target: '_blank',
        },
    ],
]);
</script>

<template>
    <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
        <template #header>
            <UDashboardNavbar :title="t('Settings')">
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
