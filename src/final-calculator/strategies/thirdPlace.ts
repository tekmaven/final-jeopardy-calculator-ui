import { IPlayerModel } from "../IPlayerModel";
import { IJeopardyResult } from "../IJeopardyResult";
import { IJeopardyBetResult } from "../IJeopardyBetResult";
import { JeopardyTypeResult } from "../JeopardyTypeResult";
export function thirdPlace(thirdPlace: IPlayerModel, allPlayers: IPlayerModel[]): IJeopardyResult {
    const firstPlace: IPlayerModel = allPlayers[0];
    let bet: IJeopardyBetResult = { min: 0, max: 0 };
    let scenario: JeopardyTypeResult[] = [];
    if (thirdPlace.maxWin > firstPlace.score) {
        bet.min = firstPlace.score - thirdPlace.score;
        bet.max = thirdPlace.score;
        scenario.push(JeopardyTypeResult.WIN_IF_CORRECT_AND_FIRST_PLACE_IS_INCORRECT);
    }
    else {
        bet.max = thirdPlace.score;
        scenario.push(JeopardyTypeResult.NO_POSSIBLE_WIN);
    }
    return {
        bet,
        scenario,
        model: thirdPlace
    };
}
