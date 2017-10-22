import React, {Component} from 'react';
import VotingList from "./VotingList";
import VoteComposer from "./VoteComposer";
import {fetchJson} from "../HTTPAdapter/Backend";

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
        const { allVotes } = this.state;
        this.setState({
            allVotes: [...allVotes, vote]
        });
    }

    selectVote(vote) {
        const { isComposerActive } = this.state;

        this.setState({
            currentVoteId: vote && !isComposerActive ? vote.id : null
        });
    }

    registerChoice(choiceClicked, vote) {
        let allVotes = this.state.allVotes.map((voteOfMap) => {
            if (voteOfMap.id === vote.id) {
                let choices = voteOfMap.choices;
                choices.map((choice) => {
                    if (choice.id === choiceClicked.id) {
                        choice.count++;
                    }
                    return choice;
                });
            }
            return voteOfMap;
        });

        this.setState({
            allVotes: allVotes
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