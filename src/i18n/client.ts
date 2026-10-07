const portuguese = () => document.documentElement.lang.startsWith('pt');
export const foldText = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function skillCount(count: number, areas: number): string {
  return portuguese()
    ? `${count} ${count === 1 ? 'habilidade' : 'habilidades'} em ${areas} ${areas === 1 ? 'área' : 'áreas'}`
    : `${count} ${count === 1 ? 'skill' : 'skills'} across ${areas} ${areas === 1 ? 'area' : 'areas'}`;
}
export function projectCount(count: number): string {
  return portuguese() ? `${count} ${count === 1 ? 'projeto' : 'projetos'}` : `${count} ${count === 1 ? 'project' : 'projects'}`;
}
export function spatialCount(value: number, count: number, map: boolean): string {
  return portuguese()
    ? map ? `${value} / 100 · ${count} lotes exibidos` : `${value}% · ${count} pontos exibidos`
    : map ? `${value} / 100 · ${count} parcels shown` : `${value}% · ${count} points shown`;
}
export const sourceLabel = (page: string) => portuguese() ? `Trecho da fonte · página ${page}` : `Source passage · page ${page}`;
export const citationLabel = (page: string) => portuguese() ? `Ver página ${page} ↗` : `Check page ${page} ↗`;
export const missingSource = () => portuguese() ? 'Sem trecho de apoio' : 'No supporting passage';
export const missingAnswer = () => portuguese()
  ? 'Este documento de exemplo não contém uma resposta. Adicione a fonte relevante antes de responder a esta pergunta.'
  : 'This sample document does not support an answer. Add the relevant source before answering this question.';
