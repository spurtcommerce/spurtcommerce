"use strict";(self.webpackChunkspurtcommerce=self.webpackChunkspurtcommerce||[]).push([[2352],{57938:(C,c,a)=>{a.d(c,{E4:()=>s,KZ:()=>p,wi:()=>i});var l=a(8300);const s=[{path:"product_variant",loadChildren:()=>Promise.all([a.e(4624),a.e(7537),a.e(8592),a.e(3949)]).then(a.bind(a,53949)).then(t=>t.ProductVariantModule),canActivate:[l.a]}],p=[{path:"product_attribute",loadChildren:()=>Promise.all([a.e(8592),a.e(2992)]).then(a.bind(a,92992)).then(t=>t.ProductAttributeModule),canActivate:[l.a]}],i=[{path:"related_product",loadChildren:()=>Promise.all([a.e(8592),a.e(7651)]).then(a.bind(a,17651)).then(t=>t.RelatedProductModule),canActivate:[l.a]}]},22352:(C,c,a)=>{a.r(c),a.d(c,{CatalogModule:()=>et});var l=a(69808),s=a(3675),p=a(93075),i=a(99291),t=a(5e3),v=a(95710),y=a(22313),I=a(89113),u=a(84218);const x=function(){return["/catalog/manage-products"]},L=function(){return["/catalog/manage-products/product"]},S=function(){return["/catalog/manage-products/categories"]},b=function(){return["/catalog/manage-products/product_variant/product-list"]},H=function(){return["/catalog/manage-products/product_attribute/product-list"]},P=function(){return["/catalog/manage-products/golive"]},f=function(){return["/catalog/import"]};let A=(()=>{class e{constructor(o){this.titleService=o}onDocumentClick(o){this.checked=!1,this.quotationchecked=!1,this.importChecked=!1}ngOnInit(){this.titleService.setTitle("Catalog")}onClick(o){this.checked=!0,this.quotationchecked=!1,this.importChecked=!1}onImportClick(o){this.checked=!1,this.quotationchecked=!1,this.importChecked=!0}quotation(o){this.quotationchecked=!0,this.checked=!1,this.importChecked=!1}}return e.\u0275fac=function(o){return new(o||e)(t.\u0275\u0275directiveInject(y.Dx))},e.\u0275cmp=t.\u0275\u0275defineComponent({type:e,selectors:[["app-catalog-header"]],hostBindings:function(o,n){1&o&&t.\u0275\u0275listener("click",function(d){return n.onDocumentClick(d)},!1,t.\u0275\u0275resolveDocument)},decls:51,vars:57,consts:[[1,"subtoolbar","catalogtoolbar"],[1,"sub-nav-menu"],[1,"dd",3,"appHideIfUnauthorized"],[1,"dd-a"],["href","javascript:void(0)",3,"appHideIfUnauthorized","routerLink","routerLinkActive"],["src","assets/img/header-icons/package.svg","alt","product"],["src","assets/img/header-icons/package-on.svg","alt","product"],["src","assets/img/caret-dropdown.svg","alt","",1,"acrt-drop-dflt"],["src","assets/img/caret-down.svg","alt","",1,"acrt-drop-on"],["type","checkbox","id","check",3,"checked","click"],[1,"dd-c"],[3,"appHideIfUnauthorized"],["href","javascript:void(0)",3,"routerLink","routerLinkActive"],["href","#",3,"routerLink","routerLinkActive"]],template:function(o,n){1&o&&(t.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"a",4)(5,"span"),t.\u0275\u0275element(6,"img",5)(7,"img",6),t.\u0275\u0275elementEnd(),t.\u0275\u0275text(8),t.\u0275\u0275pipe(9,"translate"),t.\u0275\u0275element(10,"img",7)(11,"img",8),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(12,"input",9),t.\u0275\u0275listener("click",function(d){return d.stopPropagation(),n.onClick(d)}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(13,"div",10)(14,"ul")(15,"li",11)(16,"a",12),t.\u0275\u0275text(17),t.\u0275\u0275pipe(18,"translate"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(19,"li",11)(20,"a",12),t.\u0275\u0275text(21),t.\u0275\u0275pipe(22,"translate"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(23,"li",11)(24,"a",13),t.\u0275\u0275text(25),t.\u0275\u0275pipe(26,"translate"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(27,"li",11)(28,"a",12),t.\u0275\u0275text(29),t.\u0275\u0275pipe(30,"translate"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(31,"li",11)(32,"a",12),t.\u0275\u0275text(33," Go Live "),t.\u0275\u0275elementEnd()()()()(),t.\u0275\u0275elementStart(34,"div",2)(35,"div",3)(36,"a",4)(37,"span"),t.\u0275\u0275element(38,"img",5)(39,"img",6),t.\u0275\u0275elementEnd(),t.\u0275\u0275text(40),t.\u0275\u0275pipe(41,"translate"),t.\u0275\u0275element(42,"img",7)(43,"img",8),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(44,"input",9),t.\u0275\u0275listener("click",function(d){return d.stopPropagation(),n.onImportClick(d)}),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(45,"div",10)(46,"ul")(47,"li",11)(48,"a",12),t.\u0275\u0275text(49),t.\u0275\u0275pipe(50,"translate"),t.\u0275\u0275elementEnd()()()()()()()),2&o&&(t.\u0275\u0275advance(2),t.\u0275\u0275property("appHideIfUnauthorized","catalog-product"),t.\u0275\u0275advance(2),t.\u0275\u0275property("appHideIfUnauthorized","catalog-product")("routerLink",t.\u0275\u0275pureFunction0(49,x))("routerLinkActive","active"),t.\u0275\u0275advance(4),t.\u0275\u0275textInterpolate1(" ",t.\u0275\u0275pipeBind1(9,35,"catalog.nav.ManageProducts")," "),t.\u0275\u0275advance(4),t.\u0275\u0275property("checked",n.checked),t.\u0275\u0275advance(3),t.\u0275\u0275property("appHideIfUnauthorized","product-product"),t.\u0275\u0275advance(1),t.\u0275\u0275property("routerLink",t.\u0275\u0275pureFunction0(50,L))("routerLinkActive","active"),t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate1(" ",t.\u0275\u0275pipeBind1(18,37,"catalog.nav.Product")," "),t.\u0275\u0275advance(2),t.\u0275\u0275property("appHideIfUnauthorized","product-product"),t.\u0275\u0275advance(1),t.\u0275\u0275property("routerLink",t.\u0275\u0275pureFunction0(51,S))("routerLinkActive","active"),t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate1(" ",t.\u0275\u0275pipeBind1(22,39,"catalog.nav.ProductCategories")," "),t.\u0275\u0275advance(2),t.\u0275\u0275property("appHideIfUnauthorized","product-varient"),t.\u0275\u0275advance(1),t.\u0275\u0275property("routerLink",t.\u0275\u0275pureFunction0(52,b))("routerLinkActive","active"),t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate1(" ",t.\u0275\u0275pipeBind1(26,41,"catalog.nav.ProductVariants")," "),t.\u0275\u0275advance(2),t.\u0275\u0275property("appHideIfUnauthorized","product-attribute"),t.\u0275\u0275advance(1),t.\u0275\u0275property("routerLink",t.\u0275\u0275pureFunction0(53,H))("routerLinkActive","active"),t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate1(" ",t.\u0275\u0275pipeBind1(30,43,"catalog.nav.ProductAtrributes")," "),t.\u0275\u0275advance(2),t.\u0275\u0275property("appHideIfUnauthorized","product-attribute"),t.\u0275\u0275advance(1),t.\u0275\u0275property("routerLink",t.\u0275\u0275pureFunction0(54,P))("routerLinkActive","active"),t.\u0275\u0275advance(2),t.\u0275\u0275property("appHideIfUnauthorized","catalog-product"),t.\u0275\u0275advance(2),t.\u0275\u0275property("appHideIfUnauthorized","catalog-product")("routerLink",t.\u0275\u0275pureFunction0(55,f))("routerLinkActive","active"),t.\u0275\u0275advance(4),t.\u0275\u0275textInterpolate1(" ",t.\u0275\u0275pipeBind1(41,45,"catalog.nav.ManageImports")," "),t.\u0275\u0275advance(4),t.\u0275\u0275property("checked",n.importChecked),t.\u0275\u0275advance(3),t.\u0275\u0275property("appHideIfUnauthorized","product-product"),t.\u0275\u0275advance(1),t.\u0275\u0275property("routerLink",t.\u0275\u0275pureFunction0(56,f))("routerLinkActive","active"),t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate1(" ",t.\u0275\u0275pipeBind1(50,47,"catalog.nav.BulkImport")," "))},directives:[I.E,i.yS,i.Od],pipes:[u.X$],styles:[""],changeDetection:0}),e})();var M=a(16731),T=a(10518);function F(e,r){1&e&&t.\u0275\u0275element(0,"span",11)}function k(e,r){if(1&e&&(t.\u0275\u0275elementStart(0,"h3"),t.\u0275\u0275text(1),t.\u0275\u0275pipe(2,"async"),t.\u0275\u0275elementEnd()),2&e){const o=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(2,1,o.layoutSandbox.catalogCount$).totalProduct)}}function z(e,r){1&e&&t.\u0275\u0275element(0,"span",11)}function U(e,r){if(1&e&&(t.\u0275\u0275elementStart(0,"h3"),t.\u0275\u0275text(1),t.\u0275\u0275pipe(2,"async"),t.\u0275\u0275elementEnd()),2&e){const o=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(2,1,o.layoutSandbox.catalogCount$).activeProduct)}}function $(e,r){1&e&&t.\u0275\u0275element(0,"span",11)}function R(e,r){if(1&e&&(t.\u0275\u0275elementStart(0,"h3"),t.\u0275\u0275text(1),t.\u0275\u0275pipe(2,"async"),t.\u0275\u0275elementEnd()),2&e){const o=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(2,1,o.layoutSandbox.catalogCount$).inActiveProduct)}}function j(e,r){1&e&&t.\u0275\u0275element(0,"span",11)}function D(e,r){if(1&e&&(t.\u0275\u0275elementStart(0,"h3"),t.\u0275\u0275text(1),t.\u0275\u0275pipe(2,"async"),t.\u0275\u0275elementEnd()),2&e){const o=t.\u0275\u0275nextContext(2);t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(2,1,o.layoutSandbox.catalogCount$).totalCategory)}}function N(e,r){if(1&e&&(t.\u0275\u0275elementStart(0,"div")(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"ul")(6,"li")(7,"p"),t.\u0275\u0275text(8),t.\u0275\u0275pipe(9,"translate"),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(10,F,1,0,"span",5),t.\u0275\u0275pipe(11,"async"),t.\u0275\u0275elementStart(12,"button",6),t.\u0275\u0275element(13,"img",7),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(14,k,3,3,"h3",0),t.\u0275\u0275pipe(15,"async"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(16,"li")(17,"p"),t.\u0275\u0275text(18),t.\u0275\u0275pipe(19,"translate"),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(20,z,1,0,"span",5),t.\u0275\u0275pipe(21,"async"),t.\u0275\u0275elementStart(22,"button",8),t.\u0275\u0275element(23,"img",7),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(24,U,3,3,"h3",0),t.\u0275\u0275pipe(25,"async"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(26,"li")(27,"p"),t.\u0275\u0275text(28),t.\u0275\u0275pipe(29,"translate"),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(30,$,1,0,"span",5),t.\u0275\u0275pipe(31,"async"),t.\u0275\u0275elementStart(32,"button",9),t.\u0275\u0275element(33,"img",7),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(34,R,3,3,"h3",0),t.\u0275\u0275pipe(35,"async"),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(36,"li")(37,"p"),t.\u0275\u0275text(38),t.\u0275\u0275pipe(39,"translate"),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(40,j,1,0,"span",5),t.\u0275\u0275pipe(41,"async"),t.\u0275\u0275elementStart(42,"button",10),t.\u0275\u0275element(43,"img",7),t.\u0275\u0275elementEnd(),t.\u0275\u0275template(44,D,3,3,"h3",0),t.\u0275\u0275pipe(45,"async"),t.\u0275\u0275elementEnd()()()()()()()),2&e){const o=t.\u0275\u0275nextContext();t.\u0275\u0275advance(8),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(9,12,"catalog.categories.TotalProduct")),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf",t.\u0275\u0275pipeBind1(11,14,o.layoutSandbox.catalogCountLoading$)),t.\u0275\u0275advance(4),t.\u0275\u0275property("ngIf",!t.\u0275\u0275pipeBind1(15,16,o.layoutSandbox.catalogCountLoading$)),t.\u0275\u0275advance(4),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(19,18,"catalog.categories.ActiveProduct")),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf",t.\u0275\u0275pipeBind1(21,20,o.layoutSandbox.catalogCountLoading$)),t.\u0275\u0275advance(4),t.\u0275\u0275property("ngIf",!t.\u0275\u0275pipeBind1(25,22,o.layoutSandbox.catalogCountLoading$)),t.\u0275\u0275advance(4),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(29,24,"catalog.categories.In-ActiveProduct")),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf",t.\u0275\u0275pipeBind1(31,26,o.layoutSandbox.catalogCountLoading$)),t.\u0275\u0275advance(4),t.\u0275\u0275property("ngIf",!t.\u0275\u0275pipeBind1(35,28,o.layoutSandbox.catalogCountLoading$)),t.\u0275\u0275advance(4),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(39,30,"catalog.categories.TotalCategory")),t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf",t.\u0275\u0275pipeBind1(41,32,o.layoutSandbox.catalogCountLoading$)),t.\u0275\u0275advance(4),t.\u0275\u0275property("ngIf",!t.\u0275\u0275pipeBind1(45,34,o.layoutSandbox.catalogCountLoading$))}}let O=(()=>{class e{constructor(o,n){this.layoutSandbox=o,this.router=n,this.router.events.subscribe(g=>{this.id=+this.router.url.split("?")[0].split("/").pop()})}ngOnInit(){this.layoutSandbox.getCatalogCount()}}return e.\u0275fac=function(o){return new(o||e)(t.\u0275\u0275directiveInject(v.Q),t.\u0275\u0275directiveInject(i.F0))},e.\u0275cmp=t.\u0275\u0275defineComponent({type:e,selectors:[["app-catalog-layout"]],decls:4,vars:1,consts:[[4,"ngIf"],[1,"row","products-section"],[1,"col-12","layout-mar"],[1,"card"],[1,"product-ts-left"],["class","spinner-border spinner-border-sm pull-right","aria-hidden","true",4,"ngIf"],["type","button","placement","bottom","ngbTooltip","Total number of products listed on the platform.",1,"btn"],["src","assets/img/info-ico.png","alt","info"],["type","button","placement","bottom","ngbTooltip","Number of products that are active (displayed to visitors) on the platform.",1,"btn"],["type","button","placement","bottom","ngbTooltip","Number of products that are in-active(not displayed for visitors' view) on the platform."],["type","button","placement","bottom","ngbTooltip","Total number of product categories on the platform."],["aria-hidden","true",1,"spinner-border","spinner-border-sm","pull-right"]],template:function(o,n){1&o&&(t.\u0275\u0275element(0,"app-catalog-header")(1,"app-breadcrumb"),t.\u0275\u0275template(2,N,46,36,"div",0),t.\u0275\u0275element(3,"router-outlet")),2&o&&(t.\u0275\u0275advance(2),t.\u0275\u0275property("ngIf","/catalog/manage-products/product_variant/product-list"!==n.router.url.split("?")[0]&&"/catalog/manage-products/product_variant/variant-settings"!==n.router.url.split("?")[0]&&n.router.url!=="/catalog/manage-products/product_variant/product-update/"+n.id&&"/catalog/manage-products/product_attribute/product-list"!==n.router.url.split("?")[0]&&n.router.url!=="/catalog/manage-products/product_attribute/product-update/"+n.id&&"/catalog/manage-products/product_attribute/settings/attributes/list"!==n.router.url.split("?")[0]&&"/catalog/manage-products/product_attribute/settings/attributes-group/list"!==n.router.url&&"/catalog/manage-products/product/add"!==n.router.url.split("?")[0]&&n.router.url.split("?")[0]!=="/catalog/manage-products/product/edit/"+n.id&&"/catalog/manage-products/categories/add"!==n.router.url.split("?")[0]&&n.router.url.split("?")[0]!=="/catalog/manage-products/categories/edit/"+n.id&&"/catalog/manage-products/product_variant/variant-settings/variant-list"!==n.router.url.split("?")[0]&&"/catalog/manage-products/product_variant/variant-settings/filters/list"!==n.router.url.split("?")[0]&&"/catalog/manage-products/product_attribute/settings/filters/list"!==n.router.url.split("?")[0]&&"/catalog/manage-products/product_attribute/settings/filters/add"!==n.router.url.split("?")[0]&&"/catalog/manage-products/product_variant/variant-settings/filters/add"!==n.router.url.split("?")[0]))},directives:[A,M.L,l.NgIf,T._L,i.lC],pipes:[u.X$,l.AsyncPipe],styles:[".layout-mar[_ngcontent-%COMP%]{margin-top:0}"],changeDetection:0}),e})();var m=a(8300),Q=a(57938);const h=[{path:"",redirectTo:"manage-products",pathMatch:"full",canActivate:[m.a]},{path:"",component:O,children:[{path:"manage-products",loadChildren:()=>a.e(4289).then(a.bind(a,94289)).then(e=>e.ManageProductsModule),canActivate:[m.a],data:{permissionForHeader:"catalog-coupon",root:"catalog"}},{path:"import",loadChildren:()=>a.e(9675).then(a.bind(a,19675)).then(e=>e.ImportModule),canActivate:[m.a],data:{permissionForHeader:"catalog-import",root:"catalog"}}]}];h.forEach(e=>{e&&e.children&&e.children.push(Q.wi[0])});let K=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.\u0275\u0275defineNgModule({type:e}),e.\u0275inj=t.\u0275\u0275defineInjector({imports:[[i.Bz.forChild(h)],i.Bz]}),e})();var V=a(16917),G=a(49876),X=a(36642),Z=a(3325),W=a(2099),J=a(88360),Y=a(10128),w=a(40520),q=a(94512),_=a(94446),tt=a(12476);let et=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.\u0275\u0275defineNgModule({type:e}),e.\u0275inj=t.\u0275\u0275defineInjector({providers:[Z.P,v.Q,q.q,_.G],imports:[[l.CommonModule,K,s.o,V.q,p.FormsModule,p.ReactiveFormsModule,X.sQ.forFeature([W.Q,J.c]),u.aw.forChild({loader:{provide:u.Zw,useFactory:Y.g,deps:[w.eN]}}),G.dF,tt.K]]}),e})()}}]);