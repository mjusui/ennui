/*
const http=require('http');
const https=require('https');
*/
const url=require('url');
const qs=require('querystring');
const fs=require('fs');
const src=`${__dirname}/ennui.client.js`;
const dst=`${__dirname}/ennui.server.js`;

let ennui=fs.readFileSync(src,{
  encoding:'utf8',
});
ennui+='module.exports=enn;'

fs.writeFileSync(dst,ennui);

const undef=[
  'elem',
  'make',
  'clas',
  'deco',
  'http',
];
const enn=require(dst);
enn.itrt(undef,(idx,name)=>{
  enn[name]=undefined;
});

enn.http={};
enn.http.req=(method,opt,dry=false)=>{
  const o={};
  o.protocol=opt.protocol||opt.prot||'https:';
  o.protocol=o.protocol.replace(/\/\/$/,'');
  o.hostname=opt.hostname||opt.host||opt.dman;
  o.family=opt.family;
  o.port=opt.port;
  o.localAddress=opt.localAddress;
  o.method=method;
  o.method=o.method.toUpperCase();
  o.path=opt.path;
  if(o.method==='GET'&&opt.para){
    o.path+=`?${qs.stringify(opt.para)}`;
  }
  if(opt.hash){
    o.path+=opt.hash;
  }
  o.headers=opt.headers||opt.header;
  o.auth=opt.auth;
  if((opt.user||opt.username)&&(opt.pass&&opt.password)){
    let auth=opt.user||opt.username;
    auth+=':';
    auth+=opt.pass||opt.password;
    o.auth=auth;
  }
  o.agent=opt.agent;
  o.timeout=opt.timeout||opt.time||opt.millisecond||opt.milli;
  if(opt.second||opt.sec){
    let t=opt.second||opt.sec;
    o.timeout=t*1000;
  }
  if(opt.minute||opt.min){
    let t=opt.minute||opt.min;
    o.timeout=t*60*1000;
    o.timeout=o.timeout||0;
    o.timeout+=t;
  }

  if(dry){
    let url=o.protocol+'//';
    url+=o.auth||'';
    url+=o.hostname||'';
    if(o.port){
      url+=':'+o.port;
    }
    url+=o.path||'';
    url+=o.hash||'';
    return url;
  }
  let http=require('http');
  if(o.protocol==='https:')
    http=require('https');

  const req=http.request(o,(res)=>{
    let body='';
    res.on('data',(chunk)=>{
      body+=chunk;
    });
    res.on('end',()=>{
      opt.hndl(body);
    });
  });
  req.on('error',(e)=>{
    console.log(e.message);
  });
  let body=null;
  if(o.method!=='GET'&&opt.para){
    body=qs.stringify(opt.para);
    req.write(body);
  }
  req.end();
};
enn.http.get=(opt,dry)=>{
  return enn.http.req('get',opt,dry);
};
enn.http.put=(opt,dry)=>{
  return enn.http.req('put',opt,dry);
};
enn.http.post=(opt,dry)=>{
  return enn.http.req('post',opt,dry);
};
enn.http.delete=(opt,dry)=>{
  return enn.http.req('delete',opt,dry);
};

module.exports=enn;
