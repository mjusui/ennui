enn=require('../lib/ennui.js');


console.log(
  enn.http.get({
    host:'localhost',
  })
);

console.log(
  enn.http.get({
    user:'user',
    pass:'pass',
    host:'localhost',
  })
);

console.log(
  enn.http.get({
    auth:'username:password',
    host:'localhost',
  })
);
