const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String, 
    authors: [authorSchema] // embedded Author inside Course document
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    }
);

const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
} 

async function updateAuthor(courseId){
    const course = await Course.updateOne({_id: courseId}, {
        $unset: {
            'author': ''
        }
    })
} 

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId); 
    course.authors.push(author); 
    course.save();
} 

// addAuthor('6527ef06123caa131f469f8a', new Author({ name: 'Any' })) 

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId); 
    const index = course.authors
    .findIndex(author => author.id==authorId)
    course.authors.splice(index, 1); 
    course.save(); 
    
 } 
removeAuthor('6527f419854796abb8e14417', '6527f419854796abb8e14415')

// updateAuthor('6527ea017b9f3f8cb307dc02');

// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }) ,
//     new Author({ name: 'John' }) ,
// ]
// );
 