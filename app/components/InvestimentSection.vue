<template>
  <section class="py-16 sm:py-24" style="background-color: #fbead8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-4xl sm:text-5xl font-extrabold text-center mb-12 sm:mb-16">
        Investimento e Estrutura
      </h2>

      <div class="flex flex-col lg:flex-row gap-10">
        <div class="lg:w-1/3 p-8 bg-white/50 rounded-2xl shadow-xl border-t-8 border-indigo-600">
          <p class="text-lg font-semibold opacity-70 uppercase tracking-wider">Valor Total</p>
          <p class="text-6xl font-black mt-2 mb-6">U$4.000</p>
          
          <h3 class="text-xl font-bold mb-4">Condições de Pagamento</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <span class="font-bold mr-2">•</span>
              <span><strong>Entrada de U$2.000</strong> para reserva.</span>
            </li>
            <li class="flex items-start">
              <span class="font-bold mr-2">•</span>
              <span>Restante em <strong>20 notas de U$100</strong> entregues na Índia.</span>
            </li>
          </ul>
        </div>
        
        <div class="lg:w-2/3 space-y-6">
          <div class="p-6 bg-white/30 rounded-xl border-l-4 border-indigo-600">
            <h3 class="text-2xl font-bold mb-4 uppercase">O que está incluso</h3>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc ml-5">
              <li>Diárias nas acomodações</li>
              <li>Café da manhã diário</li>
              <li>Refeições nos ashrams</li>
               <li>Voos dentro da Índia</li>
              <li>Transporte terrestre</li>
              <li>Ingressos e atrações</li>
              <li>Aulas de yoga e meditação</li>
              <li>Acompanhamento integral</li>
            </ul>
          </div>

          <div class="p-6 bg-red-100/50 rounded-xl border-l-4 border-red-600">
            <h3 class="text-xl font-bold mb-2 uppercase">Não incluso</h3>
            <p>Passagem aérea internacional (ida e volta para a Índia).</p>
            <p>Refeições fora do Ashram e despesas pessoais.</p>
            <p>Seguro viagem (obrigatório).</p>
            <p>Atividades opcionais (ex: rafting em Rishikesh).</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Não é necessário script para esta seção estática, mas a tag fica aqui para o Nuxt 4 (Composition API)
</script>

<style scoped>
/* Estilos adicionais específicos, se necessário */
</style>