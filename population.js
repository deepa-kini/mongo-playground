const mongoose = require('mongoose');
const config = require('config');


const password = config.get('db.password');
const dbConnect = `mongodb+srv://root:${password}@playground.mryia.mongodb.net/playground?retryWrites=true&w=majority`
mongoose.connect(dbConnect)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('error', err.message));


const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: String
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
    // .populate('author')
    .select('name author');
  console.log(courses);
}
// createAuthor('Dee', 'My text', 'Junk stuff');
createCourse('Node Course', '6212cd6122ce553f933c6c7b')
listCourses();