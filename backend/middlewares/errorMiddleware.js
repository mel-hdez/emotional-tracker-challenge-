
module.exports = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  };