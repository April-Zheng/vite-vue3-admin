import{d as h,b9 as k,aV as x,ba as E,z as v,o as S,k as U,B as e,$ as s,a0 as u,u as o,a1 as B}from"./index-JDPg3R77.js";/* empty css                        */import"./el-input-gxjmX-Ga.js";import"./el-select-pXAU1ao9.js";import{b as P,E as T,a as M}from"./index-7pHIMl6B.js";import"./_initCloneObject-fNES3WrB.js";const j=h({__name:"index",setup(N){const d=()=>{console.log("click")},n=k(),c=x(),{list:m=[],total:g,params:a}=E(n),_=()=>n.fetchUserList(a.value),b=()=>c.push("/system/users/add"),f=l=>{n.setParams({...a.value,pageSize:l})},z=l=>{n.setParams({...a.value,page:l})};return v(()=>{_()}),(l,r)=>{const p=B,t=P,C=T,y=M;return S(),U("div",null,[e(p,{type:"primary",onClick:b},{default:s(()=>[u("新增用户")]),_:1}),e(C,{data:o(m),style:{width:"100%"}},{default:s(()=>[e(t,{fixed:"",prop:"date",label:"Date"}),e(t,{prop:"name",label:"Name"}),e(t,{prop:"age",label:"Age"}),e(t,{prop:"city",label:"City"}),e(t,{prop:"address",label:"Address"}),e(t,{prop:"zip",label:"Zip"}),e(t,{fixed:"right",label:"Operations"},{default:s(()=>[e(p,{link:"",type:"primary",size:"small",onClick:d},{default:s(()=>[u("Detail")]),_:1}),e(p,{link:"",type:"primary",size:"small"},{default:s(()=>[u("Edit")]),_:1})]),_:1})]),_:1},8,["data"]),e(y,{class:"mt20",background:!0,"current-page":o(a).page,"onUpdate:currentPage":r[0]||(r[0]=i=>o(a).page=i),"page-size":o(a).pageSize,"onUpdate:pageSize":r[1]||(r[1]=i=>o(a).pageSize=i),"page-sizes":[10,20,50,100],layout:"total, sizes, prev, pager, next, jumper",total:o(g),onSizeChange:f,onCurrentChange:z},null,8,["current-page","page-size","total"])])}}});export{j as default};
