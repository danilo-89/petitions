import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import './PetitionSingle.css'
import UserAvatar from '../../components/UserAvatar';
import helpers from '../../components/GlobalHelpers';
import { BarChart, Share, PencilSquare, Trash, ThreeDots } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomToaster from '../../components/CustomToaster';
import SharePetition from '../../components/SharePetition';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

const PetitionSingle = (props) => {
    // console.log('props in single')
    // console.log(props)
    // console.log('props in single END')
    console.log('props.imageCover')


    const [showShare, setShowShare] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);


    const history = useHistory();

    const {userAuthor, isUserAuthorLoading} = useTracker(() => {
        const handler = Meteor.subscribe('userAuthor', props.author)
        const noDataAvailable = {userAuthor: null};

        if (!handler.ready()) {
            return { ...noDataAvailable, isUserAuthorLoading: true };
        }
        const userAuthor = Meteor.users.findOne({_id: props.author});
        console.log(userAuthor)
        return {userAuthor}
    });

    calcPercent = (total, nedeed) => {
        const percentNum = (total/nedeed) * 100;
        return percentNum || 0;
    }

    deletePetition = () => {
        Meteor.call('delete.petition', props.petitionId, (err, res) => {
            if (err) {
                Bert.alert(err.reason, 'danger');
            } else {
                if (res.isError) {
                    console.log(res.err.reason)
                } else {
                    history.push("/");
                    console.log('success')
                }
            }
        });
    }

    return (
        <>


            <div className="petition-header">

                {/* share petition MODAL - start */}
                <Modal show={showShare} onHide={() => setShowShare(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Share petition</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SharePetition/>
                    </Modal.Body>
                </Modal>
                {/* share petition MODAL - end */}

                {/* delete petition MODAL - start */}
                <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete petition</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDelete(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={deletePetition}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* delete petition MODAL - end */}

                {/* edit petition MODAL - start */}
                <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit petition</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <div className="container">
                            <form>
                                <Form.Group>
                                    <Form.Label htmlFor="petitionMilestone">Petition Milestone</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            id="petitionMilestone"
                                            name="petitionMilestone"
                                            aria-describedby="petition milestone"
                                            value={props.milestone || 0}
                                            required={true}
                                            // onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEdit(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={deletePetition}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* edit petition MODAL - end */}


                <div
                    className="cover-holder"
                >

                    <div className="cover-holder__title d-flex justify-content-between">

                        <h2 className="cover-holder__title-name">
                            {props.title}
                        </h2>

                        <div>
                        <CustomToaster />
                                    <div className="dropdown">
                                        <button className="dropbtn ml-2">
                                            <ThreeDots />
                                        </button>
                                        <div className="dropdown-content">
                                            <Link to={`/my-petition?p=${props.petitionId}`}>
                                                <BarChart /> Petition Analytics
                                            </Link>
                                            <span onClick={() => setShowShare(true)}>
                                                <Share /> Share Petition
                                            </span>
                                            <span onClick={() => setShowEdit(true)}>
                                                <PencilSquare /> Edit Petition
                                            </span>
                                            <hr className="my-0"/>
                                            <span onClick={() => setShowDelete(true)}>
                                                <Trash /> Delete Petition
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            
                    </div>

                    <div className="cover-holder__top">
                        <div className="cover-holder__top__pet-status">
                            <div className="cover-holder__progress-bar">
                                <div className="cover-holder__progress-bar-line"
                                style= {
                                    {
                                        background: `linear-gradient(to right, #ffeb3b, #16db93 ${calcPercent(props.totalSignatures, props.milestone) }%, rgb(233, 233, 233) ${calcPercent(props.totalSignatures, props.milestone) }%)`
                                    }
                                }
                                >
                                </div>
                            </div>
                            <span className="">
                                {props.totalSignatures || 0}
                            </span>
                            <span className="mr-2">
                                {
                                    props.milestone ? <> have signed | <span className="milestone-span">{props.milestone}</span> required signatures</> : ''
                                }

                            </span>

                            <button className="btn btn-outline-success sign-petition-button mt-3"
                            onClick={props.scrollFunction}
                            >Sign this petition</button>
                        </div>
                        
                    </div>

                    <div className="cover-holder__wrapper">
                        <img
                            className="cover-holder__cover"
                            src={props.imageCoverData ? props.imageCover : helpers.getImgUrlById(props.imageCover)}
                        
                        />
                        <button className="btn btn-outline-success sign-petition-button sign-petition-button-1 mt-3"
                        onClick={props.scrollFunction}
                        >Sign this petition</button>
                    </div>
                    <div className="title-holder">
                        <div className="title-holder__left">
                            <div
                                className="title-holder__left-avatar">
                                    {userAuthor && (<UserAvatar 
                                        // handleClick={handleAvatarClick}
                                        img={helpers.getImgUrlById(userAuthor.profile.picture)}
                                    />)
                                    }
                                </div>
                        </div>
                        <div className="title-holder__right">
                            <p>Petition author:</p>
                            {/* <h3>{userAuthor.username}</h3> */}
                            {userAuthor && <h3>{userAuthor.username}</h3>}
                        </div>
                    </div>
                    {/* <div className="actions-holder">
                        <button>Sign</button>
                    </div> */}
                </div>
            </div>

            <div className="petition-content">
                <div className="towards-holder">
                    <h3>
                        <span className="towards-holder__for-span">For:</span> {props.towards}</h3>
                </div>
                <h4 className="petition-content__overview">
                    {props.overview}
                </h4>
                <p className="petition-content__details">
                    {props.details}
                    {props.video}
                </p>
                {/* <div id="sRVideo" className="petition-video-wrapper href-effect">
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/awE_8ZG6DCw" allowFullScreen={true}>
                            </iframe>
                </div> */}
            </div>

            {/* <img src={props.imageCover} alt="" /> */}

        </>
    );
}

export default PetitionSingle;