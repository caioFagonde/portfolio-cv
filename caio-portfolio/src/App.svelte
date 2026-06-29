<script>
    import { layoutMode } from './lib/store.js';

    import './app.css';
    
    // Importação dos componentes modulares WebGL e UI
    import WandererCanvas from './lib/WebGL/WandererCanvas.svelte';
    import Showcase from './lib/UI/Showcase.svelte';
    import Reflections from './lib/UI/Reflections.svelte';

    let leftPanelClass = "w-full lg:w-[55%] h-[60vh] lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-zinc-900 relative flex flex-col justify-between overflow-hidden scan-animation transition-all duration-500 ease-in-out";
    let rightPanelClass = "w-full lg:w-[45%] opacity-100 flex flex-col border-l border-zinc-900 overflow-y-auto bg-brand-pitch relative transition-all duration-500 ease-in-out";

    // Monitorização reativa para mutações de layout e estilização CSS
    $: if ($layoutMode) {
        if ($layoutMode === '3d') {
            leftPanelClass = "w-full lg:w-full h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-zinc-900 relative flex flex-col justify-between overflow-hidden scan-animation transition-all duration-500 ease-in-out";
            rightPanelClass = "w-full lg:w-0 h-0 lg:h-screen lg:max-w-0 opacity-0 overflow-hidden flex flex-col border-l border-zinc-900 bg-brand-pitch relative transition-all duration-500 ease-in-out";
        } else if ($layoutMode === 'split') {
            leftPanelClass = "w-full lg:w-[55%] h-[60vh] lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-zinc-900 relative flex flex-col justify-between overflow-hidden scan-animation transition-all duration-500 ease-in-out";
            rightPanelClass = "w-full lg:w-[45%] opacity-100 flex flex-col border-l border-zinc-900 overflow-y-auto bg-brand-pitch relative transition-all duration-500 ease-in-out";
        } else if ($layoutMode === 'text') {
            leftPanelClass = "w-full lg:w-0 h-0 lg:h-screen lg:max-w-0 opacity-0 overflow-hidden relative flex flex-col justify-between scan-animation transition-all duration-500 ease-in-out";
            rightPanelClass = "w-full lg:w-full opacity-100 flex flex-col border-l border-zinc-900 overflow-y-auto bg-brand-pitch relative transition-all duration-500 ease-in-out";
        }
    }

    let formSubmitted = false;

    /** @param {SubmitEvent} event */
    function handleInquiry(event) {
        event.preventDefault();
        formSubmitted = true;
    }

    function resetForm() {
        formSubmitted = false;
    }
</script>

