<script setup lang="ts">
import { User } from '@/types';
import { router, useForm } from '@inertiajs/vue3';
import type { DropdownMenuItem } from '@nuxt/ui';
import { computed, ref } from 'vue';

interface Props {
    user: User;
    collapsed?: boolean;
}

const props = defineProps<Props>();

const user = ref({
    name: props.user.name,
    avatar: {
        src: props.user.avatar,
        alt: props.user.name,
    },
});

const logoutForm = useForm({});

const handleLogout = () => {
    logoutForm.post(route('logout'));

    router.flushAll();
};

const items = computed<DropdownMenuItem[][]>(() => [
    [
        {
            type: 'label',
            label: user.value.name,
            avatar: user.value.avatar,
        },
    ],
    [
        {
            label: 'Settings',
            icon: 'i-lucide-settings',
            to: '/settings',
        },
    ],

    [
        {
            label: 'Log out',
            icon: 'i-lucide-log-out',
            onSelect: handleLogout,
        },
    ],
]);
</script>

<template>
    <UDropdownMenu
        :items="items"
        :content="{ align: 'center', collisionPadding: 12 }"
        :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
    >
        <UButton
            v-bind="{
                ...user,
                label: collapsed ? undefined : user?.name,
                trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
            }"
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
            class="data-[state=open]:bg-elevated"
            :ui="{
                trailingIcon: 'text-dimmed',
            }"
        />

        <template #chip-leading="{ item }">
            <span
                :style="{
                    '--chip-light': `var(--color-${(item as any).chip}-500)`,
                    '--chip-dark': `var(--color-${(item as any).chip}-400)`,
                }"
                class="ms-0.5 size-2 rounded-full bg-(--chip-light) dark:bg-(--chip-dark)"
            />
        </template>
    </UDropdownMenu>
</template>
