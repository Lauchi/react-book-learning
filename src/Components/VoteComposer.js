import React from 'react';
import PropTypes from 'prop-types'

function emptyChoice() {
    return {
        id: `choice_${Date.now()}`,
        title: '',
        count: 0
    }
}

function emptyVote() {

    return {
        id: '',
        title: '',
        description: '',
        choices: []
    }
}

export default class VoteComposer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            vote: emptyVote(),
            choice: emptyChoice()
        };

        this.activateIfNeeded = this.activateIfNeeded.bind(this);
        this.save = this.save.bind(this);
        this.close = this.close.bind(this);
        this.onElementChange = this.onElementChange.bind(this);
        this.onChoiceChange = this.onChoiceChange.bind(this);
        this.onChoiceSave = this.onChoiceSave.bind(this);
    }

    close() {
        const {onDeactivate} = this.props;
        this.setState({
            vote: emptyVote()
        });
        onDeactivate();
    }

    save() {
        const {onSave} = this.props;
        onSave(this.state.vote);
        this.close();
    }

    activateIfNeeded() {
        const {onActivate, active} = this.props;
        if (!active) {
            onActivate();
        }
    }

    renderInactiveForm() {
        return (
            <div className="Row VotesRow Spacer" onClick={this.activateIfNeeded}>
                <h1 className="Title"><span className="Emphasis">What do <b>you</b> want to know ?</span>

                    <div className="Badge">Add Voting</div>
                </h1>
                <p>Click here to leave your own question.</p>
            </div>
        );
    }

    renderActiveForm() {
        return (
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
                            <div className="ChoiceBar">
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
                        <a className="Button" onClick={this.save}>Save</a>
                        <a className="Button" onClick={this.close}>Cancel</a>
                    </div>
                </div>
            </div>
        );

    }


    render() {
        const {active} = this.props;

        if (!active) {
            return this.renderInactiveForm();
        }

        return this.renderActiveForm();
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

VoteComposer.propTypes = {
    active: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onActivate: PropTypes.func.isRequired,
    onDeactivate: PropTypes.func.isRequired
};

