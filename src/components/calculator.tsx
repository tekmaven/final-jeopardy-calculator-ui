import * as React from 'react';
import styled from 'styled-components';
import * as calculator from './final-calculator';


const PlayerStyle = styled.main`
  float: left;
  padding: 5px;

  input[type=text] {
      width: 100px;
      text-align: right;
  }
`;


type PlayerProps = {
    Score: number;
    ScoreChanged(Score: number): void;
    Selected: boolean;
    PlayerSelected(): void;
};

const Player: React.FunctionComponent<PlayerProps> = (props) => (
    <PlayerStyle>
        <div>
            <input type="radio" checked={props.Selected} onChange={props.PlayerSelected} />
            <input type="text" value={props.Score} onChange={() => props.ScoreChanged(Number(event.target.value))} />
        </div>
    </PlayerStyle>
);


const ClearStyle = styled.main`
  clear: both;
`;

type CalulatorProps = {
    id: string;
};

const initialState = { players: [0, 0, 0], selectedPlayerIndex: 0 };
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
                {this.state.players.map((val, i) => <Player Score={this.state.players[i]} ScoreChanged={(score => this.setScore(score, i))} Selected={this.state.selectedPlayerIndex == i} PlayerSelected={(() => this.setState({ selectedPlayerIndex: i }))} key={i} />)}
                <ClearStyle><br /></ClearStyle>
                <h3>Result</h3>
                <pre>
                    {JSON.stringify(this.state, null, 3)}
                </pre>
                <pre>
                    {JSON.stringify(calculator.jeopardyCalculator(this.state.players, this.state.selectedPlayerIndex), null, 3)}
                </pre>
            </div>
        );
    }
}

export default Calculator;
