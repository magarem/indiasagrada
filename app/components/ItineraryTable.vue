<template>
  <section class="py-16 sm:py-24" style="background-color: #fae2c8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-4xl sm:text-5xl font-extrabold text-center mb-12">Roteiro Detalhado</h2>

      <div class="overflow-hidden rounded-xl border border-black/10 shadow-lg">
        <table class="min-w-full">
          <thead>
            <tr style="background-color: #010000; color:#fae2c8;">
              <th class="px-6 py-4 text-left font-bold uppercase">Data</th>
              <th class="px-6 py-4 text-left font-bold uppercase">Local e Atividades</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-black/10">
            <tr v-for="(item, index) in itinerary" :key="index" 
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
import { ref } from 'vue';

const itinerary = ref([
  {
    date: '14-16 de Fev',
    location: 'Brasil / Delhi',
    details: 'Saída do Brasil e chegada em Delhi. Início da imersão na cultura indiana.',
  },
  {
    date: '17-22 de Fev',
    location: 'Rishikesh (Vedic Dham)',
    details: 'Estadia no *Vedic Dham*: práticas diárias de yoga e meditação, visita à Caverna de Vasistha, rafting opcional, Beatles Ashram, cerimônia de Ganga Arati e dia livre para exploração.',
  },
  {
    date: '23 de Fev',
    location: 'Dehradun → Calcutá',
    details: 'Voo doméstico de Dehradun para Calcutá. Traslado para o Ashram.',
  },
  {
    date: '24–26 de Fev',
    location: 'Mayapur (Paramgati Yoga Ashram)',
    details: 'Vivência intensa de Bhakti Yoga no Paramgati Yoga Ashram, incluindo estudos e participação nas rotinas espirituais.',
  },
  {
    date: '27 de Fev',
    location: 'Nabadwip → Puri',
    details: 'Traslado terrestre para Nabadwip, seguido de viagem de trem noturno para a cidade sagrada de Puri.',
  },
  {
    date: '27 Fev - 2 de Mar',
    location: 'Puri e Konark',
    details: 'Atividades espirituais em Puri e visita ao lendário Templo do Sol em Konark, Patrimônio Mundial da UNESCO.',
  },
  {
    date: '3-5 de Mar',
    location: 'Jaipur (Celebração do Holi)',
    details: 'Voo Bhubaneswar → Jaipur. Traslado para hotel patrimônio histórico. **Celebração vibrante do Holi**, visita ao Forte Amber e ao City Palace.',
  },
  {
    date: '6–8 de Mar',
    location: 'Agra / Delhi',
    details: 'Visita ao Taj Mahal ao nascer do sol, momento mágico e fotográfico. Traslado para Delhi, visita ao Templo Akshardham e tempo livre para compras ou exploração final.',
  },
  {
    date: '9 de Mar',
    location: 'Delhi / Brasil',
    details: 'Partida de Delhi. Retorno ao Brasil, levando as experiências da jornada.',
  },
]);
</script>

<style scoped>
/* Estilos específicos se necessário */
</style>