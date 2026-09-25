<script setup lang="ts">
import Heading from '@/components/Heading.vue';
import { useI18n } from '@/composables/useI18n';
import { Head } from '@inertiajs/vue3';

const { t, locale, localeOptions, setLocale } = useI18n();
</script>

<template>
    <Head :title="t('Appearance settings')" />

    <h1 class="sr-only">{{ t('Appearance settings') }}</h1>

    <div class="space-y-6">
        <Heading variant="small" title="Appearance settings" description="Update your account's appearance settings" />

        <UPageCard variant="subtle">
            <UFormField
                name="color-mode"
                :label="t('Color mode')"
                :description="t('Select your preferred color mode.')"
                required
                class="flex items-start justify-between gap-4 max-sm:flex-col"
            >
                <UColorModeSelect />
            </UFormField>

            <UFormField
                name="locale"
                :label="t('Language')"
                :description="t('Select your preferred language.')"
                required
                class="flex items-start justify-between gap-4 max-sm:flex-col"
            >
                <USelect :model-value="locale" :items="localeOptions" @update:model-value="setLocale" />
            </UFormField>
        </UPageCard>
    </div>
</template>
