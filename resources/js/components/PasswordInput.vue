<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    class?: HTMLAttributes['class'];
    autofocus?: boolean;
}>();

const model = defineModel<string>();
const showPassword = ref(false);
const inputRef = useTemplateRef<{ inputRef: HTMLInputElement | null } | null>('inputRef');

defineExpose({
    inputRef,
    focus: () => inputRef.value?.inputRef?.focus(),
});
</script>

<template>
    <UInput
        v-model="model"
        ref="inputRef"
        v-focus="props.autofocus"
        :type="showPassword ? 'text' : 'password'"
        :class="props.class"
        :ui="{ trailing: 'pe-1' }"
        v-bind="$attrs"
    >
        <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :tabindex="-1"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                @click="showPassword = !showPassword"
            />
        </template>
    </UInput>
</template>
