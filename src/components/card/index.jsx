import React from 'react';

require('./style.scss');

export const SIZE_LARGE = 'large';
export const SIZE_SMALL = 'small';

export const getSizeclassName = (size) => `__${size || 'small'}`;
export const getScoreColorclassName = (score) => {
    if(score < 3) {
        return '__very-low-grade';
    } else if(score < 5) {
        return '__low-grade';
    } else if(score < 8) {
        return '__mid-grade';
    }

    return '__high-grade';
}


const Card = ({
    size,
    title,
    score,
    subtitle,
    description,
    smallPoster,
    largePoster,
    onClick,
}) => <div className={`card ${getSizeclassName(size)}`} onClick={onClick}>
    <section className="content-section">
        <section className="top-bar">
            <div className="title">{title}</div>
            <div className={`score ${getScoreColorclassName(score)}`}>{score}</div>
            <div className="subtitle">{subtitle}</div>
        </section>
        {size === SIZE_LARGE && description && <section className="description">
            <p>{description}</p>
        </section>}
    </section>
    <section className="poster-section">
        {size === SIZE_LARGE ? <img className="poster" src={largePoster} /> : <img className="poster" src={smallPoster} />}
    </section>
</div>;

export default Card;