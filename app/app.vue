<!-- app/app.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- Topbar fixa em todas as páginas -->
    <TopBar />

    <!-- Conteúdo dinâmico das páginas -->
    <main class="flex-1 mt-10">
      <NuxtPage />
    </main>
    <WhatsAppFab />
    <!-- Footer global -->
    <footer class="bg-gray-800 text-white py-6 text-center text-sm">
      <p>&copy; 2025 Índia Sagrada. Todos os direitos reservados. Produzido pelo Magaweb</p>
    </footer>

  </div>
</template>

<script setup>
// Não é necessário importar componentes
// TopBar e NuxtPage são auto-importados no Nuxt
</script>
