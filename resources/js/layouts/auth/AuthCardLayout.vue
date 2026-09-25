<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div class="flex w-full max-w-md flex-col gap-6">
            <ULink :to="home().url" class="flex items-center gap-2 self-center font-medium">
                <AppLogoIcon class="size-9 fill-current" />
            </ULink>

            <UCard>
                <template #header>
                    <div class="text-center">
                        <div class="text-xl font-semibold text-highlighted">{{ title }}</div>
                        <div class="mt-1 text-sm text-muted">{{ description }}</div>
                    </div>
                </template>

                <slot />
            </UCard>
        </div>
    </div>
</template>
