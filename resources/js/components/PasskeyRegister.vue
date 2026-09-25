<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { usePasskeyRegister } from '@laravel/passkeys/vue';
import { ref } from 'vue';

const emit = defineEmits<{
    success: [];
}>();

const getDefaultPasskeyName = () => {
    const ua = navigator.userAgent;

    const browser = [
        { pattern: /Edg|Edge/, name: 'Edge' },
        { pattern: /OPR|Opera|OPiOS/, name: 'Opera' },
        { pattern: /Firefox|FxiOS/, name: 'Firefox' },
        { pattern: /Chrome|CriOS/, name: 'Chrome' },
        { pattern: /Safari/, name: 'Safari' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    const os = [
        { pattern: /iPhone/, name: 'iPhone' },
        { pattern: /iPad|Macintosh(?=.*Mobile)/, name: 'iPad' },
        { pattern: /Android/, name: 'Android' },
        { pattern: /Mac/, name: 'Mac' },
        { pattern: /Windows/, name: 'Windows' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    return [browser, os].filter(Boolean).join(' on ') || '';
};

const name = ref('');
const showForm = ref(false);

const openForm = () => {
    name.value = getDefaultPasskeyName();
    showForm.value = true;
};

const { register, isLoading, error, isSupported } = usePasskeyRegister({
    onSuccess: () => {
        name.value = '';
        showForm.value = false;
        emit('success');
    },
});

const handleSubmit = async (event: Event) => {
    event.preventDefault();

    if (!name.value.trim()) {
        return;
    }

    await register(name.value);
};

const handleCancel = () => {
    showForm.value = false;
    name.value = '';
};
</script>

<template>
    <div v-if="!isSupported" class="text-sm text-muted">Passkeys are not supported in this browser.</div>

    <UButton v-else-if="!showForm" label="Add passkey" color="neutral" variant="outline" icon="i-lucide-plus" @click="openForm" />

    <form v-else @submit="handleSubmit" class="space-y-4 rounded-lg border border-default bg-elevated/50 p-4">
        <UFormField label="Passkey name" name="passkey-name" description="A name helps you identify this passkey later.">
            <UInput id="passkey-name" type="text" v-model="name" placeholder="e.g., MacBook Pro, iPhone" class="w-full" v-focus />
        </UFormField>

        <InputError v-if="error" :message="error" />

        <div class="flex gap-2">
            <UButton type="submit" :label="isLoading ? 'Registering...' : 'Register passkey'" :loading="isLoading" :disabled="!name.trim()" />
            <UButton type="button" label="Cancel" color="neutral" variant="ghost" @click="handleCancel" />
        </div>
    </form>
</template>
