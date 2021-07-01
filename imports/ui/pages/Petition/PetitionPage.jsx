import React, { useState, useEffect, useMemo } from 'react';
import Petitions from "../../../../lib/petitions";
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import PetitionSingle from './PetitionSingle';
import PetitionForm from './PetitionForm';
import CustomLoader from "../../components/CustomLoader";

const PetitionPage = () => {

    // const user = useTracker(() => Meteor.user());

    const { id: addressId } = useParams();
    // console.log(useParams())

    const [fields, setFields] = useState([{field:"1"}])

    const { petition, isLoading, getFields } = useTracker(() => {

        const noDataAvailable = { petition: {} };
        const handler = Meteor.subscribe('petitionSingle', addressId, () => {
            // setFields(Petitions.findOne().fields)
        })

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true, getFields: [] };
        }

        const petition = Petitions.findOne();

        const getFields = petition.fields;
        // console.log('petition.fields')
        // console.log(petition.fields)
        // setFields(petition.fields)
        // console.log(fields)
      
        // WHEN SUBSCRIBE IS READY (isLoading is absent so it is false)
        


        return { petition, isLoading: false, getFields};

    })

    // const getData = useTracker(() => Petitions.findOne().fields)
    

    // const setData = useTracker(() => {
    //     setFields(petition.fields)
    // }, [fields])


    // useEffect(() => {
    //     console.log(fields)
    // }, [petition])

    // const fixit = useMemo(() => {
    //     return { petition }
    //   }, [petition])

    // const setData = useTracker(() => {
    //     setFields(petition.fields)
    //     console.log(fields)
    // }, [fixit])

    // useEffect(() => {
    //     setFields(petition.fields)
    //     console.log(fields)
    // }, [fixit])

    // const setData = useTracker(() => {
    //     setFields(petition.fields)
    //     console.log(fields)
    // }, [petition])

    // useEffect(() => {
    //     setFields(petition.fields)
    //     console.log(fields)
    // }, [petition])

    //  useEffect(() => {
    //     setFields(petition.fields)
    //     console.log(fields)
    // }, [isLoading])
    
    // const tasks = useTracker(() => {
    //     setTimeout(
    //         () => {
    //             setFields[petition.fields];
    //             console.log(fields)
    //         },
    //         1000
    //       )
        
        
    // }, [petition]);

    // setFields([...petition.fields])

    
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
            test
            {isLoading ? <CustomLoader /> : ''}


            {/* {!isLoading ? <h1>hajde {petition.fields[0].field}</h1> : ''} */}
            
            

            <PetitionSingle props={petition} />
            {petition.title}
            <br />
            {addressId}
            <br />


            {/* <div className="container">
                <PetitionForm
                    fields={fields}
                    onChange={onChangeField}
                />
            </div> */}
        </div>
    );
}

export default PetitionPage;