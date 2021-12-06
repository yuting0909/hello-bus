(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9a687634"],{1134:function(t,e,i){var n;
/** @license
 *
 *  Copyright (C) 2012 K. Arthur Endsley (kaendsle@mtu.edu)
 *  Michigan Tech Research Institute (MTRI)
 *  3600 Green Court, Suite 100, Ann Arbor, MI, 48105
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */(function(a,s){n=function(){return s()}.call(e,i,e,t),void 0===n||(t.exports=n)})(0,(function(){var t,e,i;return this,i=function(t){return t instanceof i?t:this instanceof i?void(this._wrapped=t):new i(t)},t=function(t,e){return t.substring(0,e.length)===e},e=function(t,e){return t.substring(t.length-e.length)===e},i.delimiter=" ",i.isArray=function(t){return!(!t||t.constructor!==Array)},i.trim=function(i,n){n=n||" ";while(t(i,n))i=i.substring(1);while(e(i,n))i=i.substring(0,i.length-1);return i},i.Wkt=function(t){this.delimiter=i.delimiter||" ",this.wrapVertices=!0,this.regExes={typeStr:/^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,spaces:/\s+|\+/,numeric:/-*\d+(\.*\d+)?/,comma:/\s*,\s*/,parenComma:/\)\s*,\s*\(/,coord:/-*\d+\.*\d+ -*\d+\.*\d+/,doubleParenComma:/\)\s*\)\s*,\s*\(\s*\(/,ogcTypes:/^(multi)?(point|line|polygon|box)?(string)?$/i,crudeJson:/^{.*"(type|coordinates|geometries|features)":.*}$/},this._stripWhitespaceAndParens=function(t){var e=t.trim(),i=e.replace(/^\(?(.*?)\)?$/,"$1");return i},this.components=void 0,t&&"string"===typeof t?this.read(t):t&&void 0!==typeof t&&this.fromObject(t)},i.Wkt.prototype.isCollection=function(){switch(this.type.slice(0,5)){case"multi":return!0;case"polyg":return!0;default:return!1}},i.Wkt.prototype.sameCoords=function(t,e){return t.x===e.x&&t.y===e.y},i.Wkt.prototype.fromObject=function(t){var e;return e=t.hasOwnProperty("type")&&t.hasOwnProperty("coordinates")?this.fromJson(t):this.deconstruct.call(this,t),this.components=e.components,this.isRectangle=e.isRectangle||!1,this.type=e.type,this},i.Wkt.prototype.toObject=function(t){var e=this.construct[this.type].call(this,t);return"object"!==typeof e||i.isArray(e)||(e.properties=this.properties),e},i.Wkt.prototype.toString=function(t){return this.write()},i.Wkt.prototype.fromJson=function(t){var e,n,a,s,o,r;if(this.type=t.type.toLowerCase(),this.components=[],t.hasOwnProperty("geometry"))return this.fromJson(t.geometry),this.properties=t.properties,this;if(s=t.coordinates,i.isArray(s[0])){for(e in s)if(s.hasOwnProperty(e))if(i.isArray(s[e][0])){for(n in r=[],s[e])if(s[e].hasOwnProperty(n))if(i.isArray(s[e][n][0])){for(a in o=[],s[e][n])s[e][n].hasOwnProperty(a)&&o.push({x:s[e][n][a][0],y:s[e][n][a][1]});r.push(o)}else r.push({x:s[e][n][0],y:s[e][n][1]});this.components.push(r)}else"multipoint"===this.type?this.components.push([{x:s[e][0],y:s[e][1]}]):this.components.push({x:s[e][0],y:s[e][1]})}else this.components.push({x:s[0],y:s[1]});return this},i.Wkt.prototype.toJson=function(){var t,e,n,a,s,o,r;if(t=this.components,e={coordinates:[],type:function(){var t,e,i;for(t in e=this.regExes.ogcTypes.exec(this.type).slice(1),i=[],e)e.hasOwnProperty(t)&&void 0!==e[t]&&i.push(e[t].toLowerCase().slice(0,1).toUpperCase()+e[t].toLowerCase().slice(1));return i}.call(this).join("")},"box"===this.type.toLowerCase()){for(n in e.type="Polygon",e.bbox=[],t)t.hasOwnProperty(n)&&(e.bbox=e.bbox.concat([t[n].x,t[n].y]));return e.coordinates=[[[t[0].x,t[0].y],[t[0].x,t[1].y],[t[1].x,t[1].y],[t[1].x,t[0].y],[t[0].x,t[0].y]]],e}for(n in t)if(t.hasOwnProperty(n))if(i.isArray(t[n])){for(a in r=[],t[n])if(t[n].hasOwnProperty(a))if(i.isArray(t[n][a])){for(s in o=[],t[n][a])t[n][a].hasOwnProperty(s)&&o.push([t[n][a][s].x,t[n][a][s].y]);r.push(o)}else t[n].length>1?r.push([t[n][a].x,t[n][a].y]):r=r.concat([t[n][a].x,t[n][a].y]);e.coordinates.push(r)}else t.length>1?e.coordinates.push([t[n].x,t[n].y]):e.coordinates=e.coordinates.concat([t[n].x,t[n].y]);return e},i.Wkt.prototype.merge=function(t){var e=this.type.slice(0,5);if(this.type!==t.type&&this.type.slice(5,this.type.length)!==t.type)throw TypeError("The input geometry types must agree or the calling this.Wkt.Wkt instance must be a multigeometry of the other");switch(e){case"point":this.components=[this.components.concat(t.components)];break;case"multi":this.components=this.components.concat("multi"===t.type.slice(0,5)?t.components:[t.components]);break;default:this.components=[this.components,t.components];break}return"multi"!==e&&(this.type="multi"+this.type),this},i.Wkt.prototype.read=function(t){var e;if(e=this.regExes.typeStr.exec(t),e)this.type=e[1].toLowerCase(),this.base=e[2],this.ingest[this.type]&&(this.components=this.ingest[this.type].apply(this,[this.base]));else{if(!this.regExes.crudeJson.test(t))throw console.log("Invalid WKT string provided to read()"),{name:"WKTError",message:"Invalid WKT string provided to read()"};if("object"!==typeof JSON||"function"!==typeof JSON.parse)throw console.log("JSON.parse() is not available; cannot parse GeoJSON strings"),{name:"JSONError",message:"JSON.parse() is not available; cannot parse GeoJSON strings"};this.fromJson(JSON.parse(t))}return this},i.Wkt.prototype.write=function(t){var e,i,n;for(t=t||this.components,i=[],i.push(this.type.toUpperCase()+"("),e=0;e<t.length;e+=1){if(this.isCollection()&&e>0&&i.push(","),!this.extract[this.type])return null;n=this.extract[this.type].apply(this,[t[e]]),this.isCollection()&&"multipoint"!==this.type?i.push("("+n+")"):(i.push(n),e!==t.length-1&&"multipoint"!==this.type&&i.push(","))}return i.push(")"),i.join("")},i.Wkt.prototype.extract={point:function(t){return String(t.x)+this.delimiter+String(t.y)},multipoint:function(t){var e,i,n=[];for(e=0;e<t.length;e+=1)i=this.extract.point.apply(this,[t[e]]),this.wrapVertices&&(i="("+i+")"),n.push(i);return n.join(",")},linestring:function(t){return this.extract.point.apply(this,[t])},multilinestring:function(t){var e,i=[];if(t.length)for(e=0;e<t.length;e+=1)i.push(this.extract.linestring.apply(this,[t[e]]));else i.push(this.extract.point.apply(this,[t]));return i.join(",")},polygon:function(t){return this.extract.multilinestring.apply(this,[t])},multipolygon:function(t){var e,i=[];for(e=0;e<t.length;e+=1)i.push("("+this.extract.polygon.apply(this,[t[e]])+")");return i.join(",")},box:function(t){return this.extract.linestring.apply(this,[t])},geometrycollection:function(t){console.log("The geometrycollection WKT type is not yet supported.")}},i.Wkt.prototype.ingest={point:function(t){var e=i.trim(t).split(this.regExes.spaces);return[{x:parseFloat(this.regExes.numeric.exec(e[0])[0]),y:parseFloat(this.regExes.numeric.exec(e[1])[0])}]},multipoint:function(t){var e,n,a;for(n=[],a=i.trim(t).split(this.regExes.comma),e=0;e<a.length;e+=1)n.push(this.ingest.point.apply(this,[a[e]]));return n},linestring:function(t){var e,i,n;for(i=this.ingest.multipoint.apply(this,[t]),n=[],e=0;e<i.length;e+=1)n=n.concat(i[e]);return n},multilinestring:function(t){var e,n,a,s;for(n=[],s=i.trim(t).split(this.regExes.doubleParenComma),1===s.length&&(s=i.trim(t).split(this.regExes.parenComma)),e=0;e<s.length;e+=1)a=this._stripWhitespaceAndParens(s[e]),n.push(this.ingest.linestring.apply(this,[a]));return n},polygon:function(t){var e,n,a,s,o,r;for(r=i.trim(t).split(this.regExes.parenComma),a=[],e=0;e<r.length;e+=1){for(o=this._stripWhitespaceAndParens(r[e]).split(this.regExes.comma),s=[],n=0;n<o.length;n+=1){var c=o[n].split(this.regExes.spaces);if(c.length>2&&(c=c.filter((function(t){return""!=t}))),2===c.length){var u=c[0],p=c[1];s.push({x:parseFloat(u),y:parseFloat(p)})}}a.push(s)}return a},box:function(t){var e,i,n;for(i=this.ingest.multipoint.apply(this,[t]),n=[],e=0;e<i.length;e+=1)n=n.concat(i[e]);return n},multipolygon:function(t){var e,n,a,s;for(n=[],s=i.trim(t).split(this.regExes.doubleParenComma),e=0;e<s.length;e+=1)a=this._stripWhitespaceAndParens(s[e]),n.push(this.ingest.polygon.apply(this,[a]));return n},geometrycollection:function(t){console.log("The geometrycollection WKT type is not yet supported.")}},i}))},5321:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVNSURBVHgB1ZpNbBtVEMdn3q7t2g2SQ6T2UBAmUrmRpidyw4YcqiaiRSAhIaEWECJNhZpIXCqhNoED3OoKKY1UqaQXuICUSk3hAMScaE847Y1K1IdeWqmtJfJpZ3eYef5gndjZrzhxflJkO377/P47M+/Nm7cI28TKyLGUBZBWhnGEP6aBKEmASQRI/t+KCohYIIC8TbRQtu1c9/QvBdgGEELwbCyd3FdKnOOBneauUhCMAo9ids2yLocRFUjIvyPH0qZhXCTiO7+N8A2ZKdnWZBBBvoQ8Y/eJonkJkU5CGwkiyLOQ5dFhdiGaaPT5tlKwgSa7pm7NeGnsScjy2aFLfJvGYDcgyCauzI27NdtSiARzrLR/nt/2w+6SX4suZbqzuWKrBi2FdJCIGluKUa2u6jARQn91TE1pKkTHRGeJqNG/fEaPbRObXGtx5PhppfA78IF6oRfw0MtgvNgL0HMQ1KHeSuc9Bxra0ZPHnAIsAq0sAT38Byz+o4cPwOZXX5A9nrjycxZaCZF1IqYMMV/KrS98/gBE3jgB6rVBwMR+CIMItO/fhfLcD0BPH3m5pLhmW0ed64zp/DaqjIvgIgLj+8Eceh/MzAnYLsRyRs8gGAODsD5/A8o/XnW7JBlDJS72dr2P2puqNR649RD9YEz/YDux79+Dtex513aWjZnnpm/m5H092KvW2BKxRrtFCOrwq2ylg67tTKT6mLVriTVQZ7AuNIkFCVx74U8Ig3qlT8ecXwghLeudrC1aSESpQOkHPX0Ma19/BrS8BGEQS8e+uqZf/RItJWTsE9q1FKBr5CJPqWa6sZn9993QIgSxqrXBqmbmLbaSu3sh4CndXtwKPEy3sU+/2LQutBOZFSUeVz9/z61pis4ef0lFQKXBAzspov6bHl1tiSCj2K86MRXxS78yEI/AHodj/HVFRCnY+yRViOpHJ5FUXluu/34DdhrJuzziXUj5p6uweuGjhv95SSO8ohJdDZ9XL3zsJXmsY3LppRi0MiI5kcmpvLVwG8JgDrwJqm8AwmAiEO+BMXCJJ/LOJ/pvlykoQizCHgdRhBD9AQHRmS/vHSR5DNOHuGaYPiwuiJtgQx48h7xjAJL58uaHnjzS6Uts7Bvfqbgze9Z9nP82UAbM5JUBdg4CIAUDEaEHxHtuizNh3304smfpg/wWIaoYfDyh4noDTwXwid7FOe6ecbgP/CLVlxpiTS9pexMKokFvrHgKvs5TsOtW14neDLErSPVDl4MCZMfI1+378lqlD74RQfrgQrdeNbWQUjSajZXKvoTogVSrH2EI2we7la5v6TDvzs4WkSDndlGl/nQP2o1MArX42wr2opl4tbZVr2utE04aSGm3i2Wmkt1b5N3Ni6DkRl5XeYmxCNfHNlLitMS+8yt4gg+Dam/rQqQ+tHxmeBY8nEa1KnHaUv70aLFWU7XMXF7qAE5rCA0rCNL6uORerr2sNP8h4rruDlFwWkNoECIKOVYm3XoRi2xM68USto/k0brzG6zfbnSh8q3vPVlUjuTiG84Xmx70LI4OZxXQOehAWMRlPlfcVIdreWK1NDr0F3beGUk+MTV3tNkXLbOsUjSSkScUoHPIx/nordWXLoehJ5PRUnm+AyyjRWCQw1AnuxkzrWJiI54S+K6pm2O2TR+CTHs7hF4GCMa9iBB8PcIhTwDZaEzwjuwUtBPCWVnT4u14hMNJ2wQh5CwLJ2unUP4uDYEIIn22oo8lUhAIKhCo64noYnarYHYjlBAnlQfPVFpxURy5nlwpxWKq9n2l7ERFKXYg1wls3mIbEM3Fp2cLsA38B3RbKi3vmuGCAAAAAElFTkSuQmCC"},"7e25":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAECSURBVHgBnZK9rgFBFMfPmeHmJrfZR9jm3txoKOhXR7eJB6Ck8wbolDQbneh9FSvRoZPQaERoPAIdydpjZnxkIzaWf3HOmcz8cuZ8IHhkmEXtJ3TMMcQoEeqAtCOiycmh/rDf2Hrf4i1IZwomR2yKUIPnKtttq3I7cA/UE+E3+Mv4iyRgvZxNVMaUmdfDnI0IQYdAcpN2uzFmLAxGcEjlKknLGPEsvCWMKRD8m+En7QIibeEDMSBYvEUAjhUYcr5qwu+CYq5LLen5ajU9/EbiRxSTeUkR1Addq6pAaTbL+VTAeyD8R/RploDsjlW8f9h7J5dBzvU6Ik2VQLRwTm7tcVfPJ5RRi4CX2gMAAAAASUVORK5CYII="},"934d":function(t,e,i){},"9fd8":function(t,e,i){"use strict";i.r(e);var n=i("7a23"),a=function(t){return Object(n["v"])("data-v-f25e0d52"),t=t(),Object(n["t"])(),t},s={class:"bus-driving-map"},o={class:"bus-title bg-primary"},r={class:"container d-flex justify-content-between px-3 px-sm-5"},c={class:"d-flex flex-column justify-content-end"},u=a((function(){return Object(n["f"])("div",{class:"rounded-pill bg-info"},[Object(n["f"])("i",{class:"fas fa-clock position-absolute top-50 start-50 translate-middle"})],-1)})),p=a((function(){return Object(n["f"])("span",{class:"ms-2 d-none d-sm-block"},"公車時刻表",-1)})),l=[u,p],h={class:"text-end"},m={class:"mb-1"},f=a((function(){return Object(n["f"])("i",{class:"fas fa-arrows-alt-h mx-1"},null,-1)})),b={class:"bg-primary"},y={class:"bus-information bg-white"},d={class:"container"},g={class:"row gx-0 gy-2"},O={class:"col-lg-6 d-none d-sm-block"},v={class:"realtime-data px-3 px-sm-5"},j={class:"d-flex justify-content-between py-3 border-bottom"},A={class:"text-dark"},S=a((function(){return Object(n["f"])("span",{class:"text-muted fs-7"},"行駛方向",-1)})),D=Object(n["h"])(),x=a((function(){return Object(n["f"])("br",null,null,-1)})),w=a((function(){return Object(n["f"])("span",{class:"text-info me-2"},"往",-1)})),T={key:0},C={key:1},N=a((function(){return Object(n["f"])("div",{class:"rounded-pill bg-info"},[Object(n["f"])("i",{class:"fas fas fa-exchange-alt position-absolute top-50 start-50 translate-middle"})],-1)})),R=[N],E={class:"stop-container mt-3 pe-3"},B=a((function(){return Object(n["f"])("div",{class:"col-lg-6"},[Object(n["f"])("div",{id:"map"})],-1)})),L={class:"collapse-realtime-data d-sm-none"},k={key:0},M=a((function(){return Object(n["f"])("i",{class:"fas fa-chevron-left me-1"},null,-1)})),I=Object(n["h"])(" 查看地圖"),P=[M,I],J={key:1,class:"fas fa-caret-up"},U={class:"d-flex justify-content-between py-3 border-bottom"},W={class:"text-dark"},Z=a((function(){return Object(n["f"])("span",{class:"text-muted fs-7"},"行駛方向",-1)})),q=Object(n["h"])(),H=a((function(){return Object(n["f"])("br",null,null,-1)})),K=a((function(){return Object(n["f"])("span",{class:"text-info me-2"},"往",-1)})),Q={key:0},F={key:1},X=a((function(){return Object(n["f"])("div",{class:"rounded-pill bg-info"},[Object(n["f"])("i",{class:"fas fas fa-exchange-alt"})],-1)})),G=[X],Y={class:"stop-container mt-3 pe-3"};function V(t,e,i,a,u,p){var N=this,M=Object(n["A"])("BreadcrumbBar"),I=Object(n["A"])("TimetableModal");return Object(n["s"])(),Object(n["e"])("div",s,[Object(n["i"])(M,{"navbar-style":u.navbarStyle,routeData:u.routeData},null,8,["navbar-style","routeData"]),Object(n["f"])("div",o,[Object(n["f"])("div",r,[Object(n["f"])("div",c,[Object(n["f"])("button",{class:"btn icon-btn",onClick:e[0]||(e[0]=function(t){return N.$refs.timetableModal.show()})},l)]),Object(n["f"])("div",h,[Object(n["f"])("h1",m,Object(n["C"])(u.routeName),1),Object(n["f"])("span",null,[Object(n["h"])(Object(n["C"])(u.routeData.DepartureStopNameZh),1),f,Object(n["h"])(Object(n["C"])(u.routeData.DestinationStopNameZh),1)])])])]),Object(n["f"])("div",b,[Object(n["f"])("div",y,[Object(n["f"])("div",d,[Object(n["f"])("div",g,[Object(n["f"])("div",O,[Object(n["f"])("div",v,[Object(n["f"])("div",j,[Object(n["f"])("div",A,[S,D,x,w,u.busDirection?(Object(n["s"])(),Object(n["e"])("span",C,Object(n["C"])(u.routeData.DepartureStopNameZh),1)):(Object(n["s"])(),Object(n["e"])("span",T,Object(n["C"])(u.routeData.DestinationStopNameZh),1))]),u.hasBothDirection?(Object(n["s"])(),Object(n["e"])("button",{key:0,class:"btn icon-btn",onClick:e[1]||(e[1]=function(){return p.busDirectionHandler&&p.busDirectionHandler.apply(p,arguments)})},R)):Object(n["d"])("",!0)]),Object(n["f"])("div",E,[(Object(n["s"])(!0),Object(n["e"])(n["a"],null,Object(n["y"])(p.tempRealtimeData,(function(t){return Object(n["s"])(),Object(n["e"])("div",{key:t.StopID,class:"stop-item d-flex justify-content-between mb-3"},[Object(n["f"])("span",null,Object(n["C"])(t.stopName),1),Object(n["f"])("span",null,Object(n["C"])(t.estimateTime),1)])})),128))])])]),B])])])]),Object(n["f"])("div",L,[Object(n["f"])("button",{class:"btn w-100",type:"button","data-bs-toggle":"collapse","data-bs-target":"#realtime-data","aria-expanded":"false","aria-controls":"realtime-data",onClick:e[2]||(e[2]=function(t){return u.collapseShow=!u.collapseShow})},[u.collapseShow?(Object(n["s"])(),Object(n["e"])("span",k,P)):(Object(n["s"])(),Object(n["e"])("i",J))]),Object(n["f"])("div",{id:"realtime-data",class:Object(n["o"])(["realtime-data collapse px-3 px-sm-5",{"d-none":!u.collapseShow}])},[Object(n["f"])("div",U,[Object(n["f"])("div",W,[Z,q,H,K,u.busDirection?(Object(n["s"])(),Object(n["e"])("span",F,Object(n["C"])(u.routeData.DepartureStopNameZh),1)):(Object(n["s"])(),Object(n["e"])("span",Q,Object(n["C"])(u.routeData.DestinationStopNameZh),1))]),u.hasBothDirection?(Object(n["s"])(),Object(n["e"])("button",{key:0,class:"btn icon-btn",onClick:e[3]||(e[3]=function(){return p.busDirectionHandler&&p.busDirectionHandler.apply(p,arguments)})},G)):Object(n["d"])("",!0)]),Object(n["f"])("div",Y,[(Object(n["s"])(!0),Object(n["e"])(n["a"],null,Object(n["y"])(p.tempRealtimeData,(function(t){return Object(n["s"])(),Object(n["e"])("div",{key:t.StopID,class:"stop-item d-flex justify-content-between mb-3"},[Object(n["f"])("span",null,Object(n["C"])(t.stopName),1),Object(n["f"])("span",null,Object(n["C"])(t.estimateTime),1)])})),128))])],2)]),Object(n["i"])(I,{bus:u.routeData,ref:"timetableModal"},null,8,["bus"])])}var z=i("5530"),_=(i("4de4"),i("d3b7"),i("d81d"),i("159b"),i("99af"),i("7db0"),i("b64b"),i("4e82"),i("a15b"),i("ac1f"),i("1276"),i("91c2")),$=i("63fc"),tt=i("e11e"),et=i.n(tt),it=i("1134"),nt=i.n(it),at=i("3b94"),st={components:{BreadcrumbBar:_["a"],TimetableModal:$["a"]},data:function(){return{navbarStyle:"light",collapseShow:!1,city:"",routeName:"",routeData:{},busTimetables:[],busRoute:[],busLocation:[],busStop:[],tempStops:[],realtimeData:[],hasBothDirection:"",busDirection:0,map:{},routeLayer:null,stopLayer:null,busLayer:null}},computed:{tempRealtimeData:function(){var t=this,e=this.realtimeData.filter((function(e){return e.Direction===t.busDirection})),i=this.tempStops.map((function(t){return{stopName:t.StopName.Zh_tw,stopUID:t.StopUID,stopSequence:t.StopSequence,plateNumb:"--",estimateTime:"--"}}));return e.forEach((function(t){i.forEach((function(e){if(t.StopUID===e.stopUID){e.plateNumb=t.PlateNumb;var i={day:"numeric",month:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!1,timeZone:"Asia/Taipei"},n=new Date(t.NextBusTime).toLocaleTimeString("en-US",i);if(0===t.StopStatus){var a=Math.floor(t.EstimateTime/60);e.estimateTime=0===a?"進站中":a<=1&&a>0?"即將到站":a?"".concat(a,"分鐘"):"--"}else 1===t.StopStatus?e.estimateTime=t.NextBusTime?n:"尚未發車":2===t.StopStatus?e.estimateTime="交管不停靠":3===t.StopStatus?e.estimateTime=t.NextBusTime?n:"末班車已過":4===t.StopStatus?e.estimateTime="今日未營運":e.estimateTime="--"}}))})),i}},watch:{busDirection:function(){this.drawRoute(),this.drawStop(),this.drawBus()}},inject:["emitter"],methods:{initialMap:function(){this.map=et.a.map("map",{zoomControl:!1}).setView([0,0],0),et.a.tileLayer("https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=".concat("jGpUNLDZeaC4MCep08QIRLOQ2ROGxOTxjmC3HMJCcCYsNaHD80PASTTemWTcM2ML"),{attribution:'<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',minZoom:0,maxZoom:22,subdomains:"abcd",accessToken:"jGpUNLDZeaC4MCep08QIRLOQ2ROGxOTxjmC3HMJCcCYsNaHD80PASTTemWTcM2ML"}).addTo(this.map),this.getRouteData(),this.getShapeData(),this.getStop(),this.getRealtimeData(),this.getBusLocation(),this.getBusTimetable()},getRouteData:function(){var t=this;this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/".concat(this.city,"/").concat(this.routeName,"?$format=JSON"),headers:Object(at["a"])()}).then((function(e){t.routeData=e.data.find((function(e){return e.RouteName.Zh_tw===t.routeName}))}))},getRealtimeData:function(){var t=this;this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/".concat(this.city,"/").concat(this.routeName,"?$format=JSON"),headers:Object(at["a"])()}).then((function(e){t.realtimeData=e.data.filter((function(e){return e.RouteName.Zh_tw===t.routeName}));var i=t.realtimeData.filter((function(t){return 0===t.Direction})),n=t.realtimeData.filter((function(t){return 1===t.Direction}));i.length&&n.length?t.hasBothDirection=!0:t.hasBothDirection=!1}))},getShapeData:function(){var t=this;this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/Shape/City/".concat(this.city,"/").concat(this.routeName,"?$format=JSON"),headers:Object(at["a"])()}).then((function(e){t.busRoute=e.data.filter((function(e){return e.RouteName.Zh_tw===t.routeName})),t.drawRoute()}))},drawRoute:function(){var t=this;this.routeLayer&&this.map.removeLayer(this.routeLayer);var e=this.busRoute.find((function(e){return e.Direction===t.busDirection})),i=e?e.Geometry:this.busRoute[0].Geometry,n=new nt.a.Wkt,a=n.read(i).toJson();this.routeLayer=et.a.geoJSON(a,{style:{color:"#5CBCDB",weight:4}}).addTo(this.map),this.map.fitBounds(this.routeLayer.getBounds())},getBusLocation:function(){var t=this;this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/".concat(this.city,"/").concat(this.routeName,"?$format=JSON"),headers:Object(at["a"])()}).then((function(e){t.busLocation=e.data.filter((function(e){return e.RouteName.Zh_tw===t.routeName})),t.drawBus()}))},drawBus:function(){var t=this,e=et.a.icon({iconUrl:i("5321"),iconSize:[30,30]});this.busLayer&&this.map.removeLayer(this.busLayer);var n=this.busLocation.filter((function(e){return e.Direction===t.busDirection}));this.busLayer=et.a.layerGroup().addTo(this.map),n.forEach((function(i){var n=i.BusPosition.PositionLat,a=i.BusPosition.PositionLon;et.a.marker([n,a],{icon:e,title:i.PlateNumb,opacity:1}).setZIndexOffset(100).addTo(t.busLayer)}))},getStop:function(){var t=this;this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/".concat(this.city,"/").concat(this.routeName,"?$format=JSON"),headers:Object(at["a"])()}).then((function(e){t.busStop=e.data.filter((function(e){return e.RouteName.Zh_tw===t.routeName})),t.drawStop()}))},drawStop:function(){var t=this,e=et.a.icon({iconUrl:i("7e25"),iconSize:[10,10]});this.stopLayer&&this.map.removeLayer(this.stopLayer),this.tempStops=this.busStop.find((function(e){return e.Direction===t.busDirection})).Stops,this.stopLayer=et.a.layerGroup().addTo(this.map),this.tempStops.forEach((function(i){var n=i.StopPosition.PositionLat,a=i.StopPosition.PositionLon;et.a.marker([n,a],{icon:e,title:i.StopName.Zh_tw,opacity:1}).addTo(t.stopLayer)}))},busDirectionHandler:function(){this.busDirection?this.busDirection=0:this.busDirection=1},getBusTimetable:function(){var t=this;this.axios({method:"get",url:"https://ptx.transportdata.tw/MOTC/v2/Bus/Schedule/City/".concat(this.city,"/").concat(this.routeName,"?$format=JSON"),headers:Object(at["a"])()}).then((function(e){t.busTimetables=e.data.filter((function(e){return e.RouteName.Zh_tw===t.routeName})),t.routeData.Timetables={};var i=[];t.busTimetables.forEach((function(t){if(t.Timetables){var e={subRouteName:t.SubRouteName.Zh_tw,direction:t.Direction,timetable:[]};t.Timetables.forEach((function(t){if(t.ServiceDay&&t.StopTimes){var i=t.StopTimes.find((function(t){return 1===t.StopSequence})).DepartureTime,n=e.timetable.map((function(t){return t.departureTime})).indexOf(i);if(-1===n)e.timetable.push({departureTime:i,serviceDay:Object(z["a"])({},t.ServiceDay)});else{var a=Object.keys(t.ServiceDay).filter((function(e){return 1===t.ServiceDay[e]}));a.forEach((function(t){e.timetable[n].serviceDay[t]=1}))}}})),e.timetable.sort((function(t,e){return t.departureTime.split(":").join("")-e.departureTime.split(":").join("")})),i.push(e)}}));var n=i.map((function(t){return Object(z["a"])(Object(z["a"])({},t),{},{serviceDay:"holiday",timetable:t.timetable.filter((function(t){return 1===t.serviceDay.Saturday&&1===t.serviceDay.Sunday}))})})).filter((function(t){return t.timetable.length}));t.routeData.Timetables.holiday=n;var a=i.map((function(t){return Object(z["a"])(Object(z["a"])({},t),{},{serviceDay:"common",timetable:t.timetable.filter((function(t){return 1===t.serviceDay.Monday&&1===t.serviceDay.Tuesday&&1===t.serviceDay.Wednesday&&1===t.serviceDay.Thursday&&1===t.serviceDay.Friday}))})})).filter((function(t){return t.timetable.length}));t.routeData.Timetables.common=a,t.routeData.Frequencys={};var s=[];t.busTimetables.forEach((function(t){if(t.Frequencys){var e={subRouteName:t.SubRouteName.Zh_tw,direction:t.Direction,frequency:[]};t.Frequencys.forEach((function(t){var i="".concat(t.StartTime," - ").concat(t.EndTime),n=e.frequency.map((function(t){return t.timePeriod})).indexOf(i);if(-1===n)e.frequency.push({timePeriod:i,startTime:t.StartTime,endTime:t.EndTime,minHeadwayMins:t.MinHeadwayMins,maxHeadwayMins:t.MaxHeadwayMins,serviceDay:Object(z["a"])({},t.ServiceDay)});else{var a=Object.keys(t.ServiceDay).filter((function(e){return 1===t.ServiceDay[e]}));a.forEach((function(t){e.frequency[n].serviceDay[t]=1}))}})),s.push(e)}}));var o=s.map((function(t){return Object(z["a"])(Object(z["a"])({},t),{},{serviceDay:"holiday",frequency:t.frequency.filter((function(t){return 1===t.serviceDay.Saturday&&1===t.serviceDay.Sunday}))})}));t.routeData.Frequencys.holiday=o;var r=s.map((function(t){return Object(z["a"])(Object(z["a"])({},t),{},{serviceDay:"common",frequency:t.frequency.filter((function(t){return 1===t.serviceDay.Monday&&1===t.serviceDay.Tuesday&&1===t.serviceDay.Wednesday&&1===t.serviceDay.Thursday&&1===t.serviceDay.Friday}))})}));t.routeData.Frequencys.common=r}))}},created:function(){this.emitter.emit("change-navbar-style",this.navbarStyle),this.city=this.$route.query.city,this.routeName=this.$route.query.routeName},mounted:function(){this.initialMap()}},ot=(i("a849"),i("6b0d")),rt=i.n(ot);const ct=rt()(st,[["render",V],["__scopeId","data-v-f25e0d52"]]);e["default"]=ct},a849:function(t,e,i){"use strict";i("934d")}}]);
//# sourceMappingURL=chunk-9a687634.b08a7c1c.js.map