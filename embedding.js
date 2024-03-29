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
  authors: [authorSchema]
}));
async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });
  const result = await course.save();
  console.log(result);
}
async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}
async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  // course.author.name = 'Deep';
  // course.save();
  await Course.updateOne({
    _id: courseId
  }, {
    $set: {
      'author.name': 'Dee'
    }
  });
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save()
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
  console.log('Removed Author', author);
}


// createCourse('Node Course', [
//   new Author({ name: 'Dee' }),
//   new Author({ name: 'Deeps' })
// ]);

// updateAuthor('6212d23be27ff361cbcb930f');

// addAuthor('6212dd484dfb0f794857133c', new Author({ name: 'Mame' }));
removeAuthor('6212dd484dfb0f794857133c', '6212dde1cec9f23142638d1d');