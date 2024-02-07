import { User } from 'lucia'

import Avatar from '~/components/avatar'
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from '~/components/dropdown'
import env from '~/lib/env'
import { liveReloadScript } from '~/lib/utils'
import { PropsWithChildren } from '~/types/jsx'

type Props = {
  user: User | null
}

const reloadScript = env.NODE_ENV === 'development' ? liveReloadScript() : ''

function BaseLayout({ children, user }: PropsWithChildren<Props>) {
  const rootRouteHref = user ? '/dashboard' : '/'

  return (
    <html lang="en">
      <head>
        <title>Alp</title>
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js"
        ></script>
        <script src="//unpkg.com/alpinejs" defer></script>
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico"></link>
        <link rel="stylesheet" href="/public/styles/app.css" />
        <script>{reloadScript}</script>
        {/* CRITICAL CSS */}
        <style>
          {`
          [x-cloak] {
            display: none;
          }
          `}
        </style>
      </head>
      <body hx-boost="true">
        <div class="mb-4 bg-black text-white">
          <nav class="mx-auto flex w-full max-w-7xl select-none items-center justify-between py-3">
            <a href={rootRouteHref}>ALP</a>

            <div class="flex items-center justify-center rounded-full border border-gray-700">
              <a
                href="/dashboard"
                class="group relative mx-3 inline-block h-full w-full px-2 py-2 text-center font-medium leading-tight"
              >
                <span>Dashboard</span>
                <span class="absolute bottom-0 left-0 h-px w-full translate-y-px bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 duration-300 ease-out md:from-gray-700 md:via-gray-400 md:to-gray-700"></span>
              </a>
              <a
                href="/analytics"
                class="group relative mx-3 inline-block h-full w-full px-2 py-2 text-center font-medium leading-tight"
              >
                <span>Analytics</span>
                <span class="absolute bottom-0 left-1/2 h-px w-0 translate-y-px bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 duration-300 ease-out group-hover:left-0 group-hover:w-full md:from-gray-700 md:via-gray-400 md:to-gray-700"></span>
              </a>
            </div>

            {user && (
              <Dropdown>
                <DropdownTrigger>
                  <Avatar user={user} />
                </DropdownTrigger>
                <DropdownContent>
                  <a
                    href="/api/logout"
                    class="focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm outline-none transition-colors hover:bg-neutral-100 focus:bg-neutral-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="mr-2 h-4 w-4"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" x2="9" y1="12" y2="12"></line>
                    </svg>
                    <span>Log out</span>
                  </a>
                </DropdownContent>
              </Dropdown>
            )}
          </nav>
        </div>
        <main class="mx-auto max-w-7xl">{children}</main>
      </body>
    </html>
  )
}

export default BaseLayout
