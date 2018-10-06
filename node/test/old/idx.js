enn=require('../lib/ennui.js');

const l=10**7;

const a1=[];
const a2=[];
enn.loop(l,(cnt)=>{
  a1[cnt]=cnt;
});
enn.loop(l,(cnt)=>{
  a2[cnt]=cnt;
});
enn.loop(l,(cnt)=>{
  a2[l+cnt]=l+cnt;
});

/*const r=enn.rand(7);
console.log(r);*/
enn.bench(()=>{
  console.log(a2.length);
  console.log(a2[l-2]);
});
enn.bench(()=>{
  console.log(a1.length);
  console.log(a1[l-2]);
});
