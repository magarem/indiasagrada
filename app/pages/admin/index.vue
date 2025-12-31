<template>
  <div class="admin-layout h-screen bg-slate-950 text-slate-200 flex overflow-hidden dark font-sans">
    <Toast />

    <aside class="w-14 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 z-50 shrink-0 shadow-2xl">
     <button 
    @click="setActiveView('files')"
    :class="['p-3 mb-2 transition-all duration-200 rounded-lg group relative', (activeView === 'files' && isSidebarOpen) ? 'text-indigo-400' : 'text-slate-500 hover:text-white']"
  >
    <div v-if="activeView === 'files' && isSidebarOpen" class="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-indigo-500"></div>
    <i class="pi pi-copy text-xl"></i>
  </button>

  <button 
    @click="setActiveView('images')"
    :class="['p-3 mb-2 transition-all duration-200 rounded-lg group relative', (activeView === 'images' && isSidebarOpen) ? 'text-indigo-400' : 'text-slate-500 hover:text-white']"
  >
    <div v-if="activeView === 'images' && isSidebarOpen" class="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-indigo-500"></div>
    <i class="pi pi-images text-xl"></i>
  </button>

      <button @click="openPreview" class="p-3 mb-2 text-slate-500 hover:text-indigo-400 transition-all rounded-lg" title="Ver Site">
        <i class="pi pi-desktop text-xl"></i>
      </button>

      <div class="flex-1"></div>

      <button @click="logout" class="p-3 mb-2 text-slate-400 hover:text-red-400 transition-all rounded-lg group" title="Sair">
        <i class="pi pi-sign-out text-xl group-hover:translate-x-1 transition-transform"></i>
      </button>
    </aside>

    <aside :class="['bg-slate-900 border-r border-slate-800 flex flex-col h-screen transition-all duration-300 ease-in-out shrink-0', isSidebarOpen ? 'w-64' : 'w-0 border-none']">
      
      <div class="p-3 border-b border-slate-800 flex flex-col bg-slate-900 shrink-0">
        <div class="flex justify-between items-center mb-2 h-6">
          <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {{ activeView === 'files' ? 'Explorer' : 'Imagens' }}
          </span>
          
          <div v-if="activeView === 'images'" class="flex items-center gap-1">
            <button @click="createFolder" class="p-1.5 text-slate-500 hover:text-emerald-400" title="Nova Pasta">
              <i class="pi pi-folder-plus text-xs"></i>
            </button>
            <div class="w-px h-3 bg-slate-700 mx-1"></div>
            <button @click="imageViewMode = 'grid'" :class="['p-1.5 transition-colors', imageViewMode === 'grid' ? 'text-indigo-400' : 'text-slate-600']"><i class="pi pi-th-large text-xs"></i></button>
            <button @click="imageViewMode = 'list'" :class="['p-1.5 transition-colors', imageViewMode === 'list' ? 'text-indigo-400' : 'text-slate-600']"><i class="pi pi-list text-xs"></i></button>
          </div>
        </div>

        <div v-if="activeView === 'images'" class="flex items-center gap-2 pt-1">
          <button v-if="currentSubPath" @click="goBack" class="text-indigo-400 hover:text-indigo-300"><i class="pi pi-arrow-left text-[10px]"></i></button>
          <span class="text-[9px] font-mono text-slate-500 truncate">/images/{{ currentSubPath }}</span>
        </div>
      </div>
      
      <FileExplorer v-if="activeView === 'files'" v-model="selectedFile" />

      <div v-else class="flex-1 overflow-y-auto p-2 custom-scrollbar flex flex-col">
        <div @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop"
          :class="['border-2 border-dashed rounded-xl p-4 mb-4 transition-all flex flex-col items-center justify-center text-center cursor-pointer', isDragging ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-slate-800 text-slate-500 hover:border-slate-700']"
          @click="$refs.fileInput.click()">
          <input type="file" ref="fileInput" class="hidden" multiple accept="image/*" @change="handleFileSelect" />
          <i :class="['pi mb-1 text-lg', isUploading ? 'pi-spin pi-spinner text-indigo-400' : 'pi-cloud-upload']"></i>
          <span class="text-[9px] font-bold uppercase tracking-wider">Upload aqui</span>
        </div>

        <div v-if="imageViewMode === 'grid'" class="grid grid-cols-2 gap-2">
          <div v-for="item in imageList" :key="item.path" @click="item.isDirectory ? handleFolderClick(item) : selectImage(item)"
            :class="['p-2 rounded border transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[90px]', selectedImage?.path === item.path ? 'border-indigo-500 bg-indigo-500/10' : 'border-transparent hover:bg-slate-800']">
            <div v-if="item.isDirectory" class="w-full flex-1 flex flex-col items-center justify-center bg-slate-800/40 rounded mb-1">
              <i class="pi pi-folder text-2xl text-amber-500"></i>
            </div>
            <img v-else :src="item.path" class="w-full h-16 object-cover rounded bg-slate-950 mb-1" />
            <span class="text-[9px] text-slate-400 truncate w-full text-center px-1">{{ item.name }}</span>
          </div>
        </div>

        <div v-else class="space-y-1">
          <div v-for="item in imageList" :key="item.path" @click="item.isDirectory ? handleFolderClick(item) : selectImage(item)"
            :class="['px-2 py-1.5 rounded flex items-center justify-between cursor-pointer group', selectedImage?.path === item.path ? 'bg-indigo-500/20 text-indigo-300' : 'hover:bg-slate-800 text-slate-400']">
            <div class="flex items-center gap-3 truncate">
              <i :class="['text-xs', item.isDirectory ? 'pi pi-folder text-amber-500' : 'pi pi-image opacity-50']"></i>
              <span :class="['text-[11px] truncate font-mono', item.isDirectory ? 'font-bold text-slate-200' : '']">{{ item.name }}{{ item.isDirectory ? '/' : '' }}</span>
            </div>
            <button @click.stop="deleteItem(item)" class="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-300 p-1"><i class="pi pi-times text-[10px]"></i></button>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
      
      <div v-if="viewMode === 'image' && selectedImage" class="flex-1 flex flex-col items-center justify-center p-8">
        <div class="relative max-w-4xl w-full text-center">
          <img :src="selectedImage.path" class="max-w-full max-h-[70vh] rounded-lg shadow-2xl border border-slate-800 mx-auto bg-slate-900" />
          
          <div class="mt-8 flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl max-w-2xl mx-auto">
            <div class="text-left flex-1 overflow-hidden">
              <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Caminho do Asset</p>
              <code class="text-indigo-400 font-mono text-sm block truncate">{{ selectedImage.path }}</code>
            </div>
            <div class="flex gap-2">
              <button @click="copyPath(selectedImage.path)" class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2"><i class="pi pi-copy"></i> COPIAR URL</button>
              <button @click="deleteItem(selectedImage)" class="bg-red-900/40 hover:bg-red-600 text-red-200 px-3 py-2 rounded-lg border border-red-500/30 transition-all"><i class="pi pi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>

      <template v-else>
        <header class="bg-slate-900 border-b border-slate-800 flex items-center justify-between pr-4 h-12">
          <div class="flex items-center h-full">
            <div v-if="selectedFile" class="bg-slate-950 border-t-2 border-indigo-500 px-6 h-full flex items-center gap-3 border-r border-slate-800">
              <i class="pi pi-file-edit text-indigo-400 text-lg"></i>
              <span class="text-[12px] font-mono font-medium text-slate-300">{{ selectedFile.path.split('/').pop() }}.md</span>
            </div>
          </div>
          <div v-if="pending || isUploading" class="flex items-center gap-2 text-[10px] font-mono text-indigo-400">
            <i class="pi pi-spin pi-spinner"></i><span>PROCESSANDO...</span>
          </div>
        </header>

        <section class="flex-1 relative flex flex-col overflow-hidden">
          <div class="relative flex-1 w-full overflow-hidden bg-slate-950">
            <div ref="highlightRef" class="absolute inset-0 p-8 font-mono text-[15px] leading-relaxed whitespace-pre-wrap break-words pointer-events-none text-slate-500 z-0 overflow-y-auto scrollbar-hide" v-html="highlightedContent"></div>
            <textarea ref="textareaRef" v-model="rawText" @scroll="syncScroll" class="absolute inset-0 w-full h-full p-8 font-mono text-[15px] leading-relaxed border-none focus:ring-0 resize-none bg-transparent text-transparent caret-indigo-400 z-10 overflow-y-auto" spellcheck="false" :disabled="!selectedFile"></textarea>
            <div v-if="!selectedFile && !selectedImage" class="absolute inset-0 flex items-center justify-center text-slate-700 font-serif italic">Selecione um arquivo ou pasta para começar</div>
          </div>

          <footer class="bg-indigo-600 h-8 flex justify-between items-center px-4 text-white shrink-0 z-20">
            <div class="flex items-center gap-6 text-[11px] font-semibold">
              <span class="opacity-80">Nuxt 3 + SQLite</span>
              <span v-if="selectedFile" class="opacity-50 font-mono">{{ selectedFile.path }}</span>
            </div>
            <div class="flex items-center h-full">
              <button @click="openPreview" class="bg-indigo-500 hover:bg-indigo-400 px-5 h-full text-[11px] font-bold flex items-center gap-2 border-l border-white/10"><i class="pi pi-eye"></i> PREVIEW</button>
              <button @click="saveFile" :disabled="isSaving || !selectedFile" class="bg-indigo-700 hover:bg-indigo-800 px-5 h-full text-[11px] font-bold flex items-center gap-2 border-l border-white/10"><i :class="isSaving ? 'pi pi-spin pi-spinner' : 'pi pi-save'"></i> SALVAR</button>
              <button @click="publishSite" class="bg-emerald-600 hover:bg-emerald-700 px-5 h-full text-[11px] font-bold flex items-center gap-2 border-l border-white/10"><i class="pi pi-upload"></i> PUBLICAR</button>
            </div>
          </footer>
        </section>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

