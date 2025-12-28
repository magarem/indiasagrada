<template>
  <div class="admin-layout h-screen bg-slate-950 text-slate-200 flex overflow-hidden dark">
    <Toast />

    <button 
      v-if="!isSidebarOpen"
      @click="toggleSidebar"
      class="fixed top-4 left-4 z-50 w-10 h-10 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500 flex items-center justify-center transition-all animate-in fade-in zoom-in"
    >
      <i class="pi pi-bars">ddd</i>
    </button>

    <aside 
      :class="[
        'bg-slate-900 border-r border-slate-800 flex flex-col shadow-xl h-screen transition-all duration-300 ease-in-out overflow-hidden shrink-0',
        isSidebarOpen ? 'w-72' : 'w-0 border-none'
      ]"
    >
      <div class="p-5 border-b border-slate-800 bg-slate-900/50 flex-none flex justify-between items-center whitespace-nowrap">
        <h2 class="text-xl font-bold flex items-center gap-3 text-indigo-400 uppercase tracking-tighter">
          <i class="pi pi-database text-2xl"></i> India CMS
        </h2>
        <button @click="toggleSidebar" class="text-slate-500 hover:text-white transition-colors p-1">
          <i class="pi pi-angle-double-left text-xl"></i>
        </button>
      </div>
      
      <div class="p-5 flex-none" v-if="isSidebarOpen">
        <div class="relative group">
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Filtrar arquivos..." 
            class="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
      
      <nav class="flex-1 overflow-y-auto custom-scrollbar bg-slate-950/20 whitespace-nowrap" v-if="isSidebarOpen">
        <ul class="flex flex-col p-2 m-0 list-none">
          <li 
            v-for="file in filteredFiles" 
            :key="file.id"
            @click="selectedFile = file"
            :class="[
              'group flex items-center justify-between p-3 mb-1 rounded-lg cursor-pointer transition-all border border-transparent',
              selectedFile?.id === file.id ? 'bg-indigo-600/20 border-indigo-500/40 shadow-lg' : 'hover:bg-slate-800'
            ]"
          >
            <div class="flex items-center gap-4">
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center transition-all', selectedFile?.id === file.id ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500']">
                <i :class="[file.icon || 'pi pi-file', 'text-lg']"></i>
              </div>
              <div class="flex flex-col">
                <span class="text-[14px] font-bold tracking-wide">{{ file.label }}</span>
                <span class="text-[10px] text-slate-600 font-mono">{{ file.id }}.md</span>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <div class="p-4 bg-slate-950 border-t border-slate-800 whitespace-nowrap" v-if="isSidebarOpen">
        <span class="flex items-center gap-1.5 text-[10px] text-green-500">
           <i class="pi pi-circle-fill text-[8px]"></i> PM2: ONLINE
        </span>
      </div>
    </aside>

    <main class="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
      
      <header class="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center shadow-md">
        <div class="flex items-center gap-3">
          <i class="pi pi-file-edit text-xl text-indigo-500"></i>
          <h1 class="text-sm font-mono font-bold text-slate-400">
            editando: <span class="text-indigo-300">content/{{ selectedFile?.id }}.md</span>
          </h1>
        </div>
        <div v-if="pending" class="text-xs text-indigo-400 animate-pulse">
          Carregando...
        </div>
      </header>

      <section class="flex-1 p-6 flex flex-col overflow-hidden">
        <div class="bg-slate-900 rounded-t-xl border border-slate-800 flex-1 flex flex-col shadow-2xl">
          <div class="px-4 py-2 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center rounded-t-xl">
             <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Markdown Editor (Full Content)</span>
             <i class="pi pi-code text-slate-600"></i>
          </div>
          
          <Textarea 
            v-model="rawText" 
            class="flex-1 w-full p-5 font-mono text-sm leading-relaxed border-none focus:ring-0 resize-none bg-slate-900 text-slate-300"
            spellcheck="false"
            :autoResize="false"
          />
        </div>

        <footer class="bg-slate-900 border border-slate-800 p-4 rounded-b-xl flex justify-between items-center shadow-lg">
          <div class="text-[11px] text-slate-500 italic max-w-xs">
            Certifique-se de manter os delimitadores <code class="text-indigo-400">---</code> do Frontmatter.
          </div>
          
          <div class="flex gap-3 items-center">
            <Button 
              label="Preview" 
              icon="pi pi-external-link" 
              outlined 
              severity="secondary"
              class="p-button-sm border-slate-700 text-slate-400"
              @click="openPreview"
            />
            
            <Button 
              label="Salvar" 
              icon="pi pi-save" 
              class="p-button-sm bg-indigo-600 border-none"
              :loading="isSaving"
              @click="saveFile"
            />

            <div class="h-8 w-[1px] bg-slate-800 mx-1"></div>

            <Button 
              label="Publicar" 
              icon="pi pi-cloud-upload" 
              severity="success"
              class="p-button-sm"
              @click="publishSite"
            />
          </div>
        </footer>
      </section>
    </main>
  </div>
</template>

<script setup>
// Garante que o layout seja o admin (independente do site)
definePageMeta({ layout: 'admin' })

