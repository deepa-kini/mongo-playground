const mongoose = require('mongoose');
const config = require('config');


const password = config.get('db.password');
const dbConnect = `mongodb+srv://root:${password}@playground.mryia.mongodb.net/playground?retryWrites=true&w=majority`
mongoose.connect(dbConnect)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('error', err.message));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network']
  },
  author: String,
  tags: {
    type: [String],
    isAsync: true,
    validate: {
      validator: v => Promise.resolve(v && !!v.length),
      message: 'A course should have at least one tag'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () { return this.isPublished; },
    min: 10,
    max: 200
  }
});
const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
  const course = new Course({
    name: 'My MongoDB Examples',
    category: 'web',
    author: 'Self',
    tags: [],
    isPublished: true,
    price: 15
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (let field in ex.errors) {
      console.log(ex.errors[field]);
    }
  }

}

createCourse();

async function getCourses() {
  // /api/courses?pageNumber=2&pageSize=10
  const courses = await Course
    .find({ name: /.*ples.*/ })
    .sort({ name: 1 })
    .select(['name'])
  console.log('courses', courses);
}
// getCourses();

// async function updateCourse(id) {
//   // const course = await Course.findById(id);
//   const course = await Course.updateOne({
//     _id: id
//   }, {
//     isPublished: true,
//     author: 'Self again'
//   });
//   if (!course) return;

//   // course.isPublished = true;
//   // course.author = 'Another';
//   // course.set({
//   //   isPublished: true,
//   //   author: 'Another author'
//   // });
//   // const result = await course.save();
//   console.log('Updated:', course)
// }

// updateCourse('620b13123bcf1aba2cc7faa1');

// async function removeCourse(id) {
//   const course = await Course.deleteOne({
//     _id: id
//   });
//   console.log(course);
// }
// removeCourse('620b13123bcf1aba2cc7faa1');