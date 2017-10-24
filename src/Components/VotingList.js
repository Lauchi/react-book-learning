import React from 'react';
import PropTypes from 'prop-types';
import VoteSummary from "./VoteSummary";
import Link from "react-router-dom/es/Link";

function VotingList ({ allVotes }) {
    return (
    <div>
        {allVotes.map((vote) => {
            return <Link key={vote.id} to={`/votes/${vote.id}`}>
                <VoteSummary vote={vote}/>
            </Link>;
        })}
    </div>)
}

VotingList.propTypes = {
    allVotes: PropTypes.array,
};

export default VotingList;