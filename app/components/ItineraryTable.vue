<template>
  <section v-if="content" class="py-16 sm:py-24" style="background-color: #fae2c8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-4xl sm:text-5xl font-extrabold text-center mb-12">
        {{ content.title }}
      </h2>

      <div class="overflow-hidden rounded-xl border border-black/10 shadow-lg">
        <table class="min-w-full">
          <thead>
            <tr style="background-color: #010000; color:#fae2c8;">
              <th class="px-6 py-4 text-left font-bold uppercase">Data</th>
              <th class="px-6 py-4 text-left font-bold uppercase">Local e Atividades</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-black/10">
            <tr v-for="(item, index) in content.itinerary" :key="index" 
                :class="index % 2 === 0 ? 'bg-black/5' : 'bg-transparent'">
              <td class="px-6 py-4 font-bold align-top w-32 md:w-48">{{ item.date }}</td>
              <td class="px-6 py-4">
                <span class="font-bold">{{ item.location }}</span>: {{ item.details }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  isPreview: { type: Boolean, default: false }
})

// Puxamos os dados do itinerario.md
const { content } = await useContentSource('itinerario', props.isPreview)
</script>