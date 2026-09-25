<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { useI18n } from '@/composables/useI18n';
import { home } from '@/routes';
import { usePage } from '@inertiajs/vue3';

const { t } = useI18n();
const page = usePage();
const name = page.props.name;

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div class="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div class="relative hidden h-full flex-col bg-inverted p-10 lg:flex">
            <ULink :to="home().url" class="relative z-20 flex items-center text-lg font-medium text-inverted">
                <AppLogoIcon class="mr-2 size-8 fill-current text-inverted" />
                {{ name }}
            </ULink>
        </div>
        <div class="lg:p-8">
            <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div class="flex flex-col space-y-2 text-center">
                    <h1 class="text-xl font-medium tracking-tight text-highlighted" v-if="title">
                        {{ t(title) }}
                    </h1>
                    <p class="text-sm text-muted" v-if="description">
                        {{ t(description) }}
                    </p>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
