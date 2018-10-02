enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.seri.scan');
  let out=0;
  enn.seri.scan(['a','b','c','d','e'],(idx,val,next,end)=>{
    enn.timer(()=>{
      test((idx==0) && (out==idx) && (
        val==='a'
      ) || (idx==1) && (out==idx) && (
        val==='b'
      ) || (idx==2) && (out==idx) && (
        val==='c'
      ) || (idx==3) && (out==idx) && (
        val==='d'
      ));
      out++;

      if(2 < idx){
        end(val);
      }
      next(val);
    },170);
  }).run((val)=>{
    test(val==='d');
    /*test(val[0]==='a'
      && val[1]==='b'
      && val[2]==='c'
      && val[3]==='d'
      && val.length==4);*/
    end();
  });

},5);

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.seri.rmap.scan');
  let out=0;
  enn.seri.rmap.scan(['a','b','c','d','e'],(idx,val,next,end)=>{
    enn.timer(()=>{
      test((idx==0) && (out==idx) && (
        val==='a'
      ) || (idx==1) && (out==idx) && (
        val==='b'
      ) || (idx==2) && (out==idx) && (
        val==='c'
      ) || (idx==3) && (out==idx) && (
        val==='d'
      ));
      out++;

      if(2 < idx){
        end(val);
      }
      next(val);
    },170);
  }).run((val)=>{
    test(val[0]==='a'
      && val[1]==='b'
      && val[2]==='c'
      && val[3]==='d'
      && val.length==4);
    end();
  });

},5);

