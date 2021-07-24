const express = require('express')
const app = express()
const port = 3000

const connect=require('./database');
connect();

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'));


// const goodsRouter = require("./routers/goods");
// app.use("/api", [goodsRouter]);

// const goodsRouter=require('./routes/goods')
// app.use('/goods',goodsRouter)
// const usersRouter=require('./routes/user')
// app.use('/user',usersRouter)

app.use((req, res, next) => {
  console.log(req);
  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
  let name = req.query.name;
  res.render('test', {name});
})
app.get('/home',(req,res)=>{
  res.render('index');
})

app.get('/detail',(req,res)=>{
  
  res.render('detail');
})

app.get('/cart',(req,res)=>{
  res.render('cart')
})

app.get('/order',(req,res)=>{
  res.render('order')
})


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})