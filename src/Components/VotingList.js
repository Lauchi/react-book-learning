import React from 'react';
import PropTypes from 'prop-types';
import VotingComponent from "./VotingComponent";
import VoteSummary from "./VoteSummary";

function VotingList ({ allVotes, currentVoteId, onSelectVote, onRegisterVote }) {
    return (
    <div>
        {allVotes.map((vote) => {
            if (vote.id === currentVoteId) {
                return <VotingComponent key={vote.id}
                                        vote={vote}
                                        onCloseVote={() => onSelectVote('')}
                                        onRegisterChoice={(choice) => {onRegisterVote(choice, vote)}}
                />
            }
            return <VoteSummary key={vote.id} vote={vote} onActivate={()=>{onSelectVote(vote)}}/>;
        })}
    </div>)
}

VotingList.propTypes = {
    allVotes: PropTypes.array,
    currentVoteId:  PropTypes.string,
    onSelectVote:   PropTypes.func.isRequired,
    onRegisterVote: PropTypes.func.isRequired
};

export default VotingList;