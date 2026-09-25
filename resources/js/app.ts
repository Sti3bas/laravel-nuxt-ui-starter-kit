import '../css/app.css';

import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { createInertiaApp } from '@inertiajs/vue3';
import ui from '@nuxt/ui/vue-plugin';
import { createI18n } from 'vue-i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const messages = Object.fromEntries(
    Object.entries(import.meta.glob<Record<string, string>>('../../lang/*.json', { eager: true, import: 'default' })).map(([path, catalog]) => [
        /([^/]+)\.json$/.exec(path)?.[1] ?? 'en',
        catalog,
    ]),
);

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'Welcome':
            case name === 'ErrorPage':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    withApp(app, { ssr, page }) {
        app.directive('focus', {
            mounted: (el: HTMLElement, shouldFocus) => {
                if (shouldFocus.value !== false) {
                    el.focus();
                }
            },
        });

        app.use(
            createI18n({
                legacy: false,
                locale: (page.props.locale as string) ?? 'en',
                fallbackLocale: 'en',
                messages,
                missingWarn: false,
                fallbackWarn: false,
                // Laravel JSON translations use whole strings as keys, so
                // resolve keys directly instead of vue-i18n's dot notation.
                messageResolver: (obj, path) => (obj as Record<string, string>)[path] ?? path,
            }),
        );

        if (!ssr) {
            app.use(ui);
        }
    },
    progress: {
        color: 'var(--ui-primary)',
    },
});
