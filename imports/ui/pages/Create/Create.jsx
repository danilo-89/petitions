import { useFormControl } from "@material-ui/core";
import React, { useState } from "react";
import PetitionSingle from "../Petition/PetitionSingle";
import '../../styles/Create.css'
import Resizer from "react-image-file-resizer";
import { DataGrid } from '@material-ui/data-grid';



const Create = () => {
    const [title, setTitle] = useState('')
    const [towards, setTowards] = useState('')
    const [overview, setOverview] = useState('')
    const [details, setDetails] = useState('')
    const [imageCover, setImageCover] = useState('');
    const [video, setVideo] = useState('')


    const columns = [
        {
          field: 'Field',
          headerName: 'Field',
          editable: false,
          sortable: false,
          width: 160,
        },
        {
          field: 'Mandatory',
          headerName: 'Mandatory',
          type: 'boolean',
          editable: true,
          sortable: false,
          width: 110,
        },
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params) =>
        //     `${params.getValue(params.id, 'firstName') || ''} ${
        //       params.getValue(params.id, 'lastName') || ''
        //     }`,
        // },
      ];
      
      const rows = [
        { id: 1, Field: 'First Name', Mandatory: true },
        { id: 2, Field: 'Last Name', Mandatory: true },
        { id: 3, Field: 'Country of Residence', Mandatory: true },
        { id: 4, Field: 'City', Mandatory: true },
        { id: 5, Field: 'Age', Mandatory: false },
        { id: 6, Field: 'Phone', Mandatory: false },
        { id: 7, Field: 'Email', Mandatory: true },
        { id: 8, Field: 'Comment', Mandatory: false },
      ];
    

    // const onChange = async (event) => {
    //     try {
    //       const file = event.target.files[0];
    //       const image = await resizeFile(file);
    //       console.log(image);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

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

            <h2>Form in progress</h2>

            {/* <canvas id="canvas"></canvas> */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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



                <div style={{ height: 528, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        disableColumnMenu
        hideFooterPagination
      />
    </div>


                <button type="submit">
                    Submit
                </button>

            </form >


        </div>
    );
}

export default Create;