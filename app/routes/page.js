const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/page');

// passport index.js 의 deserializeUser 에서 반환한 데이터를 페이지 라우터에 전달하여
// 페이지에서 내 이름을 띄워 줄 수 있도록 함
router.use((req, res, next) => {
    res.locals.user = req.user; // res.locals에 저장된 데이터는 뷰 템플릿에서 접근할 수 있음
    next();
});

// 컨트롤러에 정의한 page render를 가져오는 과정
router.get('/', ctrl.output.login);
router.get('/main', ctrl.output.main);
router.get('/create', ctrl.output.create);
router.get('/update', async (req, res, next) => {
    try {
        const postId = req.query.postId;
        await ctrl.output.update(req, res, next, postId); // postId를 직접 전달
    } catch (err) {
        next(err);
    }
});

module.exports = router;