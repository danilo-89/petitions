import { useFormControl } from "@material-ui/core";
import React, { useState } from "react";
import '../../styles/Create.css'

const Create = () => {
    const [title, setTitle] = useState('')
    const [towards, setTowards] = useState('')
    const [overview, setOverview] = useState('')
    const [details, setDetails] = useState('')
    const [video, setVideo] = useState('')
    const [website, setWebsite] = useState('')

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
        <div>create
            <h2>Form in progress</h2>
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
                        value={towards}
                        onChange={(e) => setTowards(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="petitionCover">Choose a petition cover picture:</label>
                    <input type="file"
                        id="petitionCover" 
                        name="petitionCover"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
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
                    <div className="form-group">
                        <label htmlFor="petitionSite">Petition Site</label>
                        <input
                            type="text"
                            id="petitionSite"
                            name="petitionSite"
                            required
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
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