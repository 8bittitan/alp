import { html } from '@elysiajs/html'
import { Elysia } from 'elysia'
import { generateId } from 'lucia'

import CreateLinkButton from '~/components/links/create-button'
import CreateLinkModal from '~/components/links/create-link-modal'
import authPages from '~/pages/auth'
import dashboardPage from '~/pages/dashboard'

const pagesRouter = new Elysia({
  name: '@router/pages',
})
  .use(html())
  .use(authPages)
  .use(dashboardPage)

export default pagesRouter
