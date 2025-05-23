const db = require('../db');

// Suggest top-rated dishes based on recent ratings
exports.getMenuSuggestions = (req, res) => {
  // Join menu and ratings, get top-rated breakfast/lunch/dinner items
  db.all(`
    SELECT meal, AVG(rating) as avg_rating
    FROM ratings
    GROUP BY meal
    ORDER BY avg_rating DESC
  `, [], (err, mealRows) => {
    if (err) return res.status(500).json({ error: err.message });

    // Get top 3 feedbacks for each meal (optional, for context)
    db.all(`
      SELECT meal, feedback, rating
      FROM ratings
      WHERE feedback IS NOT NULL AND feedback != ''
      ORDER BY rating DESC LIMIT 9
    `, [], (err2, feedbackRows) => {
      if (err2) return res.status(500).json({ error: err2.message });

      res.json({
        suggestions: mealRows,
        topFeedbacks: feedbackRows
      });
    });
  });
};
