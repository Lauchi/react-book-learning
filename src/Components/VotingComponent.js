import React from 'react';
import PropTypes from 'prop-types';
import ChoiceBar from "./ChoiceBar";

function VotingComponent ({ vote, onRegisterChoice, onCloseVote } ) {

    const totalCount = vote.choices.reduce((previous, choice) => previous + choice.count, 0);
    return (
        <div className="Row VotingRow Spacer">
            <div className="Head">
                <h1 className="Title" onClick={onCloseVote}>{vote.title}
                    <div className="Badge">{totalCount} Votes</div>
                </h1>
                <div className="Description Emphasis">
                    {vote.description}
                </div>
                <div>
                    {vote.choices.map(choice => {
                        let percentage = choice.count / totalCount * 100;
                        return <ChoiceBar
                            onClickHandler={() => onRegisterChoice(choice)}
                            key={choice.id}
                            progress={percentage}
                            badge={choice.count}
                            title={choice.title} />})}
                </div>
            </div>
        </div>
    )
}

VotingComponent.propTypes = {
    vote: PropTypes.object,
    onRegisterChoice: PropTypes.func,
    onCloseVote: PropTypes.func
};

export default VotingComponent;