const enn=require('../lib/ennui.js');


enn.clust('thread',2)
.mast((clust)=>{
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.clust.master');
    test(clust.isMaster);
    test(clust.worker==undefined);

    clust.on('exit',(work,code,signal)=>{
      test(work.id==1 || work.id==2);
      test(code==0);
      test(signal==null);
    });
    process.on('exit',(code)=>{
      test(code==0);
      end();
    });

    enn.itrt(
      clust.workers,
    (id,work)=>{
      work.on('message',(msg)=>{
        test(msg===`slave${id}`);
      });
      test(work.send('test'));
    });


  },15);
}).slav((clust)=>{
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.clust.slave');
    test(clust.isWorker);
    test(clust.worker);


    clust.worker.on('message',(msg)=>{
      test(msg=='test');
      clust.worker.send(
        `slave${clust.worker.id}`);
    });
    process.on('message',(msg)=>{
      test(msg=='test');
      clust.worker.send(
        `slave${clust.worker.id}`);

      end();
      clust.worker.disconnect();
    });
  },4);
});

