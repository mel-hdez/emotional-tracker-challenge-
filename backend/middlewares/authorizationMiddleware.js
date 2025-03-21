const hasTherapist = (req, res, next) => {
    if (req.user.therapistId) {
      next();
    } else {
      res.status(403).json({ message: 'User does not have a therapist assigned' });
    }
  }
  
  module.exports = { hasTherapist };