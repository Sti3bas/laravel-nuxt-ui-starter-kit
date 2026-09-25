<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import FlashToasts from '@/components/FlashToasts.vue';
import UserMenu from '@/components/UserMenu.vue';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import { dashboard } from '@/routes';
import { useI18n } from '@/composables/useI18n';
import { usePage } from '@inertiajs/vue3';
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed, ref, watch } from 'vue';

const page = usePage();
const user = page.props.auth.user;
const { t, uiLocale } = useI18n();

const isOpen = ref(false);
const isCollapsed = ref(!page.props.sidebarOpen);

const links = computed<NavigationMenuItem[][]>(() => [
    [
        {
            label: t('Dashboard'),
            icon: 'i-lucide-house',
            to: dashboard().url,
            onSelect: () => {
                isOpen.value = false;
            },
        },
        {
            label: t('Settings'),
            to: editProfile().url,
            icon: 'i-lucide-settings',
            defaultOpen: true,
            type: 'trigger',
            children: [
                {
                    label: t('Profile'),
                    to: editProfile().url,
                    onSelect: () => {
                        isOpen.value = false;
                    },
                },
                {
                    label: t('Security'),
                    to: editSecurity().url,
                    onSelect: () => {
                        isOpen.value = false;
                    },
                },
                {
                    label: t('Appearance'),
                    to: editAppearance().url,
                    onSelect: () => {
                        isOpen.value = false;
                    },
                },
            ],
        },
    ],
    [
        {
            label: t('Repository'),
            icon: 'i-simple-icons:github',
            to: 'https://github.com/Sti3bas/laravel-nuxt-ui-starter-kit',
            target: '_blank',
        },
    ],
]);

watch(
    () => isCollapsed.value,
    (value) => {
        document.cookie = `sidebar_state=${!value}; path=/; max-age=${60 * 60 * 24 * 7}`;
    },
);
</script>

<template>
    <UApp :locale="uiLocale">
        <FlashToasts />

        <UDashboardGroup unit="rem" :persistent="false">
            <UDashboardSidebar
                id="default"
                v-model:open="isOpen"
                collapsible
                v-model:collapsed="isCollapsed"
                class="bg-elevated/25"
                :ui="{ footer: 'lg:border-t lg:border-default' }"
            >
                <template #header="{ collapsed }">
                    <AppLogo :collapsed="collapsed" />
                </template>

                <template #default="{ collapsed }">
                    <UNavigationMenu :collapsed="collapsed" :items="links[0]" orientation="vertical" tooltip popover />

                    <UNavigationMenu :collapsed="collapsed" :items="links[1]" orientation="vertical" tooltip class="mt-auto" />
                </template>

                <template #footer="{ collapsed }">
                    <UserMenu :collapsed="collapsed" :user="user" />
                </template>
            </UDashboardSidebar>

            <slot />
        </UDashboardGroup>
    </UApp>
</template>
