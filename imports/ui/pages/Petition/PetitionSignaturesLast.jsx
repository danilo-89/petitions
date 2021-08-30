import React from 'react';
import Signatures from '../../../../lib/signatures';
import { useTracker } from 'meteor/react-meteor-data';
import './PetitionSignaturesLast.css'
import helpers from '../../components/GlobalHelpers';

const PetitionSignaturesLast = (props) => {

    const { signatures, isSignaturesLoading } = useTracker(() => {

        console.log("inside signsatures")
        const noDataAvailable = { signatures: [] };
        const handler = Meteor.subscribe('chartSignaturesLast', props.addressId)
    
        if (!handler.ready()) {
            return { ...noDataAvailable, isSignaturesLoading: true };
        }
    
        const signatures = Signatures.find({}, {sort: {createdAt: -1}}).fetch();
    
        console.log(signatures);
        return { signatures, isSignaturesLoading: false};
    }, [props.addressId])
    
    return ( 
        <div className="container">
            <p>Newest signatures</p>
            {isSignaturesLoading ? 
                "loading" : 
                <div>
                    {signatures.map((signature) => 
                        (<div className="small-signature-card">
                            <div className="small-signature-card__date">{helpers.formatDateWithTime(signature['createdAt'])}</div>
                            <div className="small-signature-card__name">{signature['First Name'] ? signature['First Name'] : 'No name displayed'}</div>
                            {signature['Comment'] && <div className="small-signature-card__comment">
                                {signature['Comment']}
                            </div>}
                        </div>)
                    )
                    }
                    
                </div>
            }
        </div>
     );
}
 
export default PetitionSignaturesLast;