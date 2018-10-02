enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.para.scan');
  let out=4;
  enn.para.scan(['a','b','c','d','e'],(idx,val,cnsm,cmmt)=>{
    enn.timer(()=>{
      test((out==idx) && (idx==4) && (
        val==='e'
      ) || (out==idx) && (idx==3) && (
        val==='d'
      ) || (out==idx) && (idx==2) && (
        val==='c'
      ) || (out==idx) && (idx==1) && (
        val==='b'
      ) || (out==idx) && (idx==0) && (
        val==='a'
      ));
      out--;
      if(idx < 2){
        cmmt(val);
      }
      cnsm(val);
    },480/(idx+1) );
  }).run((val)=>{
    test(val=='b');
    end();
  });

},5);

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.para.rmap.scan');
  let out=4;
  enn.para.rmap.scan(['a','b','c','d','e'],(idx,val,cnsm,cmmt)=>{
    enn.timer(()=>{
      test((out==idx) && (idx==4) && (
        val==='e'
      ) || (out==idx) && (idx==3) && (
        val==='d'
      ) || (out==idx) && (idx==2) && (
        val==='c'
      ) || (out==idx) && (idx==1) && (
        val==='b'
      ) || (out==idx) && (idx==0) && (
        val==='a'
      ));
      out--;
      if(idx < 2){
        cmmt(val);
      }
      cnsm(val);
    },480/(idx+1) );
  }).run((val)=>{
    test(val[0]=='e'
      && val[1]=='d'
      && val[2]=='c'
      && val[3]=='b'
      && val.length==4);
    end();
  });

},5);

