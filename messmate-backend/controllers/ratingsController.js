const db = require('../db');

exports.submitRating = (req, res) => {
  const { meal, rating, feedback, anonymous, user_id } = req.body;
  if (!meal || !rating) return res.status(400).json({ error: 'Meal and rating required' });
  db.run(
    'INSERT INTO ratings (meal, rating, feedback, anonymous, user_id) VALUES (?, ?, ?, ?, ?)',
    [meal, rating, feedback || '', anonymous ? 1 : 0, user_id || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
};

exports.getAllRatings = (req, res) => {
  db.all('SELECT * FROM ratings ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
