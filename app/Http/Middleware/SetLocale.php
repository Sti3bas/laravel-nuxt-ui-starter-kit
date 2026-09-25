<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->session()->get('locale')
            ?? $request->getPreferredLanguage(config('app.locales'));

        if (in_array($locale, config('app.locales'), true)) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
