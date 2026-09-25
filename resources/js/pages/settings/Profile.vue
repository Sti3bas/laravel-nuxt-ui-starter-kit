<script setup lang="ts">
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/DeleteUser.vue';
import Heading from '@/components/Heading.vue';
import { Form, Head, usePage } from '@inertiajs/vue3';
/* @chisel-email-verification */
import { Link } from '@inertiajs/vue3';
import { send } from '@/routes/verification';
/* @end-chisel-email-verification */
import { computed } from 'vue';

defineProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>();

const page = usePage();
const user = computed(() => page.props.auth.user);
</script>

<template>
    <Head title="Profile settings" />

    <h1 class="sr-only">Profile settings</h1>

    <div class="flex flex-col space-y-6">
        <Heading variant="small" title="Profile" description="Update your name and email address" />

        <Form v-bind="ProfileController.update.form()" class="space-y-6" v-slot="{ errors, processing }">
            <UFormField label="Name" name="name" :error="errors.name" required>
                <UInput class="w-full" name="name" :default-value="user.name" required autocomplete="name" placeholder="Full name" />
            </UFormField>

            <UFormField label="Email" name="email" :error="errors.email" required>
                <UInput
                    class="w-full"
                    type="email"
                    name="email"
                    :default-value="user.email"
                    required
                    autocomplete="username"
                    placeholder="Email address"
                />
            </UFormField>

            <!-- @chisel-email-verification -->
            <UAlert
                v-if="mustVerifyEmail && !user.email_verified_at"
                color="warning"
                variant="subtle"
                icon="i-lucide-circle-alert"
                title="Your email address is unverified."
            >
                <template #description>
                    <Link :href="send()" as="button" class="font-medium underline underline-offset-4">
                        Click here to re-send the verification email.
                    </Link>
                </template>
            </UAlert>

            <UAlert
                v-if="status === 'verification-link-sent'"
                color="success"
                variant="subtle"
                icon="i-lucide-circle-check"
                description="A new verification link has been sent to your email address."
            />
            <!-- @end-chisel-email-verification -->

            <div class="flex items-center gap-4">
                <UButton type="submit" label="Save" :loading="processing" data-test="update-profile-button" />
            </div>
        </Form>
    </div>

    <DeleteUser />
</template>
