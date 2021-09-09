import React from 'react';
import Signatures from '../../../../lib/signatures';
import { useTracker } from 'meteor/react-meteor-data';
import './PetitionSignaturesLast.css'
import helpers from '../../components/GlobalHelpers';

const PetitionSignaturesLast = (props) => {

    const { signatures, isSignaturesLoading } = useTracker(() => {

        const noDataAvailable = { signatures: [] };
        const handler = Meteor.subscribe('chartSignaturesLast', props.addressId)
    
        if (!handler.ready()) {
            return { ...noDataAvailable, isSignaturesLoading: true };
        }
    
        const signatures = Signatures.find({}, {sort: {createdAt: -1}}).fetch();
    
        return { signatures, isSignaturesLoading: false};
    }, [props.addressId])
    
    return ( 
        <>
        { isSignaturesLoading ?  "loading" : 
        <div className="container">

            { (signatures.length>0) &&
            <>
            <p className="signatures-section-title">Newest signatures</p>
            
                <div>
                    {signatures.map((signature) => 
                        (<div key={signature._id} className="small-signature-card">
                            <div className="small-signature-card__date">{helpers.formatDateWithTime(signature['createdAt'])}</div>
                            <div className="small-signature-card__name">{signature['First Name'] ? signature['First Name'] : 'No name displayed'}</div>
                            {signature['Comment'] && <div className="small-signature-card__comment">
                                {signature['Comment']}
                            </div>}
                        </div>)
                    )
                    }
                    
                </div>
            </>
            }

        </div>
    }
    </>
    );
}

export default PetitionSignaturesLast;