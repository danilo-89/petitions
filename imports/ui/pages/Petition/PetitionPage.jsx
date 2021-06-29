import React from 'react';
import Petitions from "../../../../lib/petitions";
import { useTracker } from 'meteor/react-meteor-data';

import {useParams} from "react-router-dom";
import CustomLoader from "../../components/CustomLoader";

const PetitionPage = () => {


    let { id } = useParams();

    const { petition, isLoading } = useTracker(() => {

        const noDataAvailable = { petition: {} };
        const handler = Meteor.subscribe('petitionSingle', 'N48cTF9rEoHnFti9F')
        
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const petition = Petitions.findOne();

        // WHEN SUBSCRIBE IS READY (isLoading is absent so it is false)
        return { petition };


    })

    return ( 
        <div>
            {isLoading ? <CustomLoader /> : ''}
            <br />
            <br />
            {petition.title}
            <br />
            {id}
        </div>
     );
}
 
export default PetitionPage;