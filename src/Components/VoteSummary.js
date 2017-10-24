import React from 'react';
import PropTypes from 'prop-types';

export default function VoteSummary({ vote, onActivate }) {
  const totalVotes = vote.choices.reduce((prev, curr) => prev + curr.count, 0);

  return (
    <div className="Row VotesRow Selectable">
      <h1 className="Title">{vote.title}
        <div className="Badge">{totalVotes} Votes</div>
      </h1>

      <p className="Emphasis">{vote.description}</p>
    </div>
  );
}

VoteSummary.propTypes = {
  vote:       PropTypes.object.isRequired,
};
