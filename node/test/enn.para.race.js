enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.para.race');
  let cnt=0;
  enn.para.race((rec,cnsm,cmmt)=>{
    enn.timer(()=>{
      test(cnt==1);
      rec.set('a','b');
      cnt++;
      cnsm();
    },200);
  }).race((rec,cnsm,cmmt)=>{
    enn.timer(()=>{
      test(cnt==2);
      cnt++;
      cmmt('x');
      cnsm();
    },400);
  }).race((rec,cnsm,cmmt)=>{
    enn.timer(()=>{
      test(cnt==0);
      cnt++;
      cnsm();
    },170);
  }).run((rec,val)=>{
    rec.see('a',(val)=>{
      test(val==='b');
    });
    test(val==='x');
    end();
  });

},5);