definePageMeta({ layout: 'admin', middleware: 'auth' })
const toast = useToast()

// Estados de Dados
const selectedFile = ref(null)
const rawText = ref('')
const isSaving = ref(false)
const pending = ref(false)
const imageList = ref([])
const selectedImage = ref(null)

// Estados de Navegação de Imagens
const currentSubPath = ref('')
const isDragging = ref(false)
const isUploading = ref(false)
const fileInput = ref(null)

// UI States
const activeView = ref('files')
const viewMode = ref('editor')
const imageViewMode = ref('grid')
const isSidebarOpen = ref(true)
const textareaRef = ref(null)
const highlightRef = ref(null)

// --- MÉTODOS DE IMAGEM & NAVEGAÇÃO ---
const loadImages = async () => {
  try {
    imageList.value = await $fetch('/api/images', { query: { path: currentSubPath.value } })
  } catch (e) { toast.add({ severity: 'error', summary: 'Erro ao carregar imagens' }) }
}

const handleFolderClick = (folder) => {
  currentSubPath.value = folder.relativeSubPath
  loadImages()
}

const goBack = () => {
  const parts = currentSubPath.value.split('/').filter(Boolean)
  parts.pop()
  currentSubPath.value = parts.join('/')
  loadImages()
}

const selectImage = (img) => {
  selectedImage.value = img
  viewMode.value = 'image'
  selectedFile.value = null
}

