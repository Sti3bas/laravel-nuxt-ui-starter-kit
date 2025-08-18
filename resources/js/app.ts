import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import ui from '@nuxt/ui/vue-plugin';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { route, ZiggyVue } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use({
                install(app) {
                    const routeFn = (...args: Parameters<typeof route>) => route(args[0], args[1], args[2] ?? false, args[3]);

                    app.provide('route', routeFn);
                    app.config.globalProperties.route = routeFn as typeof route;
                },
            })
            .use(ui)
            .mount(el);
    },
    progress: {
        color: 'var(--ui-primary)',
    },
});
