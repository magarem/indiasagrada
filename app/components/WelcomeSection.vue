<template>
  <section v-if="content" class="py-16 sm:py-24" style="background-color: #fbead8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        <div class="w-full lg:w-[35%] lg:sticky lg:top-10">
          <div class="relative group mx-auto max-w-[320px] lg:max-w-full">
            <div class="absolute inset-0 border-2 border-black rounded-3xl translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
            
            <div class="relative aspect-[9/16] overflow-hidden rounded-3xl shadow-2xl bg-black">
              <iframe 
                v-if="content.youtubeId"
                class="absolute inset-0 w-full h-full"
                :src="`https://www.youtube.com/embed/${content.youtubeId}?rel=0&modestbranding=1&showinfo=0`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-[65%]">
          <header class="mb-10 text-center lg:text-left">
            <h2 class="text-6xl sm:text-8xl font-black uppercase tracking-tighter mb-2">
              {{ content.title }}
            </h2>
            <div class="h-2 w-32 bg-black mx-auto lg:mx-0"></div>
          </header>

          <div class="space-y-8 text-lg sm:text-xl leading-relaxed text-justify">
            <p v-if="content.highlight" class="font-bold text-2xl border-l-4 border-black pl-6 py-2">
              {{ content.highlight }}
            </p>

            <div class="content-body">
              <div v-if="isPreview" v-html="content.bodyHtml" class="markdown-render"></div>
              <ContentRenderer v-else :value="staticPage" />
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

const { content, staticPage } = await useContentSource('welcome', props.isPreview)
</script>

<style scoped>
/* Garante que o v-html (Preview) tenha os mesmos estilos do ContentRenderer (Produção) */
.content-body :deep(p), 
.markdown-render :deep(p) {
  margin-bottom: 2rem;
}

.content-body :deep(strong),
.markdown-render :deep(strong) {
  color: #010000;
  background-image: linear-gradient(transparent 70%, #fff 30%);
  font-weight: 800;
}
</style>