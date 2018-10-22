enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.schm');
  const schm=enn.schm('/v1/a','name','val')
    .schm('/v1/b','name','val','aname')
  .end();

  schm.base('n')
  .path('/v1/a',(all,one,end)=>{
    end();
  }).path('/v1/b',()=>{
    test(false);
  });

  schm.base('x')
  .path('/v1/c',(all,one)=>{
    test(false);
  }).path('/v1/a',(all,one)=>{
    all.sat('p',one,{
      name:'p',
      val:'pval',
      etc:'etc',
    }).tak('p',(val)=>{
      val.tak('name',(val)=>{
        test(val==='p');
      }).tak('val',(val)=>{
        test(val==='pval');
      }).tak('etc',(val)=>{
        test(false);
      },()=>{
        test(true);
      });
    },()=>{
      test(false);
    });
  }).path('/v1/b',(all,one)=>{
    all.sat('q',one,{
      name:'q',
      val:'qval',
      aname:'pval',
      etc:'etc',
    }).tak('q',(val)=>{
      val.tak('name',(val)=>{
        test(val==='q');
      }).tak('val',(val)=>{
        test(val==='qval');
      }).tak('aname',(val)=>{
        test(val==='pval');
      }).tak('etc',(val)=>{
        test(false);
      },()=>{
        test(true);
      });
    },()=>{
      test(false);
    });

  });


  end();
},7);
