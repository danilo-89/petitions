import React, { useState } from "react";
import '../../styles/Create.css'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import FileUpload from "../../components/FileUpload";
import toast from 'react-hot-toast';
import CustomToaster from "../../components/CustomToaster";
import helpers from "../../components/GlobalHelpers";
import { useHistory } from 'react-router-dom';


const Create = () => {

    const history = useHistory();

    const [title, setTitle] = useState('')
    const [towards, setTowards] = useState('')
    const [overview, setOverview] = useState('')
    const [details, setDetails] = useState('')
    const [imageCover, setImageCover] = useState('');
    const [video, setVideo] = useState('')
    const [milestone, setMilestone] = useState(0);

    const [fields, setFields] = useState([
        { id: 1, include: true, field: 'First Name', mandatory: true, type: 'text', value: '' },
        { id: 2, include: true, field: 'Last Name', mandatory: true, type: 'text', value: '' },
        { id: 3, include: true, field: 'Age', mandatory: false, type: 'number', value: '' },
        { id: 4, include: true, field: 'Country of Residence', mandatory: true, type: 'text', value: '' },
        { id: 5, include: true, field: 'City', mandatory: true, type: 'text', value: '' },
        { id: 6, include: true, field: 'Address', mandatory: false, type: 'text', value: '' },
        { id: 7, include: true, field: 'Phone', mandatory: false, type: 'text', value: '' },
        { id: 8, include: true, field: 'Email', mandatory: true, type: 'email', value: '' },
        { id: 9, include: true, field: 'Comment', mandatory: false, type: 'textarea', value: '' },
    ])

    const onSetImage = (imageCover) => {
        setImageCover(imageCover)
    }

    const handleCheckboxClick = (index, checkName) => {
        const newFields = [...fields];
        const fieldIndex = [index - 1];
        newFields[fieldIndex] = { ...newFields[fieldIndex], [checkName]: !newFields[fieldIndex][checkName] }
        setFields(newFields)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const obj = {
            title,
            towards,
            overview,
            details,
            imageCover,
            video,
            milestone,
            fields,
        }

        const checkIfValid = fields.filter((field) => field.include && field.mandatory).length;

        if (checkIfValid) {
            Meteor.call('create.petition', obj, (err, res) => {
                if (err) {
                    toast.error(err.reason);
                } else {
                    if (res.isError) {
                        toast.error(res.err.reason)
                    } else {
                        toast.success('petition created');
                        history.push(`petition/${res.newPetition}`);
                    }
                }
            });
        } else {
            toast.error('You must check at least one petiton signing field that is mandatory!');
        }

    }

    return (
        <div>



            <CustomToaster />

            <div className="container">

                <form
                    className="pt-3"
                    onSubmit={handleSubmit}
                >

                    <Form.Group>
                        <Form.Label htmlFor="petitionTitle">Petition Title *</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="petitionTitle"
                                name="petitionTitle"
                                aria-describedby="petition title"
                                value={title}
                                required={true}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="petitionFor">Petition for *</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="petitionFor"
                                name="petitionFor"
                                aria-describedby="petition towards"
                                value={towards}
                                required={true}
                                onChange={(e) => setTowards(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Cover picture *</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="inputGroupPrepend"
                                    className=" bg-white btn"
                                >
                                    <span
                                        className="px-2"
                                        onClick={() => document.getElementById('fileinput').click()}
                                    >
                                        Browse
                                    </span>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Choose a petition cover picture"
                                aria-describedby="inputGroupPrepend"
                                name="petitionCover"
                                id="petitionCover"
                                required={true}
                                readOnly={true}
                                onClick={() => document.getElementById('fileinput').click()}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    {imageCover && <div className="text-center mb-3">
                        <img className="prev-image" src={helpers.getImgUrlById(imageCover)} alt="" />
                    </div>}

                    <FileUpload
                        // uImage={uImage}
                        setImage={onSetImage}
                    />


                    <Form.Group>
                        <Form.Label htmlFor="petitionOverview">Petition overview *</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="petitionOverview"
                                name="petitionOverview"
                                as="textarea"
                                rows={3}
                                aria-describedby="petition overview"
                                value={overview}
                                required={true}
                                onChange={(e) => setOverview(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="petitionDetails">Petition details *</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="petitionDetails"
                                name="petitionDetails"
                                as="textarea"
                                rows={3}
                                aria-describedby="petition details"
                                value={details}
                                required={true}
                                onChange={(e) => setDetails(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="petitionVideo">Petition Video link</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="petitionVideo"
                                aria-describedby="petition video"
                                value={video}
                                required={false}
                                onChange={(e) => setVideo(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="petitionMilestone">Petition Milestone *</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="petitionMilestone"
                                type="number"
                                aria-describedby="petition Milestone"
                                value={milestone}
                                required={true}
                                onChange={(e) => setMilestone(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <div>
                        <p className="mb-2">Petiton signing fields *</p>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>
                                        Include
                                    </th>
                                    <th>Field</th>
                                    <th>Mandatory</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fields.map(field => {
                                        return (
                                            <tr key={field.id} className={`${!field.include ? "inactive" : ""}`}>
                                                <td onClick={() => handleCheckboxClick(field.id, "include")}>
                                                    <Form.Group className="mb-0">
                                                        <Form.Check
                                                            className="text-center"
                                                            type="checkbox"
                                                            checked={field.include}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </td>
                                                <td>{field.field}</td>
                                                <td onClick={() => handleCheckboxClick(field.id, "mandatory")}>
                                                    <Form.Group className="mb-0">
                                                        <Form.Check
                                                            className=""
                                                            type="checkbox"
                                                            checked={field.mandatory}
                                                            readOnly
                                                            disabled={!field.include ? true : false}
                                                        />
                                                    </Form.Group>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>


                    <div className="text-center pb-5">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </form >
            </div>


        </div>
    );
}

export default Create;