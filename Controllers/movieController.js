const Movie = require('../Model/movieModel');

// Add a movie
const addMovie = async (req, res) => {
  try {
    const { title, director, ReleaseDate, Rating } = req.body;

    if (!(title && director && ReleaseDate && Rating)) {
      return res.status(422).json({ message: 'All input is required' });
    }

    const movie = new Movie({
      title,
      director,
      ReleaseDate,
      Rating
    });

    const savedMovie = await movie.save();
    return res.status(201).json({ message: 'Movie created successfully', movie: savedMovie });
  } catch (error) {
    console.error('Error in creating a movie:', error);
    return res.status(500).json({error, message: 'Failed to create movie'});
  }
};


// get all Movies
const getMovie = async (req, res) => {
    try {
      const movies = await Movie.find();
      return res.status(200).json(movies);
    } catch (error) {
      console.error('Error in getting movies:', error);
      return res.status(500).json({error, message: 'Failed to get movies'});
    }
  };


//get Single Movie
const getSingleMovie = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const movie = await Movie.findById(id);
        if (movie) {
          return res.status(200).json(movie);
        } else {
          return res.status(404).json({ message: 'Movie not found' });
        }
      } else {
        return res.status(400).json({ message: 'Invalid ID' });
      }
    } catch (error) {
      console.error('Error in getting single movie:');
      return res.status(500).json({ error, message: 'Failed to get single movie' });
    }
  };


//update Movie Details
const updateMovie=async(req,res)=>{
    try{

        const { title, director, ReleaseDate, Rating } = req.body;
        let id=req.params.id

        if(id){

            const movie = await Movie.findById(id);

            if (movie) {

                if(!(title && director && ReleaseDate && Rating)){
                    return res.status(422).json({ message: 'All input is required' });

                }else{

                let updateMovie=await Movie.findByIdAndUpdate(id,{
                    $set:{
                        title:title,
                        director:director,
                        ReleaseDate:ReleaseDate,
                        Rating:Rating
                    }
                },{ new: true })

                res.status(200).json({message:"succesfully updated",updateMovie})
                
            }
            } else {
                return res.status(404).json({ message: 'Movie not found' });
            }
        }else{
            return res.status(400).json({ message: 'Invalid ID' });
        }

    }catch(error){
        console.error('Error in getting movie:');
        return res.status(500).json({ error, message: 'Failed to get movie' });
    }
}


//Delete a Movie 
const deleteMovie = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const movie = await Movie.findByIdAndDelete(id);
        if (movie) {
          res.status(200).json({ message: `Successfully deleted ${movie.title} Movie` });
        } else {
          return res.status(404).json({ message: 'Movie not found' });
        }
      } else {
        return res.status(400).json({ message: 'Invalid ID' });
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      return res.status(500).json({ error, message: 'Failed to delete movie' });
    }
  };


module.exports={
    addMovie,
    getMovie,
    getSingleMovie,
    updateMovie,
    deleteMovie
}