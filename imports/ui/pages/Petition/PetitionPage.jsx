import React, { useState, useEffect, useMemo } from 'react';
import Petitions from "../../../../lib/petitions";
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import PetitionSingle from './PetitionSingle';
import PetitionForm from './PetitionForm';
import CustomLoader from "../../components/CustomLoader";
import Button from 'react-bootstrap/Button'

const PetitionPage = () => {

    // const user = useTracker(() => Meteor.user());

    const { id: addressId } = useParams();
    // console.log(useParams())



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

        return { petition, isLoading: false, getFields };

    })


    const [fields, setFields] = useState([])


    // const memo = useMemo(() => {
    //     return { isLoading }
    // }, [isLoading])

    useEffect(() => {
        setFields(() => petition.fields)
        // console.log(fields)
    }, [isLoading])



    //   useEffect(() => {
    //     setFields(petition.fields)

    // }, [isLoading])

    // const getData = useTracker(() => Petitions.findOne().fields)

    // const setData = useTracker(() => {
    //     setFields(petition.fields)
    // }, [memo])




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

    const handleSubmit = (event) => {
        event.preventDefault();
        const obj = {};
        fields.map((field) => {
            obj[field.field] = field.value
        });

        obj["petitionId"] = addressId;
        obj["userId"] = Meteor.userId() || null;

        console.log(obj);

        Meteor.call('sign.petition', obj, (err, res) => {
            if (err) {
                Bert.alert(err.reason, 'danger');
            } else {
                if (res.isError) {
                    // Bert.alert(res.err.reason, 'danger');
                    console.log(res.err.reason)
                } else {
                    // Bert.alert('Success', 'success');
                    // resetForm();
                    // FlowRouter.go('/myRecipes');
                    console.log('success')
                }
            }
        });
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
         
            {/* {console.log('fields')}
            {console.log(fields)} */}



            {isLoading ? <CustomLoader /> :


                <>
                    {/* <h1>hajde {petition.fields[0].value}</h1> */}




                    {/* {console.log('petition.props')}
            {console.log(petition)} */}

                    <PetitionSingle
                        title={petition.title}
                        towards={petition.towards}
                        overview={petition.overview}
                        details={petition.details}
                        video={petition.video}
                        imageCover={petition.imageCover}
                    />
                    {petition.title}
                    <br />
                    {addressId}
                    <br />

                    {fields ?

                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <PetitionForm
                                    fields={fields}
                                    onChange={onChangeField}
                                />

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </form>

                        </div>

                        :

                        <div></div>


                    }




                </>
            }




        </div>
    );
}

export default PetitionPage;