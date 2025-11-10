
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>

useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "CRM System",
      "url": "https://https://crm-system-nuxt-coral.vercel.app/"
    })
  }]
})
</script>
