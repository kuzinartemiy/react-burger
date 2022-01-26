(this["webpackJsonpreact-burger"]=this["webpackJsonpreact-burger"]||[]).push([[0],{102:function(e,t,n){},16:function(e,t,n){e.exports={header:"AppHeader_header__1mDt8",header__nav:"AppHeader_header__nav__1V1jP",header__link:"AppHeader_header__link__3ZbNC",header__navLinks:"AppHeader_header__navLinks__1WAlj",header__navListItem:"AppHeader_header__navListItem__Yy34l",header__profileLink:"AppHeader_header__profileLink__HiqLA",header__text:"AppHeader_header__text__2cqPK"}},17:function(e,t,n){e.exports={ingredientDetails__content:"IngredientDetails_ingredientDetails__content__3wFy5",ingredientDetails__title:"IngredientDetails_ingredientDetails__title__1Pzug",ingredientDetails__statsList:"IngredientDetails_ingredientDetails__statsList__3OaLw",ingredientDetails__statsListItem:"IngredientDetails_ingredientDetails__statsListItem__1zO2w",ingredientDetails__image:"IngredientDetails_ingredientDetails__image__3n6Nh"}},184:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),s=n(24),a=n.n(s),c=(n(102),n(88)),d=n.n(c),o=n(6),l=n(189),_=n(95),u=n(90),j=n(91),g=new(function(){function e(t){var n=t.baseUrl,r=t.ingredientsEndPoint,i=t.ordersEndPoint;Object(u.a)(this,e),this._baseUrl=n,this._ingredientsEndPoint=r,this._ordersEndPoint=i,this._headers={"Content-Type":"application/json"}}return Object(j.a)(e,[{key:"_getResponseData",value:function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}},{key:"getIngredients",value:function(){return fetch("".concat(this._baseUrl).concat(this._ingredientsEndPoint),{method:"GET",headers:this._headers}).then(this._getResponseData)}},{key:"sendOrder",value:function(e){return fetch("".concat(this._baseUrl).concat(this._ordersEndPoint),{method:"POST",headers:this._headers,body:JSON.stringify({ingredients:e})}).then(this._getResponseData)}}]),e}())({baseUrl:"https://norma.nomoreparties.space/api",ingredientsEndPoint:"/ingredients",ordersEndPoint:"/orders"}),b="SET_LOADING_OFF",p="GET_INGREDIENTS",O="SET_INGREDIENT_DETAILS",m="CLEAR_INGREDIENT_DETAILS",x="ADD_INGREDIENT_TO_ORDER",h="DELETE_INGREDIENT_FROM_ORDER",f="MOVE_INSIDE_CONSTRUCTOR",v="SEND_ORDER",y="CLEAR_ORDER_INFO",N="SHOW_ERROR_MESSAGE",D=function(e){return{type:N,payload:e}},I=function(){return function(e){g.getIngredients().then((function(t){var n;t.success&&(e((n=t.data,{type:p,payload:n})),e(!1?{type:"SET_LOADING_ON"}:{type:b}))})).catch((function(t){console.log("GET_INGREDIENTS_ERROR: ".concat(t)),e(D("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0438 \u0438\u043d\u0433\u0440\u0435\u0434\u0438\u0435\u043d\u0442\u043e\u0432.")),setTimeout((function(){e(D(""))}),3e3)}))}},C=n(16),E=n.n(C),L=n(5),R=n(0),k=function(){return Object(R.jsx)("header",{className:E.a.header,children:Object(R.jsxs)("nav",{className:E.a.header__nav,children:[Object(R.jsxs)("ul",{className:E.a.header__navLinks,children:[Object(R.jsx)("li",{className:E.a.header__navListItem,children:Object(R.jsxs)("a",{href:"#",className:E.a.header__link,children:[Object(R.jsx)(L.BurgerIcon,{type:"primary"}),Object(R.jsx)("p",{className:"text text_type_main-default",children:"\u041a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440"})]})}),Object(R.jsx)("li",{className:E.a.header__navListItem,children:Object(R.jsxs)("a",{href:"#",className:E.a.header__link,children:[Object(R.jsx)(L.ListIcon,{type:"secondary"}),Object(R.jsx)("p",{className:"text text_type_main-default header__text text_color_inactive",children:"\u041b\u0435\u043d\u0442\u0430 \u0437\u0430\u043a\u0430\u0437\u043e\u0432"})]})})]}),Object(R.jsx)("a",{href:"#",className:E.a.header__link,children:Object(R.jsx)(L.Logo,{})}),Object(R.jsxs)("a",{href:"#",className:E.a.header__profileLink,children:[Object(R.jsx)(L.ProfileIcon,{type:"secondary"}),Object(R.jsx)("p",{className:"text text_type_main-default text_color_inactive",children:"\u041b\u0438\u0447\u043d\u044b\u0439 \u043a\u0430\u0431\u0438\u043d\u0435\u0442"})]})]})})},M=n(15),w=n(22),T=n.n(w),S=n(191),B=n(25),A=n(64),P=n.n(A),G=n(190),H=function(e){var t=e.ingredient,n=e.handleDeleteIngredient,i=e.index,s=Object(o.c)((function(e){return{selectedIngredients:e.selectedIngredients.ingredients}})),a=s.selectedIngredients,c=Object(r.useRef)(null),d=Object(o.b)(),l=Object(G.a)({type:"selectedIngredient",item:{index:i}}),_=Object(M.a)(l,2)[1],u=Object(S.a)({accept:"selectedIngredient",hover:function(e,t){var n=e.index,r=i;if(n!==r){var s=c.current.getBoundingClientRect(),o=(s.bottom-s.top)/2,l=t.getClientOffset().y-s.top;if(!(n<r&&l<o)&&!(n>r&&l>o)){var _=a.filter((function(e){return e.customId!==a[n].customId})),u=[].concat(Object(B.a)(_.slice(0,r)),[a[n]],Object(B.a)(_.slice(r)));d(function(e){return{type:f,payload:e}}(u)),e.index=r}}},collect:function(e){return{isHover:e.isOver()}}}),j=Object(M.a)(u,2),g=j[0].isHover?"0px 0px 8px 4px rgba(76, 76, 255, 0.7)":"none",b=_((0,j[1])(c));return Object(R.jsxs)("li",{ref:b,className:P.a.DraggableConstructElement,children:[Object(R.jsx)(L.DragIcon,{type:"primary"}),Object(R.jsx)("div",{style:{boxShadow:g},className:P.a.DraggableConstructElement__wrapper,children:Object(R.jsx)(L.ConstructorElement,{text:t.name,price:t.price,thumbnail:t.image,handleClose:function(){return n(t.customId)}})})]})},W=n.p+"static/media/burgerLogo.c89b47ce.svg",F=function(e){var t=e.sendOrder,n=Object(o.b)(),i=Object(o.c)((function(e){return{selectedIngredients:e.selectedIngredients.ingredients,selectedBun:e.selectedIngredients.bun}})),s=i.selectedIngredients,a=i.selectedBun,c=Object(r.useMemo)((function(){var e=a.price?a.price:0;return s.length?s.reduce((function(e,t){return e+t.price}),e):e}),[a,s]),d=0!==s.length&&0!==Object.keys(a).length,l=function(e){n(function(e){return{type:h,payload:e}}(e))},_=Object(S.a)({accept:"ingredient",drop:function(e){n(function(e){return{type:x,payload:e}}(e))},collect:function(e){return{isHover:e.isOver()}}}),u=Object(M.a)(_,2),j=u[0].isHover,g=u[1],b=j?"0px 0px 8px 4px rgba(128, 26, 178, 0.7)":"none";return Object(R.jsxs)("div",{className:T.a.burgerConstructor,children:[Object(R.jsxs)("div",{style:{boxShadow:b},ref:g,className:T.a.burgerConstructor__constructorWrapper,children:[Object(R.jsx)("div",{className:T.a.burgerConstructor__elementWrapper,children:Object(R.jsx)(L.ConstructorElement,{isLocked:!0,type:"top",text:0!==Object.keys(a).length?"".concat(a.name," (\u0432\u0435\u0440\u0445)"):"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u0443\u043b\u043e\u0447\u043a\u0443",price:0!==Object.keys(a).length?a.price:0,thumbnail:0!==Object.keys(a).length?a.image:W})}),0!==s.length&&Object(R.jsx)("ul",{className:T.a.burgerConstructor__ingredients,children:s.map((function(e,t){return Object(R.jsx)(H,{handleDeleteIngredient:l,ingredient:e,index:t},e.customId)}))}),Object(R.jsx)("div",{className:T.a.burgerConstructor__elementWrapper,children:Object(R.jsx)(L.ConstructorElement,{isLocked:!0,type:"bottom",text:0!==Object.keys(a).length?"".concat(a.name," (\u043d\u0438\u0437)"):"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u0443\u043b\u043e\u0447\u043a\u0443",price:0!==Object.keys(a).length?a.price:0,thumbnail:0!==Object.keys(a).length?a.image:W})})]}),Object(R.jsxs)("div",{className:T.a.burgerConstructor__totalSubmit,children:[Object(R.jsxs)("p",{className:"text text_type_digits-medium",children:[c,Object(R.jsx)(L.CurrencyIcon,{type:"primary"})]}),Object(R.jsx)(L.Button,{disabled:!d,onClick:function(){var e=[a._id];s.forEach((function(t){return e.push(t._id)})),t(e)},type:"primary",size:"large",children:"\u041e\u0444\u043e\u0440\u043c\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437"})]})]})},U=n(93),X=n.n(U),V=function(e){var t=e.closeModal;return Object(R.jsx)("div",{onClick:t,className:"".concat(X.a.modalOverlay)})},Z=n(40),z=n.n(Z),J=function(e){var t=e.closeModal,n=e.children,i=document.getElementById("root-modal");return Object(r.useEffect)((function(){var e=function(e){"Escape"===e.key&&t()};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[t]),Object(s.createPortal)(Object(R.jsxs)("div",{className:z.a.modal__wrapper,children:[Object(R.jsxs)("div",{className:z.a.modal,children:[Object(R.jsx)("button",{className:z.a.modal__closeBtn,onClick:t}),n]}),Object(R.jsx)(V,{closeModal:t})]}),i)},K=n(30),q=n.n(K),Q=function(){var e=Object(o.c)((function(e){return{orderData:e.orderDetails}})),t=e.orderData;return Object(R.jsxs)("div",{className:q.a.orderDetails__\u0441ontent,children:[Object(R.jsx)("p",{className:"text text_type_digits-large ".concat(q.a.orderDetails__orderNumber),children:t.order.number}),Object(R.jsx)("p",{className:"text text_type_main-medium ".concat(q.a.orderDetails__text),children:"\u0438\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u0437\u0430\u043a\u0430\u0437\u0430"}),Object(R.jsx)("div",{className:q.a.orderDetails__doneIcon}),Object(R.jsx)("p",{className:"text text_type_main-default",children:"\u0412\u0430\u0448 \u0437\u0430\u043a\u0430\u0437 \u043d\u0430\u0447\u0430\u043b\u0438 \u0433\u043e\u0442\u043e\u0432\u0438\u0442\u044c"}),Object(R.jsx)("p",{className:"text text_type_main-default text_color_inactive",children:"\u0414\u043e\u0436\u0434\u0438\u0442\u0435\u0441\u044c \u0433\u043e\u0442\u043e\u0432\u043d\u043e\u0441\u0442\u0438 \u043d\u0430 \u043e\u0440\u0431\u0438\u0442\u0430\u043b\u044c\u043d\u043e\u0439 \u0441\u0442\u0430\u043d\u0446\u0438\u0438"})]})},Y=n(17),$=n.n(Y),ee=n(8),te=n.n(ee),ne=(te.a.string,te.a.string,te.a.string,te.a.number,te.a.number,te.a.number,te.a.number,te.a.number,te.a.string,te.a.string,te.a.string,te.a.number,function(e){var t=e.ingredient;return Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)("p",{className:"text text_type_main-large ".concat($.a.ingredientDetDetails__title),children:"\u0414\u0435\u0442\u0430\u043b\u0438 \u0438\u043d\u0433\u0440\u0435\u0434\u0438\u0435\u043d\u0442\u0430"}),Object(R.jsxs)("div",{className:$.a.ingredientDetails__content,children:[Object(R.jsx)("img",{className:$.a.ingredientDetails__image,alt:t.name,src:t.image}),Object(R.jsx)("p",{className:"text text_type_main-medium",children:t.name}),Object(R.jsxs)("ul",{className:$.a.ingredientDetails__statsList,children:[Object(R.jsxs)("li",{className:$.a.ingredientDetails__statsListItem,children:[Object(R.jsx)("p",{className:"text text_type_main-default text_color_inactive",children:"\u041a\u0430\u043b\u043e\u0440\u0438\u0438, \u043a\u043a\u0430\u043b"}),Object(R.jsx)("p",{className:"text text text_type_digits-default text_color_inactive",children:t.calories})]}),Object(R.jsxs)("li",{className:$.a.ingredientDetails__statsListItem,children:[Object(R.jsx)("p",{className:"text text_type_main-default text_color_inactive",children:"\u0411\u0435\u043b\u043a\u0438, \u0433"}),Object(R.jsx)("p",{className:"text text text_type_digits-default text_color_inactive",children:t.proteins})]}),Object(R.jsxs)("li",{className:$.a.ingredientDetails__statsListItem,children:[Object(R.jsx)("p",{className:"text text_type_main-default text_color_inactive",children:"\u0416\u0438\u0440\u044b, \u0433"}),Object(R.jsx)("p",{className:"text text text_type_digits-default text_color_inactive",children:t.fat})]}),Object(R.jsxs)("li",{className:$.a.ingredientDetails__statsListItem,children:[Object(R.jsx)("p",{className:"text text_type_main-default text_color_inactive",children:"\u0423\u0433\u043b\u0435\u0432\u043e\u0434\u044b, \u0433"}),Object(R.jsx)("p",{className:"text text text_type_digits-default text_color_inactive",children:t.carbohydrates})]})]})]})]})}),re=n(41),ie=n.n(re),se=function(e){var t=e.errorMessage,n=Object(r.useState)(ie.a.errorMessage),i=Object(M.a)(n,2),s=i[0],a=i[1];return Object(r.useEffect)((function(){t&&a("".concat(ie.a.errorMessage," ").concat(t&&ie.a.errorMessage_show))}),[]),Object(R.jsx)("div",{className:s,children:Object(R.jsx)("p",{className:"text text_type_main-default",children:t})})},ae=n(66),ce=n.n(ae),de=function(){return Object(R.jsx)("div",{className:ce.a.loader__wrapper,children:Object(R.jsxs)("div",{className:ce.a.loader,children:[Object(R.jsx)("div",{}),Object(R.jsx)("div",{}),Object(R.jsx)("div",{}),Object(R.jsx)("div",{}),Object(R.jsx)("div",{}),Object(R.jsx)("div",{}),Object(R.jsx)("div",{}),Object(R.jsx)("div",{})]})})},oe=n(42),le=n.n(oe),_e=n(67),ue=n.n(_e),je=n(31),ge=n.n(je),be=function(e){var t=e.ingredient,n=Object(o.b)(),i=Object(o.c)((function(e){return{selectedIngredients:e.selectedIngredients.ingredients}})),s=i.selectedIngredients,a=Object(r.useMemo)((function(){return s.filter((function(e){return e._id===t._id})).length}),[s,t._id]),c=Object(G.a)({type:"ingredient",item:t}),d=Object(M.a)(c,2)[1];return Object(R.jsxs)("li",{ref:d,onClick:function(){n({type:O,payload:t})},className:ge.a.ingredientCard,children:[0!==a&&Object(R.jsx)("div",{className:ge.a.ingredientCard__count,children:Object(R.jsx)("p",{className:"text text_type_digits-default",children:a})}),Object(R.jsx)("img",{className:ge.a.ingredientCard__image,src:t.image,alt:t.image}),Object(R.jsxs)("div",{className:ge.a.ingredientCard__price,children:[Object(R.jsx)("p",{className:"text text_type_digits-default",children:t.price}),Object(R.jsx)(L.CurrencyIcon,{type:"primary"})]}),Object(R.jsx)("p",{className:"text text_type_main-default",children:t.name})]})},pe=Object(r.forwardRef)((function(e,t){var n=e.title,r=e.ingredients,i=r[0].type+"s";return Object(R.jsxs)("div",{ref:t,id:i,className:ue.a.ingredientsList__container,children:[Object(R.jsx)("p",{className:"text text_type_main-medium",children:n}),Object(R.jsx)("ul",{className:ue.a.ingredientsList__ingredients,children:r.map((function(e){return Object(R.jsx)(be,{ingredient:e},e._id)}))})]})})),Oe=function(){var e=Object(o.c)((function(e){return{ingredients:e.ingredients}})),t=e.ingredients,n=Object(r.useState)("buns"),i=Object(M.a)(n,2),s=i[0],a=i[1],c=Object(r.useRef)(null),d=Object(r.useRef)(null),l=Object(r.useRef)(null),_=function(e,t){a(e),t.current.scrollIntoView({behavior:"smooth"})},u=Object(r.useMemo)((function(){return t.filter((function(e){return"bun"===e.type}))}),[t]),j=Object(r.useMemo)((function(){return t.filter((function(e){return"sauce"===e.type}))}),[t]),g=Object(r.useMemo)((function(){return t.filter((function(e){return"main"===e.type}))}),[t]);return Object(R.jsxs)("div",{className:le.a.burgerIngredients,children:[Object(R.jsx)("h1",{className:"text text_type_main-large test",children:"\u0421\u043e\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u0443\u0440\u0433\u0435\u0440"}),Object(R.jsxs)("div",{className:le.a.burgerIngredients__tabs,children:[Object(R.jsx)(L.Tab,{value:"buns",active:"buns"===s,onClick:function(e){return _(e,c)},children:"\u0411\u0443\u043b\u043a\u0438"}),Object(R.jsx)(L.Tab,{value:"sauces",active:"sauces"===s,onClick:function(e){return _(e,d)},children:"\u0421\u043e\u0443\u0441\u044b"}),Object(R.jsx)(L.Tab,{value:"mains",active:"mains"===s,onClick:function(e){return _(e,l)},children:"\u041d\u0430\u0447\u0438\u043d\u043a\u0438"})]}),Object(R.jsxs)("div",{onScroll:function(e){var t=e.target.scrollTop,n=d.current.offsetTop,r=l.current.offsetTop;a(t+40>=r?"mains":t+40>=n?"sauces":"buns")},className:le.a.burgerIngredients__tabsContent,children:[Object(R.jsx)(pe,{ref:c,title:"\u0411\u0443\u043b\u043a\u0438",ingredients:u}),Object(R.jsx)(pe,{ref:d,title:"\u0421\u043e\u0443\u0441\u044b",ingredients:j}),Object(R.jsx)(pe,{ref:l,title:"\u041d\u0430\u0447\u0438\u043d\u043a\u0438",ingredients:g})]})]})};var me=function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return{ingredients:e.ingredients,ingredientDetails:e.ingredientDetails,orderDetails:e.orderDetails,isLoading:e.isLoading,errorMessage:e.errorMessage}})),n=t.ingredients,i=t.ingredientDetails,s=t.orderDetails,a=t.isLoading,c=t.errorMessage,u=function(){e((function(e){e({type:m}),e({type:y})}))};return Object(r.useEffect)((function(){e(I())}),[]),Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(k,{}),a?Object(R.jsx)(de,{}):Object(R.jsxs)(R.Fragment,{children:[0!==n.length&&Object(R.jsx)(l.a,{backend:_.a,children:Object(R.jsxs)("div",{className:d.a.appWrapper,children:[Object(R.jsx)(Oe,{ingredients:n}),Object(R.jsx)(F,{sendOrder:function(t){e(function(e){return function(t){g.sendOrder(e).then((function(e){return e.success&&t({type:v,payload:e})})).catch((function(e){console.log("SEND_ORDER_ERROR: ".concat(e)),t(D("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0435 \u0437\u0430\u043a\u0430\u0437\u0430.")),setTimeout((function(){t(D(""))}),3e3)}))}}(t))}})]})}),s&&Object(R.jsx)(J,{closeModal:u,children:Object(R.jsx)(Q,{})}),i&&Object(R.jsx)(J,{closeModal:u,children:Object(R.jsx)(ne,{ingredient:i})})]}),c&&Object(R.jsx)(se,{errorMessage:c})]})},xe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,192)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),s(e),a(e)}))},he=n(11),fe=n(94),ve=n(21),ye=n(96),Ne={ingredients:[],bun:{}},De=Object(ve.b)({ingredients:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return t.type===p?t.payload:e},ingredientDetails:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O:return t.payload;case m:return null;default:return e}},selectedIngredients:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case x:return"bun"===t.payload.type?Object(he.a)(Object(he.a)({},e),{},{bun:t.payload}):(t.payload.customId=Object(ye.a)(10),Object(he.a)(Object(he.a)({},e),{},{ingredients:[].concat(Object(B.a)(e.ingredients),[Object(he.a)({},t.payload)])}));case f:return Object(he.a)(Object(he.a)({},e),{},{ingredients:t.payload});case h:return Object(he.a)(Object(he.a)({},e),{},{ingredients:Object(B.a)(e.ingredients.filter((function(e){return e.customId!==t.payload})))});default:return e}},orderDetails:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v:return t.payload;case y:return null;default:return e}},isLoading:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1?arguments[1]:void 0;return t.type!==b&&e},errorMessage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;return t.type===N?t.payload:e}}),Ie=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ve.c,Ce=Object(ve.d)(De,Ie(Object(ve.a)(fe.a)));a.a.render(Object(R.jsx)(i.a.StrictMode,{children:Object(R.jsx)(o.a,{store:Ce,children:Object(R.jsx)(me,{})})}),document.getElementById("root")),xe()},22:function(e,t,n){e.exports={burgerConstructor:"BurgerConstructor_burgerConstructor__XKK4n",burgerConstructor__constructorWrapper:"BurgerConstructor_burgerConstructor__constructorWrapper__2SHs8",burgerConstructor__ingredients:"BurgerConstructor_burgerConstructor__ingredients__2XTik",burgerConstructor__totalSubmit:"BurgerConstructor_burgerConstructor__totalSubmit__1ypL-",burgerConstructor__elementWrapper:"BurgerConstructor_burgerConstructor__elementWrapper__1HA-8"}},30:function(e,t,n){e.exports={"orderDetails__\u0441ontent":"OrderDetails_orderDetails__\u0441ontent__2KcwO",orderDetails__orderNumber:"OrderDetails_orderDetails__orderNumber__1ZlCR",orderDetails__text:"OrderDetails_orderDetails__text__3Z_6j",orderDetails__doneIcon:"OrderDetails_orderDetails__doneIcon__goPDC"}},31:function(e,t,n){e.exports={ingredientCard:"IngredientCard_ingredientCard__1wX_a",ingredientCard__count:"IngredientCard_ingredientCard__count__R8mn4",ingredientCard__image:"IngredientCard_ingredientCard__image__w6dNO",ingredientCard__price:"IngredientCard_ingredientCard__price__1MhmO"}},40:function(e,t,n){e.exports={modal:"Modal_modal__2vCcZ",modal__wrapper:"Modal_modal__wrapper__3GoQb",modal__closeBtn:"Modal_modal__closeBtn__ro42C"}},41:function(e,t,n){e.exports={errorMessage:"ErrorMessage_errorMessage__3smlr",errorMessage_show:"ErrorMessage_errorMessage_show__3Z1Xo"}},42:function(e,t,n){e.exports={burgerIngredients:"BurgerIngredients_burgerIngredients__3DmG1",burgerIngredients__tabs:"BurgerIngredients_burgerIngredients__tabs__33V4q",burgerIngredients__tabsContent:"BurgerIngredients_burgerIngredients__tabsContent__9gp5J"}},64:function(e,t,n){e.exports={DraggableConstructElement:"DraggableConstructElement_DraggableConstructElement__18xw6",DraggableConstructElement__wrapper:"DraggableConstructElement_DraggableConstructElement__wrapper__1aoox"}},66:function(e,t,n){e.exports={loader__wrapper:"Loader_loader__wrapper__2gM-s",loader:"Loader_loader__2UcaG","lds-roller":"Loader_lds-roller__1ibp9"}},67:function(e,t,n){e.exports={ingredientsList__container:"IngredientsList_ingredientsList__container__1jNkY",ingredientsList__ingredients:"IngredientsList_ingredientsList__ingredients__1v5nC"}},88:function(e,t,n){e.exports={appWrapper:"App_appWrapper__1zlW8"}},93:function(e,t,n){e.exports={modalOverlay:"ModalOverlay_modalOverlay__3jgQB"}}},[[184,1,2]]]);
//# sourceMappingURL=main.d743edb6.chunk.js.map