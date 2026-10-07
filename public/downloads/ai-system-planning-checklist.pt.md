# Checklist de planejamento de sistemas de IA

Por Caio Nahuel — https://caiofagonde.github.io/portfolio-cv/pt/ai-systems/

## Tarefa e conversa
- Quem usa o assistente, em qual canal e para quais tarefas específicas?
- Forneça exemplos de conversas, resultados esperados e pedidos fora do escopo.
- Defina o contexto necessário, a duração da sessão e o encaminhamento para uma pessoa.

## Conhecimento e busca
- Liste as fontes aprovadas, formatos, responsáveis, atualização e permissões.
- Defina a ingestão, OCR, divisão em trechos, metadados, indexação e estratégia de busca.
- Preserve as referências aos documentos e páginas originais.
- Defina o comportamento quando faltam evidências, as fontes se contradizem ou o conhecimento está desatualizado.

## Ferramentas e fluxos
- Liste integrações, esquemas das ferramentas, permissões dos serviços e regras de validação.
- Separe consultas de leitura de alterações que exigem aprovação.
- Defina transições de estado, novas tentativas, idempotência, limites de tempo e recuperação.
- Defina as saídas estruturadas e os requisitos de revisão humana.

## Avaliação
- Crie conversas e perguntas representativas com as evidências esperadas.
- Teste perguntas ambíguas, respostas sem fundamento, entradas maliciosas, falhas de permissão,
  falhas do provedor, saídas inválidas de ferramentas e ações duplicadas.
- Verifique a precisão das citações e os registros de revisão.
- Defina limites de tempo de resposta e uso; evite alegações de qualidade sem evidências.

## Operação e entrega
- Documente as variáveis de ambiente sem armazenar credenciais.
- Defina retenção, tratamento de dados sensíveis, monitoramento e resposta a incidentes.
- Versione prompts e ferramentas; documente a reversão e mudanças de provedor.
- Entregue configuração, comandos, dados de teste e um guia de manutenção.
