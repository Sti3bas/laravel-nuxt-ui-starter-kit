<script setup lang="ts">
import { ref } from 'vue';

const { tabindex } = defineProps<{ tabindex?: number }>();

const model = defineModel();

const showPassword = ref(false);
</script>

<template>
    <UInput v-model="model" :tabindex="tabindex" :type="showPassword ? 'text' : 'password'" :ui="{ trailing: 'pe-1' }">
        <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :tabindex="tabindex ? tabindex + 1 : undefined"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                @click="showPassword = !showPassword"
            />
        </template>
    </UInput>
</template>
