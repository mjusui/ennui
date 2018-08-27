enn=require('../lib/ennui.js');

enn.seri.rmap.rlay((next,end,val)=>{
  console.log(`1. ${val}`);
  enn.timer(()=>{
    next('a');
  },1000);
}).rlay((next,end,val)=>{
  console.log(`2. ${val}`);
  enn.timer(()=>{
    next('b');
  },1000);
}).rlay((next,end,val)=>{
  console.log(`3. ${val}`);
  end('c');
  enn.timer(()=>{
    next('c');
  },1000);
}).rlay((next,end,val)=>{
  console.log(`4. ${val}`);
  enn.timer(()=>{
    next('d');
  },1000);
}).ready((val)=>{
  console.log(`5. ${val}`);
});

