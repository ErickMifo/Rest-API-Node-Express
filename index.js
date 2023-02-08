const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return schema.validate(course);
}

app.get('/', (req, res) => {
    res.send('hallo');
});

app.get('/api/courses', (req, res) => {
 res.send(courses)
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');
    res.send(course)
});

app.post('/api/courses', (req,res) => {

    const { error } = validateCourse(req.body);

    if(error) {
        res.status(400).json({
            message: 'the request validation failed',
            details: error.details[0].message,
        });
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');

    const { error } = validateCourse(req.body);
    if(error) {
        res.status(400).json({
            message: 'the request validation failed',
            details: error.details[0].message,
        });
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.send(404).send('Course not found');

    const index = courses.indexOf;
    courses.splice(index, 1);

    res.send(course)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`foi em ${port}`);
});