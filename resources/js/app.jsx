import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import FatalErrorBoundary from './Components/FatalErrorBoundary';

createInertiaApp({
    title: (title) => title.includes('Granite State Penguins')
        ? title
        : `${title} | Granite State Penguins`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <FatalErrorBoundary>
                <App {...props} />
            </FatalErrorBoundary>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
