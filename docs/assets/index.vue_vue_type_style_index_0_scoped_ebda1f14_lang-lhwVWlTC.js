import{d as V,r as f,y as m,o as c,c as v,$ as S,B as b,a4 as _,u as C,a0 as h,a8 as F,ab as x,V as A,a1 as T}from"./index-JDPg3R77.js";import{a as j,_ as q}from"./index.vue_vue_type_script_setup_true_lang-VcblN4i4.js";/* empty css                        */import"./el-input-gxjmX-Ga.js";import"./el-select-pXAU1ao9.js";const M=V({__name:"index",props:{defaultColsNumber:{},defalutCollapsed:{type:Boolean,default:!0},fields:{},model:{},config:{},submitter:{type:[Object,Boolean]},colSize:{default:{span:8}},submitterColSize:{},submitterStyle:{}},emits:["onCollapseChange","submit","reset"],setup(g,{emit:z}){const s=g,y=z,p=f(),i=f(s.defalutCollapsed);let r=f(0),a=f(0);const d=m(()=>{var u;if(s.defaultColsNumber!==void 0)return s.defaultColsNumber;const e=((u=s.submitterColSize)==null?void 0:u.span)||s.colSize.span,t=24/s.colSize.span;return Math.max(1,e>s.colSize.span?t:t-1)}),$=m(()=>!(r.value<24||s.fields.length<=d.value)),k=()=>{var e;return r.value=0,a.value=0,(e=s.fields)==null?void 0:e.map((t,u)=>{var n;const l=s.colSize.span;r.value+=l;const o=((n=t==null?void 0:t.fieldProps)==null?void 0:n.hidden)||i.value&&u>=d.value&&r.value>=24;return 24-a.value%24<l&&(r.value+=24-a.value%24,a.value+=24-a.value%24),o||(a.value+=l),{...t,hidden:o}})},w=m({get:()=>k(),set:e=>e}),B=()=>{var l;const e=((l=s.submitterColSize)==null?void 0:l.span)||s.colSize.span;return 24-a.value%24-e},N=m({get:()=>B(),set:e=>e}),R=()=>{i.value=!i.value,y("onCollapseChange",i.value)};return(e,t)=>{const u=T;return c(),v(C(q),{ref_key:"queryFilterRef",ref:p,config:e.config,fields:w.value,"col-size":e.colSize,"submitter-col-size":{offset:N.value,...e.submitterColSize||e.colSize},"submitter-style":{textAlign:"end",display:"flex",justifyContent:"end"},onSubmit:t[2]||(t[2]=l=>{var o;return e.$emit("submit",(o=p.value)==null?void 0:o.formValues)}),onReset:t[3]||(t[3]=l=>e.$emit("reset"))},{submitter:S(()=>[b(C(j),_({okText:"查询",cancelText:"重置",...e.submitter},{onSubmit:t[0]||(t[0]=l=>{var o,n;return(n=(o=p.value)==null?void 0:o.onSubmit)==null?void 0:n.call(o)}),onReset:t[1]||(t[1]=l=>{var o,n;return(n=(o=p.value)==null?void 0:o.onReset)==null?void 0:n.call(o)})}),null,16),$.value?(c(),v(u,{key:0,type:"primary",link:"",onClick:R},{default:S(()=>[h(F(i.value?"展开":"收起")+" ",1),b(x,{icon:i.value?"ArrowDown":"ArrowUp"},null,8,["icon"])]),_:1})):A("",!0)]),_:1},8,["config","fields","col-size","submitter-col-size"])}}});export{M as _};
