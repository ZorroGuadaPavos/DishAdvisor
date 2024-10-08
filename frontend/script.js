function initialize() {
	var input = document.getElementById('search-input');
	var clearButton = document.getElementById('clear-button');
	var recommendations = document.getElementById('recommendations');

	clearButton.addEventListener('click', function () {
		input.value = '';
		input.focus();
		recommendations.innerHTML = '';
		clearButton.style.display = 'none';
	});
	setupAutocomplete(input);
}

function setupAutocomplete(inputElement) {
	var autocomplete = new google.maps.places.Autocomplete(inputElement);
	google.maps.event.addListener(autocomplete, 'place_changed', () =>
		handlePlaceChanged(autocomplete)
	);
}

function handlePlaceChanged(autocomplete) {
	document.getElementById('loader').style.display = 'flex';
	document.getElementById('recommendations').innerText = '';
	var place = autocomplete.getPlace();
	if (place.reviews) {
		const transformedReviews = transformReviews(place.reviews);
		postReviews(transformedReviews).then(displayRecommendations).catch(handleError);
		document.getElementById('clear-button').style.display = 'flex';
	}
}

function handleError(error) {
	console.error('Error:', error);
	document.getElementById('recommendations').innerText = 'Error: ' + error;
}

function transformReviews(reviews) {
	return reviews.map((review) => ({
		rating: review.rating,
		text: review.text,
	}));
}

function postReviews(reviews) {
	return fetch('http://localhost:8000/api/v1/recommendations/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ reviews }),
	}).then((response) => {
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
	data.forEach((item) => {
		const listItem = document.createElement('li');
		listItem.textContent = item;
		list.appendChild(listItem);
	});
	recommendations.appendChild(list);
	document.getElementById('loader').style.display = 'none';
}

google.maps.event.addDomListener(window, 'load', initialize);
