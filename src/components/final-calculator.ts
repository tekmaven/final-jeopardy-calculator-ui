interface IPlayer {
    player: number;
    score: number;
    isSelf: Boolean;
}

interface IPlayerModel extends IPlayer {
    isFirstPlace: boolean;
    isSecondPlace: boolean;
    isThirdPlace: boolean;
    maxWin: number;
    minWin: number;
    solve(currentPlayer: IPlayerModel, allPlayers: IPlayerModel[]): IJeopardyResult;
}

interface IJeopardyResult {
    bet: IJeopardyBetResult;
    scenario: JeopardyTypeResult[];
    model: IPlayerModel;
}

interface IJeopardyBetResult {
    min: number;
    max: number;
}

export enum JeopardyTypeResult {
    AUTOMATIC_WIN = "automatic win",
    WIN_IF_CORRECT = "win if final jeopardy answer is correct",
    WIN_IF_SECOND_PLACE_IS_INCORRECT = "win if second place's jeopardy answer is incorrect",
    WIN_IF_THIRD_PLACE_IS_INCORRECT = "win if third place's jeopardy answer is incorrect",
    WIN_IF_SECOND_AND_THIRD_PLACE_IS_INCORRECT = "win if second and third place's jeopardy answer is incorrect",
    NO_POSSIBLE_WIN = "no possible win",
    NOT_CODED_YET = "not coded yet"
}

export function firstPlace(firstPlace: IPlayerModel, allPlayers: IPlayerModel[]): IJeopardyResult {
    const secondPlace: IPlayerModel = allPlayers[1];
    const thirdPlace: IPlayerModel = allPlayers[2];

    let bet: IJeopardyBetResult = { min: 0, max: 0 };
    let scenario: JeopardyTypeResult[] = [];

    if (firstPlace.score > secondPlace.maxWin) {
        // runaway victory
        bet.max = (firstPlace.score - 1) - secondPlace.maxWin;
        scenario.push(JeopardyTypeResult.AUTOMATIC_WIN);
    } else {
        // not a runaway! you must get it right to win!
        bet.min = Math.max(0, (secondPlace.maxWin + 1) - firstPlace.score);
        bet.max = Math.max(bet.min, Math.max(0, firstPlace.score - (thirdPlace.maxWin + 1)));
        scenario.push(JeopardyTypeResult.WIN_IF_CORRECT);

        if (firstPlace.score < thirdPlace.maxWin) {
            scenario.push(JeopardyTypeResult.WIN_IF_SECOND_AND_THIRD_PLACE_IS_INCORRECT);
        } else {
            scenario.push(JeopardyTypeResult.WIN_IF_SECOND_PLACE_IS_INCORRECT);
        }
    }

    return {
        bet,
        scenario,
        model: firstPlace
    };
}

export function secondPlace(currentPlayer: IPlayerModel, allPlayers: IPlayerModel[]): IJeopardyResult {
    return {
        bet: {
            min: 0,
            max: 0
        },
        scenario: [JeopardyTypeResult.NOT_CODED_YET],
        model: currentPlayer
    };
}

export function thirdPlace(currentPlayer: IPlayerModel, allPlayers: IPlayerModel[]): IJeopardyResult {
    return {
        bet: {
            min: 0,
            max: 0
        },
        scenario: [JeopardyTypeResult.NOT_CODED_YET],
        model: currentPlayer
    };
}

export function errorPlace(currentPlayer: IPlayerModel, allPlayers: IPlayerModel[]): IJeopardyResult {
    throw "Something happened";
}


// tslint:disable-next-line:typedef
export function jeopardyCalculator(scores: number[], playerIndex: number) {

    function createPlayer(i: number): IPlayerModel {
        return {
            player: i,
            score: scores[i],
            isSelf: (playerIndex === i),
            isFirstPlace: false,
            isSecondPlace: false,
            isThirdPlace: false,
            maxWin: scores[i] * 2,
            minWin: 0,
            solve: errorPlace
        };
    }

    let players: IPlayerModel[] = [
        createPlayer(0),
        createPlayer(1),
        createPlayer(2)
    ];
    console.log(players);
    const currentPlayer: IPlayerModel = players[playerIndex];

    players.sort((a, b) => {
        if (a.score > b.score) {
            return -1;
        }

        if (a.score < b.score) {
            return 1;
        }

        return 0;
    });

    players[0].solve = firstPlace;
    players[0].isFirstPlace = true;

    players[1].solve = secondPlace;
    players[1].isSecondPlace = true;

    players[2].solve = thirdPlace;
    players[2].isThirdPlace = true;

    return currentPlayer.solve(currentPlayer, players);
}
