const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
}));
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });
  const result = await author.save();
  console.log(result);
}
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });
  const result = await course.save();
  console.log(result);
}
async function listCourses() {
  const courses = await Course
    .find()
    .select('name');
  console.log(courses);
}
createAuthor('Dee', 'My text', 'Junk stuff');
// createCourse('Node Course', '6212cc6d72d6fe17f9f1d259')
// listCourses();