import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Route from "react-router-dom/es/Route";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import VoteComposer from "./Components/VoteComposer";


const router = <BrowserRouter>
    <div>
        <Route path='/home' component={App} />
        <Route path='/composeVote' component={VoteComposer} />
    </div>
</BrowserRouter>;

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
