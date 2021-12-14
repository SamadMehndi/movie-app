// defining user roles
const Roles = {
    1: 'admin',
};

const getRole = (index) => Roles[0][index];

module.exports = { getRole };
