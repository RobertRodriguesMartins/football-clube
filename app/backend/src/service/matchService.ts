import { Match } from '../database/models';
import { IMatch } from '../database/models/interfaces';

class MatchService {
  static async findAll(): Promise<IMatch[]> {
    const rawResponse = await Match.findAll({
      include: [
        { association: 'teamHome', attributes: { exclude: ['id'] } },
        { association: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return rawResponse as IMatch[];
  }

  static async findByQuery(queryParamValue: boolean): Promise<IMatch[]> {
    const rawResponse = await Match.findAll({
      where: {
        inProgress: queryParamValue ? 1 : 0,
      },
      include: [
        { association: 'teamHome', attributes: { exclude: ['id'] } },
        { association: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return rawResponse as IMatch[];
  }

  static async save(newMatch: IMatch): Promise<IMatch> {
    const rawResponse = await Match.create<Match>({
      homeTeam: newMatch.homeTeam,
      awayTeam: newMatch.awayTeam,
      homeTeamGoals: newMatch.homeTeamGoals,
      awayTeamGoals: newMatch.awayTeamGoals,
      inProgress: true,
    });

    return rawResponse as IMatch;
  }
}

export default MatchService;
