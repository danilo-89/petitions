import React, { useState, useEffect } from 'react';
import Petitions from "../../../../lib/petitions";
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import PetitionSingle from './PetitionSingle';
import PetitionForm from './PetitionForm';
import CustomLoader from "../../components/CustomLoader";

const PetitionPage = () => {




    let { id: addressId } = useParams();
    console.log(useParams())

    const [fields, setFields] = useState([])


    
    const { petition, isLoading } = useTracker(() => {

        const noDataAvailable = { petition: {} };
        const handler = Meteor.subscribe('petitionSingle', addressId)

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const petition = Petitions.findOne();
        
        // WHEN SUBSCRIBE IS READY (isLoading is absent so it is false)
        return { petition };

    })

    setFields([...petition.fields])

    
    const onChangeField = (targetValue, index) => {
        const newFields = [...fields];
        const fieldIndex = [index - 1];
        newFields[fieldIndex] = { ...newFields[fieldIndex], value: targetValue }
        setFields(newFields)
    }

    // if(!isLoading) {
    //     console.log(petition)
    //     setFields([...petition.fields])
    
    //     const onChangeField = (targetValue, index) => {
    //         const newFields = [...fields];
    //         const fieldIndex = [index - 1];
    //         newFields[fieldIndex] = { ...newFields[fieldIndex], value: targetValue }
    //         setFields(newFields)
    //     }
    // }


    return (
        <div>
            {isLoading ? <CustomLoader /> : ''}
            <PetitionSingle props={petition} />
            {petition.title}
            <br />
            {addressId}
            <br />

            <div className="container">
                <PetitionForm
                    fields={fields}
                    onChange={onChangeField}
                />
            </div>
        </div>
    );
}

export default PetitionPage;