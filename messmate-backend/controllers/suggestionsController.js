const db = require('../db');

exports.submitSuggestion = (req, res) => {
  const { user_id, dish } = req.body;
  if (!dish) return res.status(400).json({ error: 'Dish required' });
  db.run(
    'INSERT INTO suggestions (user_id, dish) VALUES (?, ?)',
    [user_id || null, dish],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
};

exports.getSuggestions = (req, res) => {
  db.all('SELECT * FROM suggestions ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.approveSuggestion = (req, res) => {
  const { id } = req.body;
  db.run('UPDATE suggestions SET approved = 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};
