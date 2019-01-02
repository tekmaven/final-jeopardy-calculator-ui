import * as React from 'react';
import { JeopardyCalculator, JeopardyTypeResult } from '../final-calculator';

export type PlayerResultProps = {
    PlayerIndex: number;
    PlayerScores: number[];
};

export const PlayerResult: React.FunctionComponent<PlayerResultProps> = ({ PlayerIndex, PlayerScores }) => {
    const result = JeopardyCalculator(PlayerScores, PlayerIndex);

    if (result.scenario[0] == JeopardyTypeResult.NOT_CODED_YET) {
        return (<div><br /><br /><h4>Scenario</h4>Not coded yet</div>)
    }
    return (
        <div>
            <br /><br />
            <div>
                <h4>Scenario:</h4>
                {result.scenario.map((s) => (
                    <div>{s}</div>
                ))}
            </div>
            <br />
            <div>
                <h4>Bet:</h4>
                <div>Minimum: {result.bet.min}</div>
                <div>Maximum: {result.bet.max}</div>
            </div>
        </div>
    )
}