const sql = require("../database/db_connect");


let group_search = (req, res, next) => {
  console.log("group_search 함수 호출됨");
  const sql2="select count(group_no) from `groups`";
    sql.pool.query(sql2,(err,rows,fields)=>{
     var maxno=rows[0]['count(group_no)']


    let paramlastnumber=req.body.last_number || req.query.last_number;   //last_number의 값을 받는다.
    console.log(paramlastnumber);
    //lownumber째 부터 highnumber째까지 데이터를 보내준다.
    let lownumber= maxno-paramlastnumber-5;                      
    console.log(lownumber);
    let highnumber= maxno-paramlastnumber-1;
    console.log(highnumber);
    
    const sql1 = "SELECT * FROM `groups` g, user u where "+lownumber+ "<= group_no and group_no <="+ highnumber+" and g.user=u.id ORDER BY group_no DESC;";
    
    console.log(sql1);
    sql.pool.query(sql1,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log("groups come");
        var array=[];
        rows.forEach((info) => {
          req.group_name = info.group_name;
          req.startdate =info.startdate;
          req.makeuser =info.user;
          req.makehost =info.host;
          req.category =info.category;
          req.content =info.content;
          req.deadline =info.deadline;
          req.group_no=info.group_no;
          
          req.name=info.name;

          array.push({
            id:req.group_no,
            title:req.group_name,
            date:req.startdate+"~"+req.deadline,
            deadline:req.deadline,
            writer:req.name,
            makehost:req.makehost,
            kind:req.category,
            content:req.content
            });
            req.array=array;
        })
        
      next();
      }
    });
  });
};


module.exports= {group_search};