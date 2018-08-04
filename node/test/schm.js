enn=require('../lib/ennui.js');

const schm=enn.schm('a',(x)=>{
  return {
    val:x,
  };
}).schm('b',(y)=>{
  return {
    val:y,
  };
});
const scopa=schm.scop('a').add('ax','x')
.done((sc)=>{
  sc.see('ax',(val)=>{
    //console.log(`1.${val}`);
    console.log(`1.${val.get('val')}`);
  });
}).schm('c',(z)=>{
  return {
    val:z,
  };
}).add('cz','z')
.done((sc)=>{
  sc.see('cz',(val)=>{
    console.log(`2.${val.get('val')}`);
  });
});
const scopb=schm.scop('b').add('by','y')
.done((sc)=>{
  sc.see('by',(val)=>{
    console.log(`3.${val.get('val')}`);
  });
})
const scopa2=schm.scop('a').del('ax')
.done((sc)=>{
  sc.see('ax',(val)=>{
    console.log('4.failure');
  }).gone((sc)=>{
    console.log('5.success');
  });
});
