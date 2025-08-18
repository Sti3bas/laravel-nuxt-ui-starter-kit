<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import UserMenu from '@/components/UserMenu.vue';
import type { User } from '@/types';
import { usePage } from '@inertiajs/vue3';
import type { NavigationMenuItem } from '@nuxt/ui';
import { ref, watch } from 'vue';

const page = usePage();
const user = page.props.auth.user as User;

const isOpen = ref(false);
const isCollapsed = ref(!page.props.sidebarOpen);

const links = [
    [
        {
            label: 'Dashboard',
            icon: 'i-lucide-house',
            to: '/dashboard',
            onSelect: () => {
                isOpen.value = false;
            },
        },
        {
            label: 'Settings',
            to: '/settings',
            icon: 'i-lucide-settings',
            defaultOpen: true,
            type: 'trigger',
            children: [
                {
                    label: 'Profile',
                    to: '/settings/profile',
                    onSelect: () => {
                        isOpen.value = false;
                    },
                },
                {
                    label: 'Password',
                    to: '/settings/password',
                    onSelect: () => {
                        isOpen.value = false;
                    },
                },
                {
                    label: 'Appearance',
                    to: '/settings/appearance',
                    onSelect: () => {
                        isOpen.value = false;
                    },
                },
            ],
        },
    ],
    [
        {
            label: 'Repository',
            icon: 'i-simple-icons:github',
            to: 'https://github.com/Sti3bas/laravel-nuxt-ui-starter-kit',
            target: '_blank',
        },
    ],
] satisfies NavigationMenuItem[][];

watch(
    () => isCollapsed.value,
    (value) => {
        document.cookie = `sidebar_state=${!value}; path=/; max-age=${60 * 60 * 24 * 7}`;
    },
);
</script>

<template>
    <UApp>
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
