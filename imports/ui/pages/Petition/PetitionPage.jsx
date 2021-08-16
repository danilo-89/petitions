import React, { useState, useEffect, useRef } from 'react';
import Petitions from "../../../../lib/petitions";
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import PetitionSingle from './PetitionSingle';
import PetitionForm from './PetitionForm';
import CustomLoader from "../../components/CustomLoader";
import Button from 'react-bootstrap/Button'
import './PetitionPage.css'

const PetitionPage = () => {

    // const user = useTracker(() => Meteor.user());

    const { id: addressId } = useParams();
    // console.log(useParams())



    const { petition, isLoading } = useTracker(() => {

        const noDataAvailable = { petition: {} };
        const handler = Meteor.subscribe('petitionSingle', addressId, () => {
            // setFields(Petitions.findOne().fields)
        })

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const petition = Petitions.findOne();

        // console.log('petition.fields')
        // console.log(petition.fields)
        // setFields(petition.fields)
        // console.log(fields)

        // WHEN SUBSCRIBE IS READY (isLoading is absent so it is false)

        return { petition, isLoading: false};

    })


    const [fields, setFields] = useState([])


    // const memo = useMemo(() => {
    //     return { isLoading }
    // }, [isLoading])

    useEffect(() => {
        setFields(() => petition.fields)
        // console.log(fields)
    }, [isLoading])



    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView({behavior:"smooth"}) 

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
                        author={petition.userId}
                        towards={petition.towards}
                        overview={petition.overview}
                        details={petition.details}
                        video={petition.video}
                        imageCover={petition.imageCover}
                        milestone={petition.milestone}
                        totalSignatures={petition.totalSignatures}
                        scrollFunction={executeScroll}
                    />
                    {petition.title}
                    <br />
                    {addressId}
                    <br />

                    {fields ?

                        <div className="container scroll-margin-top"
                        ref={myRef}
                        >


                            <div 
                            className="petition-form-wrapper mx-auto">

                                <div 
                                id="petitionWrapper"
                                className="petition-form-wrapper__title">
                                    Sign the petition
                                </div>

                                <div className="petition-form-wrapper__main p-3">
                                    <form 
                                    onSubmit={handleSubmit}>
                                        <PetitionForm
                                            fields={fields}
                                            onChange={onChangeField}
                                        />

                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>

                                    </form>
                                </div>


                            </div>

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