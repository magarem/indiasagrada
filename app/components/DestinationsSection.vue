<template>
  <section class="py-16 sm:py-24" style="background-color: #fae2c8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 uppercase tracking-tight">
          Principais Destinos
        </h2>
        <div class="h-1 w-24 bg-black mx-auto mb-6"></div>
        <p class="text-lg max-w-2xl mx-auto opacity-80">
          Uma rota sagrada passando pelos pontos mais energéticos e históricos da Índia setentrional e oriental.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div v-for="(dest, index) in destinations" :key="index" 
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
const destinations = [
  {
    name: 'Rishikesh',
    description: 'Capital mundial do Yoga, aos pés dos Himalaias e às margens do Rio Ganges.',
    image: '/images/destinations/1.png'
  },
  {
    name: 'Mayapur',
    description: 'Coração pulsante da tradição de Bhakti, com templos monumentais e devoção contagiante.',
    image: '/images/destinations/2.png'
  },
  {
    name: 'Puri',
    description: 'Cidade sagrada à beira-mar, famosa pelo templo de Jagannath e pelo Templo do Sol em Konark.',
    image: '/images/destinations/3.png'
  },
  {
    name: 'Jaipur',
    description: 'Cidade rosa dos palácios reais, fortalezas majestosas e do encantador templo de Govinda-ji.',
    image: '/images/destinations/5.webp'
  },
  {
    name: 'Agra',
    description: 'Lar do icônico Taj Mahal, símbolo eterno do amor e da arquitetura indo-islâmica.',
    image: '/images/destinations/4.png'
  },
  {
    name: 'Delhi',
    description: 'Capital da Índia, rica em história e cultura, ótima também para fazer compras.',
    image: '/images/destinations/6.jpg'
  }
];
</script>

<style scoped>
/* Efeito de suavização para navegadores que não suportam bem filtros CSS */
.group:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}
</style>