const deleteItem = async (item) => {
  if (!confirm(`Deseja realmente eliminar ${item.name}?`)) return
  try {
    await $fetch('/api/images/delete', { method: 'DELETE', body: { path: item.path, isDirectory: item.isDirectory } })
    if (selectedImage.value?.path === item.path) { selectedImage.value = null; viewMode.value = 'editor' }
    loadImages()
  } catch (e) { toast.add({ severity: 'error', summary: 'Erro ao eliminar' }) }
}

const uploadFiles = async (files) => {
  if (!files.length) return
  isUploading.value = true
  const formData = new FormData()
  formData.append('targetPath', currentSubPath.value)
  for (const file of files) formData.append('files', file)
  try {
    await $fetch('/api/images/upload', { method: 'POST', body: formData })
    loadImages()
  } catch (e) { } finally { isUploading.value = false; isDragging.value = false }
}

const handleDrop = (e) => uploadFiles(e.dataTransfer.files)
const handleFileSelect = (e) => uploadFiles(e.target.files)

const createFolder = async () => {
  const name = prompt(`Nova pasta em /images/${currentSubPath.value}:`)
  if (!name) return
  try {
    await $fetch('/api/images/create-folder', { method: 'POST', body: { name, path: currentSubPath.value } })
    loadImages()
  } catch (e) { }
}

