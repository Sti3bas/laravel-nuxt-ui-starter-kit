import type { Auth } from '@/types/auth';
import type { createHeadManager, Page, Router } from '@inertiajs/core';
import type { Directive } from 'vue';

// Extend ImportMeta interface for Vite...
declare module 'vite/client' {
    interface ImportMetaEnv {
        readonly VITE_APP_NAME: string;
        [key: string]: string | boolean | undefined;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
        readonly glob: {
            <T>(pattern: string): Record<string, () => Promise<T>>;
            <T>(pattern: string, options: { eager: true; import?: string }): Record<string, T>;
        };
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            locale: string;
            locales: string[];
            [key: string]: unknown;
        };
    }
}

declare module 'vue' {
    interface GlobalDirectives {
        vFocus: Directive<HTMLElement, boolean | undefined>;
    }

    interface ComponentCustomProperties {
        $inertia: Router;
        $page: Page;
        $headManager: ReturnType<typeof createHeadManager>;
    }
}
