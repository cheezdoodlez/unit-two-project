const mongoose = require('mongoose');
const genres =[
    'Pop',
    'Rock',
    'Hip-hop',
    'Rap',
    'R&B',
    'Country',
    'EDM',
    'Jazz',
    'Blues',
    'Techno',
    'Metal',
    'Grunge',
    'Latin',
    'Other'
]
const songSchema = new mongoose.Schema({
    songName: String,
    artist: String,
    genre: String, enum: genres  
    // releaseDate: Number,
    // duration: Number,
    // rating: Number,
    // String add as an array, that lets the user type in any genre. or an enum that the user can preselct(no embedding)
})

const Song = mongoose.model('Song', songSchema); // this variable is how we call back to this model

module.exports = Song //exports model so other files can access the model