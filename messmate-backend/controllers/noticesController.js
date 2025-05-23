const db = require('../db');

// Get all notices
exports.getNotices = (req, res) => {
  db.all('SELECT * FROM notices ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Post a new notice
exports.postNotice = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  db.run(
    'INSERT INTO notices (message) VALUES (?)',
    [message],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      // Emit real-time notification
      const io = req.app.get('io');
      if (io) {
        io.emit('notice-notification', { message });
      }
      res.json({ id: this.lastID });
    }
  );
};
