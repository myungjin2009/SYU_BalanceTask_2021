const mongoose = require("mongoose");
//const user = require("./user");
const url='mongodb://localhost:27017/groups';

(async function(){
    try{
        await mongoose.connect(url);
    
        const user=mongoose.model('user',{
            id: {
                type: String,
                required: true,
                unique: true
              },
              name: {
                type: String,
                //required: true,
                unique: true
              },
              password: {
                type: String,
               // required: true,
                unique: true
              },
              phone: {
                type: String,
                //required: true,
                unique: true
              },
              evaluation_score: {
                type: Number
              },
              agreement: {
                type: Boolean,
               // required: true,
              },
              evaluation_text: {
                type: String
              },
              clear_group: {
                type: Number,
              },
              user_image: {
                type: String,
                //required: true,
              },
              introduce: {
                type: String,
                //required: true,
              },
              user_category: {
                type: String,
              }
              });

        const user=mongoose.model('user',{});
        const user=mongoose.model('user',{});
        const user=mongoose.model('user',{});
        const user=mongoose.model('user',{});
        const user=mongoose.model('user',{});

            //   let newuser=user({
            //       id:'1234'
            //   });

            //   newuser.save().then((doc)=>{
            //       console.log('Saved${doc}');
            //   });
    }catch(e){
        console.log(e);
    }
})()