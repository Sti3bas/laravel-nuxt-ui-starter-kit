<script setup lang="ts">
import TwoFactorRecoveryCodes from '@/components/TwoFactorRecoveryCodes.vue';
import TwoFactorSetupModal from '@/components/TwoFactorSetupModal.vue';
import { useI18n } from '@/composables/useI18n';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { disable, enable } from '@/routes/two-factor';
import { Form } from '@inertiajs/vue3';
import { onUnmounted, ref } from 'vue';

export type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

withDefaults(defineProps<Props>(), {
    canManageTwoFactor: false,
    requiresConfirmation: false,
    twoFactorEnabled: false,
});

const { hasSetupData, clearTwoFactorAuthData } = useTwoFactorAuth();
const { t } = useI18n();
const showSetupModal = ref<boolean>(false);

onUnmounted(() => clearTwoFactorAuthData());
</script>

<template>
    <div v-if="canManageTwoFactor" class="space-y-6">
        <Heading variant="small" title="Two-factor authentication" description="Manage your two-factor authentication settings" />

        <div v-if="!twoFactorEnabled" class="flex flex-col items-start justify-start space-y-4">
            <p class="text-sm text-muted">
                {{
                    t(
                        'When you enable two-factor authentication, you will be prompted for a secure pin during login. This pin can be retrieved from a TOTP-supported application on your phone.',
                    )
                }}
            </p>

            <div>
                <UButton v-if="hasSetupData" :label="t('Continue setup')" icon="i-lucide-shield-check" @click="showSetupModal = true" />
                <Form v-else v-bind="enable.form()" @success="showSetupModal = true" #default="{ processing }">
                    <UButton type="submit" :label="t('Enable 2FA')" :loading="processing" />
                </Form>
            </div>
        </div>

        <div v-else class="flex flex-col items-start justify-start space-y-4">
            <p class="text-sm text-muted">
                {{
                    t(
                        'You will be prompted for a secure, random pin during login, which you can retrieve from the TOTP-supported application on your phone.',
                    )
                }}
            </p>

            <div class="relative inline">
                <Form v-bind="disable.form()" #default="{ processing }">
                    <UButton type="submit" color="error" :label="t('Disable 2FA')" :loading="processing" />
                </Form>
            </div>

            <TwoFactorRecoveryCodes />
        </div>

        <TwoFactorSetupModal v-model:open="showSetupModal" :requires-confirmation="requiresConfirmation" :two-factor-enabled="twoFactorEnabled" />
    </div>
</template>
