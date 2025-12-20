<template>
  <section class="w-full overflow-hidden" style="background-color: #fbead8;">
    
    <div class="w-full relative shadow-2xl">
      <Carousel 
        :value="slides" 
        :numVisible="1" 
        :numScroll="1" 
        :circular="true" 
        :autoplayInterval="4000"
        :showNavigators="false" 
        class="custom-carousel-full"
      >
        <template #item="slotProps">
          <div class="relative w-full h-[55vh] md:h-[85vh] overflow-hidden">
            <img 
              :src="`/images/slide/${slotProps.data.image}`" 
              :alt="slotProps.data.title" 
              class="w-full h-full object-fill"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 sm:p-20">
              <div class="container mx-auto max-w-6xl">
                <h2 class="text-[#fbead8] text-4xl sm:text-7xl font-black uppercase mb-4 drop-shadow-xl tracking-tighter">
                  {{ slotProps.data.title }}
                </h2>
                <p class="text-[#fbead8]/90 text-lg sm:text-2xl max-w-3xl italic drop-shadow-md">
                  {{ slotProps.data.description }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup>
const slides = [
  {
    title: 'Amanhecer no Ganges',
    description: 'A energia sagrada de Rishikesh despertando os sentidos e a alma.',
    image: '1.jpeg'
  },
  {
    title: 'Devoção em Mayapur',
    description: 'Imersão profunda nos cantos e tradições do Bhakti Yoga.',
    image: 'Mayapur.webp'
  },
  {
    title: 'O Templo do Sol',
    description: 'Contemplando a arquitetura milenar de Konark em Puri.',
    image: '9.jpg'
  },
  {
    title: 'As Cores de Jaipur',
    description: 'Celebrando a vida e a espiritualidade na cidade rosa.',
    image: '8.jpeg'
  }
];
</script>

<style scoped>
/* Remove totalmente os paddings e margens que o PrimeVue reserva para as setas */
:deep(.p-carousel-content),
:deep(.p-carousel-container),
:deep(.p-carousel-items-content) {
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
}

/* Garante que o item do carrossel ocupe 100% sem espaços fantasmas */
:deep(.p-carousel-item) {
  padding: 0 !important;
}

/* Estilização das bolinhas (indicadores) que ficam sobre a imagem */
:deep(.p-carousel-indicators) {
  padding: 1.5rem;
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 10;
  gap: 0.5rem;
}

:deep(.p-carousel-indicator button) {
  background-color: rgba(251, 234, 216, 0.3);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.1);
}

:deep(.p-carousel-indicator.p-highlight button) {
  background-color: #fbead8 !important;
  transform: scale(1.2);
}
</style>