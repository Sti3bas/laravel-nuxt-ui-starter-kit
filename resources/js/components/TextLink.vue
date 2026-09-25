<script setup lang="ts">
import { toUrl } from '@/lib/utils';
import type { LinkComponentBaseProps, Method } from '@inertiajs/core';

type Props = {
    href: NonNullable<LinkComponentBaseProps['href']>;
    tabindex?: number;
    method?: Method;
    as?: string;
};

const props = defineProps<Props>();
</script>

<template>
    <ULink
        :to="toUrl(props.href)"
        :tabindex="tabindex"
        :method="props.method ?? (typeof props.href === 'object' ? props.href.method : undefined)"
        :as="props.as"
        class="font-medium text-primary hover:underline"
    >
        <slot />
    </ULink>
</template>
