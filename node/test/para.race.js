enn=require('../lib/ennui.js');

enn.para.race('a',(cnsm,cmmt)=>{
  console.log('a');
  enn.timer(()=>{
    cnsm('a');
  },1000);
}).race('b',(cnsm,cmmt)=>{
  console.log('b');
  enn.timer(()=>{
    cnsm('b');
  },1000);
}).race('c',(cnsm,cmmt)=>{
  console.log('c');
  enn.timer(()=>{
    cmmt('c');
    cnsm('c');
  },1000);
}).race('d',(cnsm,cmmt)=>{
  console.log('d');
  enn.timer(()=>{
    cnsm('d');
  },1000);
}).ready((rec,val)=>{
  console.log(`5. ${val}:${rec('a')}`);
});

