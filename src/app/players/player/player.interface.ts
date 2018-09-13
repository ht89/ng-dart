import { Score } from '../score/score.interface';

export interface Player {
    id: number;
    name: string;
    scores: Score[];
}
