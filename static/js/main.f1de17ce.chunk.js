(this.webpackJsonpjson_beautifier=this.webpackJsonpjson_beautifier||[]).push([[0],{51:function(e,t,a){e.exports=a(63)},57:function(e,t,a){},63:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(8),c=a.n(l),i=a(25),o=a(102),m=a(45),s=a(106),u=a(107),d=a(108),E=a(109),g=a(111),p=a(110),f=a(66),b=a(30),h=a(103),j=a(104),v=a(105),y=a(39),O=a.n(y),x=a(31),k=(a(56),a(44)),w=a.n(k),S=(a(57),a(101));function C(e){var t=e.onClick,a=e.loading,n=e.btnText,l=e.color;return r.a.createElement(f.a,{variant:"contained",onClick:t,disabled:a,color:l},a&&r.a.createElement(S.a,{size:14}),!a&&n)}var J=Object(o.a)((function(e){return{root:{flexGrow:1},paper:{minHeight:"100%",display:"flex",flexWrap:"wrap"}}})),N=function(){var e=J(),t=Object(n.useState)(""),a=Object(i.a)(t,2),l=a[0],c=a[1],o=Object(n.useState)(),y=Object(i.a)(o,2),k=y[0],S=y[1],N=Object(n.useState)(!1),B=Object(i.a)(N,2),I=B[0],T=B[1],W=Object(n.useState)(!1),z=Object(i.a)(W,2),H=z[0],P=z[1],_=Object(m.a)({palette:{type:I?"dark":"light",primary:{main:I?b.a[500]:h.a[500]},secondary:{main:I?j.a[900]:v.a[500]}}});return r.a.createElement("div",{className:e.root},r.a.createElement("main",null,r.a.createElement(s.a,{theme:_},r.a.createElement(u.a,null),r.a.createElement(d.a,{maxWidth:"xl"},r.a.createElement(E.a,{container:!0,spacing:0,justify:"center",alignItems:"center",direction:"column"},r.a.createElement(E.a,{item:!0,md:12},r.a.createElement(w.a,{style:{fontSize:80}})),r.a.createElement(E.a,{item:!0,md:12},r.a.createElement("h2",null,"Json Beautifier"))),r.a.createElement(E.a,{container:!0,spacing:3},r.a.createElement(E.a,{item:!0,md:5,lg:5},r.a.createElement(g.a,{id:"current-input",label:"Ugly JSON goes here...",multiline:!0,rows:50,fullWidth:!0,variant:"outlined",onChange:function(e){return c(e.target.value)}})),r.a.createElement(E.a,{item:!0,md:2,lg:2},r.a.createElement(E.a,{container:!0,spacing:1,justify:"center",alignItems:"center"},r.a.createElement(p.a,{orientation:"vertical","aria-label":"vertical outlined primary button group",variant:"contained"},r.a.createElement(C,{onClick:function(e){if(l&&l.length>0){P(!0);var t="",a="";try{t=JSON.parse(l)}catch(n){a="Failed due to ".concat(n.name,"\nError: ").concat(n.message)}a.length>0?x.b.error(a):S(t)}else x.b.warn("Please enter ugly JSON first...");P(!1)},loading:H,btnText:"Beautify",color:"primary"}),r.a.createElement(f.a,{color:"secondary",onClick:function(){return T(!I)}},"Dark Mode")))),r.a.createElement(E.a,{item:!0,md:5,lg:5},null==k?r.a.createElement("div",{className:"json-tree-container"}):r.a.createElement("div",{className:"json-tree-container"},r.a.createElement(O.a,{src:k,theme:I?"monokai":"rjv-default",style:{overflow:"auto",maxHeight:"955px"}})))))),r.a.createElement(x.a,{position:"bottom-right",autoClose:5e3,hideProgressBar:!0,newestOnTop:!0})))};c.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.f1de17ce.chunk.js.map