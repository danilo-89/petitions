import React from 'react';
import Signatures from '../../../../lib/signatures';
import { useTracker } from 'meteor/react-meteor-data';

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
            {isSignaturesLoading ? 
                "loading" : 
                <div>
                    {signatures.map((signature) => 
                        (<div>
                            <div>{signature['First Name']}</div>
                            <div>{signature['Comment']}</div>
                        </div>)
                    )
                    }
                    
                </div>
            }
        </div>
     );
}
 
export default PetitionSignaturesLast;