import { IMatch } from './IMatch';

export interface IMatchModel {
  getAll(): Promise<IMatch [] >;
  findById(id: IMatch['id']): Promise<IMatch | null>
}
