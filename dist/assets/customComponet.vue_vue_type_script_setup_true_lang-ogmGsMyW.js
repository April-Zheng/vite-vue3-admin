import{d as V,r as c,o as N,g as _,w as t,e as l}from"./index-HwAp1Sgz.js";import{E as v,a as C}from"./el-col-bK4UTpwO.js";import{E as g}from"./el-input-BcCIhWv9.js";const k=V({__name:"customComponet",props:{modelValue:{default:{firstName:"",secondName:""}},formRef:{},formValues:{}},emits:["update:modelValue"],setup(r,{emit:p}){const n=r,f=p,a=c(n.modelValue),m=(s,e)=>{a.value={...n.modelValue||{},[e]:s},f("update:modelValue",a.value)};return(s,e)=>{const u=g,d=v,i=C;return N(),_(i,{gutter:4},{default:t(()=>[l(d,{span:12},{default:t(()=>[l(u,{placeholder:"firstName",modelValue:a.value.firstName,"onUpdate:modelValue":e[0]||(e[0]=o=>a.value.firstName=o),onChange:e[1]||(e[1]=o=>m(o,"firstName"))},null,8,["modelValue"])]),_:1}),l(d,{span:12},{default:t(()=>[l(u,{placeholder:"secondName",modelValue:a.value.secondName,"onUpdate:modelValue":e[2]||(e[2]=o=>a.value.secondName=o),onChange:e[3]||(e[3]=o=>m(o,"secondName"))},null,8,["modelValue"])]),_:1})]),_:1})}}});export{k as _};