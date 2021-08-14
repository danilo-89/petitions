import React, {useState} from 'react';
import './HomePagination.css'

const HomePagination = ({skipValue, onClick}) => {

    const pagination = [0, 1, 2, 3]

    return (
        <div className="pagination-wrapper">
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