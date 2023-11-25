import React, { useState } from 'react';
import "./search.css"


function generateSearchResults(searchResults) {

    return (
        <div>
            <h1>Discover</h1>
            <div>
                {searchResults.map((result) => (
                    <div>
                        <p>{result.id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


function Search() {

    const usersData = [
        { id: 1, username: 'user1', name: 'User One' },
        { id: 2, username: 'user2', name: 'User Two' },
        { id: 3, username: 'user3', name: 'User Three' },
        // Add more users as needed
    ];
    
    const moviesData = [
        { id: 1, title: 'Movie One', genre: 'Action' },
        { id: 2, title: 'Movie Two', genre: 'Drama' },
        { id: 3, title: 'Movie Three', genre: 'Comedy' },
        // Add more movies as needed
    ];

    const [searchResults, setSearchResults] = useState([]);

    const [userSearchTerm, setUserSearchTerm] = useState('');

    const handleUserSearch = (e) => {
        // TODO: Implement user search via API call
        setSearchResults(usersData)
    };

    const [movieSearchTerm, setMovieSearchTerm] = useState('');

    const handleMovieSearch = (e) => {
        // TODO: Implement movie search via API call
        setSearchResults(moviesData)
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className='col-2'>
                    {/* Empty div for spacing */}
                </div>
                <div className="col-2 position-fixed">
                    <h1 className="text-center mb-4">Discover Users</h1>
                    <form>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search users..."
                                aria-label="Search users"
                                aria-describedby="button-user-search"
                                onChange={(e) => setUserSearchTerm(e.target.value)}
                                value={userSearchTerm}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="button-user-search"
                                    onClick={handleUserSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>

                    <h1 className="text-center mb-4">Discover Movies</h1>
                    <form>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search movies..."
                                aria-label="Search movies"
                                aria-describedby="button-movie-search"
                                onChange={(e) => setMovieSearchTerm(e.target.value)}
                                value={movieSearchTerm}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="button-movie-search"
                                    onClick={handleMovieSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-8 main-body">
                    {generateSearchResults(searchResults)}
                </div>
                <div className="col-2">
                    <h2>Placeholder</h2>
                </div>
            </div>
        </div>
    );
}



export default Search;