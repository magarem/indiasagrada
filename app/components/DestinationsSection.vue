<script setup>
const props = defineProps({
  isPreview: { type: Boolean, default: false }
})

// 1. Dados da Seção
// Adicionamos props.isPreview na chave para evitar cache entre modos
const { getSectionData, getContentList, getSortedList } = useContentManager('destinos', props.isPreview)

// Executa as buscas
const { data: sectionData } = await getSectionData()
const { data: sectionItems } = await getContentList()
// Cria a lista ordenada
const sortedItems = getSortedList(sectionItems, sectionData)

</script>
 
<template>
  
  <section v-if="sectionData" class="py-16 sm:py-24" style="background-color: #fae2c8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 uppercase tracking-tight">
          {{ sectionData.title }}
        </h2>
        <div class="h-1 w-24 bg-black mx-auto mb-6"></div>
        <p v-if="sectionData.intro" class="text-lg max-w-2xl mx-auto opacity-80">
          {{ sectionData.intro }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="dest in sortedItems" :key="dest.path" 
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