(self.webpackChunkspurtcommerce=self.webpackChunkspurtcommerce||[]).push([[5608],{13234:(D,f,n)=>{"use strict";n.r(f),n.d(f,{SettlementModule:()=>O});var _=n(69808),u=n(99291),v=n(10518),i=n(12476),p=n(4180),d=n(84218),s=n(10128),M=n(40520),c=n(36642),t=n(14776),e=n(27509),l=n(66123),o=n(8300),a=n(5e3);const A=[{path:"",redirectTo:"settlement-order",pathMatch:"full"},{path:"settlement-order",loadChildren:()=>Promise.all([n.e(8592),n.e(4182)]).then(n.bind(n,14182)).then(r=>r.SettlementOrderListModule),canActivate:[o.a],data:{permission:"marketplace-settlement-order"}},{path:"settlement-history",loadChildren:()=>Promise.all([n.e(8592),n.e(263)]).then(n.bind(n,40263)).then(r=>r.SettlementHistoryModule),canActivate:[o.a],data:{permission:"marketplace-settlement-history"}}];let O=(()=>{class r{}return r.\u0275fac=function(m){return new(m||r)},r.\u0275mod=a.\u0275\u0275defineNgModule({type:r}),r.\u0275inj=a.\u0275\u0275defineInjector({providers:[t.v,e.t],imports:[[u.Bz.forChild(A),_.CommonModule,i.K,p.i,v.IJ,i.K,d.aw.forChild({loader:{provide:d.Zw,useFactory:s.g,deps:[M.eN]}}),c.sQ.forFeature([l.w])]]}),r})()},94327:function(D,f){var u;void 0!==(u=function(){"use strict";function i(t,e,l){var o=new XMLHttpRequest;o.open("GET",t),o.responseType="blob",o.onload=function(){c(o.response,e,l)},o.onerror=function(){console.error("could not download file")},o.send()}function p(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(l){}return 200<=e.status&&299>=e.status}function d(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(l){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var s="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,M=s.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),c=s.saveAs||("object"!=typeof window||window!==s?function(){}:"download"in HTMLAnchorElement.prototype&&!M?function(t,e,l){var o=s.URL||s.webkitURL,a=document.createElement("a");a.download=e=e||t.name||"download",a.rel="noopener","string"==typeof t?(a.href=t,a.origin===location.origin?d(a):p(a.href)?i(t,e,l):d(a,a.target="_blank")):(a.href=o.createObjectURL(t),setTimeout(function(){o.revokeObjectURL(a.href)},4e4),setTimeout(function(){d(a)},0))}:"msSaveOrOpenBlob"in navigator?function(t,e,l){if(e=e||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(function v(t,e){return void 0===e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}(t,l),e);else if(p(t))i(t,e,l);else{var o=document.createElement("a");o.href=t,o.target="_blank",setTimeout(function(){d(o)})}}:function(t,e,l,o){if((o=o||open("","_blank"))&&(o.document.title=o.document.body.innerText="downloading..."),"string"==typeof t)return i(t,e,l);var a="application/octet-stream"===t.type,A=/constructor/i.test(s.HTMLElement)||s.safari,O=/CriOS\/[\d]+/.test(navigator.userAgent);if((O||a&&A||M)&&"undefined"!=typeof FileReader){var r=new FileReader;r.onloadend=function(){var E=r.result;E=O?E:E.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=E:location=E,o=null},r.readAsDataURL(t)}else{var h=s.URL||s.webkitURL,m=h.createObjectURL(t);o?o.location=m:location.href=m,o=null,setTimeout(function(){h.revokeObjectURL(m)},4e4)}});s.saveAs=c.saveAs=c,D.exports=c}.apply(f,[]))&&(D.exports=u)}}]);