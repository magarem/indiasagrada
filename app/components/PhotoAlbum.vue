<template>
  <section v-if="content" class="py-16 sm:py-24" style="background-color: #fbead8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <div class="text-center mb-12">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 uppercase tracking-tighter font-serif">
          {{ content.title }}
        </h2>
        <p v-if="content.subtitle" class="text-lg opacity-80 font-serif italic">
          {{ content.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div 
          v-for="(photo, index) in content.photos" 
          :key="index"
          @click="openPhoto(photo)"
          class="group relative overflow-hidden rounded-xl bg-white/20 aspect-square shadow-md cursor-pointer touch-manipulation"
        >
          <img 
            :src="`/images/album/${photo}`" 
            alt="Registro da jornada"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center">
             <span class="text-white text-3xl font-light">+</span>
          </div>
        </div>
      </div>

      <Dialog 
        v-model:visible="isModalOpen" 
        modal 
        dismissableMask 
        :closable="false"
        header=" "
        class="p-0 border-none bg-transparent shadow-none"
        contentClass="p-0 bg-transparent flex items-center justify-center relative"
        maskClass="backdrop-blur-md bg-black/90"
      >
        <button 
          @click="isModalOpen = false"
          class="fixed top-6 right-6 z-[2100] text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all border border-white/20"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <img 
          :src="`/images/album/${selectedPhoto}`" 
          class="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
          @click.stop
        />
      </Dialog>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  isPreview: { type: Boolean, default: false }
})

// Puxamos os dados do arquivo album.md
const { content } = await useContentSource('album', props.isPreview)

const isModalOpen = ref(false);
const selectedPhoto = ref('');

const openPhoto = (photo) => {
  selectedPhoto.value = photo;
  isModalOpen.value = true;
};
</script>

<style scoped>
.aspect-square { aspect-ratio: 1 / 1; }

:deep(.p-dialog) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(.p-dialog-header) {
  display: none !important;
}

.touch-manipulation {
  touch-action: manipulation;
}
</style>