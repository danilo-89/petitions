import { useFormControl } from "@material-ui/core";
import React, { useState } from "react";
import PetitionSingle from "../Petition/PetitionSingle";
import PetitionForm from "../Petition/PetitionForm";
import '../../styles/Create.css'
import Resizer from "react-image-file-resizer";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';


const Create = () => {
    const [title, setTitle] = useState('')
    const [towards, setTowards] = useState('')
    const [overview, setOverview] = useState('')
    const [details, setDetails] = useState('')
    const [imageCover, setImageCover] = useState('');
    const [video, setVideo] = useState('')


    const [fields, setFields] = useState([
        { id: 1, include: true, field: 'First Name', mandatory: true, type: 'text' },
        { id: 2, include: true, field: 'Last Name', mandatory: true, type: 'text' },
        { id: 3, include: true, field: 'Country of Residence', mandatory: true, type: 'text' },
        { id: 4, include: true, field: 'City', mandatory: true, type: 'text' },
        { id: 5, include: true, field: 'Age', mandatory: false, type: 'number' },
        { id: 6, include: true, field: 'Phone', mandatory: false, type: 'text' },
        { id: 7, include: true, field: 'Email', mandatory: true, type: 'email' },
        { id: 8, include: true, field: 'Comment', mandatory: false, type: 'textarea' },
    ])




    // const onChange = async (event) => {
    //     try {
    //       const file = event.target.files[0];
    //       const image = await resizeFile(file);
    //       console.log(image);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

    const handleCheckboxClick = (data) => {
        const newFields = [...fields];
        const fieldIndex = [data.id-1];
        newFields[fieldIndex] = {...newFields[fieldIndex], mandatory:!newFields[fieldIndex].mandatory}
        setFields(newFields)
    }


    const handleImage = async (e) => {
        // e.persist()


        try {
            const file = e.target.files[0];
            const image = await resizeFile(file);
            console.log(image);
            setImageCover(image)
            // img.src = URL.createObjectURL(image);

        } catch (err) {
            console.log(err);
        }

        console.log(e)
        console.log(imageCover)

    }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                500,
                500,
                "JPEG",
                85,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });



    const handleSubmit = (e) => {
        e.preventDefault()

        Meteor.call('tasks.insert', "names", (err, res) => {
            if (err) {
                Bert.alert(err.reason, 'danger');
            } else {
                if (res.isError) {
                    Bert.alert(res.err.reason, 'danger');
                } else {
                    Bert.alert('Success', 'success');
                    // resetForm();
                    // FlowRouter.go('/myRecipes');
                }
            }
        });

    }


    function currentlySelected(e) {
        console.log(e)
        console.log(e.formattedValue)
        console.log(e.getValue(e.id, e.field))
    }

    return (
        <div>

            <PetitionSingle
                title={title}
                towards={towards}
                overview={overview}
                details={details}
                video={video}
                imageCover={imageCover}
            />
            <PetitionForm
                fields={fields}
            />

            <h2>Form in progress</h2>

            {/* <canvas id="canvas"></canvas> */}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-0">
                    <label htmlFor="petitionTitle">Petition title</label>
                    <input
                        type="text"
                        id="petitionTitle"
                        name="petitionTitle"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="petitionFor">Petition for</label>
                    <input
                        type="text"
                        id="petitionFor"
                        name="petitionFor"
                        required
                        onChange={(e) => setTowards(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="petitionCover">Choose a petition cover picture:</label>
                    <input type="file"
                        id="petitionCover"
                        name="petitionCover"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        // value={imageCover}
                        onChange={(e) => handleImage(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="petitionOverview">Petition overview</label>
                    <textarea
                        type="text"
                        id="petitionOverview"
                        name="petitionOverview"
                        required
                        value={overview}
                        onChange={(e) => setOverview(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="petitionDetails">Petition Details</label>
                    <textarea
                        type="text"
                        id="petitionDetails"
                        name="petitionDetails"
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="petitionVideo">Petition Video</label>
                    <input
                        type="text"
                        id="petitionVideo"
                        name="petitionVideo"
                        required
                        value={video}
                        onChange={(e) => setVideo(e.target.value)}
                    />
                </div>
                <button type="submit">
                    Submit
                </button>

                <div className="container">

                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <Form.Group>
                                        <Form.Check type="checkbox" />
                                    </Form.Group>
                                </th>
                                <th>Field</th>
                                <th>Mandatory</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                            fields.map(field => {
                                return (
                                <tr key={field.id}>
                                <td>
                                    <Form.Group className="mb-0">
                                        <Form.Check type="checkbox"
                                        readOnly
                                        onClick={console.log("test")}
                                        />
                                    </Form.Group>
                                </td>
                                <td>{field.field}</td>
                                <td>
                                    <Form.Group className="mb-0">
                                    <Form.Check
                                    className=""
                                    type="checkbox"
                                    checked={field.mandatory}
                                    onClick={() => handleCheckboxClick(field)}
                                    readOnly/>
                                </Form.Group>
                                </td>
                                </tr>
                                )
                            })
                            }


                        </tbody>
                    </Table>



                    <Form.Group>
                        <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl id="basic-url" aria-describedby="basic-addon3" />
                        </InputGroup>
                    </Form.Group>
                </div>


            </form >


        </div>
    );
}

export default Create;