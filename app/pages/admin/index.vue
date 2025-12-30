<template>
  <div class="admin-layout h-screen bg-slate-950 text-slate-200 flex overflow-hidden dark font-sans">
    <Toast />

    <aside class="w-14 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 z-50 shrink-0 shadow-2xl">
      
      <button 
        @click="toggleSidebar"
        :class="[
          'p-3 mb-2 transition-all duration-200 rounded-lg group relative', 
          isSidebarOpen ? 'text-indigo-400' : 'text-slate-500 hover:text-white'
        ]"
        title="Explorer (Ctrl+B)"
      >
        <div v-if="isSidebarOpen" class="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-indigo-500"></div>
        
        <i class="pi pi-copy text-xl"></i>
      </button>

      <button 
        @click="openPreview"
        class="p-3 mb-2 text-slate-500 hover:text-indigo-400 transition-all rounded-lg"
        title="Ver Site"
      >
        <i class="pi pi-desktop text-xl"></i>
      </button>

      <div class="flex-1"></div>

      <button 
        @click="logout"
        class="p-3 mb-2 text-slate-400 hover:text-red-400 transition-all rounded-lg group"
        title="Sair"
      >
        <i class="pi pi-sign-out text-xl group-hover:translate-x-1 transition-transform"></i>
      </button>
    </aside>

    <aside 
      :class="[
        'bg-slate-900 border-r border-slate-800 flex flex-col h-screen transition-all duration-300 ease-in-out overflow-hidden shrink-0',
        isSidebarOpen ? 'w-48' : 'w-0 border-none'
      ]"
    >
      <div class="p-3 border-b border-slate-800 flex justify-between items-center h-12 bg-slate-900">
        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Explorer</span>
        <button @click="toggleSidebar" class="text-slate-600 hover:text-indigo-400 transition-colors">
          <i class="pi pi-angle-left text-lg"></i>
        </button>
      </div>
      
      <div class="p-2">
        <div class="relative">
          <i class="pi pi-search absolute left-2 top-1/2 -translate-y-1/2 text-slate-600 text-[10px]"></i>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Filtrar..." 
            class="w-full bg-slate-950 border border-slate-800 rounded py-1 pl-6 pr-2 text-[11px] text-slate-400 focus:outline-none focus:border-indigo-600"
          />
        </div>
      </div>
      
      <nav class="flex-1 overflow-y-auto custom-scrollbar">
        <ul class="m-0 p-0 list-none">
          <li 
            v-for="file in filteredFiles" 
            :key="file.id"
            @click="selectedFile = file"
            :class="[
              'flex items-center gap-2 px-3 py-2 cursor-pointer text-[12px] transition-all',
              selectedFile?.id === file.id ? 'bg-indigo-600/10 text-indigo-300 border-l-2 border-indigo-500' : 'hover:bg-slate-800/50 text-slate-500 hover:text-slate-300'
            ]"
          >
            <i :class="[file.icon || 'pi pi-file', 'text-[12px]']"></i>
            <span class="truncate font-medium">{{ file.label }}</span>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
      <header class="bg-slate-900 border-b border-slate-800 flex items-center justify-between pr-4 h-12">
        <div class="flex items-center h-full">
          <div class="bg-slate-950 border-t-2 border-indigo-500 px-6 h-full flex items-center gap-3 border-r border-slate-800">
            <i class="pi pi-file-edit text-indigo-400 text-lg"></i>
            <span class="text-[12px] font-mono font-medium text-slate-300">
              {{ selectedFile?.id }}.md
            </span>
          </div>
        </div>
        <div v-if="pending" class="flex items-center gap-2 text-[10px] font-mono text-indigo-400">
          <i class="pi pi-spin pi-spinner"></i>
        </div>
      </header>

      <section class="flex-1 relative flex flex-col overflow-hidden">
        <div class="relative flex-1 w-full overflow-hidden bg-slate-950">
          <div 
            ref="highlightRef"
            class="absolute inset-0 p-8 font-mono text-[15px] leading-relaxed whitespace-pre-wrap break-words pointer-events-none text-slate-500 z-0 overflow-y-auto scrollbar-hide"
            v-html="highlightedContent"
          ></div>

          <textarea 
            ref="textareaRef"
            v-model="rawText" 
            @scroll="syncScroll"
            class="absolute inset-0 w-full h-full p-8 font-mono text-[15px] leading-relaxed border-none focus:ring-0 resize-none bg-transparent text-transparent caret-indigo-400 z-10 overflow-y-auto"
            spellcheck="false"
          ></textarea>
        </div>

        <footer class="bg-indigo-600 h-8 flex justify-between items-center px-4 text-white shrink-0 z-20">
          <div class="flex items-center gap-6 text-[11px] font-semibold">
            <span class="opacity-80">Nuxt 3 + SQLite</span>
          </div>
          
          <div class="flex items-center h-full">
            <button @click="openPreview" class="bg-indigo-500 hover:bg-indigo-400 px-5 h-full text-[11px] font-bold flex items-center gap-2 border-l border-white/10">
              <i class="pi pi-eye text-[12px]"></i> PREVIEW
            </button>
            <button @click="saveFile" :disabled="isSaving" class="bg-indigo-700 hover:bg-indigo-800 px-5 h-full text-[11px] font-bold flex items-center gap-2 border-l border-white/10">
              <i :class="isSaving ? 'pi pi-spin pi-spinner' : 'pi pi-save'"></i> SALVAR
            </button>
            <button @click="publishSite" class="bg-emerald-600 hover:bg-emerald-700 px-5 h-full text-[11px] font-bold flex items-center gap-2 border-l border-white/10">
              <i class="pi pi-upload"></i> PUBLICAR
            </button>
          </div>
        </footer>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const toast = useToast()
