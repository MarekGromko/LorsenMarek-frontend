import { makeBuilder, makeCompare } from '../utils/utility';

export type Serie = {
    id: number,
    title: string,
    genre: string,
    nb_episode: number,
    note: number
}
export const serieBuilder = makeBuilder<Serie>(["id","genre","nb_episode","title","note"]);
export const serieCompare = makeCompare<Serie>(["id","genre","nb_episode","title","note"]);

