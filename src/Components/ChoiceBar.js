import React from 'react';
import PropTypes from 'prop-types';

function ChoiceBar({ progress, title, badge, onClickHandler }) {

    return (
        <div className="ChoiceBar" onClick={onClickHandler}>
            <div className="Progress" style={{width: progress + '%'}}>
                <div className="ChoiceBarTitle">{title}</div>
            </div>
            <div className="ChoiceBarBadge">{badge}</div>
        </div>
    );
}

ChoiceBar.propTypes = {
    progress: PropTypes.number.isRequired,
    badge: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
};

ChoiceBar.defaultProps = {
    progress: 0,
    badge: 0,
    title: 'Title not found'
};

export default ChoiceBar;
