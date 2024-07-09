function initialize() {
    var input = document.getElementById('searchRestaurant');
    setupAutocomplete(input);
}

function setupAutocomplete(inputElement) {
    var autocomplete = new google.maps.places.Autocomplete(inputElement);
    google.maps.event.addListener(autocomplete, 'place_changed', () => handlePlaceChanged(autocomplete));
}

function handlePlaceChanged(autocomplete) {
    var place = autocomplete.getPlace();
    if (place.reviews) {
        const transformedReviews = transformReviews(place.reviews);
        postReviews(transformedReviews)
            .then(displayRecommendations)
            .catch(handleError);
    }
}

function handleError(error) {
    console.error('Error:', error);
    document.getElementById('recommendations').innerText = 'Error: ' + error;
}

function transformReviews(reviews) {
    return reviews.map(review => ({
        rating: review.rating,
        text: review.text
    }));
}

function postReviews(reviews) {
    return fetch('http://127.0.0.1:8000/api/v1/recommendations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({reviews})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

function displayRecommendations(data) {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = ''; 
    const list = document.createElement('ul');
    data.split('\n').forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    recommendations.appendChild(list);
}

google.maps.event.addDomListener(window, 'load', initialize);