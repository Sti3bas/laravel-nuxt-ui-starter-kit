<?php

use Inertia\Testing\AssertableInertia;

test('users can update their preferred locale', function () {
    $this->put(route('locale.update'), ['locale' => 'es'])
        ->assertRedirect()
        ->assertSessionHas('locale', 'es');
});

test('unsupported locales are rejected', function () {
    $this->put(route('locale.update'), ['locale' => 'fr'])
        ->assertSessionHasErrors('locale')
        ->assertSessionMissing('locale');
});

test('the session locale is applied and shared with inertia', function () {
    $this->withSession(['locale' => 'es'])
        ->get(route('home'))
        ->assertOk()
        ->assertInertia(
            fn (AssertableInertia $page) => $page
                ->where('locale', 'es')
                ->where('locales', config('app.locales'))
        );
});

test('the preferred language is used when no session locale is set', function () {
    $this->withHeader('Accept-Language', 'es')
        ->get(route('home'))
        ->assertInertia(
            fn (AssertableInertia $page) => $page->where('locale', 'es')
        );
});
