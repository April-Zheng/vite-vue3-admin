import{a as V,O as _,r as f,aU as h,aV as y,aW as b,o as x,g as k,a8 as F,z as t,Y as u,Z as R,aX as U,$ as q,W as z}from"./index-5o4vBdey.js";import{E as B,a as C}from"./el-form-item-nb6I1U2M.js";import{E as I}from"./el-input-cd2us9Ke.js";import $ from"./Title-EVdGlwm7.js";import"./_initCloneObject-8GIMrlJe.js";const N={class:"login-form-wrap"},T={class:"login-form"},W=V({__name:"index",setup(E){const s=_({name:"admin",password:"123456"}),g=_({name:[{required:!0,message:"请输入账号名"}],password:[{required:!0,message:"请输入账号名"}]}),m=f(null),i=f(!1),v=h(),p=y(),c=b(),w=n=>{n&&(n==null||n.validate().then(async o=>{var r,l;if(o){i.value=!0;try{const e=await U(s);if(i.value=!1,(e==null?void 0:e.code)===200)if(v.setToken(e==null?void 0:e.data.token),!((r=c.query)!=null&&r.redirect))p.push("/");else{const a=decodeURIComponent((l=c.query)==null?void 0:l.redirect);a!=null&&a.startsWith("http")?location.href=a:p.push(a)}}catch(e){i.value=!1,console.log("submit error",e)}}}))};return(n,o)=>{const r=I,l=B,e=q,a=C;return x(),k("div",N,[F("div",T,[t($),t(a,{"label-position":"top",ref_key:"loginFormRef",ref:m,rules:g,model:s},{default:u(()=>[t(l,{label:"账号名",prop:"name",size:"large"},{default:u(()=>[t(r,{modelValue:s.name,"onUpdate:modelValue":o[0]||(o[0]=d=>s.name=d),placeholder:"请输入账号名"},null,8,["modelValue"])]),_:1}),t(l,{label:"密码",prop:"password",size:"large"},{default:u(()=>[t(r,{modelValue:s.password,"onUpdate:modelValue":o[1]||(o[1]=d=>s.password=d),"show-password":"",type:"password",placeholder:"请输入密码"},null,8,["modelValue"])]),_:1}),t(l,null,{default:u(()=>[t(e,{size:"large",type:"primary",loading:i.value,onClick:o[2]||(o[2]=d=>w(m.value))},{default:u(()=>[R("登录")]),_:1},8,["loading"])]),_:1})]),_:1},8,["rules","model"])])])}}}),j=z(W,[["__scopeId","data-v-5884797b"]]);export{j as default};