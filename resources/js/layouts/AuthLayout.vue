<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';

defineProps<{
    title?: string;
    description?: string;
    status?: string;
}>();
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-sm">
            <div class="flex flex-col items-center text-center">
                <div class="mb-2">
                    <AppLogoIcon class="size-8 shrink-0" />
                </div>

                <div class="text-xl font-semibold text-pretty text-highlighted">{{ title }}</div>

                <div class="mt-1 text-base text-pretty text-muted">{{ description }}</div>
            </div>

            <UAlert v-if="status" :description="status" icon="i-lucide-circle-check" color="success" variant="subtle" />

            <slot />
        </UPageCard>
    </div>
</template>
