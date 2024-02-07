import { InferSelectModel } from 'drizzle-orm'

import { DEFAULT_KEY_DOMAIN, GOOGLE_FAVICONS_URL } from '~/constants'
import { links } from '~/lib/db/schema'

type LinkProps = {
  link: InferSelectModel<typeof links>
}

export default function Link({ link }: LinkProps) {
  const alpUrl = `${DEFAULT_KEY_DOMAIN}/${link.key}`

  return (
    <div class="rounded-md bg-gray-50 p-4">
      <div class="flex">
        <img
          src={`${GOOGLE_FAVICONS_URL}${link.url}`}
          alt={alpUrl}
          class="h-8 w-8 rounded-full sm:h-10 sm:w-10"
          height={20}
          width={20}
        />
        <div class="ml-4">
          <a href={alpUrl} target="_blank" rel="noreferrer noopener">
            {alpUrl}
          </a>
          <div>
            <a href={link.url} target="_blank" rel="noreferrer noopener">
              {link.url}
            </a>
          </div>
        </div>
        <div class="ml-auto flex items-center space-x-4">
          {link.clicks > 0 && (
            <span class="inline-flex self-center rounded-lg bg-gray-200/50 px-2 py-1 text-sm text-gray-800">
              {link.clicks} Click{link.clicks > 1 ? 's' : ''}
            </span>
          )}
          <button hx-delete={`/api/link/${link.key}`}>X</button>
        </div>
      </div>
    </div>
  )
}
