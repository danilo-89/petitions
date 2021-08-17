import { useFormControl } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CustomLoader from "../../components/CustomLoader";
import PetitionSingle from "../Petition/PetitionSingle";
import PetitionForm from "../Petition/PetitionForm";
import '../../styles/Create.css'
import Resizer from "react-image-file-resizer";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import FileUpload from "../../components/FileUpload";
import toast from 'react-hot-toast';
import CustomToaster from "../../components/CustomToaster";


const Create = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg', 'image/webp'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];



        console.log(selected)
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError(null)
        } else {
            setFile(null)
            setError('Please sellect PNG or JPEG')
        }
    }



    const [title, setTitle] = useState('Test')
    const [towards, setTowards] = useState('')
    const [overview, setOverview] = useState('')
    const [details, setDetails] = useState('')
    const [imageCover, setImageCover] = useState('');
    const [uImage, setUImage] = useState('test img');
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


    // const onChange = async (event) => {
    //     try {
    //       const file = event.target.files[0];
    //       const image = await resizeFile(file);
    //       console.log(image);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

    const onChangeField = (targetValue, index) => {
        const newFields = [...fields];
        const fieldIndex = [index - 1];
        newFields[fieldIndex] = { ...newFields[fieldIndex], value: targetValue }
        setFields(newFields)
    }

    const onSetImage = (uImg) => {
        setUImage(uImg)
    }

    const handleCheckboxClick = (index, checkName) => {
        const newFields = [...fields];
        const fieldIndex = [index - 1];
        newFields[fieldIndex] = { ...newFields[fieldIndex], [checkName]: !newFields[fieldIndex][checkName] }
        setFields(newFields)
    }


    // const handleImage = (e) => {
    //     console.log("test")
    //     var func = this;
    //     var file = e.target.files[0];
    //     var reader = new FileReader();
    //     reader.onload = function(fileLoadEvent) {
    //         Meteor.call('print.img', file, reader.result);
    //     };
    //     reader.readAsBinaryString(file);
    // }


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

        // console.log(e)
        console.log(imageCover)


        // Meteor.call('UploadFile', (err, res) => {
        //     if (err) {
        //         console.log(err.reason);
        //     } else {
        //         if (res.isError) {
        //             // Bert.alert(res.err.reason, 'danger');
        //             console.log(res.err.reason)
        //         } else {
        //             // Bert.alert('Success', 'success');
        //             // resetForm();
        //             // FlowRouter.go('/myRecipes');
        //             console.log(res)
        //         }
        //     }
        // });




    }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                700,
                700,
                "JPEG",
                85,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

        const resizeFileImg = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                700,
                700,
                "JPEG",
                85,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

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

        console.log(obj)

        Meteor.call('create.petition', obj, (err, res) => {
            if (err) {
                toast.error(err.reason);
            } else {
                if (res.isError) {
                    // Bert.alert(res.err.reason, 'danger');
                    toast.error(res.err.reason)
                } else {
                    // Bert.alert('Success', 'success');
                    // resetForm();
                    // FlowRouter.go('/myRecipes');
                    toast.success('petition created')
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

            <CustomToaster />

            {console.log({ title })}




            <FileUpload 
                uImage={uImage}
                setImage={onSetImage}
            />
            <div>{uImage}</div>

            <PetitionSingle
                title={title}
                towards={towards}
                overview={overview}
                details={details}
                video={video}
                imageCover={imageCover}
                imageCoverData={true}
            />

            <div className="container">
                <PetitionForm
                    fields={fields}
                    onChange={onChangeField}
                />
            </div>

            <button onClick={onChangeField}>Test</button>

            <h2>Form in progress</h2>

            {/* <canvas id="canvas"></canvas> */}
            <div className="container">

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

                    <Form.Group>
                        <Form.Label htmlFor="petitionVideo">Petition Video link</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="petitionVideo"
                                aria-describedby="petition video"
                                value={video}
                                required={true}
                                onChange={(e) => setVideo(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="petitionMilestone">Petition Milestone</Form.Label>
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

                    <div className="container">
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
                                            <tr key={field.id}>
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
                                                        />
                                                    </Form.Group>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <CustomLoader />
                    </div>

                    <button type="submit">
                        Submit
                    </button>
                </form >
            </div>


        </div>
    );
}

export default Create;