const rawText = ref('')
const isSaving = ref(false)
const pending = ref(false)
const searchQuery = ref('')
const isSidebarOpen = ref(true)

const textareaRef = ref(null)
const highlightRef = ref(null)

const toggleSidebar = () => { isSidebarOpen.value = !isSidebarOpen.value }
const openPreview = () => window.open('/?preview=true', '_blank')

const syncScroll = (e) => {
  if (highlightRef.value && e.target) {
    highlightRef.value.scrollTop = e.target.scrollTop
  }
}

const highlightedContent = computed(() => {
  if (!rawText.value) return ''
  const fmRegex = /^(---\n[\s\S]*?\n---)/
  let escaped = rawText.value
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  return escaped.replace(fmRegex, (match) => {
    return `<span class="text-indigo-400 font-bold">${match}</span>`
  })
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

const filteredFiles = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return contentFiles.filter(f => f.label.toLowerCase().includes(q) || f.id.toLowerCase().includes(q))
})

const loadFile = async (id) => {
  pending.value = true
  try {
    const data = await $fetch(`/api/content/${id}`)
    rawText.value = data?.rawContent || ''
  } catch (e) {
    console.error(e)
  } finally {
    pending.value = false
  }
}

const saveFile = async () => {
  if (!selectedFile.value || isSaving.value) return
  isSaving.value = true
  try {
    await $fetch(`/api/content/${selectedFile.value.id}`, {
      method: 'POST',
      body: { content: rawText.value }
    })
    toast.add({ severity: 'success', summary: 'Salvo!', life: 1000 })
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Erro' })
  } finally {
    isSaving.value = false
  }
}

const handleKeydown = (e) => {
  const mod = e.ctrlKey || e.metaKey
  if (mod && e.key === 's') { e.preventDefault(); saveFile() }
  if (mod && e.key === 'b') { e.preventDefault(); toggleSidebar() }
}

onMounted(() => { window.addEventListener('keydown', handleKeydown) })
onUnmounted(() => { window.removeEventListener('keydown', handleKeydown) })

watch(selectedFile, (newVal) => { if (newVal) loadFile(newVal.id) }, { immediate: true })

const publishSite = async () => {
  if (!confirm("Publicar agora?")) return
  try {
    await $fetch('/api/content/publish', { method: 'POST' })
    toast.add({ severity: 'success', summary: 'Site Publicado!' })
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Erro' })
  }
}

const logout = async () => {
  if (!confirm("Sair?")) return
  await $fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/admin/login'
}
</script>

<style scoped>
textarea {
  outline: none !important;
  box-shadow: none !important;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
.scrollbar-hide::-webkit-scrollbar { display: none; }
textarea::-webkit-scrollbar { width: 8px; }
textarea::-webkit-scrollbar-track { background: #020617; }
textarea::-webkit-scrollbar-thumb { background: #1e293b; }
.custom-scrollbar::-webkit-scrollbar { width: 2px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
</style>