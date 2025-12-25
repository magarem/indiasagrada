<script setup>
// import { queryContent } from '#content'

const { data: slideshow } = await useAsyncData('slideshow', () => 
  queryContent('/slideshow').findOne()
)
</script>

<template>
  <div class="py-12">
    <h1 class="text-4xl font-bold text-center mb-8">Slideshow da Pousada</h1>
    
    <div v-if="slideshow && slideshow.slides?.length">
      <Slideshow :slides="slideshow.slides" />
    </div>
    
    <div v-else class="text-center text-red-600">
      Slideshow não encontrado. Verifique o arquivo content/slideshow.md
    </div>
    
    <!-- Debug opcional -->
    <details class="mt-8">
      <summary>Ver dados brutos</summary>
      <pre>{{ JSON.stringify(slideshow, null, 2) }}</pre>
    </details>
  </div>
</template>