enn=require('../lib/ennui.js');

const done=enn.cach()
.def(undefined)
.pub(true)
/*.sub((k,v)=>{
  console.log(`${k} ${v}`);
},'a')*/.prob((c)=>{
  c.set('a','a')
    .done((c)=>{
      console.log(c.get('a'));
    }).gone((c)=>{
      console.log(`^${c.get('a')}`);
    });
}).prob((c)=>{
  c.val('a','x');
  c.done((c)=>{
    console.log(c.get('a'));
  }).gone((c)=>{
    console.log(`^${c.get('a')}`);
  }).done((c)=>{
    console.log(c.get('a'));
  }).prob((c)=>{
    c.set('a','b')
      .done((c)=>{
        console.log(c.get('a'));
      }).gone((c)=>{
        console.log(`^${c.get('a')}`);
      });
  });
}).set('a','c')
.done((c)=>{
  console.log(c.get('a'));
}).gone((c)=>{
  console.log(`^${c.get('a')}`);
});

