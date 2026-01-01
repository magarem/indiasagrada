<template>
  <div class="bg-gray-500">
  <h1>teste</h1>
  {{ isPreviewMode }}

  </div>
</template> 
<script setup>
  const route = useRoute()
  const isPreviewMode = computed(() => 'preview' in route.query)
  console.log('isPreviewMode:', isPreviewMode.value)

   const res = await $fetch('/api/preview', { 
      query: { fileName: 'acomodacoes/_index.md' } 
    }).catch(err => {
      console.error('Falha no $fetch preview:', err)
      return null
    })

    console.log("res", res);
    
</script>