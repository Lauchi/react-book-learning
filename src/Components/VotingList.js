import React from 'react';
import PropTypes from 'prop-types';
import VotingComponent from "./VotingComponent";
import VoteSummary from "./VoteSummary";
import Link from "react-router-dom/es/Link";

function VotingList ({ allVotes, currentVoteId, onRegisterVote }) {
    return (
    <div>
        {allVotes.map((vote) => {
            return <Link to={`/votes/${vote.id}`}>
                <VoteSummary key={vote.id} vote={vote}/>
            </Link>;
        })}
    </div>)
}

VotingList.propTypes = {
    allVotes: PropTypes.array,
    currentVoteId:  PropTypes.string,
    onRegisterVote: PropTypes.func.isRequired
};

export default VotingList;