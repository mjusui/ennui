enn=require('../ennui.js')


const serv=enn.http.serv(
  (req,res,end)=>{
     enn.itrt(req,(name,val)=>{
       console.log(`${name}:`);
       if(
          enn.type(val,'o')
       ){
          console.log('Object');
       }else{
          console.log(val);
       }
     });
     //console.log(res); 
  }
).get('/a',(req,res,opt)=>{
  console.log('/a');
}).get('/a',(req,res,opt)=>{
  console.log('/a:true');
},true).get('/a/b',(req,res,opt)=>{
  console.log('/a/b');
}).get('/a/b/c',(req,res,opt)=>{
  console.log('/a/b/c');
}).lstn(3000);
