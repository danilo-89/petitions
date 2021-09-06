import React from 'react';
import './PetitionCard.css'
import helpers from '/imports/ui/components/GlobalHelpers'
import { PeopleFill } from 'react-bootstrap-icons';

const PetitionCard = ({ props }) => {


    calcPercent = (total=0, nedeed) => {
        const percentNum = (total/nedeed) * 100;
        if (percentNum < 0) {
            return 0
        } else if (percentNum > 100) {
            return 100
        } else {
            return percentNum
        }
    }

    return (
        <article className="article">
            {/* <div className="article__top">
                <h5>For: {props.towards}</h5>
            </div> */}
            <div className="article__middle">
                
                <div className="article__middle__cover p-1">
                    <div className={`article__middle__cover__pic ${!props.imageCover && 'no-cover'}`}>
                        {props.imageCover && <img src={helpers.getImgUrlById(props.imageCover)} alt="petition cover picture" />}
                    </div>
                    
                </div>
                <div className="article__middle__title">
                    <h4 className="">{props.title}</h4>
                    <p className=""> <br /> {props.overview}</p>
                </div>
            </div>
            <div className="article__bar">
                <div 
                className="article__bar__inside"
                style= {
                    {
                        background: `linear-gradient(to right, #ffeb3b, #16db93 ${calcPercent(props.totalSignatures, props.milestone) }%, rgb(233, 233, 233) ${calcPercent(props.totalSignatures, props.milestone) }%)`
                    }
                }
                >

                </div>
            </div>
            <div className="article__bottom">
               
                <div className="article__bottom__sig">
                    <div className="article__bottom__sig__top">
                        <span className="f-21-px f-bold text-green d-flex align-items-center">
                            <PeopleFill 
                            className="mr-1 f-19-px"
                            />
                            <span className="text-shadow-1">{props.totalSignatures || 0}
                            </span>
                        </span>
                        <span className="text-gray">Supporters</span>
                    </div>
                    <div className="article__bottom__sig__bottom">
                        {

props.milestone ?  
<> 
    <span className="f-21-px f-bold text-gray d-flex align-items-center d-flex w-100 justify-content-end">
        <PeopleFill 
            className="mr-1 f-19-px"
        />
        <span>{props.milestone}</span>
    </span> 
    <span className="text-gray">Required</span>
</> : 
<>
    <span className="f-21-px f-bold text-gray d-flex align-items-center d-flex w-100 justify-content-end">
        <PeopleFill 
            className="mr-1 f-19-px"
        />
        <span>/</span>
    </span>
    <span className="text-gray">Required</span>
</>
                        }
                        
                    </div>
                </div>
                {/* {helpers.formatDateObj(props.createdAt)} */}
            </div>
        </article>
    );
}

export default PetitionCard;