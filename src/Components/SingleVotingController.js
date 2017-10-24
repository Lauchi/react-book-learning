import React, {Component} from 'react';
import {fetchJson, sendJson} from "../HTTPAdapter/Backend";
import Link from "react-router-dom/es/Link";
import VotingComponent from "./VotingComponent";
import {emptyVote} from "./VoteComposer";

export default class SingleVotingController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vote: emptyVote(),
        };

        this.registerChoice = this.registerChoice.bind(this);
    }

    render() {
        const {vote} = this.state;
        return (
            <VotingComponent key={vote.id}
                             vote={vote}
                             onCloseVote={() => {}}
                             onRegisterChoice={(choice) => {this.registerChoice(choice, vote)}}
            />
        )
    }

    async registerChoice(choiceClicked, vote) {
        let updatedVote = await sendJson('put', `/api/votes/${vote.id}/choices/${choiceClicked.id}/vote`, {});
        this.setState({
            vote: updatedVote
        });
    }

    async componentWillReceiveProps() {
        await this.loadVote();
    }

    async componentWillMount() {
        await this.loadVote();
    }

    async loadVote() {
        let allVotesDownloaded = await fetchJson(`/api/votes/${this.props.match.params.id}`);
        this.setState({
            vote: allVotesDownloaded
        });
    }
}