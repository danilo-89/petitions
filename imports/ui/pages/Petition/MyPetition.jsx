import React, {useEffect} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useLocation } from "react-router-dom";
import './MyPetition.css';
import PetitionChart from './PetitionChart';
import Petitions from '../../../../lib/petitions';

const MyPetition = () => {

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    
    let query = useQuery();
    const postId = query.get("p");

    const { petition, isLoading } = useTracker(() => {

        const noDataAvailable = { petition: {} };
        const handler = Meteor.subscribe('petitionSingle', postId);

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const petition = Petitions.findOne();

        console.log(petition);

        return { petition, isLoading: false};

    }, [postId])

    return (
        <>
            <div className="container">
                <p>Statistics</p>
                <PetitionChart />
            </div>
        
        </>
    );
}

export default MyPetition;