const mongoose = require("mongoose");

const connect = () => {
   // 개발 환경에서만 콘솔로 몽구스가 생성하는 쿼리 내용 확인이 가능하도록 하는 코드
   if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
   }

   // 몽구스와 몽고디비를 연결하는 코드
   mongoose.connect(
      "mongodb://hyerin:126006*@127.0.0.1:27017/admin",
      {
         dbName: "nodejs",
         useNewUrlParser: true,
      },
      ).then((res) => {
         console.log('몽고디비 연결 성공');
       }).catch((err) => {
         console.log('몽고디비 연결 에러', error);
       });
};

// 몽구스 커넥션에 이벤트 리스너를 달아준 것 
// 에러 발생 시 에러 내용 기록, 연결 종료 시 재연결 시도
mongoose.connection.on("error", (error) => {
   console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
   console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
   connect(); //시도!!!
});

module.exports = connect;