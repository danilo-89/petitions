import React from "react";
import Petitions from "../../../../lib/petitions";
import { Link } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import CustomLoader from "../../components/CustomLoader";

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
                                        </div>
                                        <div className="article__middle">
                                            <img src={petition.imageCover} alt="" />
                                        </div>
                                        <div className="article__bottom">
                                            
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

