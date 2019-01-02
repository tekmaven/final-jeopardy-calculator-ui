import * as React from 'react';
import styled from 'styled-components';
import * as calculator from './final-calculator';


const PlayerStyle = styled.main`

@media all and (min-width: 825px) { 
    float: left;
    width: 30%;
}
	padding: 15px;
	  margin-right: 25px;
	  margin-bottom: 25px;
	border: 1px solid black;


	input[type=text] {
		width: 70px;
		margin: 0 3px 0 10px;
		text-align: right;
	}
`;

type PlayerResultProps = {
    PlayerIndex: number;
    PlayerScores: number[]
}

const PlayerResult: React.FunctionComponent<PlayerResultProps> = ({ PlayerIndex, PlayerScores }) => {
    const result = calculator.jeopardyCalculator(PlayerScores, PlayerIndex);

    if (result.scenario[0] == calculator.JeopardyTypeResult.NOT_CODED_YET) {
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

type PlayerProps = {
    Score: number;
    ScoreChanged(Score: number): void;
    Label: string;
    children: React.ReactNode;
};

const Player: React.FunctionComponent<PlayerProps> = (props) => (
    <PlayerStyle>
        <div>
            <label>
                {props.Label}
                <input
                    type="text"
                    value={props.Score}
                    onChange={() => props.ScoreChanged(Number(event.target.value))}
                />
            </label>
            {props.children}
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
