(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=t(2),l=function(e){return r.a.createElement("form",{onSubmit:e.addInfo},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumChange}),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var n=e.person,t=(e.deleteNote,e.handlePersonRemoved);return r.a.createElement("div",null,n.name,": ",n.number,r.a.createElement("button",{onClick:function(){if(window.confirm("Delete ".concat(n.name,"?")))return t()}},"delete"))},i=t(3),d=t.n(i),m=function(){return d.a.get("/api/persons").then((function(e){return e.data}))},f=function(e){return d.a.post("/api/persons",e).then((function(e){return e.data}))},h=function(e){return d.a.delete("".concat("/api/persons","/").concat(e)).then((function(e){return e}))},p=function(e){var n=function(n){h(n.id).then((function(t){204===t.status&&(console.log("Note with id:".concat(n.name," deleted")),e.updatePersons(e.persons.filter((function(e){return e.id!==n.id}))))})).catch((function(t){e.setErrorMsg("".concat(n.name," was already removed from Server")),setTimeout((function(){e.setErrorMsg(null)}),5e3),e.updatePersons(e.persons.filter((function(e){return e.id!==n.id})))}))};return e.persons.map((function(t){return e.searchName?t.name.toLowerCase().includes(e.searchName.toLowerCase())?r.a.createElement(s,{key:t.id,person:t,handlePersonRemoved:function(){return n(t)}}):null:e.persons.length>0?r.a.createElement(s,{key:t.id,person:t,handlePersonRemoved:function(){return n(t)}}):r.a.createElement("div",null)}))},b=function(e){return r.a.createElement("input",{value:e.searchName,onChange:e.handleSearchChange})},g=function(e){var n=e.message;return n?r.a.createElement("div",{style:{color:"green",fontStyle:"italic",border:"solid",borderRadius:"5px",background:"lightgray"}},n):null},E=function(e){var n=e.message;return n?r.a.createElement("div",{style:{color:"red",fontStyle:"bold",border:"solid",borderRadius:"5px",background:"lightgray"}},n):null},v=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),s=Object(u.a)(c,2),i=s[0],d=s[1],h=Object(a.useState)(""),v=Object(u.a)(h,2),N=v[0],w=v[1],O=Object(a.useState)(""),j=Object(u.a)(O,2),y=j[0],C=j[1],S=Object(a.useState)(""),k=Object(u.a)(S,2),P=k[0],R=k[1],x=Object(a.useState)(""),I=Object(u.a)(x,2),J=I[0],M=I[1];Object(a.useEffect)((function(){console.log("effect"),m().then((function(e){o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:P}),r.a.createElement(E,{message:J}),r.a.createElement("h3",null,"Filter contacts:"),r.a.createElement(b,{searchName:y,handleSearchChange:function(e){C(e.target.value)}}),r.a.createElement("h3",null,"Add New"),r.a.createElement(l,{addInfo:function(e){e.preventDefault();var n={name:i,number:N};f(n).then((function(e){console.log("New contact added"),o(t.concat(e)),function(e){R("".concat(e.name," was successfully added")),setTimeout((function(){R(null)}),5e3)}(n)})).catch((function(e){!function(e){M("".concat(JSON.stringify(e.response.data.error))),setTimeout((function(){M(null)}),5e3)}(e)})),d(""),w("")},newName:i,handleNameChange:function(e){d(e.target.value)},newNumber:N,handleNumChange:function(e){w(e.target.value)}}),r.a.createElement("h3",null,"Contacts"),r.a.createElement(p,{persons:t,searchName:y,updatePersons:o,setErrorMsg:M}))};c.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.db173c9c.chunk.js.map