import React from "react";
import Petitions from "../../../../lib/petitions";
import PetitionCard from "./PetitionCard";
import { Link } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import CustomLoader from "../../components/CustomLoader";
import helpers from '/imports/ui/components/GlobalHelpers';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from "react-bootstrap";

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

            <div className="container pt-70px">

                <div>
                    <Form.Group>
                        <InputGroup className="mb-3">
                            <Form.Control
                                id="searchInput"
                                type="search"
                            />
                        <Button className="searchBtn" variant="primary">Search</Button>
                        </InputGroup>
                    </Form.Group>
                </div>

                <div className="row">

                    {
                        petitions.map((petition) => {
                            return (
                                <Link
                                    to={`/petition/${petition._id}`}
                                    key={petition._id}
                                    className="article-wrapper col-12 col-md-6 col-lg-4 mb-3">
                                    <PetitionCard props={petition} />
                                </Link>
                            )
                        })
                    }

                    <div className="col-12 col-md-6 col-lg-4">
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

