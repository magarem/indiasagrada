<script setup>
const props = defineProps({
  isPreview: { type: Boolean, default: false }
})

// 1. Puxamos os metadados da seção (onde está o layout_order)
const { data: sectionMeta } = await useAsyncData('destinos-meta', () => 
  queryCollection('content').path('/destinos/_index').first()
)

// 2. Puxamos todos os itens da pasta destinos
const { data: destinosItems } = await useAsyncData('destinos-list', () => 
  queryCollection('content')
    .where('path', 'LIKE', '/destinos/%')
    .where('path', '<>', '/destinos/_index')
    .all()
)

// 3. Lógica de Ordenação Estrita
const sortedDestinations = computed(() => {
  if (!destinosItems.value) return []
  
  const order = sectionMeta.value?.layout_order
  
  // Se não houver ordem definida, retorna a lista original
  if (!order || !Array.isArray(order)) return destinosItems.value

  return [...destinosItems.value].sort((a, b) => {
    // Extraímos o slug do path (ex: "/destinos/rishikesh" -> "rishikesh")
    const slugA = a.path.split('/').pop()
    const slugB = b.path.split('/').pop()
    
    const indexA = order.indexOf(slugA)
    const indexB = order.indexOf(slugB)
    
    // Se o item não estiver na lista de ordem, colocamos no final
    const finalIndexA = indexA === -1 ? 999 : indexA
    const finalIndexB = indexB === -1 ? 999 : indexB
    
    return finalIndexA - finalIndexB
  })
})
</script>

<template>
  <section v-if="sectionMeta" class="py-16 sm:py-24" style="background-color: #fae2c8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 uppercase tracking-tight">
          {{ sectionMeta.title }}
        </h2>
        <div class="h-1 w-24 bg-black mx-auto mb-6"></div>
        <p v-if="sectionMeta.intro" class="text-lg max-w-2xl mx-auto opacity-80">
          {{ sectionMeta.intro }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="dest in sortedDestinations" :key="dest.path" 
             class="group relative overflow-hidden rounded-2xl shadow-lg bg-white/20 transition-all duration-500 hover:-translate-y-2">
          
          <div class="aspect-[3/4] overflow-hidden">
            <img 
              :src="dest.meta.image" 
              :alt="dest.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          <div class="absolute bottom-0 left-0 p-6 w-full text-white">
            <h3 class="text-2xl font-bold mb-1">{{ dest.name }}</h3>
            
            <div class="text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ContentRenderer :value="dest" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Remove margens extras dos parágrafos gerados pelo Markdown no card */
:deep(p) {
  margin: 0;
  display: inline;
}
</style>