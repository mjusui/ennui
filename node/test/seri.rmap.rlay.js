enn=require('../lib/ennui.js');

enn.seri.rmap.rlay((rec,next,end)=>{
  console.log(`1. a:${rec('a')}`);
  enn.timer(()=>{
    next('a');
  },1000);
},'a').rlay((rec,next,end)=>{
  console.log(`2. b:${rec('a')}`);
  enn.timer(()=>{
    next('b');
  },1000);
}).rlay((rec,next,end)=>{
  console.log(`3. c:${rec('b')}`);
  end('c');
  enn.timer(()=>{
    next('c');
  },1000);
}).rlay((rec,next,end)=>{
  console.log(`4. ${rec('c')}`);
  enn.timer(()=>{
    next('d');
  },1000);
},'d').ready((rec,val)=>{
  console.log(`5. ${val}:${rec('a')}`);
});

