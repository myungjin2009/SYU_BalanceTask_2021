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

        const groups=mongoose.model('groups',{
            group_name: {
                type: String,
                required: true,
                unique: true,
              },
              group_images: {
                type: String,
              },
              startdate: {
                type: Date,
                required: true,
              },
              percentage: {
                type: Number,
              },
              group_chatting: {
                type: String,
              },
              group_calendar: {
                type: String,
              },
              user: {
                type: String,
              },
              enjoy: {
                type: Boolean,
              },
              host: {
                type: String,
              },
              manager: {
                type: String,
                required: true,
              },
              complete: {
                type: Boolean,
              },
              category: {
                type: String,
                required: true,
              },
              content: {
                type: String,
                required: true,
              },
              host_images: {
                type: String,
              },
              deadline: {
                type: Date,
                required: true,
              }
        });
        const groupUser=mongoose.model('groupUser',{
            group_name: {
            type: String,
            required: true,
            unique: true,
          },
          user: {
            type: String,
            required: true,
            unique: true,
          }});
        const groupBoard=mongoose.model('groupBoard',{ 
            board_number: {
            type: Number,
            required: true,
            unique: true,
          },
          image: {
            type: String,
          },
          file: {
            type: String,
          },
          text: {
            type: String,
            required: true,
          },
          info_user: {
            type: String,
            required: true,
          },
          info_groupname: {
            type: String,
            required: true,
            unique: true,
          },
          date: {
            type: Date,
            required: true,
          },
          notice: {
            type: Number,
            required: true,
          }});
        const groupCalendar=mongoose.model('groupCalendar',{
            process: {
            type: Number,
            required: true,
            unique: true,
          },
          group_name: {
            type: String,
            required: true,
            unique: true,
          },
          date: {
            type: Date,
            required: true,
          },
          do_text: {
            type: String,
            required: true,
          },
          writer: {
            type: String,
            required: true,
          },
          deadline: {
            type: Date,
            required: true,
          }});
        const vote=mongoose.model('vote',{
            board_number: {
                type: Number,
                required: true,
                unique: true,
              },
              discuss: {
                type: Number,
              },
              user: {
                type: String,
              },
              group: {
                type: String,
                required: true,
              }
          });
          const chat=mongoose.model('chat',{
            chat_date: {
                type: Date,
                required: true,
              },
              chat_id: {
                type: String,
                required: true,
              },
              profile: {
                type: String,
              },
              group_name: {
                type: String,
                required: true,
                unique: true,
              },
              chat_content: {
                type: String,
                required: true,
              }});
            const friends=mongoose.model('friends',{
            user: {
                type: String,
                unique: true
              },
              friend: {
                type: String,
                required: true
              },
              friend_introduce: {
                type: String
              }});

            //  let newuser=user({
            //      id:'1234'
            //    });

            //   newuser.save().then((doc)=>{
            //        console.log('Saved${doc}');
            //    });
    }catch(e){
        console.log(e);
    }
})()