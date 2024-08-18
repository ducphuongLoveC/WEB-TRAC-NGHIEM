
const levelRoute = require('./levels');
const subjectRoute = require('./subject');
const typeExamtRoute = require('./typeExam');
const userRoute = require('./user');
const testRoute = require('./Test');

const examResultRoute = require('./examResult');

const route = (app) => {
    app.use('/api/level', levelRoute)
    app.use('/api/subject', subjectRoute)
    app.use('/api/type_exam', typeExamtRoute)
    app.use('/api/user', userRoute)
    app.use('/api/test', testRoute)
    app.use('/api/exam_result', examResultRoute)
}
module.exports = route;