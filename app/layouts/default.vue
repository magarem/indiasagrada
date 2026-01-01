<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <main class="flex-1 mt-10">
      <slot />
    </main>
    <WhatsAppFab />
    <footer class="bg-gray-800 text-white py-6 text-center text-sm">
      <p>&copy; 2026 Índia Sagrada. Todos os direitos reservados. Produzido pelo Magaweb</p>
    </footer>
  </div>
</template>