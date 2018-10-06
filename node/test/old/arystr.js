enn=require('../lib/ennui.js');

const l=10**4;

let a=[]
let s1=' '
let s2=' '
enn.bench(()=>{
  enn.loop(l,(c)=>{
    a.push(c);
  });
});
enn.bench(()=>{
  enn.loop(l,(c)=>{
    s1+=`${c} `;
  });
});
enn.bench(()=>{
  enn.loop(l,(c)=>{
    s2=`${s2}${c} `;
  });
});



enn.bench(()=>{
  console.log(a.length);
    
});
enn.bench(()=>{
  console.log(
    s1.match(/ /g).length-1);
});


enn.bench(()=>{
  enn.loop(l,(c)=>{
    enn.scan(a,(idx,val,end)=>{
      if(c==val){
        a.splice(idx,1);
      }
    });
  });
});
enn.bench(()=>{
  enn.loop(l,(c)=>{
    s1=s1.replace(` ${c} `,' ');
  });
});

enn.bench(()=>{
  console.log(
    a.length);
});
enn.bench(()=>{
  console.log(
    s1.match(/ /g).length-1);
});
