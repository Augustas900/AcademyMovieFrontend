import React, { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosConfig'; // Adjust this import based on your file structure
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie }) => {
    // State to hold reviews
    const [reviews, setReviews] = useState([]);
    const revText = useRef(); // Reference for the review textarea
    const params = useParams(); // Get URL parameters
    const movieId = params.movieId; // Extract movie ID from URL

    // Fetch movie data when the component mounts or movieId changes
    useEffect(() => {
        getMovieData(movieId);
    }, [movieId, getMovieData]);

    // Function to add a new review
    const addReview = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const rev = revText.current; // Get the current value of the review textarea

        // Validate review content
        if (!rev.value || rev.value.trim() === '') {
            console.error("Review cannot be empty");
            return; // Prevent submission if the review is empty
        }

        try {
            // Make API call to post the review
            const response = await api.post("/api/v1/reviews", {
                reviewBody: rev.value, // Review content
                imdbId: movieId // Movie ID
            });

            // Log the API response for debugging
            console.log('API Response:', response.data);

            // Check if the response contains the new review
            if (response.data && response.data.body) {
                const newReview = {
                    body: response.data.body, // Access the review body
                    created: response.data.created, // Access the creation date
                    id: response.data.id, // Access the ID
                    updated: response.data.updated // Access the updated timestamp
                };

                // Update the reviews state
                setReviews(prevReviews => [...prevReviews, newReview]); // Append new review
                rev.value = ""; // Clear the textarea after adding the review
            } else {
                console.error('Unexpected response format', response.data);
            }
        } catch (err) {
            console.error('Error submitting review:', err.response?.data || err.message);
        }
    };

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt={movie?.title} />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {
                        reviews.length > 0 ? ( // Check if reviews array is not empty
                            reviews.map((r, index) => ( // Use index as key
                                <React.Fragment key={index}>
                                    <Row>
                                        <Col>{r.body}</Col> {/* Display the review body */}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <small>{new Date(r.created).toLocaleString()}</small> {/* Display creation date */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            ))
                        ) : (
                            <Row>
                                <Col>No reviews yet!</Col>
                            </Row>
                        )
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