<!-- Main Grid Wrapper -->
<div id="main-layout" class="min-h-screen flex flex-col lg:flex-row relative">

    <!-- ================= ESQUERDA: VIEWPORT TRIDIMENSIONAL (Three.js) ================= -->
    <div id="left-panel" class={leftPanelClass}>
        <WandererCanvas />
    </div>

    <!-- ================= DIREITA: PAINEL EDITORIAL (Svelte UI Flow) ================= -->
    <div id="right-panel" class={rightPanelClass}>
        
        <!-- SECTION 1: HEADER & PROFILE MANIFESTO -->
        <header class="border-b border-zinc-900 p-8 md:p-12 flex flex-col justify-between">
            <div class="flex justify-between items-center mb-16">
                <span class="font-mono text-xs tracking-[0.2em] text-zinc-500">01 // MANIFESTO</span>
                <a href="#contato" class="font-mono text-[11px] tracking-wider text-purple-400 hover:text-purple-300 transition-colors uppercase border-b border-purple-900/50 pb-0.5">
                    Agendar Auditoria →
                </a>
            </div>

            <div>
                <span class="font-mono text-xs text-purple-500 tracking-widest uppercase block mb-3">CONCEPÇÃO SISTÊMICA</span>
                <h2 class="font-serif italic text-5xl md:text-6xl text-zinc-100 font-light leading-none tracking-tight">
                    Rigor científico.<br>Sistemas soberanos.
                </h2>
                <p class="font-sans text-sm text-zinc-400 leading-relaxed font-light mt-8 max-w-lg">
                    Engenheiro aeroespacial especializado no desenvolvimento de arquiteturas de alta integridade técnica. Fundindo modelagem numérica avançada (C++, Fortran, Julia), sensoriamento remoto (GIS), inteligência local de agentes e infraestrutura isolada com eBPF.
                </p>
            </div>
        </header>

        <!-- SECTION 2: SHOWCASE DECK -->
        <section id="inspector-section" class="border-b border-zinc-900 p-8 md:p-12 bg-zinc-950/20 relative">
            <Showcase />
        </section>

        <!-- SECTION 3: IN RAINBOWS COMPOSITION TRIBUTE -->
        <section class="border-b border-zinc-900 p-8 md:p-12 relative overflow-hidden bg-brand-pitch">
            <div class="absolute inset-0 opacity-[0.02] select-none pointer-events-none flex flex-col justify-between font-mono font-bold text-7xl leading-none">
                <div>IN RAINBOWS</div>
                <div>CAIO NAHUEL</div>
                <div>SYSTEMS COGNITION</div>
                <div>NUMERICAL FLOW</div>
            </div>

            <div class="flex items-center justify-between mb-12">
                <span class="font-mono text-xs tracking-[0.2em] text-zinc-500">03 // HARMONIA COMPUTAÇÃO</span>
                <span class="font-mono text-[9px] text-zinc-500">HOMENAGEM "IN RAINBOWS"</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 class="font-serif italic text-3xl text-zinc-100 font-light mb-4">Camadas de Saturação e Contraste</h3>
                    <p class="font-sans text-xs text-zinc-400 leading-relaxed font-light mb-6">
                        Assim como as sobreposições de cores saturadas e tipografia analógica que definem o álbum icônico do Radiohead, as arquiteturas de computação de alto nível não precisam ser opacas. Camadas de execução reativa, processamento de baixo nível e renderizadores tridimensionais operam em uníssono, gerando uma interface estéril, porém expressiva.
                    </p>
                </div>

                <!-- Color bleed layout simulation -->
                <div class="relative bg-brand-pitch border border-zinc-900 h-44 flex items-center justify-center rounded-xl overflow-hidden shadow-2xl">
                    <div class="absolute inset-0 opacity-45 bg-grid-zinc pointer-events-none" style="background-size: 15px 15px; background-image: linear-gradient(to right, #131317 1px, transparent 1px), linear-gradient(to bottom, #131317 1px, transparent 1px);"></div>
                    <div class="relative w-full h-full flex flex-col justify-center items-center font-mono font-extrabold text-[15px] leading-tight tracking-[0.15em] select-none uppercase">
                        <span class="bleed-layer text-layer-red transform -translate-x-3 -translate-y-1">CAIO NAHUEL</span>
                        <span class="bleed-layer text-layer-blue transform translate-x-1 -translate-y-1.5">SYSTEMS ENGINE</span>
                        <span class="bleed-layer text-layer-green transform -translate-x-2 translate-y-1">AEROSPACE COMP</span>
                        <span class="bleed-layer text-layer-purple transform translate-x-3 translate-y-1.5">SOWING COGNITION</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 4: STARRY REFLECTIONS (p5.js) -->
        <section class="border-b border-zinc-900 p-8 md:p-12 flex flex-col">
            <div class="flex items-center justify-between mb-8">
                <span class="font-mono text-xs tracking-[0.2em] text-zinc-500">04 // STARFLOW VISUALIZER</span>
                <span class="font-mono text-[9px] text-zinc-500">STARRY NIGHT OVER THE RHÔNE REFLEX</span>
            </div>

            <h3 class="font-serif italic text-2xl text-zinc-100 font-light mb-3">Partículas de Ondulação Estática</h3>
            <p class="font-sans text-xs text-zinc-400 leading-relaxed font-light mb-6">
                Mova seu cursor sobre a malha reflexiva abaixo para interagir com riachos de luz inspirados nas pinceladas e reflexos estelares na água de Vincent Van Gogh.
            </p>

            <!-- p5 Glimmer instance wrapper container -->
            <div class="border border-zinc-900 bg-[#060608] rounded-xl overflow-hidden h-48 relative" id="rhone-reflections-container">
                <Reflections />
            </div>
        </section>

        <!-- SECTION 5: CONTACT FORM -->
        <section id="contato" class="border-b border-zinc-900 p-8 md:p-12 relative">
            <div class="flex items-center justify-between mb-12">
                <span class="font-mono text-xs tracking-[0.2em] text-zinc-500">05 // DESAFIO</span>
                <span class="font-mono text-[9px] text-zinc-500">TERMINAL DE ENGENHARIA</span>
            </div>

            <div class="max-w-xl">
                <h3 class="font-serif italic text-3xl text-zinc-100 font-light mb-4">Formule um Desafio Estrutural</h3>
                <p class="font-sans text-sm text-zinc-400 font-light leading-relaxed mb-8">
                    Necessita de um resolvedor numérico customizado, pipeline GIS de altíssima escala, ou assessoria em arquitetura de IA local e governança de dados? Descreva as restrições para obtermos um diagnóstico inicial sob medida.
                </p>

                {#if formSubmitted}
                    <div class="border border-purple-500/50 bg-purple-950/10 p-4 mb-6 relative">
                        <div class="flex items-center space-x-2 text-purple-400 font-mono text-xs mb-1">
                            <span>▶ CONEXÃO ESTABELECIDA</span>
                        </div>
                        <p class="font-sans text-xs text-zinc-300 leading-relaxed font-light">
                            Os parâmetros do desafio foram integrados com sucesso. Formularei um enquadramento analítico e um plano de viabilidade estrutural para iniciarmos o projeto.
                        </p>
                        <button on:click={resetForm} class="font-mono text-[9px] uppercase tracking-widest text-zinc-500 hover:text-zinc-300 mt-4 underline">Enviar nova mensagem</button>
                    </div>
                {:else}
                    <form on:submit={handleInquiry} class="space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label for="form-name" class="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Seu Nome *</label>
                                <input id="form-name" required type="text" class="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 text-zinc-100 font-sans text-xs px-4 py-3 outline-none transition-all rounded">
                            </div>
                            <div>
                                <label for="form-email" class="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Seu E-mail *</label>
                                <input id="form-email" required type="email" class="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 text-zinc-100 font-sans text-xs px-4 py-3 outline-none transition-all rounded">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label for="form-tech" class="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Foco Tecnológico</label>
                                <select id="form-tech" class="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 text-zinc-450 font-sans text-xs px-4 py-3 outline-none transition-all rounded">
                                    <option value="simulation">Simulação Numérica / CUDA / Rust</option>
                                    <option value="geospatial">Arquitetura GIS & Pipelines Orbitais</option>
                                    <option value="agent_ai">Inteligência de Agentes / LLMs Locais</option>
                                    <option value="containers">Isolamento Containerizado / eBPF</option>
                                    <option value="fullstack">Aplicações Tridimensionais / WebGL / React</option>
                                </select>
                            </div>
                            <div>
                                <label for="form-deadline" class="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Prazo / Criticidade</label>
                                <input id="form-deadline" type="text" placeholder="Ex: Produção Imediata / POC" class="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 text-zinc-100 font-sans text-xs px-4 py-3 outline-none transition-all rounded">
                            </div>
                        </div>

                        <div>
                            <label for="form-message" class="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Delineamento do Desafio</label>
                            <textarea id="form-message" required rows="4" class="w-full bg-zinc-950 border border-zinc-800 focus:border-purple-500 text-zinc-100 font-sans text-xs px-4 py-3 outline-none transition-all rounded" placeholder="Quais os principais limitadores computacionais, gargalos matemáticos ou restrições de arquitetura de dados que definem o projeto?"></textarea>
                        </div>

                        <button type="submit" class="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-mono text-[10px] tracking-[0.2em] uppercase px-8 py-4 transition-all rounded">
                            Enviar Desafio de Engenharia
                        </button>
                    </form>
                {/if}
            </div>
        </section>

        <!-- FOOTER: GEOMETRIES & LOCAL OFFICE -->
        <footer class="p-8 md:p-12 bg-zinc-950 flex flex-col justify-between text-zinc-600 text-xs gap-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <p class="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Belo Horizonte / MG</p>
                    <p class="font-sans text-[11px] text-zinc-600 leading-relaxed font-light">
                        Av. Del Rey, 111 // Torre D<br>
                        Caiçaras // CEP 30.775-240
                    </p>
                </div>
                <div>
                    <p class="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Vila Velha / ES</p>
                    <p class="font-sans text-[11px] text-zinc-600 leading-relaxed font-light">
                        R. Const. Sebastião S. Souza, 96<br>
                        Praia da Costa // CEP 29.101-350
                    </p>
                </div>
                <div>
                    <p class="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-2">Rondonópolis / MT</p>
                    <p class="font-sans text-[11px] text-zinc-600 leading-relaxed font-light">
                        Av. Rotary International, 1755<br>
                        Vila Aurora // CEP 78.740-138
                    </p>
                </div>
                <div>
                    <p class="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-2">São José dos Campos / SP</p>
                    <p class="font-sans text-[11px] text-zinc-600 leading-relaxed font-light">
                        Estr. Dr. Altino Bondesan, 500<br>
                        PIT - Parque Tecnológico // CEP 12.247-016
                    </p>
                </div>
            </div>

            <div class="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[9px]">
                <p class="uppercase tracking-wider">
                    © 2026 CAIO NAHUEL S. FAGONDE. DESENVOLVIMENTO & ARQUITETURA.
                </p>
                <div class="flex space-x-6">
                    <a href="https://github.com/caioFagonde" target="_blank" class="hover:text-zinc-400 transition-colors">github.com/caioFagonde</a>
                    <a href="mailto:caionahuel@gmail.com" class="hover:text-zinc-400 transition-colors">caionahuel@gmail.com</a>
                </div>
            </div>
        </footer>

    </div>

</div>