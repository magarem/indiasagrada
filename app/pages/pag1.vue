<template>
  <FileExplorer 
        v-model="selectedFile" 
        @file-selected="onFileSelect"
        ref="explorerRef"
      />
</template> 