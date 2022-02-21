const mongoose = require('mongoose');
const config = require('config');

const password = config.get('db.password');
const dbConnect = `mongodb+srv://root:${password}@playground.mryia.mongodb.net/playground?retryWrites=true&w=majority`
mongoose.connect(dbConnect)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('error', err.message));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});
const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));
async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });
  const result = await course.save();
  console.log(result);
}
async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}
// createCourse('Node Course', new Author({ name: 'Dee' }));
async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Deep';
  course.save();
}

updateAuthor('6212d23be27ff361cbcb930f');