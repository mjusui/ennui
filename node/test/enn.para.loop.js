enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.para.loop');
  let out=4;
  enn.para.loop(5,(cnt,cnsm,cmmt)=>{
    enn.timer(()=>{
      test(out==cnt);
      out--;
      if(cnt < 2){
        cmmt(cnt);
      }
      cnsm(cnt);
    },480/(cnt+1) );
  }).run((val)=>{
    test(val==1);
    end();
  });

},5);

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.para.rmap.loop');
  let out=4;
  enn.para.rmap.loop(5,(cnt,cnsm,cmmt)=>{
    enn.timer(()=>{
      test(out==cnt);
      out--;

      if(cnt < 2){
        cmmt(cnt);
      }
      cnsm(cnt);
    },480/(cnt+1) );
  }).run((val)=>{
    test(val[0]==4
      && val[1]==3
      && val[2]==2
      && val[3]==1
      && val.length==4);
    end();
  });

},5);

