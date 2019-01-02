import { IPlayerModel } from "./IPlayerModel";
import { JeopardyTypeResult } from "./JeopardyTypeResult";
import { IJeopardyBetResult } from "./IJeopardyBetResult";
export interface IJeopardyResult {
    bet: IJeopardyBetResult;
    scenario: JeopardyTypeResult[];
    model: IPlayerModel;
}
