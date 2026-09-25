# Laravel + Nuxt UI Starter Kit

## Introduction

Nuxt UI starter kit provides a robust, modern starting point for building Laravel applications with a Vue frontend using [Inertia](https://inertiajs.com).

Inertia allows you to build modern, single-page Vue applications using classic server-side routing and controllers. This lets you enjoy the frontend power of Vue combined with the incredible backend productivity of Laravel and lightning-fast Vite compilation.

This Vue starter kit utilizes Vue 3 and the Composition API, TypeScript, and the [Nuxt UI](https://ui.nuxt.com) component library.

## What's inside?

This starter kit is based on [laravel/vue-starter-kit](https://github.com/laravel/vue-starter-kit) and includes the following features:

- Authentication powered by [Laravel Fortify](https://laravel.com/docs/fortify):
    - Login
    - Register
    - Forgot Password
    - Reset Password
    - Confirm Password
    - Verify Email
    - Two-factor challenge
- Two-factor authentication (TOTP) with recovery codes
- Passkeys (WebAuthn) for passwordless sign-in
- Fully typed [Wayfinder](https://github.com/laravel/wayfinder) route functions for the frontend
- Inertia `<Form>` components and server-side rendering (SSR)
- Interactive feature selection on install (registration, email verification, 2FA, passkeys, password confirmation)
- Dashboard page
- Settings pages:
    - Profile
    - Security (password, two-factor authentication, passkeys)
    - Appearance
- Static analysis with [Larastan](https://github.com/larastan/larastan), code style with [Laravel Pint](https://laravel.com/docs/pint), tests with [Pest](https://pestphp.com), and a ready-to-use GitHub Actions workflow

## Installation

You can set up this starter kit in two ways:

### Option 1: Install via Laravel Herd

One-click installation with [Laravel Herd](https://herd.laravel.com):

<a href="https://herd.laravel.com/new?starter-kit=sti3bas/laravel-nuxt-ui-starter-kit"><img src="https://img.shields.io/badge/Install%20with%20Herd-fff?logo=laravel&logoColor=f53003" alt="Install with Herd"></a>

### Option 2: Install via Laravel Installer

Create a new Laravel application using the official [Laravel Installer](https://laravel.com/docs/13.x/starter-kits#community-maintained-starter-kits):

```bash
laravel new my-app --using=sti3bas/laravel-nuxt-ui-starter-kit
```

## Screenshots

![Welcome](.github/screenshots/light/welcome.png)
![Login](.github/screenshots/light/login.png)
![Dashboard](.github/screenshots/light/dashboard.png)
![Profile settings](.github/screenshots/light/profile-settings.png)
![Password settings](.github/screenshots/light/password-settings.png)
![Appearance settings](.github/screenshots/light/appearance-settings.png)

<details>
<summary>Dark mode</summary>

![Welcome](.github/screenshots/dark/welcome.png)
![Login](.github/screenshots/dark/login.png)
![Dashboard](.github/screenshots/dark/dashboard.png)
![Profile settings](.github/screenshots/dark/profile-settings.png)
![Password settings](.github/screenshots/dark/password-settings.png)
![Appearance settings](.github/screenshots/dark/appearance-settings.png)

</details>

## License

The Laravel + Nuxt UI starter kit is open-sourced software licensed under the MIT license.
