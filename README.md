# dishAdvisor

## Overview
`dishAdvisor` is a PROTOTYPE for a web application that provides restaurant dish recommendations based on user reviews. It leverages the Google Maps API for location-based search and a backend service to process and analyze reviews.

### Backend
The backend is a Python-based service that handles API requests, processes reviews, and generates dish recommendations. Currently, for simplification, it uses the API from OpenAI to get recommendations, but we could use an open-source LLM like LLaMA 3.1.

### Frontend
The frontend is a simple HTML/CSS/JavaScript application that interacts with the backend service and Google Maps API.

- **HTML**: The main HTML file is [frontend/index.html](frontend/index.html).

- **JavaScript**: The main JavaScript file is [frontend/script.js](frontend/script.js).

## Setup and Installation
### Backend
1. **Install Dependencies**:
    ```sh
    pip install -r backend/requirements.txt
    ```

2. **Environment Variables**:
    - Copy [`.env.sample`](backend/.env.sample) to [`.env`](backend/.env) and fill in the required values.

3. **Run the Backend**:
    ```sh
    cd backend
    uvicorn src.main:app --reload
    ```

### Frontend
1. **Open `index.html`** in a web browser.

## Usage
1. **Search for a Restaurant**: Use the search bar to find a restaurant.
2. **View Recommendations**: The application will display dish recommendations based on the reviews.

### Note
The reviews obtained by Google Maps are currently limited to 5. However, we could use the library [`outscraper`](https://github.com/outscraper/outscraper-python/blob/master/examples/Google%20Maps%20Reviews.md) to scrape more reviews of a restaurant to provide more accurate recommendations.


## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License.