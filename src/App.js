import React, { Component } from 'react';
import './style.css';
import Layout from "./Components/Layout";
import VotingController from "./Components/VotingController";

class App extends Component {
    render() {
        return (
            <Layout>
                <VotingController />
            </Layout>
        );
    }
}

export default App;