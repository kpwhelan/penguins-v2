# Granite State Penguins

The redesigned public website and member portal for the Granite State Penguins masters swimming group. It is built with Laravel, Inertia, React, and Tailwind CSS.

## Local development

Requirements: PHP 8.3+, Composer, Node.js/npm, and Docker for the local MySQL database.

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
composer run dev
```

`composer run dev` starts the MySQL-only Docker service, Laravel, the queue worker, scheduler, application log viewer, and Vite. Configure the database values in `.env` before the first run, then run `php artisan migrate`.

## External services

- Cloudflare R2 stores public images and private workout documents. Production uses the `r2-public` and `r2-private` disks.
- Resend delivers registration invitations, deck-duty reminders, contact-form messages, and password-reset mail.
- The queue worker must remain running for invitations and contact messages.
- Laravel's scheduler must run continuously so deck-duty reminders are dispatched at the configured time.

For a private test deployment using production data, set `MAIL_OVERRIDE_ADDRESS` to the tester's email address. Laravel will reroute every outgoing message to that address, including invitations, password resets, contact submissions, and deck-duty reminders. Remove the setting before public launch; `php artisan production:check` intentionally reports an active override as a launch blocker.

Use `.env.example` as the complete list of settings. Secrets belong only in `.env` locally or in the production server's environment settings.

## Verification

```bash
php artisan test
npm run build
vendor/bin/pint --test
```

Before deploying, run this with the production environment loaded:

```bash
php artisan production:check
```

It fails when critical settings such as HTTPS, Resend, persistent queues, or either R2 bucket are missing or unsafe.

## Production deployment

Import the final database from the existing InMotion site before running this application's migrations. Then deploy with the usual optimized Laravel sequence:

```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan migrate --force
php artisan optimize
php artisan queue:restart
php artisan production:check
```

The server must run a persistent queue worker and Laravel scheduler. The web root must point to `public/`, HTTPS must be enabled, and writable storage/cache directories must be configured for the web and queue processes.

The Content Security Policy currently runs in report-only mode. Review real production browser reports before switching it to enforcement so legitimate third-party resources are not accidentally blocked.
