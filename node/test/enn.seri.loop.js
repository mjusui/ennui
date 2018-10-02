enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.seri.loop');
  let out=0;
  enn.seri.loop(5,(cnt,next,end)=>{
    enn.timer(()=>{
      test(out==cnt);
      out++;

      if(2 < cnt){
        end(cnt);
      }
      next();
    },170);
  }).run((val)=>{
    test(val==3);
    end();
  });

},5);

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.seri.rmap.loop');
  let out=0;
  enn.seri.rmap.loop(5,(cnt,next,end)=>{
    enn.timer(()=>{
      test(out==cnt);
      out++;

      if(2 < cnt){
        end(cnt);
      }
      next(cnt);
    },170);
  }).run((val)=>{
    test(val[0]==0
      && val[1]==1
      && val[2]==2
      && val[3]==3
      && val.length==4);
    end();
  });

},5);
