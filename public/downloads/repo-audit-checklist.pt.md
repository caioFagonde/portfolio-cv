# Checklist de auditoria de repositório

Use este checklist para preparar uma auditoria de desenvolvimento com IA, qualidade em execução, cobertura de verificação e prioridades de implementação.

## Contexto necessário

- URL ou arquivo do repositório.
- Framework e gerenciador de pacotes.
- Comandos de desenvolvimento e build.
- Destino de implantação.
- Rotas, telas, tarefas ou fluxos importantes.
- Backend/API, se houver.
- Dependências de autenticação, banco de dados, filas, armazenamento ou serviços externos.
- Testes atuais, verificações de CI e falhas conhecidas.
- Ferramentas de IA em uso.
- Prazo, decisão que a auditoria deve apoiar e sensibilidade dos dados.

## Áreas de auditoria

### Estrutura do repositório

- Framework, scripts, mapa de rotas e caminho de implantação.
- Alterações locais e separação de arquivos gerados.
- Instruções para agentes e qualidade da documentação de entrega.

Entrega esperada: mapa do repositório com responsabilidades e riscos.

### Comportamento em execução

- A aplicação funciona localmente?
- Quais rotas e fluxos são importantes?
- O que falha no celular, em estados vazios, com textos longos ou demonstrações indisponíveis?

Entrega esperada: evidências do navegador, capturas e lista de defeitos.

### Qualidade do frontend

- Hierarquia, espaçamento, quebra de linhas, contraste e foco.
- Responsividade dos componentes.
- Identificação de padrões genéricos de interfaces de IA.

Entrega esperada: avaliação visual com correções priorizadas.

### Backend/API

- Validação, limites de autenticação, caminhos de erro e observabilidade.
- Casos de sucesso, resultado vazio, entrada inválida, acesso não autorizado e falha, quando aplicáveis.
- Apenas credenciais de desenvolvimento.

Entrega esperada: revisão dos endpoints e modos de falha.

### Testes e automação

- Lint, verificação de tipos e cobertura de testes unitários, integração e e2e.
- Cobertura de capturas e acessibilidade.
- Verificações obrigatórias em CI e facilidade de execução local.

Entrega esperada: matriz de verificação e plano para as verificações ausentes.

### Preparação para agentes de IA

- Instruções no repositório.
- Regras para inspecionar o código antes de editar.
- Facilidade de encontrar dados de teste e scripts.
- Requisitos de relatório de conclusão e evidências.

Entrega esperada: checklist de preparação e plano de correção.

## Fora do escopo, salvo contratação específica

- Auditoria formal de segurança.
- Revisão regulatória ou de conformidade.
- Testes de invasão.
- Resposta a incidentes em produção.
- Plano de reescrita completa antes de mapear os riscos.
