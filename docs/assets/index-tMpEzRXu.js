import{s as re,f as Ce,i as Ne,b as M,d as Q,m as ie,a as F,c as Z,t as ee,u as U,r as _,w as O,n as te,e as ce,o as ae,g as ue,h as de,j as $,k as Se,_ as be,l as K,p as we,q as xe,v as V,x as fe,y as Ee,z as u,E as L,A as Be,B as $e,C as ke,D as q,F as Ae,G as Oe,H as J,I as Re,J as le,K as ze,L as Fe,M as De,N as ne,O as ve,P as Ve,Q as Ie,R as Le,S as qe,T as Me,U as Ue,V as Ke,W as Ye,X as He,Y as D,Z as We,$ as je}from"./index-V2gjI4Uj.js";import{_ as Xe}from"./index.vue_vue_type_script_setup_true_lang-dpk73TAF.js";import{_ as Ge}from"./customComponet.vue_vue_type_script_setup_true_lang---voF-2B.js";import{g as Je,a as Qe}from"./components-31PrSI3-.js";import{c as A}from"./el-select-6TV6bfG3.js";import{U as pe}from"./el-input-EROImZCq.js";import"./el-form-item-QClYJyWF.js";import"./_initCloneObject-kiBypSZQ.js";import"./el-col-KbbpGU3a.js";const Ze=(e,t,o)=>Ce(e.subTree).filter(a=>{var l;return Ne(a)&&((l=a.type)==null?void 0:l.name)===t&&!!a.component}).map(a=>a.component.uid).map(a=>o[a]).filter(a=>!!a),et=(e,t)=>{const o={},d=re([]);return{children:d,addChild:l=>{o[l.uid]=l,d.value=Ze(e,t,o)},removeChild:l=>{delete o[l],d.value=d.value.filter(N=>N.uid!==l)}}},Y=Symbol("tabsRootContextKey"),tt=M({tabs:{type:Q(Array),default:()=>ie([])}}),me="ElTabBar",at=F({name:me}),st=F({...at,props:tt,setup(e,{expose:t}){const o=e,d=K(),r=Z(Y);r||ee(me,"<el-tabs><el-tab-bar /></el-tabs>");const a=U("tabs"),l=_(),N=_(),f=()=>{let p=0,m=0;const b=["top","bottom"].includes(r.props.tabPosition)?"width":"height",i=b==="width"?"x":"y",k=i==="x"?"left":"top";return o.tabs.every(E=>{var s,w;const P=(w=(s=d.parent)==null?void 0:s.refs)==null?void 0:w[`tab-${E.uid}`];if(!P)return!1;if(!E.active)return!0;p=P[`offset${A(k)}`],m=P[`client${A(b)}`];const x=window.getComputedStyle(P);return b==="width"&&(o.tabs.length>1&&(m-=Number.parseFloat(x.paddingLeft)+Number.parseFloat(x.paddingRight)),p+=Number.parseFloat(x.paddingLeft)),!1}),{[b]:`${m}px`,transform:`translate${A(i)}(${p}px)`}},h=()=>N.value=f();return O(()=>o.tabs,async()=>{await te(),h()},{immediate:!0}),ce(l,()=>h()),t({ref:l,update:h}),(p,m)=>(ae(),ue("div",{ref_key:"barRef",ref:l,class:de([$(a).e("active-bar"),$(a).is($(r).props.tabPosition)]),style:Se(N.value)},null,6))}});var lt=be(st,[["__file","tab-bar.vue"]]);const nt=M({panes:{type:Q(Array),default:()=>ie([])},currentName:{type:[String,Number],default:""},editable:Boolean,type:{type:String,values:["card","border-card",""],default:""},stretch:Boolean}),ot={tabClick:(e,t,o)=>o instanceof Event,tabRemove:(e,t)=>t instanceof Event},oe="ElTabNav",rt=F({name:oe,props:nt,emits:ot,setup(e,{expose:t,emit:o}){const d=K(),r=Z(Y);r||ee(oe,"<el-tabs><tab-nav /></el-tabs>");const a=U("tabs"),l=we(),N=xe(),f=_(),h=_(),p=_(),m=_(),b=_(!1),i=_(0),k=_(!1),E=_(!0),s=V(()=>["top","bottom"].includes(r.props.tabPosition)?"width":"height"),w=V(()=>({transform:`translate${s.value==="width"?"X":"Y"}(-${i.value}px)`})),P=()=>{if(!f.value)return;const c=f.value[`offset${A(s.value)}`],v=i.value;if(!v)return;const n=v>c?v-c:0;i.value=n},x=()=>{if(!f.value||!h.value)return;const c=h.value[`offset${A(s.value)}`],v=f.value[`offset${A(s.value)}`],n=i.value;if(c-n<=v)return;const T=c-n>v*2?n+v:c-v;i.value=T},R=async()=>{const c=h.value;if(!b.value||!p.value||!f.value||!c)return;await te();const v=p.value.querySelector(".is-active");if(!v)return;const n=f.value,T=["top","bottom"].includes(r.props.tabPosition),C=v.getBoundingClientRect(),y=n.getBoundingClientRect(),B=T?c.offsetWidth-y.width:c.offsetHeight-y.height,S=i.value;let g=S;T?(C.left<y.left&&(g=S-(y.left-C.left)),C.right>y.right&&(g=S+C.right-y.right)):(C.top<y.top&&(g=S-(y.top-C.top)),C.bottom>y.bottom&&(g=S+(C.bottom-y.bottom))),g=Math.max(g,0),i.value=Math.min(g,B)},I=()=>{var c;if(!h.value||!f.value)return;e.stretch&&((c=m.value)==null||c.update());const v=h.value[`offset${A(s.value)}`],n=f.value[`offset${A(s.value)}`],T=i.value;n<v?(b.value=b.value||{},b.value.prev=T,b.value.next=T+n<v,v-T<n&&(i.value=v-n)):(b.value=!1,T>0&&(i.value=0))},ye=c=>{const v=c.code,{up:n,down:T,left:C,right:y}=q;if(![n,T,C,y].includes(v))return;const B=Array.from(c.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)")),S=B.indexOf(c.target);let g;v===C||v===n?S===0?g=B.length-1:g=S-1:S<B.length-1?g=S+1:g=0,B[g].focus({preventScroll:!0}),B[g].click(),se()},se=()=>{E.value&&(k.value=!0)},H=()=>k.value=!1;return O(l,c=>{c==="hidden"?E.value=!1:c==="visible"&&setTimeout(()=>E.value=!0,50)}),O(N,c=>{c?setTimeout(()=>E.value=!0,50):E.value=!1}),ce(p,I),fe(()=>setTimeout(()=>R(),0)),Ee(()=>I()),t({scrollToActiveTab:R,removeFocus:H}),O(()=>e.panes,()=>d.update(),{flush:"post",deep:!0}),()=>{const c=b.value?[u("span",{class:[a.e("nav-prev"),a.is("disabled",!b.value.prev)],onClick:P},[u(L,null,{default:()=>[u(Be,null,null)]})]),u("span",{class:[a.e("nav-next"),a.is("disabled",!b.value.next)],onClick:x},[u(L,null,{default:()=>[u($e,null,null)]})])]:null,v=e.panes.map((n,T)=>{var C,y,B,S;const g=n.uid,W=n.props.disabled,j=(y=(C=n.props.name)!=null?C:n.index)!=null?y:`${T}`,X=!W&&(n.isClosable||e.editable);n.index=`${T}`;const _e=X?u(L,{class:"is-icon-close",onClick:z=>o("tabRemove",n,z)},{default:()=>[u(ke,null,null)]}):null,Pe=((S=(B=n.slots).label)==null?void 0:S.call(B))||n.props.label,Te=!W&&n.active?0:-1;return u("div",{ref:`tab-${g}`,class:[a.e("item"),a.is(r.props.tabPosition),a.is("active",n.active),a.is("disabled",W),a.is("closable",X),a.is("focus",k.value)],id:`tab-${j}`,key:`tab-${g}`,"aria-controls":`pane-${j}`,role:"tab","aria-selected":n.active,tabindex:Te,onFocus:()=>se(),onBlur:()=>H(),onClick:z=>{H(),o("tabClick",n,j,z)},onKeydown:z=>{X&&(z.code===q.delete||z.code===q.backspace)&&o("tabRemove",n,z)}},[Pe,_e])});return u("div",{ref:p,class:[a.e("nav-wrap"),a.is("scrollable",!!b.value),a.is(r.props.tabPosition)]},[c,u("div",{class:a.e("nav-scroll"),ref:f},[u("div",{class:[a.e("nav"),a.is(r.props.tabPosition),a.is("stretch",e.stretch&&["top","bottom"].includes(r.props.tabPosition))],ref:h,style:w.value,role:"tablist",onKeydown:ye},[e.type?null:u(lt,{ref:m,tabs:[...e.panes]},null),v])])])}}}),it=M({type:{type:String,values:["card","border-card",""],default:""},activeName:{type:[String,Number]},closable:Boolean,addable:Boolean,modelValue:{type:[String,Number]},editable:Boolean,tabPosition:{type:String,values:["top","right","bottom","left"],default:"top"},beforeLeave:{type:Q(Function),default:()=>!0},stretch:Boolean}),G=e=>ze(e)||Fe(e),ct={[pe]:e=>G(e),tabClick:(e,t)=>t instanceof Event,tabChange:e=>G(e),edit:(e,t)=>["remove","add"].includes(t),tabRemove:e=>G(e),tabAdd:()=>!0},ut=F({name:"ElTabs",props:it,emits:ct,setup(e,{emit:t,slots:o,expose:d}){var r,a;const l=U("tabs"),{children:N,addChild:f,removeChild:h}=et(K(),"ElTabPane"),p=_(),m=_((a=(r=e.modelValue)!=null?r:e.activeName)!=null?a:"0"),b=async(s,w=!1)=>{var P,x,R;if(!(m.value===s||le(s)))try{await((P=e.beforeLeave)==null?void 0:P.call(e,s,m.value))!==!1&&(m.value=s,w&&(t(pe,s),t("tabChange",s)),(R=(x=p.value)==null?void 0:x.removeFocus)==null||R.call(x))}catch{}},i=(s,w,P)=>{s.props.disabled||(b(w,!0),t("tabClick",s,P))},k=(s,w)=>{s.props.disabled||le(s.props.name)||(w.stopPropagation(),t("edit",s.props.name,"remove"),t("tabRemove",s.props.name))},E=()=>{t("edit",void 0,"add"),t("tabAdd")};return Ae({from:'"activeName"',replacement:'"model-value" or "v-model"',scope:"ElTabs",version:"2.3.0",ref:"https://element-plus.org/en-US/component/tabs.html#attributes",type:"Attribute"},V(()=>!!e.activeName)),O(()=>e.activeName,s=>b(s)),O(()=>e.modelValue,s=>b(s)),O(m,async()=>{var s;await te(),(s=p.value)==null||s.scrollToActiveTab()}),Oe(Y,{props:e,currentName:m,registerPane:f,unregisterPane:h}),d({currentName:m}),()=>{const s=o.addIcon,w=e.editable||e.addable?u("span",{class:l.e("new-tab"),tabindex:"0",onClick:E,onKeydown:R=>{R.code===q.enter&&E()}},[s?J(o,"addIcon"):u(L,{class:l.is("icon-plus")},{default:()=>[u(Re,null,null)]})]):null,P=u("div",{class:[l.e("header"),l.is(e.tabPosition)]},[w,u(rt,{ref:p,currentName:m.value,editable:e.editable,type:e.type,panes:N.value,stretch:e.stretch,onTabClick:i,onTabRemove:k},null)]),x=u("div",{class:l.e("content")},[J(o,"default")]);return u("div",{class:[l.b(),l.m(e.tabPosition),{[l.m("card")]:e.type==="card",[l.m("border-card")]:e.type==="border-card"}]},[...e.tabPosition!=="bottom"?[P,x]:[x,P]])}}}),dt=M({label:{type:String,default:""},name:{type:[String,Number]},closable:Boolean,disabled:Boolean,lazy:Boolean}),bt=["id","aria-hidden","aria-labelledby"],he="ElTabPane",ft=F({name:he}),vt=F({...ft,props:dt,setup(e){const t=e,o=K(),d=De(),r=Z(Y);r||ee(he,"usage: <el-tabs><el-tab-pane /></el-tabs/>");const a=U("tab-pane"),l=_(),N=V(()=>t.closable||r.props.closable),f=ne(()=>{var i;return r.currentName.value===((i=t.name)!=null?i:l.value)}),h=_(f.value),p=V(()=>{var i;return(i=t.name)!=null?i:l.value}),m=ne(()=>!t.lazy||h.value||f.value);O(f,i=>{i&&(h.value=!0)});const b=ve({uid:o.uid,slots:d,props:t,paneName:p,active:f,index:l,isClosable:N});return fe(()=>{r.registerPane(b)}),Ve(()=>{r.unregisterPane(b.uid)}),(i,k)=>$(m)?Ie((ae(),ue("div",{key:0,id:`pane-${$(p)}`,class:de($(a).b()),role:"tabpanel","aria-hidden":!$(f),"aria-labelledby":`tab-${$(p)}`},[J(i.$slots,"default")],10,bt)),[[Le,$(f)]]):qe("v-if",!0)}});var ge=be(vt,[["__file","tab-pane.vue"]]);const pt=Me(ut,{TabPane:ge}),mt=Ue(ge),ht={setup(){let e=_("1"),t=ve([{label:"Activity name",prop:"name",type:"input",required:!0,span:8},{label:"InspectionId",prop:"inspectionId",type:"select",fieldProps:{options:[]},span:8},{label:"Activity type",prop:"type",type:"checkbox",fieldProps:{options:[{label:"Online activities",value:"1"},{label:"Promotion activities",value:"2"},{label:"Offline activities",value:"3"},{label:"Simple brand exposure",value:"4"}]}},{label:"Resources",prop:"resource",type:"radio",fieldProps:{options:[{label:"Sponsor",value:"1"},{label:"Venue",value:"2"}]}},{label:"Date",prop:"date",type:"datePicker",fieldProps:{type:"date",clearable:!0}},{label:"Date Time",prop:"dateTime",type:"datePicker",fieldProps:{type:"datetime",clearable:!0,format:"YYYY-MM-DD HH:mm:ss"}},{label:"Desc",prop:"desc",type:"input",fieldProps:{type:"textarea"}},{label:"custom component",prop:"custom",component:re(Ge)}]);const o=Ke({name:[{required:!0,message:"Please input Activity name",trigger:"blur"},{min:3,max:5,message:"Length should be 3 to 5",trigger:"blur"}],count:[{required:!0,message:"Please select Activity count",trigger:"change"}],date:[{type:"date",required:!0,message:"Please pick a date",trigger:"change"}],dateTime:[{type:"date",required:!0,message:"Please pick a time",trigger:"change"}],type:[{type:"array",required:!0,message:"Please select at least one activity type",trigger:"change"}],resource:[{required:!0,message:"Please select activity resource",trigger:"change"}],desc:[{required:!0,message:"Please input activity form",trigger:"blur"}]});return{fields:t,rules:o,activeTab:e}},methods:{onChangeTab(e){this.activeTab=e},formBtnAction(e,t){console.log(e,t)},onSubmit(e){console.log("onSubmit===>",e)},async fetchList(){const e=await Je({});e.code===200&&(this.fields=this.fields.map(t=>{var o,d;return t.prop==="inspectionId"&&t.fieldProps&&(t.fieldProps.options=(d=(o=e==null?void 0:e.data)==null?void 0:o.list)==null?void 0:d.map(r=>({label:r.customerName,value:r.inspectionId}))),t}))},async fetchFormDetail(e){const t=await Qe();t.code===200&&e(t.data)}},mounted(){this.fetchList()}};function gt(e,t,o,d,r,a){const l=Xe,N=mt,f=je,h=pt;return ae(),He(h,{modelValue:d.activeTab,"onUpdate:modelValue":t[0]||(t[0]=p=>d.activeTab=p),onTabChange:a.onChangeTab},{default:D(()=>[u(N,{label:"ProForm基础表单",name:"1"},{default:D(()=>[u(l,{submitter:{actions:["ok"]},"label-width":"150px",rules:d.rules,fields:d.fields,onRequest:a.fetchFormDetail,onSubmit:a.onSubmit},null,8,["rules","fields","onRequest","onSubmit"])]),_:1}),u(N,{label:"ProForm自定义表单按钮",name:"2"},{default:D(()=>[u(l,{"label-width":"150px",rules:d.rules,fields:d.fields},{submitter:D(({formValues:p,formRef:m})=>[u(f,{type:"primary",onClick:b=>a.formBtnAction(p,m)},{default:D(()=>[We("自定义按钮")]),_:2},1032,["onClick"])]),_:1},8,["rules","fields"])]),_:1})]),_:1},8,["modelValue","onTabChange"])}const Et=Ye(ht,[["render",gt]]);export{Et as default};
