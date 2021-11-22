const sql = require("../database/db_connect");
const fs=require("fs");
var express = require('express');
var router = express.Router();
var app = express();
const multer = require("multer");
const upload = multer({dest: './upload'});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { cb(null, './upload')  },
    filename: function (req, file, cb) { cb(null, file.originalname)} 
  })
  
  
 // const upload = multer({ storage: storage });



let group_update= (req, res, next) => {
    console.log("groupupdate 함수 호출됨");
    console.log(req.body);
    console.log("req.files:"+req.files);

    var paramgroup_name = req.body.groupName || req.query.groupName;
    //var paramgroup_images= `/image/${req.file.filename}`;
	let paramgroup_images=[];
    var paramhost = req.body.host || req.query.host;
    var paramstartdate = req.body.start || req.query.start;
    var paramdeadline = req.body.end || req.query.end;
    var parammanger= req.body.manager || req.query.manager;
    var paramcategory = req.body.category  || req.query.category ;
    var paramcontent = req.body.content || req.query.content;
	var paramhighlight=req.body.highlight || req.query.highlight;
    var paramad_image=req.body.ad_image || req.query.ad_image;
    var paramteam_image=req.body.team_image || req.query.team_image;
	var paramjwt=req.cookies.user; 
	
	for(i=0;i<req.files.length;i++){
		paramgroup_images.push(`/image/${req.files[i].filename}`);
        console.log("req.files"+i+".filename:"+req.files[i].filename);
	}

    console.log( paramgroup_images);

    if(paramgroup_images.length===0){
        paramgroup_images.push(paramad_image);
        paramgroup_images.push(paramteam_image);
    }

    if(paramgroup_images.length===1){
        if(paramad_image=null){
        //paramgroup_images.push(paramad_image);
        paramgroup_images.push(paramteam_image);
        }

        if(paramteam_image=null){
            //paramgroup_images.push(paramad_image);
            paramgroup_images[1]=paramgroup_images[0];
            paramgroup_images[0]=paramad_image;
        }
    }

    // if(paramgroup_images.length===1){
    //     paramgroup_images=req.body.image;
    // }
    
    //var sql1="update `groups` set (group_name,category,startdate,deadline,highlight,host,manager,content,group_images)=('"+paramgroup_name+"','"+paramcategory+"',"+paramstartdate+","+paramdeadline+",'"+paramhighlight+"','"+paramhost+"','"+parammanger+"','"+paramcontent+"','"+paramgroup_images+"') where group_name='"+paramgroup_name+"');"
    var sql1="update `groups` set group_name='"+paramgroup_name+"',category='"+paramcategory+"',startdate='"+paramstartdate+"',deadline='"+paramdeadline+"',highlight='"+paramhighlight+"',host='"+paramhost+"',manager='"+parammanger+"',content='"+paramcontent+"',group_images='"+paramgroup_images+"' where group_no='"+req.body.board_number+"';"

    sql.pool.query(sql1,(err,rows,fields)=>{
        if (err) {
            console.log(err);
          } else {
            console.log("성공");

          }
    })   
    next();
}
   


module.exports= {group_update};