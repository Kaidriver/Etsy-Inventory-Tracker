(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{41:function(e,t,r){},42:function(e,t,r){},66:function(e,t,r){"use strict";r.r(t);var s=r(1),o=r.n(s),c=r(23),a=r.n(c),d=(r(41),r(36)),i=r(11),l=r(12),n=r(6),u=r(14),p=r(13),h=(r.p,r(42),r(35)),j=r(17),b=r(9),m=r(0),f=function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(e){var s;return Object(i.a)(this,r),(s=t.call(this,e)).deleteHook=s.deleteHook.bind(Object(n.a)(s)),s.populateInfo=s.populateInfo.bind(Object(n.a)(s)),s}return Object(l.a)(r,[{key:"deleteHook",value:function(){this.props.delete(this.props.id)}},{key:"populateInfo",value:function(){this.props.edit(this.props.id)}},{key:"render",value:function(){return Object(m.jsx)(b.a,{md:3,children:Object(m.jsxs)("div",{class:"product-display",children:[Object(m.jsxs)("div",{class:"icons",children:[Object(m.jsx)("svg",{onClick:this.populateInfo,xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-pencil-fill",viewBox:"0 0 16 16",children:Object(m.jsx)("path",{d:"M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"})}),Object(m.jsx)("svg",{onClick:this.deleteHook,xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-x-lg",viewBox:"0 0 16 16",children:Object(m.jsx)("path",{d:"M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"})})]}),Object(m.jsx)("img",{src:this.props.img}),Object(m.jsx)("h3",{class:"text-center",children:this.props.name}),Object(m.jsxs)("p",{children:["Qty: ",this.props.qty]}),Object(m.jsxs)("p",{children:["Buy by: ",this.props.date]})]})})}}]),r}(o.a.Component),y=r(16),k=function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(e){return Object(i.a)(this,r),t.call(this,e)}return Object(l.a)(r,[{key:"render",value:function(){return Object(m.jsxs)("div",{class:"nav",children:[Object(m.jsx)("h1",{children:"Inventory Tracking App"}),Object(m.jsx)(y.a,{onClick:this.props.loadPopup,id:"tracker-btn",variant:"outline-light",disabled:this.props.loaded?"":"true",children:"Add New Tracker"})," "]})}}]),r}(o.a.Component),O=r(24),P=r.n(O),v=r(34),x=r(7),g=r(10),S=r.n(g),w=function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(e){var s;return Object(i.a)(this,r),(s=t.call(this,e)).state={currentProperty:{},currentName:null!=e.selectedProduct?e.selectedProduct.hooks[e.id]:"",loaded:!1},null!=s.props.productIds[0]&&S.a.get("http://localhost:5000/hooks/getProperties/"+(null!=s.props.selectedProduct&&null!=s.props.selectedProduct.properties[s.props.id]?s.props.productIds[s.props.productNames.indexOf(s.props.selectedProduct.hooks[s.props.id])]:s.props.productIds[0])).then((function(e){s.setState({currentProperty:e.data})})),s.displayProperties=s.displayProperties.bind(Object(n.a)(s)),s.renderHooks=s.renderHooks.bind(Object(n.a)(s)),s}return Object(l.a)(r,[{key:"displayProperties",value:function(e){var t=this;this.setState({currentName:e.target.value}),S.a.get("http://localhost:5000/hooks/getProperties/"+this.props.productIds[e.target.selectedIndex]).then((function(e){t.setState({currentProperty:e.data})}))}},{key:"renderHooks",value:function(){var e=this,t=[];t.push(Object(m.jsxs)(b.a,{md:3,children:[Object(m.jsx)(x.a.Label,{children:"Product"}),Object(m.jsx)(x.a.Select,{onChange:this.displayProperties,className:"form-control hooks-field",id:"hooks-select",value:this.state.currentName,children:this.props.productNames.map((function(e){return Object(m.jsx)("option",{children:e})}))})]}));for(var r=this.state.currentProperty,s=Object.keys(r),o=0;o<s.length;o++){var c=r[s[o]].map((function(e){return Object(m.jsx)("option",{children:e})}));c.unshift(Object(m.jsx)("option",{children:"Any"})),null!=this.props.selectedProduct&&null!=this.props.selectedProduct.properties[this.props.id]&&(c=c.filter((function(t){return t.props.children!=e.props.selectedProduct.properties[e.props.id][s[o]]}))).unshift(Object(m.jsx)("option",{children:this.props.selectedProduct.properties[this.props.id][s[o]]})),t.push(Object(m.jsxs)(b.a,{md:3,children:[Object(m.jsx)(x.a.Label,{id:"property-select",children:s[o]}),Object(m.jsx)(x.a.Select,{id:"property-select",className:"hooks-field",children:c})]}))}t.push(Object(m.jsxs)(b.a,{md:3,children:[Object(m.jsx)(x.a.Label,{className:"end",id:"property-select",children:"Loss per Order"}),Object(m.jsx)(x.a.Control,{id:"property-select",type:"number",placeholder:"Enter Number",className:"losses-select hooks-field",defaultValue:null!=this.props.selectedProduct?this.props.selectedProduct.losses[this.props.id]:""})]}));var a=Math.ceil(t.length/4);return Array.from(Array(a)).map((function(e,r){return Object(m.jsx)(j.a,{children:t.slice(4*r,4*(r+1))})}))}},{key:"render",value:function(){return Object(m.jsx)("div",{children:this.renderHooks()})}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this;0==this.props.productNames.length&&S.a.get("http://localhost:5000/hooks/getProperties/"+(null!=e.selectedProduct&&null!=e.selectedProduct.properties[e.id]?e.productIds[e.productNames.indexOf(e.selectedProduct.hooks[e.id])]:e.productIds[0])).then((function(r){console.log(r.data),t.setState({currentProperty:r.data,currentName:null!=e.selectedProduct?e.selectedProduct.hooks[e.id]:"",loaded:!0})}))}}]),r}(o.a.Component),L=function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(e){var s;return Object(i.a)(this,r),(s=t.call(this,e)).state={hooks:1,edit:!1},s.addHook=s.addHook.bind(Object(n.a)(s)),s.hidePopup=s.hidePopup.bind(Object(n.a)(s)),s.createTracker=s.createTracker.bind(Object(n.a)(s)),s.resetPopup=s.resetPopup.bind(Object(n.a)(s)),s.renderHooks=s.renderHooks.bind(Object(n.a)(s)),s.validateFields=s.validateFields.bind(Object(n.a)(s)),s}return Object(l.a)(r,[{key:"resetPopup",value:function(){document.querySelectorAll(".pForm").forEach((function(e){console.log(e),e.reset()})),this.setState({hooks:1})}},{key:"hidePopup",value:function(){document.querySelector(".popup-wrapper").style.display="none",document.querySelector("body").style.overflow="visible",this.resetPopup()}},{key:"createTracker",value:function(){var e=Object(v.a)(P.a.mark((function e(){var t,r,s,o,c,a,d,i,l=this;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.validateFields()){e.next=4;break}alert("Please fill out all fields"),e.next=29;break;case 4:for(document.querySelector(".loading-wrapper").style.display="initial",t={},r=["name","qty","link"],s=document.querySelectorAll(".popup-form"),o=0;o<r.length;o++)t[r[o]]=s[o].value;for(t.hooks=Array.from(document.querySelectorAll("#hooks-select")).map((function(e){return e.value})),t.losses=Array.from(document.querySelectorAll(".losses-select")).map((function(e){return e.value})),c=[],a=document.querySelectorAll("#property-select"),d={},o=0;o<a.length;o+=2)a[o].classList.contains("end")?(c.push(d),d={}):d[a[o].innerText]=a[o+1].value;if(t.properties=c,null!=this.props.selectedProduct){e.next=20;break}S.a.post("http://localhost:5000/trackers/addTracker",t).then((function(e){t._id=e.data._id,t.imgSrc=e.data.src,t.buyDate=e.data.buyDate,l.props.add(t),document.querySelector(".loading-wrapper").style.display="none",l.hidePopup()})),e.next=29;break;case 20:return t._id=this.props.selectedProduct._id,t.imgSrc=this.props.selectedProduct.imgSrc,e.next=24,S.a.post("http://localhost:5000/trackers/updateTracker/"+this.props.selectedProduct._id,t);case 24:i=e.sent,t.buyDate=i.data.buyDate,this.props.updateProduct(t),document.querySelector(".loading-wrapper").style.display="none",this.hidePopup();case 29:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"addHook",value:function(){this.setState({hooks:this.state.hooks+1})}},{key:"renderHooks",value:function(){for(var e=[],t=0;t<this.state.hooks;t++)e.push(Object(m.jsx)(w,{id:t,productNames:this.props.productNames,productIds:this.props.productIds,selectedProduct:this.props.selectedProduct,displayProperties:this.displayProperties},t));return e}},{key:"validateFields",value:function(){for(var e=document.querySelectorAll(".popup-form"),t=0;t<e.length;t++)if(""==e[t].value)return!1;var r=document.querySelectorAll(".hooks-field");for(t=0;t<r.length;t++)if(""==r[t].value)return!1;return!0}},{key:"render",value:function(){return Object(m.jsxs)("div",{class:"popup-wrapper",children:[Object(m.jsx)("div",{class:"loading-wrapper",children:Object(m.jsx)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/7/7d/Pedro_luis_romani_ruiz.gif",class:"popup-loading"})}),Object(m.jsxs)("div",{class:"popup",children:[Object(m.jsx)("svg",{onClick:this.hidePopup,xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-x-lg",viewBox:"0 0 16 16",children:Object(m.jsx)("path",{d:"M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"})}),Object(m.jsx)("h1",{class:"text-center",children:null!=this.props.selectedProduct?"Edit Tracker":"Create Tracker"}),Object(m.jsxs)(x.a,{className:"pForm",children:[Object(m.jsxs)(j.a,{children:[Object(m.jsxs)(b.a,{md:8,children:[Object(m.jsx)(x.a.Label,{children:"Name"}),Object(m.jsx)(x.a.Control,{className:"popup-form",type:"text",defaultValue:null!=this.props.selectedProduct?this.props.selectedProduct.name:"",placeholder:"Enter name"})]}),Object(m.jsxs)(b.a,{md:4,children:[Object(m.jsx)(x.a.Label,{children:"Starting Quantity"}),Object(m.jsx)(x.a.Control,{className:"popup-form",type:"number",defaultValue:null!=this.props.selectedProduct?this.props.selectedProduct.qty:"",placeholder:"Enter Number"})]})]}),Object(m.jsx)(x.a.Label,{children:"Amazon Link"}),Object(m.jsx)(x.a.Control,{className:"popup-form",type:"text",defaultValue:null!=this.props.selectedProduct?this.props.selectedProduct.link:"",placeholder:"Enter Link"})]}),Object(m.jsxs)("div",{class:"hooks-header",children:[Object(m.jsx)("h3",{children:"Hooks with Etsy"}),Object(m.jsx)(y.a,{onClick:this.addHook,children:"Add New Hook"})]}),Object(m.jsx)("div",{class:"hooks",children:Object(m.jsx)("form",{className:"pForm",children:this.renderHooks()})}),Object(m.jsx)(y.a,{onClick:this.createTracker,id:"create-tracker-btn",children:null!=this.props.selectedProduct?"Edit Tracker":"Create Tracker"})]})]})}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){"initial"==document.querySelector(".popup-wrapper").style.display&&(document.querySelector("body").style.overflow="hidden"),null!=e.selectedProduct&&(console.log(e.selectedProduct),this.setState({hooks:e.selectedProduct.hooks.length}))}}]),r}(o.a.Component),N=(r(65),function(e){Object(u.a)(r,e);var t=Object(p.a)(r);function r(e){var s;return Object(i.a)(this,r),(s=t.call(this,e)).state={productList:[],productNames:[],productIds:[],selectedProduct:null,loaded:!1},s.renderProducts=s.renderProducts.bind(Object(n.a)(s)),s.addProduct=s.addProduct.bind(Object(n.a)(s)),s.deleteProduct=s.deleteProduct.bind(Object(n.a)(s)),s.editProduct=s.editProduct.bind(Object(n.a)(s)),s.loadPopup=s.loadPopup.bind(Object(n.a)(s)),s.updateProduct=s.updateProduct.bind(Object(n.a)(s)),s}return Object(l.a)(r,[{key:"renderProducts",value:function(){for(var e=[],t=0;t<this.state.productList.length;t++){var r=Object(m.jsx)(f,{id:t,img:this.state.productList[t].imgSrc,name:this.state.productList[t].name,qty:this.state.productList[t].qty,date:this.state.productList[t].buyDate,delete:this.deleteProduct,edit:this.editProduct},t);e.push(r)}var s=Math.ceil(this.state.productList.length/4);return Array.from(Array(s)).map((function(t,r){return Object(m.jsx)(j.a,{className:"product-row",children:e.slice(4*r,4*(r+1))})}))}},{key:"addProduct",value:function(e){this.setState({productList:this.state.productList.concat([e])})}},{key:"updateProduct",value:function(e){var t=this.state.productList.findIndex((function(t){return t._id===e._id})),r=Object(d.a)(this.state.productList);r[t]=e,console.log(r,t,e),this.setState({productList:r})}},{key:"deleteProduct",value:function(e){S.a.delete("http://localhost:5000/trackers/deleteTracker/"+this.state.productList[e]._id).then((function(e){console.log(e)})),this.setState({productList:this.state.productList.filter((function(t,r){return r!==e}))})}},{key:"editProduct",value:function(e){this.setState({selectedProduct:this.state.productList[e]}),document.querySelector(".popup-wrapper").style.display="initial"}},{key:"loadPopup",value:function(){this.setState({selectedProduct:null}),document.querySelector(".popup-wrapper").style.display="initial"}},{key:"render",value:function(){return Object(m.jsxs)("div",{children:[Object(m.jsx)(k,{loadPopup:this.loadPopup,loaded:this.state.loaded}),Object(m.jsx)(L,{add:this.addProduct,productNames:this.state.productNames,productIds:this.state.productIds,selectedProduct:this.state.selectedProduct,updateProduct:this.updateProduct}),Object(m.jsxs)(h.a,{children:[Object(m.jsx)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/7/7d/Pedro_luis_romani_ruiz.gif",class:"loading"}),this.renderProducts()]})]})}},{key:"componentDidMount",value:function(){var e=this;S.a.get("http://localhost:5000/hooks/getProducts").then((function(t){e.setState({productNames:t.data.map((function(e){return e.title})),productIds:t.data.map((function(e){return e.listing_id}))}),console.log(e.state.productIds)})),S.a.get("http://localhost:5000/trackers/getTrackers").then((function(t){document.querySelector(".loading").style.display="none",e.setState({productList:t.data,loaded:!0})}))}}]),r}(o.a.Component)),C=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,67)).then((function(t){var r=t.getCLS,s=t.getFID,o=t.getFCP,c=t.getLCP,a=t.getTTFB;r(e),s(e),o(e),c(e),a(e)}))};a.a.render(Object(m.jsx)(o.a.StrictMode,{children:Object(m.jsx)(N,{})}),document.getElementById("root")),C()}},[[66,1,2]]]);
//# sourceMappingURL=main.4b515882.chunk.js.map