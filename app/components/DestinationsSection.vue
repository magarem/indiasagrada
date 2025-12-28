<template>
  <section v-if="content" class="py-16 sm:py-24" style="background-color: #fae2c8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 uppercase tracking-tight">
          {{ content.title }}
        </h2>
        <div class="h-1 w-24 bg-black mx-auto mb-6"></div>
        <p v-if="content.intro" class="text-lg max-w-2xl mx-auto opacity-80">
          {{ content.intro }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(dest, index) in content.destinations" :key="index" 
             class="group relative overflow-hidden rounded-2xl shadow-lg bg-white/20 transition-all duration-500 hover:-translate-y-2">
          
          <div class="aspect-[3/4] overflow-hidden">
            <img 
              :src="dest.image" 
              :alt="dest.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          <div class="absolute bottom-0 left-0 p-6 w-full">
            <h3 class="text-white text-2xl font-bold mb-1">{{ dest.name }}</h3>
            <p class="text-white/80 text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {{ dest.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  isPreview: { type: Boolean, default: false }
})

// Puxamos os dados do arquivo destinos.md
const { content } = await useContentSource('destinos', props.isPreview)
</script>

<style scoped>
.group:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}
</style>