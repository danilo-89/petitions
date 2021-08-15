import React, {useState} from 'react';
import Petitions from "../../../../lib/petitions";
import Counts from "../../../../lib/counts";
import { useTracker } from 'meteor/react-meteor-data';
import './HomePagination.css'


const HomePagination = ({skipValue, onClick, searchTerm}) => {

    const pagination = [0, 1, 2, 3]


    const { petitionsCount , isLoading } = useTracker(() => {
        

        console.log('petitions sub')
        const handler = Meteor.subscribe('petitionsCount', searchTerm);

        // WHEN SUBSCRIBE IS NOT READY
        if (!handler.ready()) {
            return { petitionsCount:0, isLoading: true };
        }

        const petitionsCount = Counts.findOne().count;

        // WHEN SUBSCRIBE IS READY (isLoading is absent so it is false)
        return { petitionsCount };
    });


    return (
        <div className="pagination-wrapper">

            <div>
                { isLoading ? "loading" : petitionsCount }
            </div>
            <div>|</div>

            <div>{skipValue}</div>
            {
                pagination.map(item => 
                <span 
                    key={item}
                    onClick={()=>{onClick(item)}}
                    >{item}
                </span>
                )
            }
        </div>
    );
}

export default HomePagination;