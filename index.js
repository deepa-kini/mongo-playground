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


async function createCourse() {
  const course = new Course({
    name: 'My MongoDB Examples',
    author: 'Self',
    tags: ['mongo', 'database', 'backend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
