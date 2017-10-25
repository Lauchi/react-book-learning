import React from 'react';
import Layout from "./Layout";

export default function LoginController() {
    return <Layout>
        <div className="Row VotesRow">
            <div className="Head">
                <h1 className="Title">You need to login to perform that action</h1>
            </div>

            <div className="LoginForm">
                <input type="text"
                       placeholder="Enter your email address here"/>
                <div className="ButtonBar">
                    <a className="Button">Login</a>
                    <a className="Button">Cancel</a>
                </div>
            </div>
        </div>
    </Layout>;
}