const toast = useToast()
const rawText = ref('')
const isSaving = ref(false)
const pending = ref(false)
const searchQuery = ref('')
const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
// Computed que filtra a lista original baseada no que foi digitado
const filteredFiles = computed(() => {
  if (!searchQuery.value) return contentFiles
  
  const query = searchQuery.value.toLowerCase()
  return contentFiles.filter(file => 
    file.label.toLowerCase().includes(query) || 
    file.id.toLowerCase().includes(query)
  )
})
const contentFiles = [
  { label: 'SlideShow', id: 'slideshow', icon: 'pi pi-images' },
  { label: 'Bem-vindo', id: 'welcome', icon: 'pi pi-home' },
  { label: 'Itinerário', id: 'itinerario', icon: 'pi pi-map' },
  { label: 'Destinos', id: 'destinos', icon: 'pi pi-compass' },
  { label: 'Acomodações', id: 'acomodacoes', icon: 'pi pi-building' },
  { label: 'Facilitadores', id: 'facilitadores', icon: 'pi pi-users' },
  { label: 'Investimento', id: 'investimento', icon: 'pi pi-dollar' },
  { label: 'Depoimentos', id: 'depoimentos', icon: 'pi pi-video' },
  { label: 'Contato', id: 'contato', icon: 'pi pi-envelope' }
]

const selectedFile = ref(contentFiles[0])

const loadFile = async (fileId) => {
  if (!fileId) return
  pending.value = true
  
  console.log('Tentando carregar arquivo:', fileId) // DEBUG
  
  try {
    // Importante: use a URL completa da API
    const data = await $fetch(`/api/content/${fileId}`)
    
    console.log('Dados recebidos da API:', data) // DEBUG
    
    if (data && data.rawContent !== undefined) {
      rawText.value = data.rawContent
    } else {
      console.error('Resposta da API não tem a chave rawContent')
    }
  } catch (e) {
    console.error('Erro no fetch:', e)
    toast.add({ severity: 'error', summary: 'Erro de Conexão', detail: 'Verifique o console do navegador.' })
  } finally {
    pending.value = false
  }
}

// WATCH: Sempre que mudar a seleção no Listbox, carrega o novo arquivo
watch(() => selectedFile.value, (newVal) => {
  if (newVal) loadFile(newVal.id)
}, { immediate: true }) // immediate garante que carregue o primeiro ao abrir a página

const saveFile = async () => {
  if (!selectedFile.value) return
  isSaving.value = true
  try {
    await $fetch(`/api/content/${selectedFile.value.id}`, {
      method: 'POST',
      body: { content: rawText.value }
    })
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Arquivo salvo com sucesso!', life: 2000 })
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar as alterações.' })
  } finally {
    isSaving.value = false
  }
}

const openPreview = () => window.open('/?preview=true', '_blank')
const isPublishing = ref(false)

const publishSite = async () => {
  const confirmar = confirm("Isso irá reconstruir todo o site para aplicar as mudanças permanentemente. O processo pode levar um minuto. Continuar?")
  
  if (!confirmar) return

  isPublishing.value = true
  
  // Criamos um toast infinito para o build
  toast.add({ 
    severity: 'info', 
    summary: 'Publicando...', 
    detail: 'O servidor está executando o build. Por favor, aguarde.', 
    group: 'sticky' // Se você tiver um template de toast fixo
  })

  try {
    const response = await $fetch('/api/content/publish', { method: 'POST' })
    
    toast.removeAllGroups() // Remove o aviso de carregamento
    toast.add({ 
      severity: 'success', 
      summary: 'Site Atualizado!', 
      detail: 'O build foi concluído e a versão final está no ar.', 
      life: 10000 
    })
  } catch (e) {
    toast.removeAllGroups()
    toast.add({ 
      severity: 'error', 
      summary: 'Erro no Build', 
      detail: e.statusMessage || 'Ocorreu um erro ao executar npm run build no servidor.', 
      life: 10000 
    })
  } finally {
    isPublishing.value = false
  }
}
</script>

<style scoped>
/* Ajuste fino no Textarea para Dark Mode total */
:deep(.p-inputtextarea) {
  background-color: transparent !important;
  color: #cbd5e1 !important; /* slate-300 */
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* Garante que o container do editor preencha o espaço */
.bg-slate-900.rounded-t-xl {
  display: flex;
  flex-direction: column;
}

/* Animação suave para a transição de arquivos */
textarea {
  transition: opacity 0.2s ease-in-out;
}

/* Garante que o Listbox ocupe 100% do espaço vertical disponível na sidebar */
:deep(.p-listbox) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

:deep(.p-listbox-wrapper) {
  flex-grow: 1;
}

/* Scrollbar estilizada para não quebrar o visual Dark */
.custom-scrollbar :deep(.p-listbox-wrapper)::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar :deep(.p-listbox-wrapper)::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar :deep(.p-listbox-wrapper)::-webkit-scrollbar-thumb {
  background: #334155; /* slate-700 */
  border-radius: 10px;
}

.custom-scrollbar :deep(.p-listbox-wrapper)::-webkit-scrollbar-thumb:hover {
  background: #475569; /* slate-600 */
}
</style>