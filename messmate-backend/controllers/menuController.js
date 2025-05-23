const db = require('../db');

// Get today's menu (latest posted)
exports.getTodayMenu = (req, res) => {
  db.get('SELECT * FROM menu ORDER BY created_at DESC LIMIT 1', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.json({ breakfast: '', lunch: '', dinner: '' });
    res.json({
      breakfast: row.breakfast,
      lunch: row.lunch,
      dinner: row.dinner
    });
  });
};

// Post a new menu
exports.postMenu = (req, res) => {
  const { breakfast, lunch, dinner } = req.body;
  db.run(
    'INSERT INTO menu (breakfast, lunch, dinner) VALUES (?, ?, ?)',
    [breakfast, lunch, dinner],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      // Emit real-time notification
      const io = req.app.get('io');
      if (io) {
        io.emit('menu-notification', { breakfast, lunch, dinner });
      }
      res.json({ id: this.lastID });
    }
  );
};

// Get all menus (for warden approval)
exports.getAllMenus = (req, res) => {
  db.all('SELECT * FROM menu ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Approve a menu by ID (with improved error handling)
exports.approveMenu = (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Menu ID required' });
    db.run('UPDATE menu SET approved = 1 WHERE id = ?', [id], function (err) {
      if (err) return next(err);
      if (this.changes === 0) return res.status(404).json({ error: 'Menu not found' });
      res.json({ success: true });
    });
  } catch (error) {
    next(error);
  }
};
