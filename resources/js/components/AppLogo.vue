<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';

defineProps<{
    collapsed?: boolean;
}>();
</script>

<template>
    <div class="flex items-center gap-1.5">
        <div class="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-inverted">
            <AppLogoIcon class="size-5 fill-current" />
        </div>

        <div v-if="!collapsed" class="ml-1 grid flex-1 text-left text-sm">
            <span class="mb-0.5 truncate leading-tight font-semibold text-default">Laravel Starter Kit</span>
        </div>
    </div>
</template>
