import { writable } from 'svelte/store';

// Módulo de projeto ativo em foco no portfólio
export const activeModule = writable('reentry');

// Modos de visualização do layout do viewport ('3d', 'split', 'text')
export const layoutMode = writable('split');

// Filtro de domínio selecionado no Showcase de projetos ('all', 'num', 'geo', 'ai', 'infra')
export const activeDomainFilter = writable('all');

// Dados consolidados dos projetos (Única fonte de verdade)
export const projectsData = [
    {
        id: "reentry",
        title: "Atmospheric Reentry Solver",
        domain: "num",
        domainLabel: "AEROSPACE / NUMERICAL",
        shortDesc: "Resolvedor aerodinâmico paralelo para simulação de fluidos compressíveis hipersônicos em C++23 e CUDA.",
        desc: "Resolvedor científico de fluidodinâmica computacional (CFD) focado em regime hipersônico de reentrada atmosférica. Resolve as equações tridimensionais de Navier-Stokes com acoplamento térmico em não-equilíbrio químico, utilizando kernels CUDA customizados para paralelizar as varreduras de malhas volumétricas densas na GPU.",
        num: "01 / SIMULATION",
        metric1: { val: "C++23 / CUDA", label: "Runtime de Compilação" },
        metric2: { val: "< 1.2s / Iter", label: "Velocidade de Grade 10M" },
        bullets: [
            "Esquemas numéricos AUSM+ de alta resolução para modelar ondas de choque severas.",
            "Kernels de memória compartilhada (shared memory) na GPU reduzindo latência de barramento.",
            "Sincronização assíncrona MPI para distribuição estável em supercomputadores de múltiplos nós."
        ],
        consoleLogs: [
            "COMPILING // reentry_solver.cu ...",
            "CUDA ARCHITECTURE DETECTED: sm_86 (NVIDIA RTX Core)",
            "SOLVING // 3D Finite Difference Scheme Grid [1000x1000x1000] ...",
            "ITERATION: 1042 // CFL: 0.85 // L2_NORM_RESIDUAL: 4.214e-6",
            "THERMO_CHEMICAL_NONEQUILIBRIUM: Active (5-Species Air Model)",
            "MEM_GPU_OCCUPANCY: 94.2% // Shared memory usage: 42 KB/block",
            "STEP_SUCCESSFUL // Frame 1042 exported as VTK."
        ],
        coords: "COMPILER_OPTS // -O3 -march=native -ffast-math"
    },
    {
        id: "alfred",
        title: "Alfred OS (Agentic Cortex)",
        domain: "ai",
        domainLabel: "AGENTIC AI / INFRA",
        shortDesc: "Sistema cognitivo autônomo local integrado via NATS com monitoramento ativo eBPF e pgvector.",
        desc: "Um sistema operacional cognitivo soberano que gerencia loops de execução autônomos baseados em LLMs locais via Ollama. Ele extrai informações de arquivos e mídias não-estruturadas, gera embeddings semânticos indexados em um banco de dados PostgreSQL com extensão pgvector e utiliza eBPF para auditar a segurança de suas chamadas lógicas.",
        num: "02 / COGNITIVE",
        metric1: { val: "Ollama / NATS", label: "Orquestração Lógica" },
        metric2: { val: "eBPF Sandboxed", label: "Monitoramento Ativo" },
        bullets: [
            "Loops de raciocínio de agentes autônomos com controle estrito de consumo de recursos.",
            "Memória contextualizada de longo prazo baseada em RAG semântico com pgvector.",
            "Barramento de tráfego de dados isolado via NATS em contêineres Docker e instâncias Valkey."
        ],
        consoleLogs: [
            "STARTING COGNITIVE DAEMON // alfred_core.py ...",
            "NATS SERVER: Connected on nats://localhost:4222",
            "VECTOR_DB: Indexing pgvector embedding collection 'cortex_memory'...",
            "OLLAMA_CLIENT: Llama3-8B model loaded into GPU memory.",
            "AGENT_DECISION_LOOP: Goal 'Audit system disk files' received.",
            "EBPF_TRACER: Attached kprobe:sys_enter_write to audit agents...",
            "AGENT_STATUS: Action complete. Memory state persistent."
        ],
        coords: "INTELLIGENCE_LOOP // RETRY_TIMEOUT_5S"
    },
    {
        id: "landslide",
        title: "AHP Landslide Hazards Mapping",
        domain: "geo",
        domainLabel: "GEOSPATIAL / GIS",
        shortDesc: "Resolvedor analítico geoespacial acoplado a dados Sentinel-2 para categorização de riscos terrestres.",
        desc: "Resolvedor de Processo Analítico Hierárquico (AHP) integrado a dados do Sentinel-2 e modelos digitais de terreno (DEM) para mapeamento contínuo de áreas propensas a deslizamentos em relevos inclinados. O pipeline realiza a fotogrametria, subtração de índices multiespectrais e gera saídas espaciais rasterizadas.",
        num: "03 / REMOTE SENSING",
        metric1: { val: "Sentinel-2 / SAR", label: "Fusing Sensorial" },
        metric2: { val: "GDAL / PMTiles", label: "Saída de Geoserviço" },
        bullets: [
            "Extração contínua de índices de umidade e vegetação (NDWI, NDVI) no Sentinel-2.",
            "Interpolação de malhas de terreno geradas a partir de dados LiDAR e nuvens de pontos.",
            "Publicação instantânea das saídas em PMTiles compactados para visualização direta em WebGL."
        ],
        consoleLogs: [
            "INGESTING RASTER BANDS // sentinel2_t23s.tif ...",
            "CALCULATING SPECTRAL INDEX // NDVI = (B8 - B4) / (B8 + B4)",
            "INTERPOLATING SLOPE // GDAL DEM slope calculation ...",
            "AHP MATRICES COMPLIANCE: Consistency Ratio = 0.042 (CR < 0.1 OK)",
            "SAVING VECTOR OVERLAYS // PostGIS index GiST update ...",
            "TILING DATA // Exporting cloud-optimized PMTiles to S3...",
            "GEOSERVER_RELOAD // Layers updated."
        ],
        coords: "PROJ_UTM // SIRGAS 2000 // EPSG 4326"
    },
    {
        id: "potree",
        title: "IronVision LiDAR WebClient",
        domain: "geo",
        domainLabel: "FULLSTACK 3D / SHADERS",
        shortDesc: "Visualizador tridimensional de nuvens de pontos LiDAR integrado com Octree no navegador.",
        desc: "Plataforma de visualização espacial para navegação em nuvens de pontos LiDAR de densidade de bilhões de coordenadas. Construída sob estruturas de indexação Octree (Potree Converter) que realizam requisições HTTP Range parciais em buckets estáticos do S3, renderizando os dados na GPU via shaders customizados em WebGL.",
        num: "04 / GRAPHICS",
        metric1: { val: "Three.js / WebGL", label: "Motor Gráfico Web" },
        metric2: { val: "Octree Range", label: "Puxada de Bytes" },
        bullets: [
            "Renderização reativa de milhões de pontos por segundo na GPU sem travamentos de thread.",
            "Shaders de profundidade colorida facilitando inspeções técnicas de engenharia linear.",
            "Estrutura client-side unificada no Quasar Vue 3 para integridade responsiva em dispositivos móveis."
        ],
        consoleLogs: [
            "INITIALIZING WEBGL PORT // Potree Renderer Active ...",
            "LOADING FILE INDEX // metadata.json from S3 Bucket ...",
            "OCTREE PARSER: Loading node r0123... (Range Request: bytes=2048-4096)",
            "GPU MEMORY ALLOCATION: 4.1M Vertices instanced on BufferGeometry.",
            "SHADER_STIPPLE: Depth shading based on custom vertex attributes.",
            "ZOOM_LEVEL_TRIGGER: Loading children nodes dynamically...",
            "RENDER_STABLE // 60 FPS maintained."
        ],
        coords: "RENDER_LOOP // REQUEST_ANIMATION_FRAME"
    },
    {
        id: "orbit",
        title: "Orbit & Trajectory Propagator",
        domain: "num",
        domainLabel: "AEROSPACE / JULIA",
        shortDesc: "Propagador de órbita terrestre de alta fidelidade com perturbações orbitais construído em Julia.",
        desc: "Modelo numérico preditivo de mecânica orbital e propagação de satélites terrestres. Simula órbitas de satélites considerando as perturbações do geopotencial terrestre (J2, J3, J4), arrasto atmosférico dinâmico de alta altitude, pressão de radiação solar e calculando de forma analítica e numérica manobras elípticas de transferência.",
        num: "05 / PROPAGATION",
        metric1: { val: "Julia / Rust", label: "Núcleo de Propagação" },
        metric2: { val: "Runge-Kutta 78", label: "Integrador Numérico" },
        bullets: [
            "Acoplamento de equações de movimento com integradores adaptativos (DifferentialEquations.jl).",
            "Modelagem de perturbação de massa irregular com o potencial terrestre EGM96.",
            "Resolvedor de equações de Lambert para interceptação orbital automatizada de fragmentos."
        ],
        consoleLogs: [
            "INITIALIZING PROPAGATOR // orbit_engine.jl ...",
            "SETTING_INITIAL_STATE // Epoch: J2000 // Semimajor Axis: 7100 km",
            "INTEGRATOR // Runge-Kutta adaptive step-size active.",
            "PERTURBATIONS_ON: [J2_Effect: Active] [Solar_Pressure: Active] [Drag: Active]",
            "SIMULATING MANEUVER // Hohmann transfer delta_v calculation...",
            "PROPAGATING // Step time: dt=10.0s // Completed 42 orbits.",
            "DUMPING TRAJECTORY // Exporting Keplerian elements as JSON."
        ],
        coords: "JULIA_ORBIT // RK78_INTEGRATOR"
    },
    {
        id: "forge",
        title: "Sovereign Forge Execution",
        domain: "infra",
        domainLabel: "INFRASTRUCTURE / SECURE",
        shortDesc: "Sandbox isolada para execução de scripts de simulação sob Docker-in-Docker e monitoramento eBPF.",
        desc: "Runtime de compilação e execução remota de códigos científicos com latência ultra-baixa de execução. Cria ambientes isolados virtuais lúdicos para compilar C++, rodar Python e rodar WebAssembly em sandboxes que isolam e blindam a máquina hospedeira de abusos de privilégios de sistema.",
        num: "06 / SECURE RUNTIME",
        metric1: { val: "Docker / DinD", label: "Arquitetura Isolada" },
        metric2: { val: "< 10ms", label: "Overhead de Execução" },
        bullets: [
            "Restrições de chamadas de kernel Linux baseadas em filtros Seccomp e cgroups.",
            "Sincronização rápida de compilação via Wasmtime isolando totalmente a memória RAM.",
            "Monitoramento de invasões ativas monitorando processos via tracepoints de eBPF."
        ],
        consoleLogs: [
            "INITIALIZING SANDBOX FORGE // runtime_init ...",
            "SPAWNING CONTAINER // isolated_agent_sandbox_t42 (DinD)",
            "COMPILING WASM // Cargo build target=wasm32-wasi ...",
            "CGROUPS_LIMIT: Max CPU: 1 Core // Max RAM: 512 MB enforced.",
            "EBPF_SHIELD: Listening for sys_enter_execve inside sandbox cluster...",
            "EXECUTION SUCCESS // Result payload captured safely.",
            "DESTROYING CONTAINER // isolated_agent_sandbox_t42 terminated."
        ],
        coords: "CONTAINER_RUNTIME // EBPF_TRACEPOINT"
    }
];

