enn=require('../lib/ennui.js');

enn.para.rmap.race((cnsm,cmmt)=>{
  console.log('a');
  enn.timer(()=>{
    cnsm('a');
  },1000);
},'a').race((cnsm,cmmt)=>{
  console.log('b');
  enn.timer(()=>{
    cnsm('b');
    cmmt('c');
  },1000);
}).race((cnsm,cmmt)=>{
  console.log('c');
  enn.timer(()=>{
    cnsm('c');
  },1000);
}).race((cnsm,cmmt)=>{
  console.log('d');
  enn.timer(()=>{
    cnsm('d');
  },1000);
}).ready((rec,val)=>{
  console.log(`5. ${val}:${rec('a')}`);
  console.log(`5. ${val}:${rec('b')}`);
});

