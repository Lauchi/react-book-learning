import React, {Component} from 'react';
import VotingList from "./VotingList";
import {fetchJson, sendJson} from "../HTTPAdapter/Backend";
import Link from "react-router-dom/es/Link";

class VotingController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allVotes: [],
            currentVoteId: '',
            isComposerActive: false
        };

        this.registerChoice = this.registerChoice.bind(this);
        this.selectVote = this.selectVote.bind(this);
        this.activateVoteComposer = this.activateVoteComposer.bind(this);
        this.deactivateVoteComposer = this.deactivateVoteComposer.bind(this);
    }

    render() {
        const {allVotes, currentVoteId} = this.state;
        return (
            <div>
                <VotingList onSelectVote={this.selectVote}
                            currentVoteId={currentVoteId}
                            onRegisterVote={this.registerChoice}
                            allVotes={allVotes}/>
                <br/>
                <Link to='/composeVote'>
                    <div className="Row VotesRow Spacer">
                        <h1 className="Title"><span className="Emphasis">What do <b>you</b> want to know ?</span>

                            <div className="Badge">Add Voting</div>
                        </h1>
                        <p>Click here to leave your own question.</p>
                    </div>
                </Link>
            </div>
        )
    }

    activateVoteComposer() {
        this.setState({
            currentVoteId: null,
            isComposerActive: true
        });
    }

    deactivateVoteComposer() {
        this.setState({
            isComposerActive: false
        });
    }

    selectVote(vote) {
        const {isComposerActive} = this.state;

        this.setState({
            currentVoteId: vote && !isComposerActive ? vote.id : null
        });
    }

    async registerChoice(choiceClicked, vote) {
        let updatedVote = await sendJson('put', `/api/votes/${vote.id}/choices/${choiceClicked.id}/vote`, {});
        const newAllVotes =
            this.state.allVotes.map(
                vote => vote.id === updatedVote.id ? updatedVote : vote
            );

        this.setState({
            allVotes: newAllVotes
        });
    }

    async componentDidMount() {
        let allVotesDownloaded = await fetchJson('/api/votes');
        this.setState({
            allVotes: allVotesDownloaded
        });
    }
}

export default VotingController;