<script setup>
const props = defineProps({
  isPreview: { type: Boolean, default: false }
})

const displayModal = ref(false);
const selectedItem = ref(null);

// 1. Busca os metadados da seção (onde está o layout_order)
const { data: sectionData } = await useAsyncData('acomodacoes-meta', () => 
  queryCollection('content')
    .path('/acomodacoes/_index')
    .first()
)

// 2. Busca os arquivos individuais das acomodações
const { data: accommodationsItems } = await useAsyncData('acomodacoes-list', () => 
  queryCollection('content')
    .where('path', 'LIKE', '/acomodacoes/%')
    .where('path', '<>', '/acomodacoes/_index')
    .all()
)

const sortedAccommodations = computed(() => {
  if (!accommodationsItems.value) return []
  
  // No Nuxt v3, os dados customizados costumam ficar em .meta ou na raiz
  // Vamos garantir que estamos pegando o array certo
  const order = sectionData.value?.layout_order || sectionData.value?.meta?.layout_order
  
  if (!order || !Array.isArray(order)) {
    console.warn('Aviso: layout_order não encontrado em sectionData', sectionData.value)
    return accommodationsItems.value
  }

  return [...accommodationsItems.value].sort((a, b) => {
    // stem costuma ser o nome limpo do arquivo (ex: "acomodacoes/vedic-dham")
    // Vamos pegar apenas a parte final dele
    const slugA = a.stem ? a.stem.split('/').pop() : a.path.split('/').pop()
    const slugB = b.stem ? b.stem.split('/').pop() : b.path.split('/').pop()

    // Debug opcional: remova o comentário abaixo para ver os nomes no console
    // console.log(`Comparando: ${slugA} vs ${slugB} usando a ordem:`, order)

    const indexA = order.indexOf(slugA)
    const indexB = order.indexOf(slugB)

    const posA = indexA === -1 ? 999 : indexA
    const posB = indexB === -1 ? 999 : indexB

    return posA - posB
  })
})


const openDetails = (item) => {
  selectedItem.value = item;
  displayModal.value = true;
};
</script>

<template>
  <section v-if="sectionData" class="py-16 sm:py-24" style="background-color: #fbead8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 uppercase tracking-tighter font-serif">
          {{ sectionData.title }}
        </h2>
        <div class="h-1 w-24 bg-[#4a3728] mx-auto mb-6"></div>
        <p v-if="sectionData.description" class="text-lg max-w-2xl mx-auto opacity-80 font-serif">
          {{ sectionData.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="item in sortedAccommodations" 
          :key="item.path" 
          @click="openDetails(item)"
          class="group cursor-pointer bg-white/40 rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
        >
          <div class="h-64 overflow-hidden relative">
            <img :src="`/images/${item.meta.image}`" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="text-white border border-white px-4 py-2 rounded-full text-sm uppercase tracking-widest">Ver detalhes</span>
            </div>
          </div>
          <div class="p-6 text-center">
            <h3 class="font-serif font-bold text-xl uppercase tracking-wider text-[#4a3728]">{{ item.title }}</h3>
          </div>
        </div>
      </div>

      <Dialog v-model:visible="displayModal" :header="selectedItem?.title" modal dismissableMask :style="{ width: '90vw', maxWidth: '1000px' }">
        <div class="flex flex-col md:flex-row h-full max-h-[80vh] overflow-y-auto">
          <div class="w-full md:w-1/2 h-64 md:h-auto">
            <img v-if="selectedItem" :src="`/images/${selectedItem.meta.image}`" class="w-full h-full object-cover" />
          </div>
          <div class="w-full md:w-1/2 p-8 bg-[#fdfcf0] flex flex-col justify-center">
            <h3 class="text-3xl font-serif mb-6 text-[#4a3728] border-b border-[#d1b253]/30 pb-4">{{ selectedItem?.title }}</h3>
            <div class="text-lg leading-relaxed text-gray-800 font-serif italic opacity-90 markdown-content">
              <ContentRenderer v-if="selectedItem" :value="selectedItem" />
            </div>
            <div class="mt-8">
              <button @click="displayModal = false" class="bg-[#d1b253] text-white px-8 py-3 rounded-full font-serif uppercase tracking-widest hover:bg-[#b09440] transition-colors">Fechar</button>
            </div>
          </div>
        </div>
      </Dialog>

    </div>
  </section>
</template>

<style scoped>
/* Estilos para o conteúdo do Markdown renderizado */
.markdown-content :deep(p) {
  margin-bottom: 1rem;
}
:deep(.p-dialog-header) { background: #fdfcf0; border-bottom: none; }
:deep(.p-dialog-content) { padding: 0; }
</style>