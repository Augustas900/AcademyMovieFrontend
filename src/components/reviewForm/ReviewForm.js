import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ handleSubmit, revText, labelText, defaultValue }) => {
    const onFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        handleSubmit(e); // Call the provided handleSubmit function
    };

    return (
        <Form onSubmit={onFormSubmit}> {/* Use onSubmit for the form */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control 
                    ref={revText} 
                    as="textarea" 
                    rows={3} 
                    defaultValue={defaultValue} 
                    required // Make the field required
                />
            </Form.Group>
            <Button variant="outline-info" type="submit"> {/* Set button type to submit */}
                Submit
            </Button>
        </Form>
    );
};

export default ReviewForm;
