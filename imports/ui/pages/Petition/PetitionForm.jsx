import React from 'react';
import './PetitionForm.css'

const PetitionForm = ({ fields }) => {
    return (
        <>
            {
                fields.map((field) => {
                    if (field.include) {
                        return (
                            <React.Fragment key={field.id}>
                                <label className="custom-label-1" htmlFor={`field_${field.id}`}>
                                    {`${field.field} ${field.mandatory ? "*" : ""}`}
                                </label>
                                <input
                                    className="custom-input-1"
                                    id={`field_${field.id}`}
                                    required={field.mandatory ? true : false}
                                    type={field.type}
                                >
                                        
                                </input>
                            </React.Fragment>
                        )
                    }
                })
            }
        </>
    );
}

export default PetitionForm;
