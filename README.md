# Movie Reserve
## Table of Contents
1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
8. [Contact](#contact)

## Project Description
**Reserve a movie and watch** is a web application designed for browsing and discovering movies. It provides users with an intuitive interface to explore various movie titles, view detailed information about each movie, and keep track of their favorite films.

## Features
- **Browse Movies:** Users can browse a collection of movies and view details about each one.
- **Detailed Information:** View detailed information about movies including cast, plot, and ratings.
- **Search Functionality:** Search for movies by title or genre.
- **User Authentication:** Users can register and log in for a personalized experience.
- **Favorites List:** Add movies to a personal favorites list.
- **The ability to reserve a cinema hall:** Any student who registers can reserve a seat in the movie screening section.

## Technologies Used
- **Frontend:** React Js, Redux, SASS
- **Backend:** Django 
- **Database:** Sql
- **API:** OMDB API for movie data - TMDB API - Google API - SMS API - Suggest Stream API

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/RashaTeamOwner/movie_front.git
    cd movie_front
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    VITE_API_URL = Backend API
    VITE_URL_OMDB = https://www.omdbapi.com
    VITE_KEY_OMDB = YourKey
    VITE_URL_TMDB = https://api.themoviedb.org
    VITE_KEY_TMDB = Bearer YourKey
    VITE_URL_IMAGES = https://suggestream.com
    KEY_CAPTCHA = google captcha
    ```

4. **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:8000`.

## Usage
Once the application is up and running, you can:
- Browse the movie collection on the homepage.
- Use the search bar to find specific movies.
- Click on a movie to view detailed information.
- Register or log in to save your favorite movies.


## Contact
For any questions or suggestions, feel free to open an issue or contact the repository owner at [hosseinrg1180@gmail.com](mailto:hosseinrg1180@gmail.com).
