import * as React from 'react';
import styled from 'styled-components';
import { PlayerResult } from './PlayerResult';
import { Player } from './Player';

const ClearStyle = styled.main`
  clear: both;
`;

type CalulatorProps = {
    id: string;
};

const initialState = { players: [0, 16200, 7000], selectedPlayerIndex: 1 };
type State = Readonly<typeof initialState>;

class Calculator extends React.Component<CalulatorProps, State> {
    readonly state: State = initialState;

    setScore(score: number, index: number) {
        const playersState: number[] = Array.from(this.state.players);
        playersState[index] = score;
        this.setState({ players: playersState });
    }

    render() {
        return (
            <div>
                <h3>Players:</h3>
                {this.state.players.map((_, i) =>
                    <Player
                        Label={`Contestant ${i + 1}`}
                        Score={this.state.players[i]}
                        ScoreChanged={(score => this.setScore(score, i))}
                        key={i}>
                        <PlayerResult PlayerScores={this.state.players} PlayerIndex={i} />
                    </Player>)}
                <ClearStyle><br /></ClearStyle>
            </div>
        );
    }
}

export default Calculator;
