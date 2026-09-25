<script setup lang="ts">
import type { FlashToast } from '@/types';
import { router } from '@inertiajs/vue3';
import { onMounted, onUnmounted } from 'vue';

const toast = useToast();

let removeListener: (() => void) | undefined;

onMounted(() => {
    removeListener = router.on('flash', (event) => {
        const flash = (event as CustomEvent).detail?.flash;
        const data = flash?.toast as FlashToast | undefined;

        if (!data) {
            return;
        }

        toast.add({
            title: data.message,
            color: data.type,
        });
    });
});

onUnmounted(() => removeListener?.());
</script>

<template>
    <span class="hidden" aria-hidden="true" />
</template>
