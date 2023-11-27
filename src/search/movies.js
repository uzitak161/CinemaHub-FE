const MovieResults = ({ movies }) => {
    return (
        <div>
            {movies.map(movie => (
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    {/* Other movie details */}
                </div>
            ))}
        </div>
    );
};

export default MovieResults;