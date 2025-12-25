<template>
  <section class="faq-section">
    <div class="container">
      <h2 class="title">Perguntas Frequentes</h2>
      <p class="subtitle">
        Tudo o que você precisa saber sobre sua jornada espiritual pela Índia Sagrada
      </p>

      <div class="faq-accordion">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="faq-item"
          :class="{ open: openIndex === index }"
        >
          <button
            class="faq-question"
            @click="toggle(index)"
          >
            {{ item.pergunta }}
            <span class="icon">{{ openIndex === index ? '−' : '+' }}</span>
          </button>
          <div
            class="faq-answer"
            :style="{
              maxHeight: openIndex === index ? `${answerHeights[index]}px` : '0px'
            }"
          >
            <p v-html="item.resposta"  ></p>
          </div>
        </div>
      </div>

      <p class="contact">
        Ainda tem dúvidas?
        <a href="#contato" class="link">Fale conosco pelo WhatsApp!</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

// Dados das FAQs - edite aqui quando quiser adicionar/alterar perguntas
const faqs = ref([
  {
    pergunta: "O que é a viagem Índia Sagrada?",
    resposta: "A Índia Sagrada é uma jornada espiritual transformadora pelas terras mais sagradas da Índia (Varanasi, Rishikesh, Vrindavan, Agra, etc.). Combinamos visitas a templos milenares, rituais no Ganges, meditações em ashrams e ensinamentos profundos com foco em autoconhecimento e renovação interior."
  },
  {
    pergunta: "Preciso ter experiência prévia?",
    resposta: "Não! A viagem é para todos os níveis: iniciantes curiosos e praticantes avançados de Yoga. Tudo é guiado de forma leve, respeitosa e no ritmo de cada um."
  },
  {
    pergunta: "O que está incluído no pacote?",
    resposta: "Hospedagem em hotéis 4-5 estrelas ou ashrams confortáveis, todos os transportes internos (avião, trem e vans privativas), guias em português, entradas em templos e atrações, várias refeições e acompanhamento espiritual diário. Voos internacionais e visto não estão inclusos."
  },
  {
    pergunta: "É necessário visto e quais vacinas?",
    resposta: "Brasileiros precisam do e-Visa indiano (fácil e online). A vacina de febre amarela é obrigatória. Enviamos um guia completo após a inscrição."
  },
  {
    pergunta: "A viagem é segura para mulheres e famílias com crianças?",
    resposta: "Sim! Temos muitos anos de experiência levando grupos sempre com mulheres e crianças, incluindo nossas filhas. Usamos hotéis seguros, transporte privado e guias de confiança o tempo todo."
  },
  {
    pergunta: "Qual o tamanho dos grupos e datas de 2026?",
    resposta: "Grupos pequenos e íntimos (máximo 20 pessoas). Próximas datas: Fevereiro/Março, de 2026. Vagas limitadas!"
  },
  {
    pergunta: "Como faço para reservar minha vaga?",
    resposta: "É só clicar no botão de WhatsApp flutuante. Em até 24h enviamos todas as informações, valores atualizados e opções de parcelamento."
  }
])

const openIndex = ref(null)
const answerHeights = ref([])

// Calcula a altura real do conteúdo para animação suave
const updateHeight = async (index) => {
  await nextTick()
  const answers = document.querySelectorAll('.faq-answer p')
  if (answers[index]) {
    answerHeights.value[index] = answers[index].scrollHeight + 40 // +40 para padding
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

// Calcula alturas iniciais (opcional, caso queira abrir alguma por padrão)
onMounted(() => {
  faqs.value.forEach((_, i) => updateHeight(i))
})
</script>

<style scoped>
.faq-section {
  background-color: #fae2c8;
  padding: 80px 20px;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 42px;
  color: #b5651d;
  margin-bottom: 20px;
  font-family: 'Georgia', serif;
}

.subtitle {
  font-size: 18px;
  color: #333;
  margin-bottom: 50px;
}

.faq-accordion {
  margin-bottom: 30px;
}

.faq-item {
  margin-bottom: 15px;
  background: #e1b380;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: left;
}

.faq-question {
  width: 100%;
  padding: 20px;
  background: #f5d0b0;
  color: #333;
  font-size: 20px;
  font-weight: bold;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s;
}

.faq-question:hover {
  background: #f0c59b;
}

.icon {
  font-size: 28px;
  color: #b5651d;
  margin-left: 10px;
}

.faq-answer {
  background: #fff8f0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}

.faq-answer p {
  padding: 20px;
  font-size: 18px;
  color: #555;
  line-height: 1.7;
  margin: 0;
}

.contact {
  margin-top: 50px;
  font-size: 18px;
  color: #333;
}

.link {
  color: #b5651d;
  text-decoration: underline;
  font-weight: bold;
}

.link:hover {
  color: #a05010;
}

/* Responsivo */
@media (max-width: 768px) {
  .title {
    font-size: 36px;
  }
  .faq-question {
    font-size: 18px;
  }
}
</style>