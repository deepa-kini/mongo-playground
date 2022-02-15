const mongoose = require('mongoose');
const config = require('config');


const password = config.get('db.password');
const dbConnect = `mongodb+srv://root:${password}@playground.mryia.mongodb.net/playground?retryWrites=true&w=majority`
mongoose.connect(dbConnect)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('error', err.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);


// async function createCourse() {
//   const course = new Course({
//     name: 'My MongoDB Examples',
//     author: 'Self',
//     tags: ['mongo', 'database', 'backend'],
//     isPublished: true
//   });

//   const result = await course.save();
//   console.log(result);

// }

// createCourse();

// async function getCourses() {
//   const pageNumber = 2;
//   const pageSize = 10;
//   // /api/courses?pageNumber=2&pageSize=10
//   const courses = await Course
//     .find({ name: /.*ples.*/ })
//     .skip((pageNumber - 1) * pageSize)
//     .limit(pageSize)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 })
//   console.log('courses', courses);
// }
// getCourses();

async function updateCourse(id) {
  // const course = await Course.findById(id);
  const course = await Course.updateOne({
    _id: id
  }, {
    isPublished: true,
    author: 'Self again'
  });
  if (!course) return;
  // course.isPublished = true;
  // course.author = 'Another';
  // course.set({
  //   isPublished: true,
  //   author: 'Another author'
  // });
  // const result = await course.save();
  console.log('Updated:', course)
}

updateCourse('620b13123bcf1aba2cc7faa1');