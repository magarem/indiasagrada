<script setup>
// NÃO use: import { queryContent } from '#content'

const { data: slideshow, pending, error } = await useAsyncData('slideshow', () =>
  queryCollection('content')           // nome da coleção que você definiu
    .path('/slideshow')                // ou o path exato do seu arquivo
    .first()                           // .findOne() virou .first()
)
</script>

<template>
  <div>
    <div v-if="pending">Carregando...</div>
    <div v-else-if="error">Erro: {{ error.message }}</div>
    <div v-else-if="slideshow">
      <h1>{{ slideshow.title || 'Slideshow' }}</h1>

      <div v-for="(slide, i) in slideshow.slides || []" :key="i">
        <img :src="slide.image" :alt="slide.title" class="w-full h-64 object-cover" />
        <h3>{{ slide.title }}</h3>
        <p>{{ slide.desc }}</p>
      </div>
    </div>
    <div v-else>Nenhum slideshow encontrado</div>
  </div>
</template>