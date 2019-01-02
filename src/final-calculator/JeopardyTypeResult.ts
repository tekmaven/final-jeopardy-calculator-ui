export enum JeopardyTypeResult {
    AUTOMATIC_WIN = "automatic win",
    WIN_IF_CORRECT = "win if final jeopardy answer is correct",
    WIN_IF_SECOND_PLACE_IS_INCORRECT = "win if second place's jeopardy answer is incorrect",
    WIN_IF_THIRD_PLACE_IS_INCORRECT = "win if third place's jeopardy answer is incorrect",
    WIN_IF_SECOND_AND_THIRD_PLACE_IS_INCORRECT = "win if second and third place's jeopardy answer is incorrect",
    WIN_IF_CORRECT_AND_FIRST_PLACE_IS_INCORRECT = "win if final jeopardy answer is correct and first place's answer is incorrect",
    NO_POSSIBLE_WIN = "no possible win (unless someone makes a betting mistake!)",
    NOT_CODED_YET = "not coded yet"
}