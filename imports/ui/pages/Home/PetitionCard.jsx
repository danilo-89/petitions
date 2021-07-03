import React from 'react';
import './PetitionCard.css'
import helpers from '/imports/ui/components/GlobalHelpers'

const PetitionCard = ({ props }) => {


    calcPercent = (total, nedeed) => {
        const percentNum = (total/nedeed) * 100;
        return percentNum || 0;
    }

    return (
        <article className="article">
            {/* <div className="article__top">
                <h5>For: {props.towards}</h5>
            </div> */}
            <div className="article__middle">
                <div className="article__middle__title">
                    <h4 className="">{props.title}</h4>
                    <p className=""> <br /> {props.overview}</p>
                </div>
                <div className="article__middle__cover p-1">
                    <div className="article__middle__cover__pic" style={
                        {
                            backgroundImage: `url(${props.imageCover})`
                        }
                    } />
                </div>
            </div>
            <div className="article__bar">
                <div 
                className="article__bar__inside"
                style= {
                    {
                        background: `linear-gradient(to right, #16db93, #16db93 ${calcPercent(props.totalSignatures, props.milestone) }%, rgb(233, 233, 233) ${calcPercent(props.totalSignatures, props.milestone) }%)`
                    }
                }
                >

                </div>
            </div>
            <div className="article__bottom">
               
                <div className="article__bottom__sig">
                    <span className="article__bottom__sig__top">
                        {props.totalSignatures || 0}
                    </span>
                    <span className="article__bottom__sig__bottom">
                        {

props.milestone ?  <> of {props.milestone} <br /> required signatures</> : <>total <br /> signatures</>
                        }
                        
                    </span>
                </div>
                {/* {helpers.formatDateObj(props.createdAt)} */}
            </div>
        </article>
    );
}

export default PetitionCard;