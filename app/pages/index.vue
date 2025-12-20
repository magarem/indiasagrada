<template>
  <div class="min-h-screen bg-gray-50">
    
    <div id="home">
      <SlideShow />
    </div>

    <div id="sobre" class="scroll-mt-14">
      <WelcomeSection />
    </div>

    <div id="roteiro" class="scroll-mt-14">
      <ItineraryTable />
    </div>
    
    
    

    <div id="destinos" class="scroll-mt-14">
 <DestinationsSection />
</div>
  
<div id="acomodacoes" class="scroll-mt-14">
    <AccommodationSection />
  </div>


  

  <TeachersSection />
  

   <PhotoAlbum />
   <Depoimentos />
<div id="investimento" class="scroll-mt-14">
      <InvestimentSection />
    </div>
   <div id="contato" class="scroll-mt-14"> 

     <ContactSection/>
      </div>
     
  
   
   
  </div>
</template>

<script setup>






// Auto-importa componentes no Nuxt 4
// Não precisa importar manualmente se usar auto-imports
</script>