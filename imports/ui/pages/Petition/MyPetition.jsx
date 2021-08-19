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
        console.log(userAuthor)
        return { userAuthor }
    }, [petition?.userId]);

    return (
        <>
            <div className="container">

                {
                    isLoading ? 'loading' :

                        <>
                            <h2 className="cover-holder__title-name pt-3 mb-4">{petition.title}</h2>


                            <div className="row">
                                <div className="col-12 col-md-6 mb-4">
                                    <div className="my-data-container">


                                        <div className="f-bold text-center mb-2">Petition author:</div>
                                        <div className="d-flex align-items-center flex-column">
                                            <div className="my-data-author-avatar">
                                                {userAuthor &&
                                                    (<UserAvatar
                                                        img={helpers.getImgUrlById(userAuthor?.profile?.picture)}
                                                        padding={'2px'}
                                                        mBottom='0px'
                                                    />)
                                                }
                                            </div>
                                            <div className="mb-1">{userAuthor?.username}</div>
                                        </div>

                                        <hr className="w-100"/>
                                        <span>
                                            <span className="f-bold">Created at:</span> {helpers.formatDateWithTime(petition.createdAt)}
                                        </span>
                                        
                                       
                                        
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mb-4">
                                    <div className="my-data-container">
                                        <div className="my-data-percent text-center">56.99%</div>
                                        <hr className="w-100" />
                                        <div>
                                            <span className="f-bold">Total signatures:</span> <span>{petition.totalSignatures}</span>
                                            <br />
                                            <span className="f-bold">Required signatures:</span> <span>{petition.milestone}</span>
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