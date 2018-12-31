import * as React from 'react';
import styled from 'styled-components';
import * as calculator from './final-calculator';


const PlayerStyle = styled.main`
  float: left;
  padding: 5px;

  input[type=radio] {
      margin: 0 3px 0 10px;
  }

  input[type=text] {
      width: 70px;
      text-align: right;
  }
`;


type PlayerProps = {
    Score: number;
    ScoreChanged(Score: number): void;
    Selected: boolean;
    PlayerSelected(): void;
    children: React.ReactNode;
};

const Player: React.FunctionComponent<PlayerProps> = (props) => (
    <PlayerStyle>
        <div>
            <label>
                {props.children}
                <input type="radio" checked={props.Selected} onChange={props.PlayerSelected} />
            </label>
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
                {this.state.players.map((val, i) =>
                    <Player Score={this.state.players[i]} ScoreChanged={(score => this.setScore(score, i))} Selected={this.state.selectedPlayerIndex == i} PlayerSelected={(() => this.setState({ selectedPlayerIndex: i }))} key={i}>
                        Contestant {i + 1}:
                    </Player>)}
                <ClearStyle><br /></ClearStyle>
                <pre>
                    {JSON.stringify(this.state, null, 3)}
                </pre>
                <h3>Result</h3>
                <pre>
                    {JSON.stringify(calculator.jeopardyCalculator(this.state.players, this.state.selectedPlayerIndex), null, 3)}
                </pre>
            </div>
        );
    }
}

export default Calculator;
