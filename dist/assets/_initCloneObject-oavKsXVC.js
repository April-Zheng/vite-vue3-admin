import{bT as v,bF as p,b2 as W,bi as Q,b4 as tt,bj as et,b1 as $,bh as h,bU as rt,b3 as R,bf as nt,bV as _,bW as y,bA as at,bX as g}from"./index-V_xMG_gv.js";var ot=v(p,"WeakMap");const m=ot;var x=Object.create,st=function(){function t(){}return function(r){if(!W(r))return{};if(x)return x(r);t.prototype=r;var e=new t;return t.prototype=void 0,e}}();const it=st;function Ke(t,r){var e=-1,n=t.length;for(r||(r=Array(n));++e<n;)r[e]=t[e];return r}function Le(t,r,e,n){var s=!e;e||(e={});for(var u=-1,c=r.length;++u<c;){var o=r[u],l=n?n(e[o],t[o],o,e,t):void 0;l===void 0&&(l=t[o]),s?Q(e,o,l):tt(e,o,l)}return e}var ut=9007199254740991;function k(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=ut}function N(t){return t!=null&&k(t.length)&&!et(t)}var ct=Object.prototype;function O(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||ct;return t===e}function ft(t,r){for(var e=-1,n=Array(t);++e<t;)n[e]=r(e);return n}var pt="[object Arguments]";function P(t){return $(t)&&h(t)==pt}var q=Object.prototype,lt=q.hasOwnProperty,gt=q.propertyIsEnumerable,bt=P(function(){return arguments}())?P:function(t){return $(t)&&lt.call(t,"callee")&&!gt.call(t,"callee")};const dt=bt;function yt(){return!1}var X=typeof exports=="object"&&exports&&!exports.nodeType&&exports,S=X&&typeof module=="object"&&module&&!module.nodeType&&module,vt=S&&S.exports===X,I=vt?p.Buffer:void 0,ht=I?I.isBuffer:void 0,Tt=ht||yt;const mt=Tt;var jt="[object Arguments]",At="[object Array]",wt="[object Boolean]",$t="[object Date]",_t="[object Error]",Ot="[object Function]",xt="[object Map]",Pt="[object Number]",St="[object Object]",It="[object RegExp]",Et="[object Set]",Ct="[object String]",Mt="[object WeakMap]",Ut="[object ArrayBuffer]",Bt="[object DataView]",zt="[object Float32Array]",Ft="[object Float64Array]",Kt="[object Int8Array]",Lt="[object Int16Array]",Vt="[object Int32Array]",Dt="[object Uint8Array]",Gt="[object Uint8ClampedArray]",Wt="[object Uint16Array]",Rt="[object Uint32Array]",a={};a[zt]=a[Ft]=a[Kt]=a[Lt]=a[Vt]=a[Dt]=a[Gt]=a[Wt]=a[Rt]=!0;a[jt]=a[At]=a[Ut]=a[wt]=a[Bt]=a[$t]=a[_t]=a[Ot]=a[xt]=a[Pt]=a[St]=a[It]=a[Et]=a[Ct]=a[Mt]=!1;function kt(t){return $(t)&&k(t.length)&&!!a[h(t)]}function Nt(t){return function(r){return t(r)}}var H=typeof exports=="object"&&exports&&!exports.nodeType&&exports,b=H&&typeof module=="object"&&module&&!module.nodeType&&module,qt=b&&b.exports===H,T=qt&&rt.process,Xt=function(){try{var t=b&&b.require&&b.require("util").types;return t||T&&T.binding&&T.binding("util")}catch{}}();const E=Xt;var C=E&&E.isTypedArray,Ht=C?Nt(C):kt;const Yt=Ht;var Zt=Object.prototype,Jt=Zt.hasOwnProperty;function Y(t,r){var e=R(t),n=!e&&dt(t),s=!e&&!n&&mt(t),u=!e&&!n&&!s&&Yt(t),c=e||n||s||u,o=c?ft(t.length,String):[],l=o.length;for(var i in t)(r||Jt.call(t,i))&&!(c&&(i=="length"||s&&(i=="offset"||i=="parent")||u&&(i=="buffer"||i=="byteLength"||i=="byteOffset")||nt(i,l)))&&o.push(i);return o}function Z(t,r){return function(e){return t(r(e))}}var Qt=Z(Object.keys,Object);const te=Qt;var ee=Object.prototype,re=ee.hasOwnProperty;function ne(t){if(!O(t))return te(t);var r=[];for(var e in Object(t))re.call(t,e)&&e!="constructor"&&r.push(e);return r}function ae(t){return N(t)?Y(t):ne(t)}function oe(t){var r=[];if(t!=null)for(var e in Object(t))r.push(e);return r}var se=Object.prototype,ie=se.hasOwnProperty;function ue(t){if(!W(t))return oe(t);var r=O(t),e=[];for(var n in t)n=="constructor"&&(r||!ie.call(t,n))||e.push(n);return e}function Ve(t){return N(t)?Y(t,!0):ue(t)}function ce(t,r){for(var e=-1,n=r.length,s=t.length;++e<n;)t[s+e]=r[e];return t}var fe=Z(Object.getPrototypeOf,Object);const pe=fe;function le(){this.__data__=new _,this.size=0}function ge(t){var r=this.__data__,e=r.delete(t);return this.size=r.size,e}function be(t){return this.__data__.get(t)}function de(t){return this.__data__.has(t)}var ye=200;function ve(t,r){var e=this.__data__;if(e instanceof _){var n=e.__data__;if(!y||n.length<ye-1)return n.push([t,r]),this.size=++e.size,this;e=this.__data__=new at(n)}return e.set(t,r),this.size=e.size,this}function d(t){var r=this.__data__=new _(t);this.size=r.size}d.prototype.clear=le;d.prototype.delete=ge;d.prototype.get=be;d.prototype.has=de;d.prototype.set=ve;var J=typeof exports=="object"&&exports&&!exports.nodeType&&exports,M=J&&typeof module=="object"&&module&&!module.nodeType&&module,he=M&&M.exports===J,U=he?p.Buffer:void 0,B=U?U.allocUnsafe:void 0;function De(t,r){if(r)return t.slice();var e=t.length,n=B?B(e):new t.constructor(e);return t.copy(n),n}function Te(t,r){for(var e=-1,n=t==null?0:t.length,s=0,u=[];++e<n;){var c=t[e];r(c,e,t)&&(u[s++]=c)}return u}function me(){return[]}var je=Object.prototype,Ae=je.propertyIsEnumerable,z=Object.getOwnPropertySymbols,we=z?function(t){return t==null?[]:(t=Object(t),Te(z(t),function(r){return Ae.call(t,r)}))}:me;const $e=we;function _e(t,r,e){var n=r(t);return R(t)?n:ce(n,e(t))}function Ge(t){return _e(t,ae,$e)}var Oe=v(p,"DataView");const j=Oe;var xe=v(p,"Promise");const A=xe;var Pe=v(p,"Set");const w=Pe;var F="[object Map]",Se="[object Object]",K="[object Promise]",L="[object Set]",V="[object WeakMap]",D="[object DataView]",Ie=g(j),Ee=g(y),Ce=g(A),Me=g(w),Ue=g(m),f=h;(j&&f(new j(new ArrayBuffer(1)))!=D||y&&f(new y)!=F||A&&f(A.resolve())!=K||w&&f(new w)!=L||m&&f(new m)!=V)&&(f=function(t){var r=h(t),e=r==Se?t.constructor:void 0,n=e?g(e):"";if(n)switch(n){case Ie:return D;case Ee:return F;case Ce:return K;case Me:return L;case Ue:return V}return r});const We=f;var Be=p.Uint8Array;const G=Be;function ze(t){var r=new t.constructor(t.byteLength);return new G(r).set(new G(t)),r}function Re(t,r){var e=r?ze(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}function ke(t){return typeof t.constructor=="function"&&!O(t)?it(pe(t)):{}}export{d as S,G as U,Ve as a,ce as b,Le as c,pe as d,_e as e,ze as f,$e as g,Re as h,We as i,Nt as j,ae as k,Ke as l,mt as m,E as n,De as o,ke as p,Ge as q,N as r,me as s,Yt as t,dt as u,k as v};