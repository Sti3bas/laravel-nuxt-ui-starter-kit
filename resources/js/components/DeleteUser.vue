<script setup lang="ts">
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import PasswordInput from '@/components/PasswordInput.vue';
import { Form } from '@inertiajs/vue3';
import { ref, useTemplateRef } from 'vue';

const passwordInput = useTemplateRef<{ focus: () => void } | null>('passwordInput');
const open = ref(false);
</script>

<template>
    <UPageCard
        title="Delete account"
        description="Delete your account and all of its resources. This action is not reversible. All information related to this account will be deleted permanently."
        class="bg-gradient-to-tl from-error/10 from-5% to-default"
    >
        <template #footer>
            <UModal
                v-model:open="open"
                title="Are you sure you want to delete your account?"
                description="Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."
            >
                <UButton label="Delete account" color="error" data-test="delete-user-button" />

                <template #body>
                    <Form
                        v-bind="ProfileController.destroy.form()"
                        reset-on-success
                        :options="{ preserveScroll: true }"
                        @error="() => passwordInput?.focus()"
                        @success="open = false"
                        v-slot="{ errors, processing, reset, clearErrors }"
                        class="space-y-4"
                    >
                        <UFormField name="password" :error="errors.password">
                            <PasswordInput ref="passwordInput" name="password" placeholder="Password" class="w-full" autofocus />
                        </UFormField>

                        <div class="flex justify-end gap-2">
                            <UButton
                                label="Cancel"
                                color="neutral"
                                variant="outline"
                                :disabled="processing"
                                @click="
                                    () => {
                                        clearErrors();
                                        reset();
                                        open = false;
                                    }
                                "
                            />
                            <UButton
                                label="Delete account"
                                type="submit"
                                color="error"
                                :loading="processing"
                                data-test="confirm-delete-user-button"
                            />
                        </div>
                    </Form>
                </template>
            </UModal>
        </template>
    </UPageCard>
</template>
