import React, {useState} from 'react';
import Petitions from "../../../../lib/petitions";
import Counts from "../../../../lib/counts";
import { useTracker } from 'meteor/react-meteor-data';
import './HomePagination.css'


const HomePagination = ({skipValue, onClick, searchTerm}) => {

    const { petitionsCount , isLoading } = useTracker(() => {
        
        const handler = Meteor.subscribe('petitionsCount', searchTerm);

        // WHEN SUBSCRIBE IS NOT READY
        if (!handler.ready()) {
            return { petitionsCount:0, isLoading: true };
        }

        const petitionsCount = Counts.findOne().count;

        // WHEN SUBSCRIBE IS READY (isLoading is absent so it is false)
        return { petitionsCount };
    }, [searchTerm]);


    return (
        <div className="pagination-wrapper">

            {/* <div>
                { isLoading ? "loading" : petitionsCount }
            </div>
            <div>|</div>
            <div>{skipValue}</div> */}

            {
            isLoading ? 'loading' : <>
            {

                (petitionsCount > 6) &&
                Array.from({length:Math.ceil(petitionsCount/6)}, (x,i) => i).map(item => 
                <span 
                    className={(item*6 == skipValue) ? 'active' : ''}
                    key={item}
                    onClick={()=>{onClick(item*6)}}
                    >{item}
                </span>
                )
            }
            </>
            }
            
        </div>
    );
}

export default HomePagination;