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
import helpers from "../../components/GlobalHelpers";
import { useHistory } from 'react-router-dom';


const Create = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg', 'image/webp'];

    const history = useHistory();

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

    const onSetImage = (imageCover) => {
        setImageCover(imageCover)
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
                    toast.success('petition created');
                    console.log(res)
                    history.push(`petition/${res.newPetition}`);
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




            

            {/* <PetitionSingle
                title={title}
                towards={towards}
                overview={overview}
                details={details}
                video={video}
                imageCover={imageCover ? helpers.getImgUrlById(imageCover) : '/abstract-user-flat-4.svg'}
                imageCoverData={true}
            /> */}

            {/* <div className="container">
                <PetitionForm
                    fields={fields}
                    onChange={onChangeField}
                />
            </div>

            <button onClick={onChangeField}>Test</button> */}

            {/* <canvas id="canvas"></canvas> */}
            <div className="container">

                <form 
                className="pt-3"
                onSubmit={handleSubmit}
                >

                <Form.Group>
                        <Form.Label htmlFor="petitionTitle">Petition Title</Form.Label>
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
                        <Form.Label htmlFor="petitionFor">Petition for</Form.Label>
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
                        <Form.Label>Cover picture</Form.Label>
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
                                readOnly={true}
                                onClick={() => document.getElementById('fileinput').click()}
                                // value={values.username}
                                // onChange={handleChange}
                                // isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {/* {errors.username} */}
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
                        <Form.Label htmlFor="petitionOverview">Petition overview</Form.Label>
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
                        <Form.Label htmlFor="petitionDetails">Petition details</Form.Label>
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

                    <div>
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