// full_server/controllers/AppController.js

class AppController {
  static getHomepage(req, res) {
    // Your logic for the homepage here
    res.status(200).send('Hello Holberton School!');
  }
}

module.exports = AppController;

