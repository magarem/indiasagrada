<template>
  <nav class="flex-1 overflow-y-auto custom-scrollbar bg-slate-950/20">
    <ul class="m-0 p-0 list-none">
      <li v-if="status === 'pending'" class="p-6 text-center text-slate-500">
        <i class="pi pi-spin pi-spinner text-lg"></i>
      </li>

      <template v-for="group in structuredFiles" :key="group.id">
        <li 
          v-if="group.isFolder" 
          @click="toggleFolder(group.id)"
          class="px-3 py-2 text-[14px] uppercase tracking-wider text-slate-500 font-bold bg-slate-900/40 mt-2 flex items-center gap-2 cursor-pointer hover:bg-slate-800 transition-colors select-none"
        >
          <i :class="[
            'pi transition-transform duration-200', 
            openFolders.has(group.id) ? 'pi-chevron-down' : 'pi-chevron-right',
            'text-[12px] text-slate-600'
          ]"></i>
          <i :class="[
            openFolders.has(group.id) ? 'pi-folder-open text-indigo-400' : 'pi-folder text-indigo-400/60'
          ]"></i>
          {{ group.label }}
        </li>

        <transition-group name="folder-content">
          <li 
            v-for="file in group.files" 
            v-if="!group.isFolder || openFolders.has(group.id)"
            :key="file.path"
            @click="selectFile(file)"
            :class="[
              'flex items-center gap-2 px-3 py-2 cursor-pointer text-[16px] transition-all group',
              group.isFolder ? 'pl-9' : 'pl-3', 
              modelValue?.path === file.path 
                ? 'bg-indigo-600/10 text-indigo-300 border-l-2 border-indigo-500' 
                : 'hover:bg-slate-800/50 text-slate-500 hover:text-slate-300'
            ]"
          >
            <i :class="[getFileIcon(file), 'text-[12px] group-hover:scale-110 transition-transform']"></i>
            <span class="truncate font-medium">{{ formatLabel(file.path) }}</span>
            
            <span v-if="file.path.includes('_index')" 
                  class="ml-auto text-[8px] bg-indigo-500/20 px-1 rounded text-indigo-400 border border-indigo-500/30">
              META
            </span>
          </li>
        </transition-group>

      </template>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, default: null }
});

const emit = defineEmits(['update:modelValue', 'file-selected']);

// Estado das pastas abertas (usando Set para performance e unicidade)
const openFolders = ref(new Set(['acomodacoes'])); // 'acomodacoes' vem aberta por padrão

const toggleFolder = (folderId) => {
  if (openFolders.value.has(folderId)) {
    openFolders.value.delete(folderId);
  } else {
    openFolders.value.add(folderId);
  }
};

// 1. Busca os arquivos da coleção 'content'
const { data: allFiles, status, refresh } = await useAsyncData('admin-file-explorer', () => 
  queryCollection('content').all()
);

// 2. Estruturação (Igual à anterior, agrupando por pasta ou root)
const structuredFiles = computed(() => {
  if (!allFiles.value) return [];

  const groups = allFiles.value.reduce((acc, file) => {
    const parts = file.path.split('/').filter(p => p);
    const isInsideFolder = parts.length > 1;
    const groupKey = isInsideFolder ? parts[0] : 'root';

    if (!acc[groupKey]) {
      acc[groupKey] = {
        id: groupKey,
        label: isInsideFolder ? groupKey : 'Arquivos Raiz',
        isFolder: isInsideFolder,
        files: []
      };
    }
    acc[groupKey].files.push(file);
    return acc;
  }, {});

  return Object.values(groups).sort((a, b) => {
    if (a.id === 'root') return 1;
    if (b.id === 'root') return -1;
    return a.label.localeCompare(b.label);
  });
});

// Helpers
const getFileIcon = (file) => {
  if (file.path.includes('_index')) return 'pi pi-cog text-orange-400';
  if (file.path.endsWith('.vue')) return 'pi pi-code text-emerald-400';
  return 'pi pi-file-edit text-slate-400';
};

const formatLabel = (path) => {
  const name = path.split('/').pop() || '';
  return name.replace('.md', '').replace('.vue', '');
};

const selectFile = (file) => {
  emit('update:modelValue', file);
  emit('file-selected', file);
};

defineExpose({ refresh });
</script>

<style scoped>
/* Estilo da barra de rolagem customizada */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }

/* Animação simples de expandir/recolher */
.folder-content-enter-active,
.folder-content-leave-active {
  transition: all 0.2s ease;
  max-height: 50px;
  opacity: 1;
}
.folder-content-enter-from,
.folder-content-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateX(-10px);
}
</style>