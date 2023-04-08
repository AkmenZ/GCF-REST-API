const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

admin.initializeApp();

const app = express();

app.use(express.json());

// endpoints
// get all movies
app.get('/', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('movies').get();
    let movies = [];
    snapshot.forEach(doc => {
      movies.push({id: doc.id, ...doc.data()});
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get movie by id
app.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = admin.firestore().collection('movies').doc(id);
    const docSnapshot = await docRef.get();

    if(docSnapshot.exists) {
      res.json({ id: docSnapshot.id, ...docSnapshot.data()});
    } else {
      res.status(404).json({ error: 'Movie Not Found!'});
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add a new movie
app.post('/', async (req, res) => {
  try {
    const movie = req.body;
    await admin.firestore().collection('movies').add(movie);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update a movie
app.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const movie = req.body;
    const docRef = admin.firestore().collection('movies').doc(id);
    const docSnapshot = await docRef.get();

    if(docSnapshot.exists) {
      await docRef.update(movie);
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie Not Found' });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete a movie
app.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = admin.firestore().collection('movies').doc(id);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      await docRef.delete();
      res.send('Movie Deleted!');
    } else {
      res.status(404).json({ error: 'Movie Not Found' });
    }

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// export
exports.movie = functions.https.onRequest(app);
