import { ITeams } from '../Interfaces/ITeams';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamsModel } from '../Interfaces/IteamsModel';

export default class TeamModel implements ITeamsModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: ITeams = dbData;
    return { id, teamName };
  }
}