// --- MÉTODOS DE ARQUIVO ---
const loadFile = async (file) => {
  pending.value = true
  try {
    const data = await $fetch('/api/read', { method: 'POST', body: { filePath: file.path } })
    rawText.value = data?.content || ''
    if (textareaRef.value) textareaRef.value.scrollTop = 0
  } catch (e) { } finally { pending.value = false }
}

const saveFile = async () => {
  if (!selectedFile.value) return
  isSaving.value = true
  try {
    await $fetch('/api/save', { method: 'POST', body: { filePath: selectedFile.value.path, content: rawText.value } })
    toast.add({ severity: 'success', summary: 'Salvo!', life: 1000 })
  } catch (e) { } finally { isSaving.value = false }
}

// --- UTILITÁRIOS & WATCHERS ---
const copyPath = (path) => {
  navigator.clipboard.writeText(path)
  toast.add({ severity: 'info', summary: 'Caminho copiado!', life: 800 })
}
// Altere a função de controle de visualização
const setActiveView = (view) => {
  if (activeView.value === view && isSidebarOpen.value) {
    // Se clicar no mesmo ícone com a sidebar aberta, ela fecha
    isSidebarOpen.value = false;
  } else {
    // Se clicar num ícone diferente ou com ela fechada, ela abre no modo correto
    activeView.value = view;
    isSidebarOpen.value = true;
  }
};
const toggleSidebar = () => isSidebarOpen.value = !isSidebarOpen.value
const openPreview = () => window.open('/?preview=true', '_blank')
const syncScroll = (e) => { if (highlightRef.value) highlightRef.value.scrollTop = e.target.scrollTop }

const highlightedContent = computed(() => {
  if (!rawText.value) return ''
  const fmRegex = /^(---\n[\s\S]*?\n---)/
  let escaped = rawText.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return escaped.replace(fmRegex, (match) => `<span class="text-indigo-400 font-bold">${match}</span>`)
})

watch(selectedFile, (newFile) => { if (newFile) { viewMode.value = 'editor'; selectedImage.value = null; loadFile(newFile) } })
watch(activeView, (view) => { if (view === 'images') loadImages() })

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveFile() }
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') { e.preventDefault(); toggleSidebar() }
  })
})

const publishSite = async () => {
  if (!confirm("Publicar alterações?")) return
  try { await $fetch('/api/content/publish', { method: 'POST' }); toast.add({ severity: 'success', summary: 'Publicado!' }) } catch (e) { }
}

const logout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/admin/login'
}
</script>

<style scoped>
textarea { outline: none !important; font-family: 'JetBrains Mono', monospace; line-height: 1.6; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
textarea::-webkit-scrollbar { width: 8px; }
textarea::-webkit-scrollbar-track { background: #020617; }
textarea::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
</style>