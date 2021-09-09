import React from 'react';
import './PetitionForm.css'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

const PetitionForm = ({ fields, onChange }) => {

    const inputField = (field) => {
        if (field.type === 'textarea') {
            return (
                <Form.Control
                    id={`field_${field.id}`}
                    value={field.value ? field.value : ''}
                    as="textarea"
                    rows={3}
                    required={field.mandatory ? true : false}
                    onChange={(e) => onChange(e.target.value, field.id)}
                />
            )
        } else {
            return (
                <FormControl
                    id={`field_${field.id}`}
                    value={field.value ? field.value : ''}
                    type={field.type}
                    required={field.mandatory ? true : false}
                    onChange={(e) => onChange(e.target.value, field.id)}
                />)
        }
    }


    return (
        <>
            {

                fields.map((field) => {

                    if (field.include) {
                        return (
                            <React.Fragment key={field.id}>

                                <Form.Group>
                                    <Form.Label htmlFor={`field_${field.id}`}>
                                        {`${field.field} ${field.mandatory ? "*" : ""}`}
                                    </Form.Label>
                                    <InputGroup className="mb-3">

                                        {inputField(field)}


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
