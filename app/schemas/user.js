const mongoose = require('mongoose');
const { Schema } = mongoose;
// 데이터베이스 테이블 만드는 과정

// 댓글 스키마
const commentSchema = new Schema({
    userid: String,
    content: String,
    date: int, // 2023-11-18... 인데... 음
});

// // 유저(user) 스키마
// const userSchema = new Schema({
//     snsId: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     nick: String,
//     board: [postSchema], // 중첩된 배열 형태로 postSchema를 포함
// });

module.exports = mongoose.model('User', userSchema);