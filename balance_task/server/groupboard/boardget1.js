const sql = require("../database/db_connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();



let boardget1 = (req, res, next) => {
  console.log("boardget 함수 호출됨");
  var urlgroup=req.body.group;
  
  const sql2="select max(board_number) from groupboard where info_groupname=?";
    sql.pool.query(sql2,urlgroup,(err,rows,fields)=>{
    var maxno=rows[0]['max(board_number)']
    const array=[];
    //console.log(req.body.group);
    let paramlastnumber=req.body.last_number;
    //let urlgroup="한양대 프로젝트";
    let mygroup=req.body.group;
    var num=0;
    // for(var i=0;i<mygroup.length;i++){
    //   console.log(mygroup[i]);
    //   if(urlgroup===mygroup[i].group){
    //     num=1;
    //   }
    // }
    // console.log(num);
    // if(num==1){
    //   console.log("본인이 속한 그룹입니다.");
    // }else{
    //   return;
    // }

    console.log(paramlastnumber);
    

    //lownumber째 부터 highnumber째까지 데이터를 보내준다.
    let lownumber=maxno-paramlastnumber-10;
    if(lownumber<=0){
      lownumber=0;
    }
    console.log(lownumber);
    let highnumber=maxno-paramlastnumber-1;
    if(highnumber<=0){
      highnumber=0;
    }
    console.log(highnumber);
    
    const sql1 = "SELECT * FROM groupboard, user where user.id=groupboard.info_user and "+ lownumber+ "<= groupboard.board_number and groupboard.board_number<="+ highnumber+" and groupboard.info_groupname='"+urlgroup+"' order by groupboard.board_number desc;"
    //const sql2 = "SELECT * FROM vote; ";
    console.log(sql1);
    sql.pool.query(sql1,(err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
        console.log("boardget come");
        
        rows.forEach((info,index,newarray) => {
          
          // if(info.notice===0){
          //console.log(newarray);  
            req.name=info.name;
            req.board_number = info.board_number;
            console.log(req.board_number);
            req.title = info.title;
            console.log( req.title );
            req.image =info.image.split(',');
            console.log( req.image );   
            req.file =info.file;
            req.text =info.text;
            console.log( req.text );
            req.info_user =info.info_user;
            req.info_groupname=info.info_groupname;
            req.date =info.date;
            req.profileimage=info.user_image;
            if(req.profileimage=="DEFAULT"){
              req.profileimage=['/image/profile_sample.jpg']
            }
           
            array.push({
              id: req.board_number,
              group:req.info_groupname,
              photo_name:req.title,
              date:info.date,
              //deadline:req.deadline,
              profileImage:req.profileimage,
              user_name:req.name,
              content:req.text,
              image:req.image,
              file:req.file,
              kind:"timeLine",
              votes_list:null 
            });
            req.array=array;
            req.urlgroup=urlgroup;
          
          });
        
      }
      next()
      //console.log(array);
    });//sql
  });  
};

module.exports= {boardget1};
