const express = require("express");

const app = express();
const port = process.env.PORT || 5000; //5000포트

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/signup', (req, res)=>{
  console.log(req.body);
});

//app.get의 첫 번째 인자는 path, 두 번째 인자는 callback함수로써
// 화면에 보여줄 때는 res인자를 사용하여 클라이언트한테 보내준다.
app.listen(port, () => console.log(`Listening on port ${port}`));
//app.listen(port번호, callback함수) 포트번호에 맞게 서버를 열게한다.