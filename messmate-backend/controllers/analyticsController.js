const db = require('../db');

// Get analytics for ratings: averages per meal, overall, and count per meal
exports.getRatingsAnalytics = (req, res) => {
  db.all('SELECT meal, rating, created_at FROM ratings', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const mealTypes = ['breakfast', 'lunch', 'dinner'];
    const analytics = {
      overall: { avg: null, count: 0 },
      perMeal: {},
      timeline: {}
    };

    // Initialize
    mealTypes.forEach(meal => {
      analytics.perMeal[meal] = { avg: null, count: 0, ratings: [] };
    });

    let total = 0, totalCount = 0;

    rows.forEach(r => {
      if (!analytics.perMeal[r.meal]) return;
      analytics.perMeal[r.meal].ratings.push(r);
      analytics.perMeal[r.meal].count++;
      analytics.perMeal[r.meal].avg = (
        ((analytics.perMeal[r.meal].avg || 0) * (analytics.perMeal[r.meal].count - 1) + r.rating) /
        analytics.perMeal[r.meal].count
      );
      total += r.rating;
      totalCount++;

      // Timeline (by date)
      const date = r.created_at.split('T')[0];
      if (!analytics.timeline[date]) analytics.timeline[date] = [];
      analytics.timeline[date].push(r.rating);
    });

    analytics.overall.count = totalCount;
    analytics.overall.avg = totalCount ? (total / totalCount).toFixed(2) : null;

    // Finalize averages
    mealTypes.forEach(meal => {
      if (analytics.perMeal[meal].count)
        analytics.perMeal[meal].avg = analytics.perMeal[meal].avg.toFixed(2);
      else
        analytics.perMeal[meal].avg = null;
    });

    // Timeline: average per day
    const timelineArr = Object.entries(analytics.timeline).map(([date, ratings]) => ({
      date,
      avg: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2),
      count: ratings.length
    }));

    analytics.timeline = timelineArr;

    res.json(analytics);
  });
};
