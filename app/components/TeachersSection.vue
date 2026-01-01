<template>
  <section v-if="sectionData" class="py-16 sm:py-24" style="background-color: #fae2c8; color: #010000;">
    <div class="container mx-auto px-4 max-w-5xl">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 uppercase tracking-tight">
          {{ sectionData.title }}
        </h2>
        <div class="h-1 w-24 bg-black mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
        <div v-for="(teacher, index) in sortedItems" :key="index" 
        
             class="flex flex-col items-center text-center group">
          
          <div class="relative mb-8">
            <div class="relative w-64 h-64 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <img 
                :src="`/images/${teacher.image || teacher.meta?.image}`" 
                :alt="teacher.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <h3 class="text-3xl font-black mb-2">{{ teacher.name }}</h3>
          <p class="text-indigo-700 font-bold uppercase tracking-widest text-sm mb-4">
            {{ teacher.role }}
          </p>
          <p class="text-base leading-relaxed opacity-90 text-justify md:text-center italic">
            <ContentRenderer 
                v-if="teacher.body && typeof teacher.body === 'object'" 
                :value="teacher" 
              />
              
              <MDC 
                v-else-if="teacher.body" 
                :value="teacher.body" 
              />
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  isPreview: { type: Boolean, default: false }
})

// Puxamos os dados do arquivo facilitadores.md
// const { content } = await useContentSource('facilitadores', props.isPreview)




// 1. Dados da Seção
// Adicionamos props.isPreview na chave para evitar cache entre modos
const { getSectionData, getContentList, getSortedList } = useContentManager('facilitadores', props.isPreview)

// Executa as buscas
const { data: sectionData } = await getSectionData()
const { data: sectionItems } = await getContentList()
// Cria a lista ordenada
const sortedItems = getSortedList(sectionItems, sectionData)

console.log('TeachersSection - sectionData:', sectionData.value)
console.log('TeachersSection - sortedItems:', sortedItems.value)  

</script>

<style scoped>
.transition-transform {
  will-change: transform;
}
</style>