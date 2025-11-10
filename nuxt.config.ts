// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: {enabled: false},
	modules: [
		"@nuxt/ui",
		"@nuxt/image",
		"shadcn-nuxt",
		'@nuxtjs/seo',      // объединённая техн. SEO-конфигурация
    '@nuxtjs/robots',
		'nuxt-simple-sitemap',
		["@nuxtjs/google-fonts",
			{
				families: {
					Lato: {
						wght: [300, 400, 700],
						ital: [300]
					}
				}
			}],
		"@nuxt/icon",
		'@pinia/nuxt',
		[
			'@vee-validate/nuxt',
			{
				// disable or enable auto imports
				autoImports: true,
			}
		],
	],
	shadcn: {
		prefix: 'Ui',
		componentDir: './components/ui'
	},
	pinia: {
		storesDirs: ['./store/**'],
	},
	app: {
    head: {
      titleTemplate: '%s · CRM System',
    	title: 'CRM System',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'description', content: 'CRM System — панели, клиенты, сделки' },
        { name: 'robots', content: 'index, follow' },
        // Open Graph / Twitter
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'CRM System' },
        { property: 'og:title', content: 'CRM System' },
        { property: 'og:description', content: 'CRM System — панели, клиенты, сделки' },
        { property: 'og:image', content: 'https://https://crm-system-nuxt-coral.vercel.app/og-default.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'canonical', href: 'https://https://crm-system-nuxt-coral.vercel.app/' }
      ]
    }
  },

  // Sitemap
  site: {
    url: 'https://https://crm-system-nuxt-coral.vercel.app',
  },

  sitemap: {
    autoLastmod: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
    },
    exclude: ['/admin/**', '/auth/**', '/api/**']
  },

  robots: {
    groups: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/auth'],
      }
    ]
  },

  // Кеш/ISR на Vercel (ускоряем индекс и LCP)
  routeRules: {
    '/': { isr: 60 },          // обновлять статику раз в 60 сек
    '/**': { isr: 300 }
  }
})