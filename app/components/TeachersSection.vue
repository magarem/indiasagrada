<template>
  <section class="py-16 sm:py-24" style="background-color: #fae2c8; color: #010000;">
    <div class="container mx-auto px-4 max-w-5xl">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 uppercase tracking-tight">
          Nossos Facilitadores
        </h2>
        <div class="h-1 w-24 bg-black mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
        
        <div v-for="(teacher, index) in teachers" :key="index" 
             class="flex flex-col items-center text-center group">
          
          <div class="relative mb-8">
            <div _class="absolute inset-0 border-2 border-black rounded-full translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
            <div class="relative w-64 h-64 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <img 
                :src="`/images/${teacher.image}`" 
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
            "{{ teacher.bio }}"
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const teachers = [
  {
    name: 'Gurusevananda (Dr. Gustavo Moura)',
    role: 'Educador com formação tradicional e acadêmica em Yoga e Vedanta. Fundador do Yoga Culture',
    bio: 'Residente na Índia desde 2000, Gurusevananda atua como uma ponte viva entre o oriente e o ocidente. Sua missão é traduzir a profundidade da sabedoria védica em ferramentas práticas e transformadoras para os desafios da vida contemporânea.',
    image: 'teachers/1.png'
  },
  {
    name: 'Medharani',
    role: 'Professora de Yoga e co-fundadora do Yoga Culture',
    bio: 'Especializada em Hatha Yoga e Bhakti, Medharani tece uma prática onde movimento e respiração se tornam atos de devoção. Com uma condução que equilibra suavidade e vigor, ela guia cada aluno ao seu próprio ritmo, despertando um equilíbrio espiritual autêntico e profundo.',
    image: 'teachers/2.jpeg'
  }
];
</script>

<style scoped>
/* Estilos adicionais para garantir suavidade nas transições */
.transition-transform {
  will-change: transform;
}
</style>