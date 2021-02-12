(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[5],{441:function(e,a,t){},442:function(e,a,t){"use strict";var n=t(2),r=t(1),l=t(4),c=t.n(l),s=t(0),o=t.n(s),i=t(24),u=t(5),m=Object(i.a)("input-group-append"),d=Object(i.a)("input-group-prepend"),p=Object(i.a)("input-group-text",{Component:"span"}),f=o.a.forwardRef((function(e,a){var t=e.bsPrefix,l=e.size,s=e.className,i=e.as,m=void 0===i?"div":i,d=Object(n.a)(e,["bsPrefix","size","className","as"]);return t=Object(u.a)(t,"input-group"),o.a.createElement(m,Object(r.a)({ref:a},d,{className:c()(s,t,l&&t+"-"+l)}))}));f.displayName="InputGroup";var b=Object(r.a)({},f,{Text:p,Radio:function(e){return o.a.createElement(p,null,o.a.createElement("input",Object(r.a)({type:"radio"},e)))},Checkbox:function(e){return o.a.createElement(p,null,o.a.createElement("input",Object(r.a)({type:"checkbox"},e)))},Append:m,Prepend:d});a.a=b},445:function(e,a,t){"use strict";var n=t(1),r=t(2),l=t(4),c=t.n(l),s=(t(64),t(0)),o=t.n(s),i=(t(40),t(3)),u=t.n(i),m={type:u.a.string,tooltip:u.a.bool,as:u.a.elementType},d=o.a.forwardRef((function(e,a){var t=e.as,l=void 0===t?"div":t,s=e.className,i=e.type,u=void 0===i?"valid":i,m=e.tooltip,d=void 0!==m&&m,p=Object(r.a)(e,["as","className","type","tooltip"]);return o.a.createElement(l,Object(n.a)({},p,{ref:a,className:c()(s,u+"-"+(d?"tooltip":"feedback"))}))}));d.displayName="Feedback",d.propTypes=m;var p=d,f=o.a.createContext({controlId:void 0}),b=t(5),v=o.a.forwardRef((function(e,a){var t,l,i=e.bsPrefix,u=e.bsCustomPrefix,m=e.type,d=e.size,p=e.htmlSize,v=e.id,O=e.className,j=e.isValid,E=void 0!==j&&j,h=e.isInvalid,y=void 0!==h&&h,N=e.plaintext,x=e.readOnly,w=e.custom,C=e.as,g=void 0===C?"input":C,P=Object(r.a)(e,["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),k=Object(s.useContext)(f).controlId,S=w?[u,"custom"]:[i,"form-control"],R=S[0],L=S[1];if(i=Object(b.a)(R,L),N)(l={})[i+"-plaintext"]=!0,t=l;else if("file"===m){var T;(T={})[i+"-file"]=!0,t=T}else if("range"===m){var z;(z={})[i+"-range"]=!0,t=z}else if("select"===g&&w){var F;(F={})[i+"-select"]=!0,F[i+"-select-"+d]=d,t=F}else{var I;(I={})[i]=!0,I[i+"-"+d]=d,t=I}return o.a.createElement(g,Object(n.a)({},P,{type:m,size:p,ref:a,readOnly:x,id:v||k,className:c()(O,t,E&&"is-valid",y&&"is-invalid")}))}));v.displayName="FormControl";a.a=Object.assign(v,{Feedback:p})},452:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return M}));var n,r=t(39),l=t(0),c=t.n(l),s=t(98),o=t(1),i=t(2),u=t(4),m=t.n(u),d=t(17),p=t(9),f=t(5),b=t(48),v=t(23),O=t(49),j=((n={})[v.b]="show",n[v.a]="show",n),E=c.a.forwardRef((function(e,a){var t=e.className,n=e.children,r=Object(i.a)(e,["className","children"]),s=Object(l.useCallback)((function(e){Object(O.a)(e),r.onEnter&&r.onEnter(e)}),[r]);return c.a.createElement(v.e,Object(o.a)({ref:a,addEndListener:b.a},r,{onEnter:s}),(function(e,a){return c.a.cloneElement(n,Object(o.a)({},a,{className:m()("fade",t,n.props.className,j[e])}))}))}));E.defaultProps={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1},E.displayName="Fade";var h=E,y=t(3),N=t.n(y),x={label:N.a.string.isRequired,onClick:N.a.func},w=c.a.forwardRef((function(e,a){var t=e.label,n=e.onClick,r=e.className,l=Object(i.a)(e,["label","onClick","className"]);return c.a.createElement("button",Object(o.a)({ref:a,type:"button",className:m()("close",r),onClick:n},l),c.a.createElement("span",{"aria-hidden":"true"},"\xd7"),c.a.createElement("span",{className:"sr-only"},t))}));w.displayName="CloseButton",w.propTypes=x,w.defaultProps={label:"Close"};var C,g=w,P=t(24),k=t(21),S=(C="h4",c.a.forwardRef((function(e,a){return c.a.createElement("div",Object(o.a)({},e,{ref:a,className:m()(e.className,C)}))})));S.displayName="DivStyledAsH4";var R=Object(P.a)("alert-heading",{Component:S}),L=Object(P.a)("alert-link",{Component:k.a}),T={show:!0,transition:h,closeLabel:"Close alert"},z=c.a.forwardRef((function(e,a){var t=Object(d.a)(e,{show:"onClose"}),n=t.bsPrefix,r=t.show,l=t.closeLabel,s=t.className,u=t.children,b=t.variant,v=t.onClose,O=t.dismissible,j=t.transition,E=Object(i.a)(t,["bsPrefix","show","closeLabel","className","children","variant","onClose","dismissible","transition"]),y=Object(f.a)(n,"alert"),N=Object(p.a)((function(e){v&&v(!1,e)})),x=!0===j?h:j,w=c.a.createElement("div",Object(o.a)({role:"alert"},x?E:void 0,{ref:a,className:m()(s,y,b&&y+"-"+b,O&&y+"-dismissible")}),O&&c.a.createElement(g,{onClick:N,label:l}),u);return x?c.a.createElement(x,Object(o.a)({unmountOnExit:!0},E,{ref:void 0,in:r}),w):r?w:null}));z.displayName="Alert",z.defaultProps=T,z.Link=L,z.Heading=R;var F=z,I=["xl","lg","md","sm","xs"],G=c.a.forwardRef((function(e,a){var t=e.bsPrefix,n=e.className,r=e.noGutters,l=e.as,s=void 0===l?"div":l,u=Object(i.a)(e,["bsPrefix","className","noGutters","as"]),d=Object(f.a)(t,"row"),p=d+"-cols",b=[];return I.forEach((function(e){var a,t=u[e];delete u[e];var n="xs"!==e?"-"+e:"";null!=(a=null!=t&&"object"===typeof t?t.cols:t)&&b.push(""+p+n+"-"+a)})),c.a.createElement(s,Object(o.a)({ref:a},u,{className:m.a.apply(void 0,[n,d,r&&"no-gutters"].concat(b))}))}));G.displayName="Row",G.defaultProps={noGutters:!1};var q=G,A=["xl","lg","md","sm","xs"],B=c.a.forwardRef((function(e,a){var t=e.bsPrefix,n=e.className,r=e.as,l=void 0===r?"div":r,s=Object(i.a)(e,["bsPrefix","className","as"]),u=Object(f.a)(t,"col"),d=[],p=[];return A.forEach((function(e){var a,t,n,r=s[e];if(delete s[e],"object"===typeof r&&null!=r){var l=r.span;a=void 0===l||l,t=r.offset,n=r.order}else a=r;var c="xs"!==e?"-"+e:"";a&&d.push(!0===a?""+u+c:""+u+c+"-"+a),null!=n&&p.push("order"+c+"-"+n),null!=t&&p.push("offset"+c+"-"+t)})),d.length||d.push(u),c.a.createElement(l,Object(o.a)({},s,{ref:a,className:m.a.apply(void 0,[n].concat(d,p))}))}));B.displayName="Col";var D=B,H=t(442),J=t(445),K=t(55);t(441);function M(){var e=Object(l.useState)(""),a=Object(r.a)(e,2),t=a[0],n=a[1],o=Object(l.useState)(""),i=Object(r.a)(o,2),u=i[0],m=i[1],d=Object(l.useState)(!1),p=Object(r.a)(d,2),f=p[0],b=p[1],v=Object(l.useState)(""),O=Object(r.a)(v,2),j=O[0],E=O[1],h=Object(l.useState)(!1),y=Object(r.a)(h,2),N=y[0],x=y[1],w=Object(l.useState)(""),C=Object(r.a)(w,2),g=C[0],P=C[1],k=Object(l.useState)(""),S=Object(r.a)(k,2),R=S[0],L=S[1],T=Object(l.useState)(""),z=Object(r.a)(T,2),I=z[0],G=z[1],A=Object(l.useState)(!1),B=Object(r.a)(A,2),M=B[0],V=B[1],_=function(){b(!0),console.log("http://api.openweathermap.org/data/2.5/weather?q=".concat(t,",").concat(u,"&appid=81c261eabe73da11a00f5c11b5ef6f65")),fetch("http://api.openweathermap.org/data/2.5/weather?q=".concat(t,",").concat(u,"&appid=81c261eabe73da11a00f5c11b5ef6f65")).then((function(e){return e.json()})).then((function(e){if(200!==e.cod)E(e.message),x(!0),V(!1),b(!1);else{G(e.main.humidity),L("".concat(Math.round(e.main.temp_min-273.15),"\xb0C ~ ").concat(Math.round(e.main.temp_max-273.15),"\xb0C"));var a="others";e.weather[0].main.toLowerCase().includes("cloud")?a="cloud":e.weather[0].main.toLowerCase().includes("rain")?a="rain":e.weather[0].main.toLowerCase().includes("clear")&&(a="clear"),P([e.weather[0].main,e.weather[0].description,a]),V(!0),x(!1),b(!1)}}))};return c.a.createElement(s.a,null,c.a.createElement("h1",{className:"weather-title"},"Today's Weather"),N&&c.a.createElement(F,{variant:"danger"},j),c.a.createElement(q,{style:{marginBottom:"40px"}},c.a.createElement(D,{xs:12,md:4},c.a.createElement(H.a,null,c.a.createElement(H.a.Prepend,null,c.a.createElement(H.a.Text,null,"City:")),c.a.createElement(J.a,{value:t,onChange:function(e){return n(e.target.value)},onKeyDown:function(e){return"Enter"===e.key?_():null}}))),c.a.createElement(D,{xs:12,md:4},c.a.createElement(H.a,null,c.a.createElement(H.a.Prepend,null,c.a.createElement(H.a.Text,null,"Country:")),c.a.createElement(J.a,{value:u,onChange:function(e){return m(e.target.value)},onKeyDown:function(e){return"Enter"===e.key?_():null}}))),c.a.createElement(D,{xs:12,md:4},f?c.a.createElement("div",{className:"weather-loader"}):c.a.createElement(K.a,{onClick:_},"Search"))),c.a.createElement(c.a.Fragment,null,M&&c.a.createElement(c.a.Fragment,null,c.a.createElement(q,{style:{marginBottom:"20px"}},c.a.createElement(D,{xs:"auto"},c.a.createElement("div",{className:g[2]})),c.a.createElement(D,null,c.a.createElement("h1",null,g[0]),c.a.createElement("h2",null,g[1]))),c.a.createElement("div",null,"Temperature: ",R),c.a.createElement("div",null,"Humidity: ",I,"%"))))}}}]);