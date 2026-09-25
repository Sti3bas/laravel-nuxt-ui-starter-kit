import { router, usePage } from '@inertiajs/vue3';
import { en } from '@nuxt/ui/locale';
import { computed, watch } from 'vue';
import { useI18n as useVueI18n } from 'vue-i18n';

import { update } from '@/routes/locale';

const uiLocales: Record<string, typeof en> = { en };

export function useI18n() {
    const page = usePage();
    const { t, locale: vueLocale } = useVueI18n();

    const locale = computed(() => page.props.locale);
    const locales = computed(() => page.props.locales);
    const uiLocale = computed(() => uiLocales[locale.value] ?? en);
    const localeOptions = computed(() =>
        locales.value.map((code) => ({
            label: uiLocales[code]?.name ?? code,
            value: code,
        })),
    );

    watch(
        locale,
        (code) => {
            if (vueLocale.value !== code) {
                vueLocale.value = code;
            }
        },
        { immediate: true },
    );

    function setLocale(code: string): void {
        router.put(update().url, { locale: code });
    }

    return { t, locale, locales, uiLocale, localeOptions, setLocale };
}
