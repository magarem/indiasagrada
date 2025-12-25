<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{
      'bg-[#d1b253] text-white backdrop-blur-md': !scrolled,   
      'bg-[#d1b253]/95 text-gray-900 shadow-lg backdrop-blur-sm': scrolled   
    }"
  >
    <div class="flex justify-between items-center py-4 px-6 md:px-12 max-w-7xl mx-auto">
      
      <NuxtLink
        to="/"
        class="group flex flex-col items-center transition-all duration-300 cursor-pointer no-underline"
      >
        <span 
          class="text-2xl md:text-4xl font-serif tracking-normal transition-all duration-500"
          :class="{
            'text-[#fdfcf0] drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]': !scrolled,
            'text-[#4a3728]': scrolled
          }"
          style="font-family: 'Times New Roman', serif; font-variant: small-caps;"
        >
          {{ siteinfo.title }}
        </span>
        <div 
          class="h-[2px] w-8 group-hover:w-24 transition-all duration-700 rounded-full mt-[-4px]"
          :class="{ 'bg-[#fdfcf0]/70': !scrolled, 'bg-[#4a3728]/30': scrolled }"
        ></div>
      </NuxtLink>

      <nav class="hidden md:flex space-x-8">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="relative text-xl font-serif tracking-tight transition-all duration-300 group/link"
          :class="{
            'text-[#fdfcf0]': !scrolled,
            'text-[#4a3728]': scrolled
          }"
        >
          {{ item.label }}
          <span 
            class="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 opacity-40"
            :class="{ 
              'bg-[#fdfcf0] group-hover/link:w-full': !scrolled, 
              'bg-[#4a3728] group-hover/link:w-full': scrolled 
            }"
          ></span>
        </NuxtLink>
      </nav>

      <div class="md:hidden relative">
        <button
          @click="toggleMenu"
          class="focus:outline-none transition-colors duration-300"
          :class="{
            'text-[#fdfcf0]': !scrolled,
            'text-[#4a3728]': scrolled
          }"
        >
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div
          v-if="menuOpen"
          class="absolute right-0 mt-4 w-64 bg-[#fdfcf0] shadow-2xl rounded-sm py-4 border border-[#d1b253]/30"
        >
          <NuxtLink
            v-for="item in topmenu"
            :key="item.to"
            :to="item.to"
            class="block px-8 py-4 text-[#4a3728] font-serif uppercase tracking-[0.2em] text-sm hover:bg-[#d1b253]/10 transition-colors"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {siteinfo, nav} from '~/data/content.json'

console.log(nav) 
const menuOpen = ref(false)
const scrolled = ref(false)

// const menu = [
//   { label: 'Sobre', to: '#sobre' },
//   { label: 'Roteiro', to: '#roteiro' },
//   { label: 'Destinos', to: '#destinos' },
//   { label: 'Acomodações', to: '#acomodacoes' },
//   { label: 'Contato', to: '#contato' }
// ]

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const onScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>