const os=require('os');
const enn=require('../lib/ennui.js');


enn.clust('cpu',{ ht: 2 }).mast((clust)=>{
  const core=os.cpus().length / 2;
  const pass=6*core + 3;
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.clust.os.master');
    test(clust.isMaster);
    test(clust.worker==undefined);

    clust.on('exit',(work,code,signal)=>{
      test(work.id < core+1);
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


  },pass);
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

