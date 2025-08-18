<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { ref, useTemplateRef } from 'vue';

const passwordInput = useTemplateRef('passwordInput');

const form = useForm({
    password: '',
});

const open = ref(false);

const deleteUser = (e: Event) => {
    e.preventDefault();

    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.inputRef.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    form.clearErrors();
    form.reset();
};
</script>

<template>
    <UPageCard
        title="Account"
        description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
        class="bg-gradient-to-tl from-error/10 from-5% to-default"
    >
        <template #footer>
            <UButton label="Delete account" color="error" @click="open = true" />
        </template>
    </UPageCard>

    <UModal
        v-model:open="open"
        title="Are you sure you want to delete your account?"
        description="Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."
        :ui="{ footer: 'justify-end' }"
        @update:open="(value: boolean) => !value && closeModal()"
    >
        <template #body>
            <UForm id="deleteUser" :state="form" @submit="deleteUser">
                <UFormField name="password" :error="form.errors.password">
                    <UInput
                        type="password"
                        class="w-full"
                        ref="passwordInput"
                        autocomplete="current-password"
                        placeholder="Password"
                        v-model="form.password"
                        autofocus
                        required
                    />
                </UFormField>
            </UForm>
        </template>

        <template #footer="{ close }">
            <UButton label="Cancel" color="neutral" variant="outline" :disabled="form.processing" @click="close" />

            <UButton label="Delete account" type="submit" form="deleteUser" color="error" :loading="form.processing" />
        </template>
    </UModal>
</template>
