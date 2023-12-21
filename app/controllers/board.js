// Url과 컨트롤러 연결을 위한 라우터 작성

const express = require('express');
const router = express.Router();

const boardController = require('../controllers/board');

router.post('/', boardController.createPost);

module.exports = router;

// 댓글 Create 메인 코드

const User = require('../schemas/user');

exports.createPost = async (req, res) => {
    try {
        const { userid, content, date } = req.body;
        const newPost = {
            userid: userid,
            content: content,
            date: date
        };
        if (req.isAuthenticated()) {
            const snsId = req.user.id;
            const user = await User.findById({ _id: snsId }).exec();
            if (user) {
                user.board.push(newPost);
                await user.save();
                res.json({ success: true, message: '댓글이 성공적으로 등록되었습니다!' });
            }
        } else {
            res.json({ success: false, message: '사용자 정보가 잘못되었습니다.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '댓글 등록 중 오류가 발생했습니다.' });
    }
};

// 클라이언트 측에서 데이터 전달

const createButton = document.getElementById('create-button');

createButton.addEventListener('click', createPost);

function createPost() {
    // 유저 아이디와 내용, 날짜를 가져오기
    const userid = document.getElementById('userid').value;
    const content = document.getElementById('content').value;
    const date = document.getElementById('date').value;

    // 데이터를 서버로 전달
    const requestData = {
        userid: userid,
        content: content,
        date: date
    };

    fetch('/board', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                alert(res.message);
                location.href = 'main';
            } else {
                alert(res.message);
            }
        })
        .catch((err) => console.error('에러 발생' + err));
}

// 요청 라우팅 코드 추가

const boardController = require('../controllers/board');

router.post('/', boardController.createPost);
router.delete('/delete-post/:postId', boardController.deletePost);

module.exports = router;

// 삭제 과정을 위한 컨트롤러 코드 추가

if (req.isAuthenticated()) {
    const snsId = req.user.id;
    const user = await User.findById({ _id: snsId }).exec();
    const id = req.user.id;
    const user = await User.findById({ _id: id }).exec();
    if (user) {
        user.board.push(newPost);
        await user.save();

exports.createPost = async (req, res) => {
res.status(500).json({ success: false, message: '댓글 생성 중 오류가 발생했습니다.' });
}
};
};

exports.deletePost = async (req, res) => {
const postId = req.params.postId;

try {
const id = req.user.id;
const user = await User.findById({ _id: id }).exec();
user.board.remove({_id: postId});
await user.save();
res.json({success: true, message:'댓글이 삭제되었습니다.'});
} catch (err) {
res.json({success: false, message:'실패!'});
console.error(err);
}
};

// 프론트에서 서버에 HTTP 요청 전송 기능 추가

const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach((button) => {
    const postId = button.getAttribute('data-post-id');
    button.addEventListener('click', () => deletePost(postId));
});

function deletePost(postId) {
    fetch(`/board/delete-post/${postId}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                alert(res.message);
                location.href = 'main';
            } else {
                alert(res.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}