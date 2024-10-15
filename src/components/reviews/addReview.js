const addReview = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    const rev = revText.current; // Get the review text from the textarea

    // Validate review content
    if (!rev.value || rev.value.trim() === '') {
        console.error("Review cannot be empty");
        return; // Prevent submission if the review is empty
    }

    try {
        const response = await api.post("/api/v1/reviews", {
            reviewBody: rev.value, // This is the expected key for your API
            imdbId: movieId // Movie ID
        });

        // Log the API response for debugging
        console.log('API Response:', response.data);

        // Check if the response contains the new review
        if (response.data && response.data.body) {
            const newReview = {
                body: response.data.body, // This accesses the review body
                created: response.data.created, // Access the created timestamp
                id: response.data.id, // Access the ID
                updated: response.data.updated // Access the updated timestamp
            };

            // Log the new review object for debugging
            console.log('New review to add:', newReview);

            // Update the reviews state by adding the new review
            setReviews(prevReviews => [...prevReviews, newReview]); // Use a function to update the state
            rev.value = ""; // Clear the textarea after adding the review
        } else {
            console.error('Unexpected response format', response.data);
        }
    } catch (err) {
        console.error('Error submitting review:', err.response?.data || err.message);
    }
};
