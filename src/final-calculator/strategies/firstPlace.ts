import { IPlayerModel } from "../IPlayerModel";
import { IJeopardyResult } from "../IJeopardyResult";
import { IJeopardyBetResult } from "../IJeopardyBetResult";
import { JeopardyTypeResult } from "../JeopardyTypeResult";
export function firstPlace(firstPlace: IPlayerModel, allPlayers: IPlayerModel[]): IJeopardyResult {
    const secondPlace: IPlayerModel = allPlayers[1];
    const thirdPlace: IPlayerModel = allPlayers[2];
    let bet: IJeopardyBetResult = { min: 0, max: 0 };
    let scenario: JeopardyTypeResult[] = [];
    if (firstPlace.score > secondPlace.maxWin) {
        // runaway victory
        bet.max = (firstPlace.score - 1) - secondPlace.maxWin;
        scenario.push(JeopardyTypeResult.AUTOMATIC_WIN);
    }
    else {
        // not a runaway! you must get it right to win!
        bet.min = Math.max(0, (secondPlace.maxWin + 1) - firstPlace.score);
        bet.max = Math.max(bet.min, Math.max(0, firstPlace.score - (thirdPlace.maxWin + 1)));
        scenario.push(JeopardyTypeResult.WIN_IF_CORRECT);
        if (firstPlace.score < thirdPlace.maxWin) {
            scenario.push(JeopardyTypeResult.WIN_IF_SECOND_AND_THIRD_PLACE_IS_INCORRECT);
        }
        else {
            scenario.push(JeopardyTypeResult.WIN_IF_SECOND_PLACE_IS_INCORRECT);
        }
    }
    return {
        bet,
        scenario,
        model: firstPlace
    };
}
