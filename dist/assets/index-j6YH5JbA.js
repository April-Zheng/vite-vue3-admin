import{d as T,r as c,F as O,q as R,G as q,o,c as m,g as r,$ as E,Y as w,w as v,a4 as f,a5 as _,a6 as x,P as B,a7 as V,a8 as $,b as y,_ as j,f as F,t as G}from"./index-HwAp1Sgz.js";import{v as M}from"./index.vue_vue_type_script_setup_true_lang-ZqGTr-CH.js";import"./el-table-column-DlQP8BAh.js";import"./el-input-BcCIhWv9.js";import{_ as U}from"./index.vue_vue_type_script_setup_true_lang-6JPnOzFC.js";import{E as H,a as Q,b as Y}from"./index-lxgOhWYl.js";import"./el-form-item-9eKxwmEK.js";import"./el-col-bK4UTpwO.js";import{g as J}from"./components-GavuHeLh.js";import"./_initCloneObject-AXSxnYM6.js";const K=T({__name:"index",props:{columns:{},pageConfig:{type:[Object,Boolean],default:{background:!0,pageSizes:[10,20,50,100],layout:"total, sizes, prev, pager, next, jumper"}},searchable:{type:Boolean,default:!0}},emits:["request"],setup(b,{emit:g}){const u=b,l=g,s=c([]),a=c(!1),C=c(0),p=u.pageConfig?{pageSize:10,page:1}:{};let t=c(p);const S=O(()=>u.columns.filter(e=>!e.hideInSearch&&e.prop)),h=async()=>{a.value=!0,l("request",t.value,e=>{var d,i;e.code===200&&(s.value=((d=e.data)==null?void 0:d.list)||[],C.value=(i=e==null?void 0:e.data)==null?void 0:i.total),a.value=!1})},z=e=>{t.value={pageSize:e,page:1}},I=e=>{t.value.page=e},k=(e={})=>{t.value={...t.value,...e,page:p==null?void 0:p.page}},N=()=>{t.value={page:p==null?void 0:p.page,pageSize:t.value.pageSize}};return R(t,()=>{h()},{deep:!0}),q(()=>{h()}),(e,d)=>{const i=H,D=Q,L=Y,A=M;return o(),m(f,null,[e.searchable?(o(),r(U,{key:0,fields:S.value,onSubmit:k,onReset:N},null,8,["fields"])):E("",!0),w((o(),r(D,{data:s.value},{default:v(()=>[(o(!0),m(f,null,$(e.columns,n=>(o(),m(f,null,[n.slot?(o(),r(i,x(_({key:0},n)),{default:v(P=>[B(e.$slots,n.slot,{row:P.row,column:n},void 0,!0)]),_:2},1040)):n.component?(o(),r(V(n.component),{key:1,config:n},null,8,["config"])):(o(),r(i,_({key:2},n,{align:"center","show-overflow-tooltip":!0}),null,16))],64))),256))]),_:3},8,["data"])),[[A,a.value]]),e.pageConfig?(o(),r(L,_({key:1,class:"mt20 flexEnd"},e.pageConfig,{"current-page":y(t).page,"page-size":y(t).pageSize,total:C.value,onSizeChange:z,onCurrentChange:I}),null,16,["current-page","page-size","total"])):E("",!0)],64)}}}),W=j(K,[["__scopeId","data-v-ebda1f14"]]),re=T({__name:"index",setup(b){const g=c([{type:"selection"},{prop:"inspectionId",label:"工单ID",hideInSearch:!0},{prop:"eleContractNo",label:"产品合同号",type:"input"},{prop:"mntContractNo",label:"保养合同号",type:"input"},{prop:"customerName",label:"客户名称",type:"input"},{prop:"inspectionType",label:"作业类型",slot:"inspectionType",type:"select",fieldProps:{options:[{label:"升降梯",value:"ELEVATOR"},{label:"扶梯",value:"ESCALATOR"}]}},{prop:"userName",label:"保养巡视人员",type:"input"},{prop:"inspectionDate",label:"巡视时间",type:"datePicker"},{prop:"orderCode",label:"订单状态",type:"select",fieldProps:{options:["INITIATED","CHANGE_REQUEST","INSPECTION_AUDIT","COMPLETE"].map(l=>({label:l,value:l}))}}]),u=async(l,s)=>{const a=await J(l);s==null||s(a)};return(l,s)=>(o(),r(y(W),{columns:g.value,onRequest:u},{inspectionType:v(({row:a})=>[F(G((a==null?void 0:a.inspectionType)==="ELEVATOR"?"升降梯":"扶梯"),1)]),_:1},8,["columns"]))}});export{re as default};