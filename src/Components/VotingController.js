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

    saveNewVote(vote) {
        sendJson('post', '/api/votes', vote)
            .then(newVote => {
            this.setState({
                allVotes: [...this.state.allVotes, newVote]
            })
        });
    }

    selectVote(vote) {
        const { isComposerActive } = this.state;

        this.setState({
            currentVoteId: vote && !isComposerActive ? vote.id : null
        });
    }

    registerChoice(choiceClicked, vote) {
        sendJson('put', `/api/votes/${vote.id}/choices/${choiceClicked.id}/vote`, {})
            .then(updatedVote => {
                const newAllVotes =
                    this.state.allVotes.map(
                        vote => vote.id === updatedVote.id ? updatedVote : vote
                    );

                this.setState({
                    allVotes: newAllVotes
                });
            });
    }

    componentDidMount(){
        fetchJson('/api/votes').then(
            allVotes => {
                this.setState({
                    allVotes
                });
            }
        );
    }
}

export default VotingController;