// Dados dos subnós para visualização de telemetria nos Blueprints p5.js
export const subNodesData = {
    reentry: {
        FLOW: { title: "Equações de Navier-Stokes", status: "SIMD_ACCEL", detail: "Formulações matemáticas para modelagem de escoamentos transientes compressíveis sob alta entalpia e gradiente térmico de choque." },
        GRID: { title: "Discretização Espacial", status: "STABLE", detail: "Esquema de diferenças finitas AUSM+ tridimensional acoplado a malhas estruturadas curvas de alta fidelidade física." },
        CUDA: { title: "Aceleração GPU (CUDA)", status: "PARALLEL", detail: "Paralelização de malhas com kernels assíncronos compartilhados na RAM física da GPU de modo a evitar colisões de latência." },
        THERMO: { title: "Não-Equilíbrio Termoquímico", status: "ACTIVE", detail: "Mecanismo químico de 5 espécies do ar simulando ionização física real induzida por ondas de compressão extremas." }
    },
    alfred: {
        OLLAMA: { title: "Motor de Inferência Ollama", status: "ONLINE", detail: "Raciocínio local executado de forma privada em GPU dedicada com isolamento lógico completo contra vazamento de dados." },
        CORTEX: { title: "Orquestrador Assíncrono", status: "ACTIVE", detail: "Processos em loops de decisão autônomos baseados em grafos de tarefa e barramentos leves orientados a eventos com NATS." },
        PGVEC: { title: "RAG pgvector Indexer", status: "SINC_OK", detail: "Indexação de alta dimensão HNSW no Postgres, gerando buscas semânticas em frações de milissegundos com isolamento de contexto." },
        EBPF: { title: "Segurança Ativa eBPF", status: "SHIELD_ON", detail: "Monitoramento em tempo real do comportamento de agentes através do monitoramento de syscalls de sistema no nível do kernel." }
    },
    landslide: {
        AHP: { title: "Processo Hierárquico Analítico", status: "STABLE", detail: "Matriz de decisão empírica ponderando declividade, geologia e cobertura vegetal para classificação precisa de vulnerabilidade." },
        SENTINEL: { title: "Processamento de Imagens", status: "ONLINE", detail: "Injeção de ortofotos orbitais do Sentinel-2 com filtros automáticos para remoção de ruídos de atmosfera e nuvens." },
        POSTGIS: { title: "Resolvedor Espacial", status: "READY", detail: "Cruzamento rápido de divisas vetoriais e tabelas através de índices espaciais R-Tree no PostgreSQL." },
        PMTILES: { title: "Geração de Tileset", status: "COMPRESS_OK", detail: "Mapeamento das fatias de dados geométricos convertidos diretamente em arquivos PMTiles compactos para visualização." }
    },
    potree: {
        THREE: { title: "Motor Gráfico WebGL", status: "60_FPS", detail: "Gerenciamento de buffers de memória diretamente com a placa gráfica do navegador, proporcionando fluidez absoluta." },
        OCTREE: { title: "Indexação Espacial Octree", status: "ONLINE", detail: "Divisão hierárquica recursiva do volume tridimensional da nuvem de pontos de modo a carregar apenas os nós no campo de visão." },
        RANGE: { title: "HTTP Range Requests", status: "SINC_OK", detail: "Abertura parcial de bytes de arquivos LAS/LAZ remotos direto do S3 sem necessidade de baixar o arquivo inteiro." },
        SHADER: { title: "Shaders de Profundidade", status: "ACTIVE", detail: "Cálculos matemáticos no nível do pixel determinando cores dinâmicas baseadas na elevação e na intensidade do feixe laser do sensor." }
    },
    orbit: {
        JULIA: { title: "Motor de Órbitas Julia", status: "ONLINE", detail: "Modelagem matemática aeroespacial integrada a resolvedores diferenciais modernos de alta fidelidade numérica." },
        INTEGRATOR: { title: "Integrador RK78 Adaptativo", status: "STABLE", detail: "Controle refinado de espaçamento temporal durante a integração numérica de trajetórias para mitigar erros acumulativos." },
        PERTURB: { title: "Perturbações Gravitacionais", status: "ACTIVE", detail: "Cálculo analítico dos efeitos gravitacionais J2/J3/J4, pressão de radiação solar e arrasto de atmosfera de alta altitude." },
        LAMBERT: { title: "Resolvedor de Lambert", status: "READY", detail: "Interpolação de órbitas e trajetórias balísticas ideais para manobras de interceptação e rendezvous orbital de satélites." }
    },
    forge: {
        DIND: { title: "Docker-in-Docker Sandboxing", status: "SECURE", detail: "Geração sob demanda de contêineres de execução isolados, blindando o servidor contra códigos maliciosos." },
        SECCOMP: { title: "Filtros de Syscall Seccomp", status: "ACTIVE", detail: "Mecanismo de segurança que limita chamadas de kernel indesejadas que possam comprometer a segurança da infraestrutura." },
        WASM: { title: "Isolamento WebAssembly", status: "SINC_OK", detail: "Compilação direcionada para WASI com Wasmtime de modo a isolar fisicamente a RAM e os tempos de execução de CPU." },
        TRACE: { title: "Tracepoints eBPF", status: "MONITORANDO", detail: "Rastreio e bloqueio automático de execuções perigosas em tempo real antes de atingirem a integridade de infraestrutura do cluster." }
    }
};