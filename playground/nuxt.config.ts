import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'
import { defineNuxtModule } from '@nuxt/kit'
import { startSubprocess } from '@nuxt/devtools-kit'
import { DEVTOOLS_UI_PORT } from '../src/constants'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  modules: [
    '../src/module',
    defineNuxtModule({
      setup(_, nuxt) {
        if (!nuxt.options.dev)
          return

        startSubprocess(
          {
            command: 'npx',
            args: ['nuxi', 'dev', '--port', DEVTOOLS_UI_PORT.toString()],
            cwd: resolve(__dirname, '../client'),
          },
          {
            id: 'nuxt-devtools-rpc-starter:client',
            name: 'Nuxt DevTools RPC Starter Client',
          },
        )
      },
    }),
  ],
})
