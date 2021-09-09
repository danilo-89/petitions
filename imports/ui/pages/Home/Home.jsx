import React, {useState} from "react";
import Petitions from "../../../../lib/petitions";
import PetitionCard from "./PetitionCard";
import { Link } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import CustomLoader from "../../components/CustomLoader";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from "react-bootstrap";
import HomePagination from "./HomePagination";
import CustomToaster from "../../components/CustomToaster";

const Home = () => {

    const [searchInputValue, setSearchInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [skipValue, setSkipValue] = useState(0);

    const { petitions, isLoading } = useTracker(() => {
        const noDataAvailable = { petitions: [] };

        const handler = Meteor.subscribe('petitions', searchTerm, skipValue);

        // WHEN SUBSCRIBE IS NOT READY
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const petitions = Petitions.find({},{sort: {createdAt: -1}}).fetch();

        // WHEN SUBSCRIBE IS READY (isLoading is absent so it is false)
        return { petitions };
    }, [searchTerm, skipValue]);

    const onPageNumClick = (num) => {
        setSkipValue((currNum) => num)
    }

    return (
        <>

            <CustomToaster />

            <div className="container pt-70px">

                <Form>
                    <Form.Group>
                        <InputGroup className="mb-3">
                            <Form.Control
                                id="searchInput"
                                type="text"
                                placeholder="Search petitions by name"
                                value={searchInputValue}
                                onChange={(e)=>setSearchInputValue(e.target.value)}
                            />
                        <Button 
                            className="searchBtn" variant="primary"
                            type="submit"
                            onClick={(e)=>{e.preventDefault(); setSearchTerm(searchInputValue.trim())}}
                        >Search
                        </Button>
                        </InputGroup>
                    </Form.Group>
                </Form>

                {searchTerm && 
                <div className="text-center mb-3">
                    <Button 
                            className="text-break"
                            variant="outline-secondary"
                            onClick={()=>{setSearchTerm(''); setSearchInputValue('')}}
                            >
                               <span className="f-bold">Clear search</span> "{searchTerm}"
                    </Button>
                </div>
                }

                {isLoading ? <CustomLoader /> : ''}

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
                        
                    </div>
                    <div className="col-12 col-md-6">
                        
                    </div>
                </div>

                {!isLoading && !petitions.length && searchTerm &&
                <div className="text-green f-bold text-center">Sorry, no results</div>
                }

                <HomePagination 
                    skipValue={skipValue}
                    onClick={onPageNumClick}
                    searchTerm={searchTerm}
                />

            </div>
        </>
    );
}

export default Home;

