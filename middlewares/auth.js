// importing jwt-decode
const jwt_decode = require('jwt-decode');

// getting role and email from this function
const auth = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  try {
    // returning role and email
    const { role, email } = jwt_decode(token);
    return { role, email };
  } catch (e) {
    // Incase of an error, return error message
    return e.message;
  }
};

// exporting auth
module.exports = auth;
