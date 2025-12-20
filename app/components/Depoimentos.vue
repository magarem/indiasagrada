<template>
  <section class="py-12 sm:py-20" style="background-color: #fae2c8; color: #010000;">
    <div class="container mx-auto px-4 max-w-5xl">
      
      <div class="text-center mb-10">
        <h2 class="text-3xl sm:text-4xl font-extrabold mb-3 uppercase tracking-tighter font-serif">
          Vozes da Experiência
        </h2>
        <p class="text-base opacity-80 font-serif italic">Relatos de quem já vivenciou essa jornada.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="(video, index) in testimonials" 
          :key="index"
          @click="openVideo(video.youtubeId)"
          class="group cursor-pointer flex flex-col bg-white/20 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div class="relative aspect-[4/5] bg-black">
            <img 
              :src="`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`" 
              class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              alt="Capa do depoimento"
            />
        <!-- <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
  <div class="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
    
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      class="ml-1"
    >
      <path d="M5 3L19 12L5 21V3Z" fill="white" />
    </svg>

  </div>
</div> -->
          </div>

          <div class="p-3 bg-white/40">
            <h3 class="font-bold text-sm truncate">{{ video.name }}</h3>
            <p class="text-[10px] opacity-60 uppercase tracking-widest truncate">{{ video.location }}</p>
          </div>
        </div>
      </div>

      <Dialog 
        v-model:visible="displayVideo" 
        modal 
        :dismissableMask="true"
        header="Depoimento"
        :showHeader="false"
        class="w-[95vw] max-w-4xl"
        :pt="{
          root: { class: 'bg-transparent border-none shadow-none overflow-hidden' },
          mask: { class: 'backdrop-blur-md bg-black/90' },
          content: { class: 'p-0 bg-black rounded-xl overflow-hidden' }
        }"
      >
        <div class="aspect-video w-full">
          <iframe 
            v-if="displayVideo"
            :src="`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0&modestbranding=1`"
            class="w-full h-full border-none"
            allow="autoplay; encrypted-media; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>

        <button 
  @click="displayVideo = false"
  class="fixed top-4 right-4 z-[1300] w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md border border-white/30 transition-all duration-300"
>
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2.5" 
    stroke-linecap="round" 
    stroke-linejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
</button>
      </Dialog>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const displayVideo = ref(false);
const selectedVideoId = ref('');

const openVideo = (id) => {
  selectedVideoId.value = id; // Define o ID do vídeo
  displayVideo.value = true;   // Abre o modal
};

const testimonials = [
  { name: 'Gustavo e Flor', location: 'Nova Friburgo, RJ', youtubeId: 'C6DOWMtbXhI' },
  { name: 'Lincoln', location: 'São Paulo, SP', youtubeId: 'yT4NxSRqKSo' },
  { name: 'Karen', location: 'Lages, SC', youtubeId: 'ufNEjF7Nn4A' },
  { name: 'Maíra', location: 'Belo Horizonte, MG', youtubeId: 'feDgiBbl2RQ' },
  { name: 'Vilma', location: 'São Paulo, SP', youtubeId: '5Y_wF2BR1AE' },
  { name: 'Anna Thomas', location: 'Toronto', youtubeId: '9rPUirgF8N8' },
  { name: 'Patrícia', location: 'Curitiba', youtubeId: 'VJpsCjf88HA' },
  { name: 'Amanada', location: 'Vila Velha, ES', youtubeId: 'SAWk6SHIZGE' },
];
</script>

<style scoped>
.aspect-\[4\/5\] { aspect-ratio: 4 / 5; }
.aspect-video { aspect-ratio: 16 / 9; }

/* Garante que o modal fique sempre por cima de tudo */
:deep(.p-dialog-mask) {
    z-index: 1100 !important;
}
</style>