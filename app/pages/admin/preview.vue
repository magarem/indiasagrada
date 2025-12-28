<template>
  <div class="preview-mode">
    <div class="preview-bar">
      <div class="flex items-center justify-center gap-4">
        <i class="pi pi-eye animate-pulse"></i>
        <span>Modo de Visualização Prévia</span>
        <button @click="closePreview" class="close-btn">FECHAR</button>
      </div>
    </div>
    
    <div class="site-wrapper">
      <div v-html="htmlContent" class="prose mx-auto"></div>
    </div>
  </div>
</template>

<style scoped>
/* 1. Força a barra vermelha no topo absoluto */
.preview-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 32px;
  z-index: 10001; /* Um número acima de qualquer coisa */
  background-color: #dc2626;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
}

/* 2. O PONTO CHAVE: Empurra a sua Topbar original para baixo */
/* Ajustamos o seletor para pegar qualquer elemento que pareça um menu fixo no topo */
:deep(header), 
:deep(nav), 
:deep(.fixed.top-0),
:deep(.sticky.top-0) {
  top: 32px !important; /* Move a topbar para começar onde a barra vermelha termina */
}

/* 3. Empurra o conteúdo base do site para não ficar atrás da topbar empurrada */
.site-wrapper {
  padding-top: 32px; /* Espaço da barra vermelha */
  position: relative;
}

/* Se o seu site já tem um padding-top no body para a topbar, 
   precisamos adicionar +32px a ele. */
:deep(main), :deep(.page-content) {
  margin-top: 32px;
}

.close-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  padding: 2px 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 9px;
}
</style>