
<template>
  <section class="py-16 sm:py-24" style="background-color: #fbead8; color: #010000;">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        <div class="w-full lg:w-[35%] lg:sticky lg:top-10">
          <div class="relative group mx-auto max-w-[320px] lg:max-w-full">
            
            <div class="absolute inset-0 border-2 border-black rounded-3xl translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
            
            <div class="relative aspect-[9/16] overflow-hidden rounded-3xl shadow-2xl bg-black">
             <iframe 
                class="absolute inset-0 w-full h-full"
                :src="`https://www.youtube.com/embed/aKoCKHKDulI?rel=0&modestbranding=1&showinfo=0`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
             
            </div>
            
            <p class="mt-6 text-sm italic opacity-60 text-center uppercase tracking-widest font-bold">
              Sinta a Atmosfera
            </p>
          </div>
        </div>

        <div class="w-full lg:w-[65%]">
          <header class="mb-10 text-center lg:text-left">
            <h2 class="text-6xl sm:text-8xl font-black uppercase tracking-tighter mb-2">
              A Jornada
            </h2>
            <div class="h-2 w-32 bg-black mx-auto lg:mx-0"></div>
          </header>

          <div class="space-y-8 text-lg sm:text-xl leading-relaxed text-justify">
            <p class="font-bold text-2xl border-l-4 border-black pl-6 py-2">
              Nosso foco principal nesta viagem será proporcionar uma vivência profunda de Yoga, Ayurveda e Bhakti, além de uma imersão na cultura espiritual da Índia.
            </p>

            <p>
              Começamos em Rishikesh, a capital mundial do Yoga, onde passaremos dias intensos com práticas de Hatha Yoga, meditação, mantras e estudos sobre a visão de mundo védica. Ficaremos hospedados em um resort às margens do Ganges, com vista para as montanhas e estrutura voltada ao bem-estar. Exploraremos locais icônicos como o Ashram dos Beatles, a milenar Caverna de Vasistha e a emocionante cerimônia de Arati ao cair da tarde.
            </p>

            <p>
              Dando continuidade ao nosso roteiro, seguiremos para Puri, onde visitaremos o intrigante Templo de Konark, uma obra-prima do século XIII esculpida como uma carruagem monumental ao Deus Sol. A jornada se expande em devoção com a proximidade do Templo de Jagannatha, o coração pulsante da cidade e um dos centros de peregrinação mais vibrantes da Índia. Entre práticas revigorantes e a conexão profunda com o horizonte em nosso resort à beira-mar, seremos guiados pela paz deste solo sagrado.
            </p>

            <p>
              Por fim, mergulharemos no esplendor cultural do país. Em Jaipur, a "Cidade Rosa", celebraremos as cores do festival Holi e a grandiosidade dos fortes e palácios imperiais. Encerraremos os últimos dias da nossa jornada com a poesia do Taj Mahal ao amanhecer e a serenidade do templo Akshardham em Delhi, selando uma experiência inesquecível de autoconhecimento antes do nosso retorno ao Brasil.
            </p>

            
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Destaque sutil para as cidades no texto */
strong {
  color: #010000;
  background-image: linear-gradient(transparent 70%, #fff 30%);
  font-weight: 800;
}
</style>