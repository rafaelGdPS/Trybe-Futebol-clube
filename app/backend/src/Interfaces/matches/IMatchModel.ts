import { IMatch } from './IMatch';

export interface IMatchModel {
  getAll(): Promise<IMatch [] >
}
