const baseURL = "http://www.omdbapi.com/?apikey=72a16ed2&";

export const getAllMovies = async (data) => {
  let movies = [];

  try {
    for await (let movie of data) {
      const info = await fetch(`${baseURL}t=${movie.title}&y=2020`);

      const data = await info.json();

      const votes = {
        good: Number(data.Ratings[2].Value.split("/")[0]),
        bad: 0,
      };

      data.voted = false;

      data.Ratings = votes;

      movies.push(data);
    }
    return movies;
  } catch (error) {
    console.log(error);
  }
};
