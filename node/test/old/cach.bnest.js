enn=require('../lib/ennui.js');

const l=10**5;

const c=enn.cach()
  .def(undefined)
  .pub(false);
enn.bench(()=>{
  enn.loop(l,(cnt)=>{
    c.bnest(cnt);
  });
});
