import React from 'react';
import {sendJson} from "../HTTPAdapter/Backend";
import Link from "react-router-dom/es/Link";
import Layout from "./Layout";

function emptyChoice() {
    return {
        id: `choice_${Date.now()}`,
        title: '',
        count: 0
    }
}

function emptyVote() {

    return {
        title: '',
        description: '',
        choices: []
    }
}

export default class VoteComposer extends React.Component {

    constructor() {
        super();

        this.state = {
            vote: emptyVote(),
            choice: emptyChoice()
        };

        this.save = this.save.bind(this);
        this.onElementChange = this.onElementChange.bind(this);
        this.onChoiceChange = this.onChoiceChange.bind(this);
        this.onChoiceSave = this.onChoiceSave.bind(this);
    }

    async save() {
        await sendJson('post', '/api/votes', this.state.vote);
    }

    render() {
        return (
            <Layout>
                <div>
                    <div className="Row VoteComposer Spacer">
                        <div className="Head">
                            <h1 className="Title">
                                <input className="Title"
                                       autoFocus
                                       name="title"
                                       type="text"
                                       placeholder="What do you want to know ?"
                                       onChange={this.onElementChange}
                                />
                            </h1>
                            <input className="Description"
                                   name="description"
                                   type="text"
                                   placeholder="Describe your question in one sentence here"
                                   onChange={this.onElementChange}/>
                        </div>

                        <div>
                            {this.state.vote.choices.map(choice => {
                                return (
                                    <div className="ChoiceBar" key={choice.id}>
                                        <div className="ChoiceBarTitle">{choice.title}</div>
                                    </div>)
                            })}
                        </div>

                        <div className="Body">
                            <input className="Choice"
                                   type="text"
                                   name="Choice_1"
                                   placeholder="Type your choice here and press enter"
                                   value={this.state.choice.title}
                                   onChange={this.onChoiceChange}
                                   onKeyPress={this.onChoiceSave}
                            />
                            <div className="ButtonBar">
                                <Link to='/home' className="Button" onClick={this.save}>Save</Link>
                                <Link to='/home' className="Button">Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    onElementChange(event) {
        const {vote} = this.state;

        const {name: fieldName, value: fieldValue} = event.target;
        const newVote = {
            ...vote,
            [fieldName]: fieldValue
        };

        this.setState({
            vote: newVote
        });
    }

    onChoiceChange(event) {
        const {choice} = this.state;
        this.setState({
            choice: {
                ...choice,
                title: event.target.value
            }
        });
    }

    onChoiceSave(event) {
        if (event.key === 'Enter') {
            const {vote, choice} = this.state;
            const choicesNew = [...vote.choices, choice];

            this.setState({
                vote: {
                    ...vote,
                    choices: choicesNew
                },
                choice: emptyChoice()
            });
        }
    }
}