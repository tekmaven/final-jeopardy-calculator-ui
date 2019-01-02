import * as React from 'react';
import styled from 'styled-components';

export type PlayerProps = {
    Score: number;
    ScoreChanged(Score: number): void;
    Label: string;
    children: React.ReactNode;
};

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



export const Player: React.FunctionComponent<PlayerProps> = (props) => (
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