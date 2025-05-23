const db = require('../db');
const bcrypt = require('bcrypt');

// Register a new user
exports.register = (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, hashedPassword, role],
    function (err) {
      if (err) return res.status(400).json({ error: 'Username already exists' });
      // Fetch the newly created user (including id)
      db.get('SELECT id, username, role FROM users WHERE id = ?', [this.lastID], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(user); // { id, username, role }
      });
    }
  );
};

// Login existing user
exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Only send id, username, and role to frontend
    res.json({ id: user.id, username: user.username, role: user.role });
  });
};
