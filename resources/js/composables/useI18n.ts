import { router, usePage } from '@inertiajs/vue3';
import { en, es } from '@nuxt/ui/locale';
import { computed } from 'vue';

import { update } from '@/routes/locale';

const uiLocales: Record<string, typeof en> = { en, es };

const catalogs = import.meta.glob<Record<string, string>>('../../../lang/*.json', {
    eager: true,
    import: 'default',
});

function messages(code: string): Record<string, string> {
    return catalogs[`../../../lang/${code}.json`] ?? {};
}

export function useI18n() {
    const page = usePage();

    const locale = computed(() => page.props.locale);
    const locales = computed(() => page.props.locales);
    const uiLocale = computed(() => uiLocales[locale.value] ?? en);
    const localeOptions = computed(() =>
        locales.value.map((code) => ({
            label: uiLocales[code]?.name ?? code,
            value: code,
        })),
    );

    function t(key: string, replace: Record<string, string | number> = {}): string {
        let message = messages(locale.value)[key] ?? key;

        for (const [name, value] of Object.entries(replace)) {
            message = message.replaceAll(`:${name}`, String(value));
        }

        return message;
    }

    function setLocale(code: string): void {
        router.put(update().url, { locale: code });
    }

    return { t, locale, locales, uiLocale, localeOptions, setLocale };
}
