import React, {Component} from 'react';
import VotingList from "./VotingList";
import {fetchJson} from "../HTTPAdapter/Backend";
import Link from "react-router-dom/es/Link";

class VotingController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allVotes: [],
            currentVoteId: '',
            isComposerActive: false
        };
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

    async componentDidMount() {
        let allVotesDownloaded = await fetchJson('/api/votes');
        this.setState({
            allVotes: allVotesDownloaded
        });
    }
}

export default VotingController;