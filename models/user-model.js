const db = require("../db/db-config");

function getUsers() {
  return db("users");
}

function register(userData) {
  return db("users").insert(userData);
}

function login(username) {
  return db("users").where(username);
}

function deleteUser(id) {
  return db("users")
    .where(id)
    .delete();
}

module.exports = {
  getUsers,
  register,
  login,
  deleteUser
};
