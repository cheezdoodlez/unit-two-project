// PACKAGES===========
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan= require('morgan')
dotenv.config();
const methodOverride= require ('method-override')

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MONGODB ${mongoose.connection.name}`);
});

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

const Song = require('./models/songs.js');

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
// app.use(morgan('dev'))

// EVENTLISTENER VARIABLES================
// const likeCount = 0
// const dislikeCount = 0
// const neutralCount = 0

// const likeElement = document.getElementById('likeButton')
// const likeDisplayElement = document.getElementById('likesDisplay')

// const dislikeElement = document.getElementById('dislikeButton')
// const dislikeDisplayElement = document.getElementById('dislikesDisplay')

// const neutralElement = document.getElementById('neutralButton')
// const neutralDisplayElement = document.getElementById('neutralDisplay')
//=========================================
// tried to add click button function to like/dislike button

//homepage========//get
app.get('/', async (req, res) => {
    res.render('index.ejs')
});

//Show=================================================
app.get("/songs", async (req, res) => {
    const songList = await Song.find()
    res.render('indexes/all-index.ejs', { songs: songList})
})

//=====================================================



//create=======================================
app.get('/songs/new', async (req, res) => {
    res.render('songs/new.ejs', {genres})
});
//==============================================



//show (read but the contents of the objects)
app.get('/songs/:songId', async (req, res) => {
    const foundSong = await Song.findById(req.params.songId)
    res.render('shows/show.ejs', { song: foundSong})
})


//HELP PLZ
//create data reflection========================================
app.post('/songs', async (req, res) => {
    
    await Song.create(req.body)
    res.redirect('/songs')
}) 


// country create form data submmitting to pop show path
//==============================================================
//HELP PLZ

//Delete

app.delete('/songs/:songId', async (req, res) => {
    await Song.findByIdAndDelete(req.params.songId)
    res.redirect('/songs')
})

//Edit 

app.get('/songs/:songId/edit', async (req, res) => {
    const foundSong = await Song.findById(req.params.songId)
    res.render('songs/edit.ejs', {song: foundSong, genres})
})

//Update

app.put('/songs/:songId', async (req, res)=> {
    // res.send(req.body)
    await Song.findByIdAndUpdate(req.params.songId, req.body)
    res.redirect('/songs')
})

app.listen(3001, () => {
    console.log('listening on port 3001')
});


/*/ Ideas for expansion:

1. adding create/post pages for each genre
- Pop
- Hip-Hop/Rap
- Rock
- Country
- Metal
- EDM
- R&B
- Latin

enums 
just have show pages for genres

1. finish routing genres
I'm up to show, need to do

2. Make a sign in page

3. style simply
/*/

/*/ App crashing while values from model object are present, 
values not matching input data and unsure how to procede with eventListeners
cannot use DOM in server side writing /*/

