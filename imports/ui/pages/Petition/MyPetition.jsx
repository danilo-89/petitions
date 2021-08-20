import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useLocation } from "react-router-dom";
import './MyPetition.css';
import PetitionChart from './PetitionChart';
import Petitions from '../../../../lib/petitions';
import helpers from '../../components/GlobalHelpers'
import UserAvatar from '../../components/UserAvatar';

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

        return { petition, isLoading: false };

    }, [postId])

    const { userAuthor, isUserAuthorLoading } = useTracker(() => {
        const handler = Meteor.subscribe('userAuthor', petition?.userId)
        const noDataAvailable = { userAuthor: null };



        if (!handler.ready()) {
            return { ...noDataAvailable, isUserAuthorLoading: true };
        }
        const userAuthor = Meteor.users.findOne({ _id: petition?.userId });
        console.log('pet author:', petition?.userId);
        console.log(userAuthor)
        return { userAuthor }
    }, [petition?.userId]);

    return (
        <>
            <div className="container pb-3">

                {
                    isLoading ? 'loading' :

                        <>
                            <h2 className="cover-holder__title-name pt-3 mb-1">{petition.title}</h2>
                            <hr className="mt-1 mb-2" />
                            <p className="mb-4 px-1">Petition Analytics</p>

                            <div className="row">
                                <div className="col-12 col-md-6 mb-4">
                                    <div className="my-data-container">


                                        <div className="text-center text-gray mb-2">Petition author:</div>
                                        <div className="d-flex align-items-center flex-column">
                                            <div className="my-data-author-avatar mb-1">
                                                {userAuthor &&
                                                    (<UserAvatar
                                                        img={ (userAuthor?.profile?.picture!=false) ? helpers.getImgUrlById(userAuthor?.profile?.picture) : '/abstract-user-flat-4.svg' }
                                                        padding={'5px'}
                                                        mBottom='0px'
                                                    />)
                                                }
                                            </div>
                                            <div className="mb-1">{userAuthor?.username}</div>
                                        </div>

                                        <div className="mt-auto">
                                        <hr className="w-100"/>
                                        <span>
                                            <span className="text-gray">Created at:</span> {helpers.formatDateWithTime(petition.createdAt)}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4">
                                    <div className="my-data-container">
                                        
                                        <div className="mt-auto">
                                        <div className="text-gray text-center">Petition goal percentage:</div>
                                        <div className="my-data-percent text-center">
                                        {helpers.calcPercent(petition.totalSignatures, petition.milestone)}%
                                        </div>
                                        </div>
                                        
                                        <div className="mt-auto">
                                            <hr className="w-100" />
                                            
                                            <div className="mb-1">
                                                <span className="text-gray">Total signatures:</span> <span>{petition.totalSignatures || 0}</span>
                                            </div>
                                            
                                            <span className="text-gray">Required signatures:</span> <span>{petition.milestone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }

                <PetitionChart />
            </div>

        </>
    );
}

export default MyPetition;