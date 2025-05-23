const db = require('../db');

exports.getInventory = (req, res) => {
  db.all('SELECT * FROM inventory', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addInventory = (req, res) => {
  const { item, qty } = req.body;
  if (!item || qty == null) return res.status(400).json({ error: 'Item and quantity required' });
  db.run(
    'INSERT INTO inventory (item, qty) VALUES (?, ?)',
    [item, qty],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
};
