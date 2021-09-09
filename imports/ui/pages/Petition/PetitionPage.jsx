import React, { useState, useEffect, useRef } from 'react';
import Petitions from "../../../../lib/petitions";
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from "react-router-dom";
import PetitionSingle from './PetitionSingle';
import PetitionForm from './PetitionForm';
import CustomLoader from "../../components/CustomLoader";
import Button from 'react-bootstrap/Button'
import './PetitionPage.css'
import SharePetition from '../../components/SharePetition';
import PetitionSignaturesLast from './PetitionSignaturesLast';
import Page404 from '../404/Page404';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/CustomToaster';


const usePetition = (addressId) => useTracker(() => {

    const noDataAvailable = { petition: null };
    const handler = Meteor.subscribe('petitionSingle', addressId)

    if (!handler.ready()) {
        return { ...noDataAvailable, isLoading: !handler.ready() };
    }

    const petition = Petitions.find({_id:addressId}).fetch()[0];

    return { petition, isLoading: !handler.ready()};

}, [addressId])


const PetitionPage = () => {


    const { id: addressId } = useParams();

    const [fields, setFields] = useState(null);
    const [signed, setSigned] = useState(false);

    const { petition, isLoading } = usePetition(addressId)

    useEffect(() => {
        if (petition?._id) {
            setFields(() => petition.fields)
        } else {
            setFields(() => null)
        }
    }, [isLoading])

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView({behavior:"smooth"}) 

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

        Meteor.call('sign.petition', obj, (err, res) => {
            if (err) {
                toast.error(err.reason);
            } else {
                if (res.isError) {
                    toast.error(res.err.reason)
                } else {
                    toast.success('petition successfully signed')
                    setSigned(true)
                }
            }
        });
    }

    return (
        <div>
            <CustomToaster />

            {isLoading ? <CustomLoader /> :

                petition?._id ?
                <>

                    <div className="mb-3">
                    <PetitionSingle
                        title={petition.title}
                        petitionId={petition._id}
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
                    </div>
                    {fields ?

                        <div className="container scroll-margin-top pb-4"
                        ref={myRef}
                        >


                            <div 
                            className="petition-form-wrapper mx-auto">

                            {signed ? 
                            
                                <div className="pt-3">
                                    <div className="px-3 mb-3 text-center">Great job! Now you can share this petition on other apps and networks</div>
                                    <SharePetition />
                                </div>
                                :
                                <>
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

                                        <div className="text-center">
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                                </>
                        
                            }
                                

                            </div>

                        </div>

                        :

                        <div></div>


                    }

                    <PetitionSignaturesLast 
                    addressId={addressId}
                    />


                </> : <Page404 />
            }




        </div>
    );
}

export default PetitionPage;