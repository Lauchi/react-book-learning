import React from 'react';
import PropTypes from 'prop-types';
import VotingController from "./VotingController";

export default function Layout({ children }) {
    return (
        <div className="Background">
            <div className="Header">
                <div className="Title">
                    Vote as a Service
                </div>
            </div>

            <div className="Main">
                <div className="Container">
                    {children}
                </div>
            </div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.shape({
        type: PropTypes.oneOf([VotingController])
    }),
};