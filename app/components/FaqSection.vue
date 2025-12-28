<template>
  <section v-if="pagina" class="faq-section">
    <div class="container">
      <h2 class="title">{{ pagina.title }}</h2>
      <p class="subtitle">{{ pagina.meta.subtitle }}</p>

      <div class="faq-accordion">
        <div
          v-for="(item, index) in pagina.meta.faqs"
          :key="index"
          class="faq-item"
          :class="{ open: openIndex === index }"
        >
          <button class="faq-question" @click="toggle(index)">
            {{ item.pergunta }}
            <span class="icon">{{ openIndex === index ? '−' : '+' }}</span>
          </button>
          <div
            class="faq-answer"
            :style="{
              maxHeight: openIndex === index ? `${answerHeights[index]}px` : '0px'
            }"
          >
            <p v-html="item.resposta"></p>
          </div>
        </div>
      </div>

      <p class="contact">
        {{ pagina.meta.contactText }}
        <a :href="pagina.meta.linkUrl" class="link">{{ pagina.meta.linkText }}</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

// Busca os dados do arquivo faq.md
const { data: pagina } = await useAsyncData('faq-data', () => 
  queryCollection('content').path('/faq').first()
)

const openIndex = ref(null)
const answerHeights = ref([])

const updateHeight = async (index) => {
  await nextTick()
  const answers = document.querySelectorAll('.faq-answer p')
  if (answers[index]) {
    answerHeights.value[index] = answers[index].scrollHeight + 40
  }
}

const toggle = (index) => {
  if (openIndex.value === index) {
    openIndex.value = null
  } else {
    openIndex.value = index
    updateHeight(index)
  }
}

onMounted(() => {
  if (pagina.value) {
    pagina.value.meta.faqs.forEach((_, i) => updateHeight(i))
  }
})
</script>

<style scoped>
/* Seus estilos CSS originais permanecem exatamente os mesmos */
.faq-section { background-color: #fae2c8; padding: 80px 20px; text-align: center; }
.container { max-width: 1200px; margin: 0 auto; }
.title { font-size: 42px; color: #b5651d; margin-bottom: 20px; font-family: 'Georgia', serif; }
.subtitle { font-size: 18px; color: #333; margin-bottom: 50px; }
.faq-accordion { margin-bottom: 30px; }
.faq-item { margin-bottom: 15px; background: #e1b380; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); overflow: hidden; text-align: left; }
.faq-question { width: 100%; padding: 20px; background: #f5d0b0; color: #333; font-size: 20px; font-weight: bold; border: none; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.3s; }
.faq-question:hover { background: #f0c59b; }
.icon { font-size: 28px; color: #b5651d; margin-left: 10px; }
.faq-answer { background: #fff8f0; overflow: hidden; transition: max-height 0.5s ease; }
.faq-answer p { padding: 20px; font-size: 18px; color: #555; line-height: 1.7; margin: 0; }
.contact { margin-top: 50px; font-size: 18px; color: #333; }
.link { color: #b5651d; text-decoration: underline; font-weight: bold; }
.link:hover { color: #a05010; }
@media (max-width: 768px) { .title { font-size: 36px; } .faq-question { font-size: 18px; } }
</style>