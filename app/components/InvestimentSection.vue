<template>
  <section v-if="content" class="py-16 sm:py-24" style="background-color: #fbead8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-4xl sm:text-5xl font-extrabold text-center mb-12 sm:mb-16">
        {{ content.title }}
      </h2>

      <div class="flex flex-col lg:flex-row gap-10">
        <div class="lg:w-1/3 p-8 bg-white/50 rounded-2xl shadow-xl border-t-8 border-indigo-600">
          <p class="text-lg font-semibold opacity-70 uppercase tracking-wider">
            {{ content.priceLabel }}
          </p>
          <p class="text-6xl font-black mt-2 mb-6">{{ content.price }}</p>
          
          <h3 class="text-xl font-bold mb-4">Condições de Pagamento</h3>
          <ul class="space-y-3">
            <li v-for="(term, index) in content.paymentTerms" :key="index" class="flex items-start">
              <span class="font-bold mr-2">•</span>
              <span v-html="term"></span>
            </li>
          </ul>
        </div>
        
        <div class="lg:w-2/3 space-y-6">
          <div class="p-6 bg-white/30 rounded-xl border-l-4 border-indigo-600">
            <h3 class="text-2xl font-bold mb-4 uppercase">O que está incluso</h3>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc ml-5">
              <li v-for="item in content.included" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div class="p-6 bg-red-100/50 rounded-xl border-l-4 border-red-600">
            <h3 class="text-xl font-bold mb-2 uppercase">Não incluso</h3>
            <div class="space-y-1">
              <p v-for="item in content.notIncluded" :key="item">
                {{ item }}
              </p>
            </div>
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

// Puxamos os dados do arquivo investimento.md
const { content } = await useContentSource('investimento', props.isPreview)
</script>