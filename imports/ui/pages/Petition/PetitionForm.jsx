import React from 'react';
import './PetitionForm.css'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

const PetitionForm = ({ fields, onChange }) => {
    console.log('props')
    console.log(fields)
    return (
        <>
            {
                fields.map((field) => {
                    
                    if (field.include) {
                        return (
                            <React.Fragment key={field.id}>
                                {/* <label className="custom-label-1" htmlFor={`field_${field.id}`}>
                                    {`${field.field} ${field.mandatory ? "*" : ""}`}
                                </label>
                                <input
                                    className="custom-input-1"
                                    id={`field_${field.id}`}
                                    required={field.mandatory ? true : false}
                                    type={field.type}
                                    
                                >

                                </input> */}

                                <Form.Group>
                                    <Form.Label htmlFor={`field_${field.id}`}>
                                    {`${field.field} ${field.mandatory ? "*" : ""}`}
                                    </Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            id={`field_${field.id}`}
                                            value={field.value ? field.value : ''}
                                            type={field.type}
                                            required={field.mandatory ? true : false}
                                            onChange={(e) => onChange(e.target.value, field.id)}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </React.Fragment>
                        )
                    }
                })
            }
        </>
    );
}

export default PetitionForm;
