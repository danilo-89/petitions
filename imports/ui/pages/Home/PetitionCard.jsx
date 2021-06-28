import React from 'react';
import './PetitionCard.css'
import helpers from '/imports/ui/components/GlobalHelpers'

const PetitionCard = ({ props }) => {
    return (
        <article className="article">
            <div className="article__top">
                <h5>For: {props.towards}</h5>
            </div>
            <div className="article__middle">
                <h4 className="article__middle__title">{props.title}</h4>
                <div className="article__middle__cover">
                    <div className="article__middle__cover__pic" style={
                        {
                            backgroundImage: `url(${props.imageCover})`
                        }
                    } />
                </div>
            </div>
            <div className="article__bottom">
                {helpers.formatDateObj(props.createdAt)}
            </div>
        </article>
    );
}

export default PetitionCard;