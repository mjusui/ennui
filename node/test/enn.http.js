const enn=require('../lib/ennui.js');


enn.clust('thread',1).mast((clust)=>{
  enn.asrt((test,end,cmnt)=>{
    const url=enn.http.get({
      prot:'http',
      user:'mjusui',
      pass:'password',
      host:'masquerade.ninja',
      path:'/a/b/c',
      para:{
        'a':'a',
        'b':'b'
      }
    });
    cmnt(`enn.http.get ${url}`);
    test(
      url==='http://mjusui:password@masquerade.ninja/a/b/c?a=a&b=b');
      
    end();
  });


  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.http.get');

    process.on('exit',end);

    enn.timer(()=>{
      enn.http.get({
        prot: 'http:',
        host: 'localhost',
        path: '/v1/test/x',
        para: {
          a: 'a',
          b: 'b',
        },
        port: 40080
      },(body)=>{
        const json=enn.obj(body);
        test(json.stat==='200');
        test(json.msg==='ok');
        test(json.data.test===true);
        end();
      });
    },1000);

  },3);
}).slav((clust)=>{
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.http.serv');

    const resp=enn.http.resp({
      'Content-Type': 'application/json'
    });

    const serv=enn.http.serv((req,res,opt)=>{
      test(true);
    }).def((req,res,opt)=>{
      test(!(opt.path==='/v1/test/x'));
    }).post('/v1/test/x',(req,res,opt)=>{
      test(false);
    }).get('/v1/test',(req,res,opt)=>{
      test(opt.path==='/v1/test/x');
      test(opt.para.a==='a');
      test(opt.para.b==='b');
      test(opt.me==undefined);
    },true).get('/v1/test/x',(req,res,opt)=>{
      test(opt.path==='/v1/test/x');
      test(opt.para.a==='a');
      test(opt.para.b==='b');
      test(opt.me==true);

      resp(res)
      .stat(200,'ok')
      .head()
      .json({
        test: true
      });

        
      test(res.getHeader(
        'Content-Type'
      )==='application/json');

      opt.end();
      
      end();
      serv.close();
      clust.worker.disconnect();
    }).get('/v1/test/x',(req,res,opt)=>{
      test(false);
    }).lstn(40080);

  },10);
});

