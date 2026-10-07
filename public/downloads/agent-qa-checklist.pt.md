# Checklist de qualidade para agentes de programação

Use este checklist quando Claude Code, Codex ou outro agente de programação alterar um repositório real.

## Antes de programar

- Leia a estrutura do repositório, framework, rotas, estilos, gerenciador de pacotes, scripts, premissas de implantação e estado atual dos arquivos.
- Preserve o conteúdo existente e o trabalho do usuário.
- Identifique as rotas afetadas, estados de execução e comandos de verificação.
- Defina o escopo antes de editar.

## Implementação

- Prefira os padrões existentes de framework, dados, estilos e componentes.
- Mantenha interfaces pequenas e estados explícitos.
- Use dados tipados ou conteúdo estruturado quando a interface depende de conteúdo.
- Evite textos vagos, alegações exageradas, métricas inventadas e interfaces genéricas de IA.
- Não deixe links provisórios quebrados. Indique com clareza quando uma demonstração não está disponível.

## Verificação em execução

- Inicie a aplicação localmente ou use os scripts de testes e capturas do repositório.
- Abra as rotas afetadas em um navegador real.
- Verifique navegação, chamadas para ação, imagens, layout responsivo e estados indisponíveis.
- Quando relevante, verifique textos longos e curtos, mídia ausente e navegação móvel.

## Revisão de capturas de tela

Capture e inspecione:

- 1440x900 desktop
- 1280x720 notebook
- 1024x768 tablet na horizontal
- 768x1024 tablet na vertical
- 390x844 celular

Verifique:

- espaçamento e hierarquia
- quebra de linhas e cortes de texto
- contraste
- visibilidade do foco
- prioridade das chamadas para ação
- qualidade do layout móvel
- padrões genéricos de interfaces de IA
- estados vazios, de erro e indisponíveis

## Acessibilidade

- Execute axe ou o script de acessibilidade do repositório, quando disponível.
- Verifique a estrutura semântica, a ordem dos títulos e textos claros nos links.
- Verifique a visibilidade do foco do teclado.
- Prefira HTML semântico a ARIA desnecessário.

## Backend/API

Se houver backend:

- Use apenas credenciais de desenvolvimento ou teste.
- Verifique sucesso, resultado vazio, entrada inválida, acesso não autorizado e falha.
- Inspecione os logs.
- Documente endpoints, dados enviados e evidências.

Se não houver backend, informe que as verificações de backend/API não se aplicam.

## Entrega

Relate:

- arquivos alterados
- comandos executados
- capturas realizadas e revisadas
- tamanhos de tela verificados
- problemas encontrados e corrigidos
- resultados de acessibilidade
- resultados de backend/API ou indicação de site estático
- limitações conhecidas
- instruções para o próximo agente

## Critério de conclusão

A tarefa está concluída quando a aplicação funciona, as rotas afetadas foram abertas, as capturas foram revisadas, os defeitos visíveis foram corrigidos, as verificações aplicáveis passaram, backend/API foi verificado ou marcado como não aplicável, e a documentação de entrega contém as evidências.
