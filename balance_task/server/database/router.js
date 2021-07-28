// const db = require("balance_taskserverdatabaseconfig.js");
const { Router } = require("express");
const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("balance_taskclientsrc\routesSignup.js", (req, res, next) => {
  const param = [req.body.email, req.body.pw, req.body.name];

  bcrypt.hash(param[1], saltRounds, (error, hash) => {
    param[1] = hash;
    // db.query('INSERT INTO user('email','pw','name') VALUES (?,?,?)' ,param , (err, row) =>{
    //     if(err) console.log(err)
    // })
  });
  res.end();
});
