import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
    selectMovie
} from '../redux/selectors';

import Header from '../../../../components/text/header';
import Title from '../../../../components/text/title';
import Subtitle from '../../../../components/text/subtitle';
import Label from '../../../../components/text/label';
import Paragraph from '../../../../components/text/paragraph';

import search from '../../../../public/assets/search.png';


require('../../../../style/main.scss');
class DetailsContainer extends Component {
    render() {
        const {
            movie,
            goToSearch
        } = this.props;

        const {
            title,
            overview,
            original_title,
            full_release_date,
            original_language,
            video,
            adult,
            full_poster_path,
            full_backdrop_path,
            popularity,
            vote_count,
            vote_average,
        } = movie;

        return (<div>
            <section className="section details-container">
                <a href="#" onClick={goToSearch}><img src={search} width="28px" style={{ display: 'inline-block', verticalAlign: 'middle'}}/>&nbsp;<Subtitle>Go back to search</Subtitle></a>
            </section>
            <section className="section details-container">
                <Header>{title}</Header>
                <section className="section">
                    <Label>Original title:&nbsp;</Label>
                    <Subtitle>{original_title}</Subtitle>
                    <br />
                    <Label>Release date:&nbsp;</Label>
                    <Subtitle>{full_release_date}</Subtitle>
                    <br />
                    <Label>Original Language:&nbsp;</Label>
                    <Subtitle>{original_language}</Subtitle>
                </section>
            </section>

            {overview && <section className="section details-container">
                <Header>Overview</Header>
                <Paragraph>{overview}</Paragraph>
            </section>}

            <section className="section details-container">
                <Header>Reviews</Header>
                <section className="section">
                    <Label>Popularity:&nbsp;</Label>
                    <Subtitle>{popularity.toFixed(2)}</Subtitle>
                    <br />
                    <Label>Vote Average/Count:&nbsp;</Label>
                    <Subtitle>{vote_average}/{vote_count}</Subtitle>
                </section>
            </section>

            <section className="section details-container">
                <Header>Posters</Header>
                <section className="section">
                    <img width="100%" src={full_poster_path} />
                    <hr />
                    <img width="100%" src={full_backdrop_path} />
                </section>
            </section>
            
        </div>);
    }
}

const mapStateToProps = (state) => {
    return({
        movie: selectMovie(state),
    })
};

const mapDispatchToProps = (dispatch) => ({
    goToSearch: () => dispatch(push('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);