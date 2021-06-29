import React from 'react';
import './PetitionCard.css'
import helpers from '/imports/ui/components/GlobalHelpers'

const PetitionCard = ({ props }) => {
    return (
        <article className="article">
            {/* <div className="article__top">
                <h5>For: {props.towards}</h5>
            </div> */}
            <div className="article__middle">
                <h4 className="article__middle__title">{props.title}</h4>
                <div className="article__middle__cover p-1">
                    <div className="article__middle__cover__pic" style={
                        {
                            backgroundImage: `url(${props.imageCover})`
                        }
                    } />
                </div>
            </div>
            <div className="article__bar">
                <div className="article__bar__inside">

                </div>
            </div>
            <div className="article__bottom">
               
                <div className="article__bottom__sig">
                    <span className="article__bottom__sig__top">122.324</span>
                    <span className="article__bottom__sig__bottom">of 200.000 <br /> required signatures</span>
                </div>
                {/* {helpers.formatDateObj(props.createdAt)} */}
            </div>
        </article>
    );
}

export default PetitionCard;