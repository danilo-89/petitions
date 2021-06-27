import React from "react";
import Petitions from "../../../../lib/petitions";
import { Link } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import CustomLoader from "../../components/CustomLoader";
import helpers from '/imports/ui/components/GlobalHelpers'

const Home = () => {

    const { petitions, isLoading } = useTracker(() => {
        const noDataAvailable = { petitions: [] };

        // WHEN USER IS NOT LOGGED IN
        // if (!Meteor.user()) {
        //   return noDataAvailable;
        // }

        console.log('petitions sub')
        const handler = Meteor.subscribe('petitions');

        // WHEN SUBSCRIBE IS NOT READY
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const petitions = Petitions.find().fetch();

        // WHEN SUBSCRIBE IS READY (isLoading is absent so it is false)
        return { petitions };
    });


    return (
        <>

            {isLoading ? <CustomLoader /> : ''}


            <div>Home page</div>
            <Link to="/create">New petition</Link>
            <div className="container">
                <div className="row">

                    {
                        petitions.map((petition) => {
                            return (
                                <div key={petition._id} className="col-12 col-md-6">
                                    <article>
                                        <div className="article__top">
                                            {petition.title}
                                            <br />
                                            For: {petition.towards}
                                        </div>
                                        <div className="article__middle">
                                            <div className="article__middle__cover">
                                                <img src={petition.imageCover} alt="" />
                                            </div>
                                        </div>
                                        <div className="article__bottom">
                                            {helpers.formatDateObj(petition.createdAt)}
                                        </div>
                                    </article>
                                </div>
                            )
                        })
                    }

                    <div className="col-12 col-md-6">
                        test
                    </div>
                    <div className="col-12 col-md-6">
                        test
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

