import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Route from "react-router-dom/es/Route";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import VoteComposer from "./Components/VoteComposer";
import SingleVotingController from "./Components/SingleVotingController";
import Redirect from "react-router-dom/es/Redirect";
import NoMatch from "./Components/NoMatch";
import LoginController from "./Components/LoginController";

function loggedIn() {
    return false;
}

const router = <BrowserRouter>
    <div>
        <Route exact path="/" render={() => (
                <Redirect to="/home"/>
        )}/>

        <Route path='/home' component={App} />

        <Route exact path="/composeVote" render={() => (
            loggedIn ? (
                <Redirect to="/loginPage"/>
            ) : (
                <VoteComposer/>
            )
        )}/>

        <Route path='/votes/:id' component={SingleVotingController} />
        <Route path='/loginPage' component={LoginController} />
        <Route path='*' component={NoMatch} />
    </div>
</BrowserRouter>;

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
