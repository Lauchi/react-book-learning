import React, {Component} from 'react';
import VotingList from "./VotingList";
import VoteComposer from "./VoteComposer";
import {fetchJson, sendJson} from "../HTTPAdapter/Backend";

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
        this.saveNewVote = this.saveNewVote.bind(this);
        this.activateVoteComposer = this.activateVoteComposer.bind(this);
        this.deactivateVoteComposer = this.deactivateVoteComposer.bind(this);
    }

    render() {
        const { allVotes, currentVoteId, isComposerActive } = this.state;
        return (
            <div>
                <VotingList onSelectVote={this.selectVote}
                            currentVoteId={currentVoteId}
                            onRegisterVote={this.registerChoice}
                            allVotes={allVotes}/>
                <br/>
                <VoteComposer active={isComposerActive}
                              onSave={this.saveNewVote}
                              onActivate={this.activateVoteComposer}
                              onDeactivate={this.deactivateVoteComposer}/>
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

    async saveNewVote(vote) {
        let newVote =  await sendJson('post', '/api/votes', vote);
        this.setState({
            allVotes: [...this.state.allVotes, newVote]
        });
    }

    selectVote(vote) {
        const { isComposerActive } = this.state;

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

    async componentDidMount(){
        let allVotesDownloaded = await fetchJson('/api/votes');
        this.setState({
            allVotes: allVotesDownloaded
        });
    }
}

export default VotingController;