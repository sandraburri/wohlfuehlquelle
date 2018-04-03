/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.2.2
*/

if(typeof YAHOO=="undefined"){var YAHOO={};}
YAHOO.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=YAHOO;for(j=(d[0]=="YAHOO")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};YAHOO.log=function(msg,cat,src){var l=YAHOO.widget.Logger;if(l&&l.log){return l.log(msg,cat,src);}else{return false;}};YAHOO.init=function(){this.namespace("util","widget","example");if(typeof YAHOO_config!="undefined"){var l=YAHOO_config.listener,ls=YAHOO.env.listeners,unique=true,i;if(l){for(i=0;i<ls.length;i=i+1){if(ls[i]==l){unique=false;break;}}
if(unique){ls.push(l);}}}};YAHOO.register=function(name,mainClass,data){var mods=YAHOO.env.modules;if(!mods[name]){mods[name]={versions:[],builds:[]};}
var m=mods[name],v=data.version,b=data.build,ls=YAHOO.env.listeners;m.name=name;m.version=v;m.build=b;m.versions.push(v);m.builds.push(b);m.mainClass=mainClass;for(var i=0;i<ls.length;i=i+1){ls[i](m);}
if(mainClass){mainClass.VERSION=v;mainClass.BUILD=b;}else{YAHOO.log("mainClass is undefined for module "+name,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[],getVersion:function(name){return YAHOO.env.modules[name]||null;}};YAHOO.lang={isArray:function(obj){if(obj&&obj.constructor&&obj.constructor.toString().indexOf('Array')>-1){return true;}else{return YAHOO.lang.isObject(obj)&&obj.constructor==Array;}},isBoolean:function(obj){return typeof obj=='boolean';},isFunction:function(obj){return typeof obj=='function';},isNull:function(obj){return obj===null;},isNumber:function(obj){return typeof obj=='number'&&isFinite(obj);},isObject:function(obj){return obj&&(typeof obj=='object'||YAHOO.lang.isFunction(obj));},isString:function(obj){return typeof obj=='string';},isUndefined:function(obj){return typeof obj=='undefined';},hasOwnProperty:function(obj,prop){if(Object.prototype.hasOwnProperty){return obj.hasOwnProperty(prop);}
return!YAHOO.lang.isUndefined(obj[prop])&&obj.constructor.prototype[prop]!==obj[prop];},extend:function(subc,superc,overrides){if(!superc||!subc){throw new Error("YAHOO.lang.extend failed, please check that "+"all dependencies are included.");}
var F=function(){};F.prototype=superc.prototype;subc.prototype=new F();subc.prototype.constructor=subc;subc.superclass=superc.prototype;if(superc.prototype.constructor==Object.prototype.constructor){superc.prototype.constructor=superc;}
if(overrides){for(var i in overrides){subc.prototype[i]=overrides[i];}}},augment:function(r,s){if(!s||!r){throw new Error("YAHOO.lang.augment failed, please check that "+"all dependencies are included.");}
var rp=r.prototype,sp=s.prototype,a=arguments,i,p;if(a[2]){for(i=2;i<a.length;i=i+1){rp[a[i]]=sp[a[i]];}}else{for(p in sp){if(!rp[p]){rp[p]=sp[p];}}}}};YAHOO.init();YAHOO.util.Lang=YAHOO.lang;YAHOO.augment=YAHOO.lang.augment;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.2.2",build:"204"});
(function(){var Y=YAHOO.util,getStyle,setStyle,id_counter=0,propertyCache={};var ua=navigator.userAgent.toLowerCase(),isOpera=(ua.indexOf('opera')>-1),isSafari=(ua.indexOf('safari')>-1),isGecko=(!isOpera&&!isSafari&&ua.indexOf('gecko')>-1),isIE=(!isOpera&&ua.indexOf('msie')>-1);var patterns={HYPHEN:/(-[a-z])/i,ROOT_TAG:/body|html/i};var toCamel=function(property){if(!patterns.HYPHEN.test(property)){return property;}
if(propertyCache[property]){return propertyCache[property];}
var converted=property;while(patterns.HYPHEN.exec(converted)){converted=converted.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}
propertyCache[property]=converted;return converted;};if(document.defaultView&&document.defaultView.getComputedStyle){getStyle=function(el,property){var value=null;if(property=='float'){property='cssFloat';}
var computed=document.defaultView.getComputedStyle(el,'');if(computed){value=computed[toCamel(property)];}
return el.style[property]||value;};}else if(document.documentElement.currentStyle&&isIE){getStyle=function(el,property){switch(toCamel(property)){case'opacity':var val=100;try{val=el.filters['DXImageTransform.Microsoft.Alpha'].opacity;}catch(e){try{val=el.filters('alpha').opacity;}catch(e){}}
return val/100;break;case'float':property='styleFloat';default:var value=el.currentStyle?el.currentStyle[property]:null;return(el.style[property]||value);}};}else{getStyle=function(el,property){return el.style[property];};}
if(isIE){setStyle=function(el,property,val){switch(property){case'opacity':if(YAHOO.lang.isString(el.style.filter)){el.style.filter='alpha(opacity='+val*100+')';if(!el.currentStyle||!el.currentStyle.hasLayout){el.style.zoom=1;}}
break;case'float':property='styleFloat';default:el.style[property]=val;}};}else{setStyle=function(el,property,val){if(property=='float'){property='cssFloat';}
el.style[property]=val;};}
YAHOO.util.Dom={get:function(el){if(YAHOO.lang.isString(el)){return document.getElementById(el);}
if(YAHOO.lang.isArray(el)){var c=[];for(var i=0,len=el.length;i<len;++i){c[c.length]=Y.Dom.get(el[i]);}
return c;}
if(el){return el;}
return null;},getStyle:function(el,property){property=toCamel(property);var f=function(element){return getStyle(element,property);};return Y.Dom.batch(el,f,Y.Dom,true);},setStyle:function(el,property,val){property=toCamel(property);var f=function(element){setStyle(element,property,val);};Y.Dom.batch(el,f,Y.Dom,true);},getXY:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var parentNode=null;var pos=[];var box;if(el.getBoundingClientRect){box=el.getBoundingClientRect();var doc=document;if(!this.inDocument(el)&&parent.document!=document){doc=parent.document;if(!this.isAncestor(doc.documentElement,el)){return false;}}
var scrollTop=Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);var scrollLeft=Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);return[box.left+scrollLeft,box.top+scrollTop];}
else{pos=[el.offsetLeft,el.offsetTop];parentNode=el.offsetParent;var hasAbs=this.getStyle(el,'position')=='absolute';if(parentNode!=el){while(parentNode){pos[0]+=parentNode.offsetLeft;pos[1]+=parentNode.offsetTop;if(isSafari&&!hasAbs&&this.getStyle(parentNode,'position')=='absolute'){hasAbs=true;}
parentNode=parentNode.offsetParent;}}
if(isSafari&&hasAbs){pos[0]-=document.body.offsetLeft;pos[1]-=document.body.offsetTop;}}
parentNode=el.parentNode;while(parentNode.tagName&&!patterns.ROOT_TAG.test(parentNode.tagName))
{if(Y.Dom.getStyle(parentNode,'display')!='inline'){pos[0]-=parentNode.scrollLeft;pos[1]-=parentNode.scrollTop;}
parentNode=parentNode.parentNode;}
return pos;};return Y.Dom.batch(el,f,Y.Dom,true);},getX:function(el){var f=function(el){return Y.Dom.getXY(el)[0];};return Y.Dom.batch(el,f,Y.Dom,true);},getY:function(el){var f=function(el){return Y.Dom.getXY(el)[1];};return Y.Dom.batch(el,f,Y.Dom,true);},setXY:function(el,pos,noRetry){var f=function(el){var style_pos=this.getStyle(el,'position');if(style_pos=='static'){this.setStyle(el,'position','relative');style_pos='relative';}
var pageXY=this.getXY(el);if(pageXY===false){return false;}
var delta=[parseInt(this.getStyle(el,'left'),10),parseInt(this.getStyle(el,'top'),10)];if(isNaN(delta[0])){delta[0]=(style_pos=='relative')?0:el.offsetLeft;}
if(isNaN(delta[1])){delta[1]=(style_pos=='relative')?0:el.offsetTop;}
if(pos[0]!==null){el.style.left=pos[0]-pageXY[0]+delta[0]+'px';}
if(pos[1]!==null){el.style.top=pos[1]-pageXY[1]+delta[1]+'px';}
if(!noRetry){var newXY=this.getXY(el);if((pos[0]!==null&&newXY[0]!=pos[0])||(pos[1]!==null&&newXY[1]!=pos[1])){this.setXY(el,pos,true);}}};Y.Dom.batch(el,f,Y.Dom,true);},setX:function(el,x){Y.Dom.setXY(el,[x,null]);},setY:function(el,y){Y.Dom.setXY(el,[null,y]);},getRegion:function(el){var f=function(el){var region=new Y.Region.getRegion(el);return region;};return Y.Dom.batch(el,f,Y.Dom,true);},getClientWidth:function(){return Y.Dom.getViewportWidth();},getClientHeight:function(){return Y.Dom.getViewportHeight();},getElementsByClassName:function(className,tag,root){var method=function(el){return Y.Dom.hasClass(el,className);};return Y.Dom.getElementsBy(method,tag,root);},hasClass:function(el,className){var re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)');var f=function(el){return re.test(el.className);};return Y.Dom.batch(el,f,Y.Dom,true);},addClass:function(el,className){var f=function(el){if(this.hasClass(el,className)){return;}
el.className=[el.className,className].join(' ');};Y.Dom.batch(el,f,Y.Dom,true);},removeClass:function(el,className){var re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)','g');var f=function(el){if(!this.hasClass(el,className)){return;}
var c=el.className;el.className=c.replace(re,' ');if(this.hasClass(el,className)){this.removeClass(el,className);}};Y.Dom.batch(el,f,Y.Dom,true);},replaceClass:function(el,oldClassName,newClassName){if(oldClassName===newClassName){return false;}
var re=new RegExp('(?:^|\\s+)'+oldClassName+'(?:\\s+|$)','g');var f=function(el){if(!this.hasClass(el,oldClassName)){this.addClass(el,newClassName);return;}
el.className=el.className.replace(re,' '+newClassName+' ');if(this.hasClass(el,oldClassName)){this.replaceClass(el,oldClassName,newClassName);}};Y.Dom.batch(el,f,Y.Dom,true);},generateId:function(el,prefix){prefix=prefix||'yui-gen';el=el||{};var f=function(el){if(el){el=Y.Dom.get(el);}else{el={};}
if(!el.id){el.id=prefix+id_counter++;}
return el.id;};return Y.Dom.batch(el,f,Y.Dom,true);},isAncestor:function(haystack,needle){haystack=Y.Dom.get(haystack);if(!haystack||!needle){return false;}
var f=function(needle){if(haystack.contains&&!isSafari){return haystack.contains(needle);}
else if(haystack.compareDocumentPosition){return!!(haystack.compareDocumentPosition(needle)&16);}
else{var parent=needle.parentNode;while(parent){if(parent==haystack){return true;}
else if(!parent.tagName||parent.tagName.toUpperCase()=='HTML'){return false;}
parent=parent.parentNode;}
return false;}};return Y.Dom.batch(needle,f,Y.Dom,true);},inDocument:function(el){var f=function(el){return this.isAncestor(document.documentElement,el);};return Y.Dom.batch(el,f,Y.Dom,true);},getElementsBy:function(method,tag,root){tag=tag||'*';var nodes=[];if(root){root=Y.Dom.get(root);if(!root){return nodes;}}else{root=document;}
var elements=root.getElementsByTagName(tag);if(!elements.length&&(tag=='*'&&root.all)){elements=root.all;}
for(var i=0,len=elements.length;i<len;++i){if(method(elements[i])){nodes[nodes.length]=elements[i];}}
return nodes;},batch:function(el,method,o,override){var id=el;el=Y.Dom.get(el);var scope=(override)?o:window;if(!el||el.tagName||!el.length){if(!el){return false;}
return method.call(scope,el,o);}
var collection=[];for(var i=0,len=el.length;i<len;++i){if(!el[i]){id=el[i];}
collection[collection.length]=method.call(scope,el[i],o);}
return collection;},getDocumentHeight:function(){var scrollHeight=(document.compatMode!='CSS1Compat')?document.body.scrollHeight:document.documentElement.scrollHeight;var h=Math.max(scrollHeight,Y.Dom.getViewportHeight());return h;},getDocumentWidth:function(){var scrollWidth=(document.compatMode!='CSS1Compat')?document.body.scrollWidth:document.documentElement.scrollWidth;var w=Math.max(scrollWidth,Y.Dom.getViewportWidth());return w;},getViewportHeight:function(){var height=self.innerHeight;var mode=document.compatMode;if((mode||isIE)&&!isOpera){height=(mode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight;}
return height;},getViewportWidth:function(){var width=self.innerWidth;var mode=document.compatMode;if(mode||isIE){width=(mode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth;}
return width;}};})();YAHOO.util.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};YAHOO.util.Region.prototype.contains=function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new YAHOO.util.Region(t,r,b,l);}else{return null;}};YAHOO.util.Region.prototype.union=function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(el){var p=YAHOO.util.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Point=function(x,y){if(x instanceof Array){y=x[1];x=x[0];}
this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.2.2",build:"204"});
YAHOO.util.CustomEvent=function(type,oScope,silent,signature){this.type=type;this.scope=oScope||window;this.silent=silent;this.signature=signature||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}
var onsubscribeType="_YUICEOnSubscribe";if(type!==onsubscribeType){this.subscribeEvent=new YAHOO.util.CustomEvent(onsubscribeType,this,true);}};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(fn,obj,override){if(!fn){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}
if(this.subscribeEvent){this.subscribeEvent.fire(fn,obj,override);}
this.subscribers.push(new YAHOO.util.Subscriber(fn,obj,override));},unsubscribe:function(fn,obj){if(!fn){return this.unsubscribeAll();}
var found=false;for(var i=0,len=this.subscribers.length;i<len;++i){var s=this.subscribers[i];if(s&&s.contains(fn,obj)){this._delete(i);found=true;}}
return found;},fire:function(){var len=this.subscribers.length;if(!len&&this.silent){return true;}
var args=[],ret=true,i;for(i=0;i<arguments.length;++i){args.push(arguments[i]);}
var argslength=args.length;if(!this.silent){}
for(i=0;i<len;++i){var s=this.subscribers[i];if(s){if(!this.silent){}
var scope=s.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var param=null;if(args.length>0){param=args[0];}
ret=s.fn.call(scope,param,s.obj);}else{ret=s.fn.call(scope,this.type,args,s.obj);}
if(false===ret){if(!this.silent){}
return false;}}}
return true;},unsubscribeAll:function(){for(var i=0,len=this.subscribers.length;i<len;++i){this._delete(len-1-i);}
return i;},_delete:function(index){var s=this.subscribers[index];if(s){delete s.fn;delete s.obj;}
this.subscribers.splice(index,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(fn,obj,override){this.fn=fn;this.obj=obj||null;this.override=override;};YAHOO.util.Subscriber.prototype.getScope=function(defaultScope){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}
return defaultScope;};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){if(obj){return(this.fn==fn&&this.obj==obj);}else{return(this.fn==fn);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+(this.obj||"")+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var loadComplete=false;var DOMReady=false;var listeners=[];var unloadListeners=[];var legacyEvents=[];var legacyHandlers=[];var retryCount=0;var onAvailStack=[];var legacyMap=[];var counter=0;var lastError=null;return{POLL_RETRYS:200,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,OBJ:3,ADJ_SCOPE:4,isSafari:(/KHTML/gi).test(navigator.userAgent),webkit:function(){var v=navigator.userAgent.match(/AppleWebKit\/([^ ]*)/);if(v&&v[1]){return v[1];}
return null;}(),isIE:(!this.webkit&&!navigator.userAgent.match(/opera/gi)&&navigator.userAgent.match(/msie/gi)),_interval:null,startInterval:function(){if(!this._interval){var self=this;var callback=function(){self._tryPreloadAttach();};this._interval=setInterval(callback,this.POLL_INTERVAL);}},onAvailable:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:false});retryCount=this.POLL_RETRYS;this.startInterval();},onDOMReady:function(p_fn,p_obj,p_override){this.DOMReadyEvent.subscribe(p_fn,p_obj,p_override);},onContentReady:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:true});retryCount=this.POLL_RETRYS;this.startInterval();},addListener:function(el,sType,fn,obj,override){if(!fn||!fn.call){return false;}
if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=this.on(el[i],sType,fn,obj,override)&&ok;}
return ok;}else if(typeof el=="string"){var oEl=this.getEl(el);if(oEl){el=oEl;}else{this.onAvailable(el,function(){YAHOO.util.Event.on(el,sType,fn,obj,override);});return true;}}
if(!el){return false;}
if("unload"==sType&&obj!==this){unloadListeners[unloadListeners.length]=[el,sType,fn,obj,override];return true;}
var scope=el;if(override){if(override===true){scope=obj;}else{scope=override;}}
var wrappedFn=function(e){return fn.call(scope,YAHOO.util.Event.getEvent(e),obj);};var li=[el,sType,fn,wrappedFn,scope];var index=listeners.length;listeners[index]=li;if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);if(legacyIndex==-1||el!=legacyEvents[legacyIndex][0]){legacyIndex=legacyEvents.length;legacyMap[el.id+sType]=legacyIndex;legacyEvents[legacyIndex]=[el,sType,el["on"+sType]];legacyHandlers[legacyIndex]=[];el["on"+sType]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),legacyIndex);};}
legacyHandlers[legacyIndex].push(li);}else{try{this._simpleAdd(el,sType,wrappedFn,false);}catch(ex){this.lastError=ex;this.removeListener(el,sType,fn);return false;}}
return true;},fireLegacyEvent:function(e,legacyIndex){var ok=true,le,lh,li,scope,ret;lh=legacyHandlers[legacyIndex];for(var i=0,len=lh.length;i<len;++i){li=lh[i];if(li&&li[this.WFN]){scope=li[this.ADJ_SCOPE];ret=li[this.WFN].call(scope,e);ok=(ok&&ret);}}
le=legacyEvents[legacyIndex];if(le&&le[2]){le[2](e);}
return ok;},getLegacyIndex:function(el,sType){var key=this.generateId(el)+sType;if(typeof legacyMap[key]=="undefined"){return-1;}else{return legacyMap[key];}},useLegacyEvent:function(el,sType){if(this.webkit&&("click"==sType||"dblclick"==sType)){var v=parseInt(this.webkit,10);if(!isNaN(v)&&v<418){return true;}}
return false;},removeListener:function(el,sType,fn){var i,len;if(typeof el=="string"){el=this.getEl(el);}else if(this._isValidCollection(el)){var ok=true;for(i=0,len=el.length;i<len;++i){ok=(this.removeListener(el[i],sType,fn)&&ok);}
return ok;}
if(!fn||!fn.call){return this.purgeElement(el,false,sType);}
if("unload"==sType){for(i=0,len=unloadListeners.length;i<len;i++){var li=unloadListeners[i];if(li&&li[0]==el&&li[1]==sType&&li[2]==fn){unloadListeners.splice(i,1);return true;}}
return false;}
var cacheItem=null;var index=arguments[3];if("undefined"==typeof index){index=this._getCacheIndex(el,sType,fn);}
if(index>=0){cacheItem=listeners[index];}
if(!el||!cacheItem){return false;}
if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);var llist=legacyHandlers[legacyIndex];if(llist){for(i=0,len=llist.length;i<len;++i){li=llist[i];if(li&&li[this.EL]==el&&li[this.TYPE]==sType&&li[this.FN]==fn){llist.splice(i,1);break;}}}}else{try{this._simpleRemove(el,sType,cacheItem[this.WFN],false);}catch(ex){this.lastError=ex;return false;}}
delete listeners[index][this.WFN];delete listeners[index][this.FN];listeners.splice(index,1);return true;},getTarget:function(ev,resolveTextNode){var t=ev.target||ev.srcElement;return this.resolveTextNode(t);},resolveTextNode:function(node){if(node&&3==node.nodeType){return node.parentNode;}else{return node;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}
return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}
return y;},getXY:function(ev){return[this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else if(ev.type=="mouseover"){t=ev.fromElement;}}
return this.resolveTextNode(t);},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(ex){this.lastError=ex;return t;}}
return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}
c=c.caller;}}
return ev;},getCharCode:function(ev){return ev.charCode||ev.keyCode||0;},_getCacheIndex:function(el,sType,fn){for(var i=0,len=listeners.length;i<len;++i){var li=listeners[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==sType){return i;}}
return-1;},generateId:function(el){var id=el.id;if(!id){id="yuievtautoid-"+counter;++counter;el.id=id;}
return id;},_isValidCollection:function(o){return(o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(e){if(!loadComplete){loadComplete=true;var EU=YAHOO.util.Event;EU._ready();if(this.isIE){EU._simpleRemove(window,"load",EU._load);}}},_ready:function(e){if(!DOMReady){DOMReady=true;var EU=YAHOO.util.Event;EU.DOMReadyEvent.fire();EU._simpleRemove(document,"DOMContentLoaded",EU._ready);}},_tryPreloadAttach:function(){if(this.locked){return false;}
if(this.isIE&&!DOMReady){return false;}
this.locked=true;var tryAgain=!loadComplete;if(!tryAgain){tryAgain=(retryCount>0);}
var notAvail=[];var executeItem=function(el,item){var scope=el;if(item.override){if(item.override===true){scope=item.obj;}else{scope=item.override;}}
item.fn.call(scope,item.obj);};var i,len,item,el;for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&!item.checkReady){el=this.getEl(item.id);if(el){executeItem(el,item);onAvailStack[i]=null;}else{notAvail.push(item);}}}
for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&item.checkReady){el=this.getEl(item.id);if(el){if(loadComplete||el.nextSibling){executeItem(el,item);onAvailStack[i]=null;}}else{notAvail.push(item);}}}
retryCount=(notAvail.length===0)?0:retryCount-1;if(tryAgain){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}
this.locked=false;return true;},purgeElement:function(el,recurse,sType){var elListeners=this.getListeners(el,sType);if(elListeners){for(var i=0,len=elListeners.length;i<len;++i){var l=elListeners[i];this.removeListener(el,l.type,l.fn);}}
if(recurse&&el&&el.childNodes){for(i=0,len=el.childNodes.length;i<len;++i){this.purgeElement(el.childNodes[i],recurse,sType);}}},getListeners:function(el,sType){var results=[],searchLists;if(!sType){searchLists=[listeners,unloadListeners];}else if(sType=="unload"){searchLists=[unloadListeners];}else{searchLists=[listeners];}
for(var j=0;j<searchLists.length;++j){var searchList=searchLists[j];if(searchList&&searchList.length>0){for(var i=0,len=searchList.length;i<len;++i){var l=searchList[i];if(l&&l[this.EL]===el&&(!sType||sType===l[this.TYPE])){results.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.OBJ],adjust:l[this.ADJ_SCOPE],index:i});}}}}
return(results.length)?results:null;},_unload:function(e){var EU=YAHOO.util.Event,i,j,l,len,index;for(i=0,len=unloadListeners.length;i<len;++i){l=unloadListeners[i];if(l){var scope=window;if(l[EU.ADJ_SCOPE]){if(l[EU.ADJ_SCOPE]===true){scope=l[EU.OBJ];}else{scope=l[EU.ADJ_SCOPE];}}
l[EU.FN].call(scope,EU.getEvent(e),l[EU.OBJ]);unloadListeners[i]=null;l=null;scope=null;}}
unloadListeners=null;if(listeners&&listeners.length>0){j=listeners.length;while(j){index=j-1;l=listeners[index];if(l){EU.removeListener(l[EU.EL],l[EU.TYPE],l[EU.FN],index);}
j=j-1;}
l=null;EU.clearCache();}
for(i=0,len=legacyEvents.length;i<len;++i){legacyEvents[i][0]=null;legacyEvents[i]=null;}
legacyEvents=null;EU._simpleRemove(window,"unload",EU._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement,db=document.body;if(dd&&(dd.scrollTop||dd.scrollLeft)){return[dd.scrollTop,dd.scrollLeft];}else if(db){return[db.scrollTop,db.scrollLeft];}else{return[0,0];}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(el,sType,fn,capture){el.addEventListener(sType,fn,(capture));};}else if(window.attachEvent){return function(el,sType,fn,capture){el.attachEvent("on"+sType,fn);};}else{return function(){};}}(),_simpleRemove:function(){if(window.removeEventListener){return function(el,sType,fn,capture){el.removeEventListener(sType,fn,(capture));};}else if(window.detachEvent){return function(el,sType,fn){el.detachEvent("on"+sType,fn);};}else{return function(){};}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;if(EU.isIE){document.write('<scr'+'ipt id="_yui_eu_dr" defer="true" src="//:"></script>');var el=document.getElementById("_yui_eu_dr");el.onreadystatechange=function(){if("complete"==this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready();}};el=null;YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);}else if(EU.webkit){EU._drwatch=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._drwatch);EU._drwatch=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}
EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}
YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(p_type,p_fn,p_obj,p_override){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){ce.subscribe(p_fn,p_obj,p_override);}else{this.__yui_subscribers=this.__yui_subscribers||{};var subs=this.__yui_subscribers;if(!subs[p_type]){subs[p_type]=[];}
subs[p_type].push({fn:p_fn,obj:p_obj,override:p_override});}},unsubscribe:function(p_type,p_fn,p_obj){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){return ce.unsubscribe(p_fn,p_obj);}else{return false;}},unsubscribeAll:function(p_type){return this.unsubscribe(p_type);},createEvent:function(p_type,p_config){this.__yui_events=this.__yui_events||{};var opts=p_config||{};var events=this.__yui_events;if(events[p_type]){}else{var scope=opts.scope||this;var silent=opts.silent||null;var ce=new YAHOO.util.CustomEvent(p_type,scope,silent,YAHOO.util.CustomEvent.FLAT);events[p_type]=ce;if(opts.onSubscribeCallback){ce.subscribeEvent.subscribe(opts.onSubscribeCallback);}
this.__yui_subscribers=this.__yui_subscribers||{};var qs=this.__yui_subscribers[p_type];if(qs){for(var i=0;i<qs.length;++i){ce.subscribe(qs[i].fn,qs[i].obj,qs[i].override);}}}
return events[p_type];},fireEvent:function(p_type,arg1,arg2,etc){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){var args=[];for(var i=1;i<arguments.length;++i){args.push(arguments[i]);}
return ce.fire.apply(ce,args);}else{return null;}},hasEvent:function(type){if(this.__yui_events){if(this.__yui_events[type]){return true;}}
return false;}};YAHOO.util.KeyListener=function(attachTo,keyData,handler,event){if(!attachTo){}else if(!keyData){}else if(!handler){}
if(!event){event=YAHOO.util.KeyListener.KEYDOWN;}
var keyEvent=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof attachTo=='string'){attachTo=document.getElementById(attachTo);}
if(typeof handler=='function'){keyEvent.subscribe(handler);}else{keyEvent.subscribe(handler.fn,handler.scope,handler.correctScope);}
function handleKeyPress(e,obj){if(!keyData.shift){keyData.shift=false;}
if(!keyData.alt){keyData.alt=false;}
if(!keyData.ctrl){keyData.ctrl=false;}
if(e.shiftKey==keyData.shift&&e.altKey==keyData.alt&&e.ctrlKey==keyData.ctrl){var dataItem;var keyPressed;if(keyData.keys instanceof Array){for(var i=0;i<keyData.keys.length;i++){dataItem=keyData.keys[i];if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);break;}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);break;}}}else{dataItem=keyData.keys;if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);}}}}
this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(attachTo,event,handleKeyPress);this.enabledEvent.fire(keyData);}
this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(attachTo,event,handleKeyPress);this.disabledEvent.fire(keyData);}
this.enabled=false;};this.toString=function(){return"KeyListener ["+keyData.keys+"] "+attachTo.tagName+
(attachTo.id?"["+attachTo.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.2.2",build:"204"});

/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.2.2
*/

if(typeof YAHOO=="undefined"){var YAHOO={};}
YAHOO.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=YAHOO;for(j=(d[0]=="YAHOO")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};YAHOO.log=function(msg,cat,src){var l=YAHOO.widget.Logger;if(l&&l.log){return l.log(msg,cat,src);}else{return false;}};YAHOO.init=function(){this.namespace("util","widget","example");if(typeof YAHOO_config!="undefined"){var l=YAHOO_config.listener,ls=YAHOO.env.listeners,unique=true,i;if(l){for(i=0;i<ls.length;i=i+1){if(ls[i]==l){unique=false;break;}}
if(unique){ls.push(l);}}}};YAHOO.register=function(name,mainClass,data){var mods=YAHOO.env.modules;if(!mods[name]){mods[name]={versions:[],builds:[]};}
var m=mods[name],v=data.version,b=data.build,ls=YAHOO.env.listeners;m.name=name;m.version=v;m.build=b;m.versions.push(v);m.builds.push(b);m.mainClass=mainClass;for(var i=0;i<ls.length;i=i+1){ls[i](m);}
if(mainClass){mainClass.VERSION=v;mainClass.BUILD=b;}else{YAHOO.log("mainClass is undefined for module "+name,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[],getVersion:function(name){return YAHOO.env.modules[name]||null;}};YAHOO.lang={isArray:function(obj){if(obj&&obj.constructor&&obj.constructor.toString().indexOf('Array')>-1){return true;}else{return YAHOO.lang.isObject(obj)&&obj.constructor==Array;}},isBoolean:function(obj){return typeof obj=='boolean';},isFunction:function(obj){return typeof obj=='function';},isNull:function(obj){return obj===null;},isNumber:function(obj){return typeof obj=='number'&&isFinite(obj);},isObject:function(obj){return obj&&(typeof obj=='object'||YAHOO.lang.isFunction(obj));},isString:function(obj){return typeof obj=='string';},isUndefined:function(obj){return typeof obj=='undefined';},hasOwnProperty:function(obj,prop){if(Object.prototype.hasOwnProperty){return obj.hasOwnProperty(prop);}
return!YAHOO.lang.isUndefined(obj[prop])&&obj.constructor.prototype[prop]!==obj[prop];},extend:function(subc,superc,overrides){if(!superc||!subc){throw new Error("YAHOO.lang.extend failed, please check that "+"all dependencies are included.");}
var F=function(){};F.prototype=superc.prototype;subc.prototype=new F();subc.prototype.constructor=subc;subc.superclass=superc.prototype;if(superc.prototype.constructor==Object.prototype.constructor){superc.prototype.constructor=superc;}
if(overrides){for(var i in overrides){subc.prototype[i]=overrides[i];}}},augment:function(r,s){if(!s||!r){throw new Error("YAHOO.lang.augment failed, please check that "+"all dependencies are included.");}
var rp=r.prototype,sp=s.prototype,a=arguments,i,p;if(a[2]){for(i=2;i<a.length;i=i+1){rp[a[i]]=sp[a[i]];}}else{for(p in sp){if(!rp[p]){rp[p]=sp[p];}}}}};YAHOO.init();YAHOO.util.Lang=YAHOO.lang;YAHOO.augment=YAHOO.lang.augment;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.2.2",build:"204"});
(function(){var Y=YAHOO.util,getStyle,setStyle,id_counter=0,propertyCache={};var ua=navigator.userAgent.toLowerCase(),isOpera=(ua.indexOf('opera')>-1),isSafari=(ua.indexOf('safari')>-1),isGecko=(!isOpera&&!isSafari&&ua.indexOf('gecko')>-1),isIE=(!isOpera&&ua.indexOf('msie')>-1);var patterns={HYPHEN:/(-[a-z])/i,ROOT_TAG:/body|html/i};var toCamel=function(property){if(!patterns.HYPHEN.test(property)){return property;}
if(propertyCache[property]){return propertyCache[property];}
var converted=property;while(patterns.HYPHEN.exec(converted)){converted=converted.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}
propertyCache[property]=converted;return converted;};if(document.defaultView&&document.defaultView.getComputedStyle){getStyle=function(el,property){var value=null;if(property=='float'){property='cssFloat';}
var computed=document.defaultView.getComputedStyle(el,'');if(computed){value=computed[toCamel(property)];}
return el.style[property]||value;};}else if(document.documentElement.currentStyle&&isIE){getStyle=function(el,property){switch(toCamel(property)){case'opacity':var val=100;try{val=el.filters['DXImageTransform.Microsoft.Alpha'].opacity;}catch(e){try{val=el.filters('alpha').opacity;}catch(e){}}
return val/100;break;case'float':property='styleFloat';default:var value=el.currentStyle?el.currentStyle[property]:null;return(el.style[property]||value);}};}else{getStyle=function(el,property){return el.style[property];};}
if(isIE){setStyle=function(el,property,val){switch(property){case'opacity':if(YAHOO.lang.isString(el.style.filter)){el.style.filter='alpha(opacity='+val*100+')';if(!el.currentStyle||!el.currentStyle.hasLayout){el.style.zoom=1;}}
break;case'float':property='styleFloat';default:el.style[property]=val;}};}else{setStyle=function(el,property,val){if(property=='float'){property='cssFloat';}
el.style[property]=val;};}
YAHOO.util.Dom={get:function(el){if(YAHOO.lang.isString(el)){return document.getElementById(el);}
if(YAHOO.lang.isArray(el)){var c=[];for(var i=0,len=el.length;i<len;++i){c[c.length]=Y.Dom.get(el[i]);}
return c;}
if(el){return el;}
return null;},getStyle:function(el,property){property=toCamel(property);var f=function(element){return getStyle(element,property);};return Y.Dom.batch(el,f,Y.Dom,true);},setStyle:function(el,property,val){property=toCamel(property);var f=function(element){setStyle(element,property,val);};Y.Dom.batch(el,f,Y.Dom,true);},getXY:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var parentNode=null;var pos=[];var box;if(el.getBoundingClientRect){box=el.getBoundingClientRect();var doc=document;if(!this.inDocument(el)&&parent.document!=document){doc=parent.document;if(!this.isAncestor(doc.documentElement,el)){return false;}}
var scrollTop=Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);var scrollLeft=Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);return[box.left+scrollLeft,box.top+scrollTop];}
else{pos=[el.offsetLeft,el.offsetTop];parentNode=el.offsetParent;var hasAbs=this.getStyle(el,'position')=='absolute';if(parentNode!=el){while(parentNode){pos[0]+=parentNode.offsetLeft;pos[1]+=parentNode.offsetTop;if(isSafari&&!hasAbs&&this.getStyle(parentNode,'position')=='absolute'){hasAbs=true;}
parentNode=parentNode.offsetParent;}}
if(isSafari&&hasAbs){pos[0]-=document.body.offsetLeft;pos[1]-=document.body.offsetTop;}}
parentNode=el.parentNode;while(parentNode.tagName&&!patterns.ROOT_TAG.test(parentNode.tagName))
{if(Y.Dom.getStyle(parentNode,'display')!='inline'){pos[0]-=parentNode.scrollLeft;pos[1]-=parentNode.scrollTop;}
parentNode=parentNode.parentNode;}
return pos;};return Y.Dom.batch(el,f,Y.Dom,true);},getX:function(el){var f=function(el){return Y.Dom.getXY(el)[0];};return Y.Dom.batch(el,f,Y.Dom,true);},getY:function(el){var f=function(el){return Y.Dom.getXY(el)[1];};return Y.Dom.batch(el,f,Y.Dom,true);},setXY:function(el,pos,noRetry){var f=function(el){var style_pos=this.getStyle(el,'position');if(style_pos=='static'){this.setStyle(el,'position','relative');style_pos='relative';}
var pageXY=this.getXY(el);if(pageXY===false){return false;}
var delta=[parseInt(this.getStyle(el,'left'),10),parseInt(this.getStyle(el,'top'),10)];if(isNaN(delta[0])){delta[0]=(style_pos=='relative')?0:el.offsetLeft;}
if(isNaN(delta[1])){delta[1]=(style_pos=='relative')?0:el.offsetTop;}
if(pos[0]!==null){el.style.left=pos[0]-pageXY[0]+delta[0]+'px';}
if(pos[1]!==null){el.style.top=pos[1]-pageXY[1]+delta[1]+'px';}
if(!noRetry){var newXY=this.getXY(el);if((pos[0]!==null&&newXY[0]!=pos[0])||(pos[1]!==null&&newXY[1]!=pos[1])){this.setXY(el,pos,true);}}};Y.Dom.batch(el,f,Y.Dom,true);},setX:function(el,x){Y.Dom.setXY(el,[x,null]);},setY:function(el,y){Y.Dom.setXY(el,[null,y]);},getRegion:function(el){var f=function(el){var region=new Y.Region.getRegion(el);return region;};return Y.Dom.batch(el,f,Y.Dom,true);},getClientWidth:function(){return Y.Dom.getViewportWidth();},getClientHeight:function(){return Y.Dom.getViewportHeight();},getElementsByClassName:function(className,tag,root){var method=function(el){return Y.Dom.hasClass(el,className);};return Y.Dom.getElementsBy(method,tag,root);},hasClass:function(el,className){var re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)');var f=function(el){return re.test(el.className);};return Y.Dom.batch(el,f,Y.Dom,true);},addClass:function(el,className){var f=function(el){if(this.hasClass(el,className)){return;}
el.className=[el.className,className].join(' ');};Y.Dom.batch(el,f,Y.Dom,true);},removeClass:function(el,className){var re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)','g');var f=function(el){if(!this.hasClass(el,className)){return;}
var c=el.className;el.className=c.replace(re,' ');if(this.hasClass(el,className)){this.removeClass(el,className);}};Y.Dom.batch(el,f,Y.Dom,true);},replaceClass:function(el,oldClassName,newClassName){if(oldClassName===newClassName){return false;}
var re=new RegExp('(?:^|\\s+)'+oldClassName+'(?:\\s+|$)','g');var f=function(el){if(!this.hasClass(el,oldClassName)){this.addClass(el,newClassName);return;}
el.className=el.className.replace(re,' '+newClassName+' ');if(this.hasClass(el,oldClassName)){this.replaceClass(el,oldClassName,newClassName);}};Y.Dom.batch(el,f,Y.Dom,true);},generateId:function(el,prefix){prefix=prefix||'yui-gen';el=el||{};var f=function(el){if(el){el=Y.Dom.get(el);}else{el={};}
if(!el.id){el.id=prefix+id_counter++;}
return el.id;};return Y.Dom.batch(el,f,Y.Dom,true);},isAncestor:function(haystack,needle){haystack=Y.Dom.get(haystack);if(!haystack||!needle){return false;}
var f=function(needle){if(haystack.contains&&!isSafari){return haystack.contains(needle);}
else if(haystack.compareDocumentPosition){return!!(haystack.compareDocumentPosition(needle)&16);}
else{var parent=needle.parentNode;while(parent){if(parent==haystack){return true;}
else if(!parent.tagName||parent.tagName.toUpperCase()=='HTML'){return false;}
parent=parent.parentNode;}
return false;}};return Y.Dom.batch(needle,f,Y.Dom,true);},inDocument:function(el){var f=function(el){return this.isAncestor(document.documentElement,el);};return Y.Dom.batch(el,f,Y.Dom,true);},getElementsBy:function(method,tag,root){tag=tag||'*';var nodes=[];if(root){root=Y.Dom.get(root);if(!root){return nodes;}}else{root=document;}
var elements=root.getElementsByTagName(tag);if(!elements.length&&(tag=='*'&&root.all)){elements=root.all;}
for(var i=0,len=elements.length;i<len;++i){if(method(elements[i])){nodes[nodes.length]=elements[i];}}
return nodes;},batch:function(el,method,o,override){var id=el;el=Y.Dom.get(el);var scope=(override)?o:window;if(!el||el.tagName||!el.length){if(!el){return false;}
return method.call(scope,el,o);}
var collection=[];for(var i=0,len=el.length;i<len;++i){if(!el[i]){id=el[i];}
collection[collection.length]=method.call(scope,el[i],o);}
return collection;},getDocumentHeight:function(){var scrollHeight=(document.compatMode!='CSS1Compat')?document.body.scrollHeight:document.documentElement.scrollHeight;var h=Math.max(scrollHeight,Y.Dom.getViewportHeight());return h;},getDocumentWidth:function(){var scrollWidth=(document.compatMode!='CSS1Compat')?document.body.scrollWidth:document.documentElement.scrollWidth;var w=Math.max(scrollWidth,Y.Dom.getViewportWidth());return w;},getViewportHeight:function(){var height=self.innerHeight;var mode=document.compatMode;if((mode||isIE)&&!isOpera){height=(mode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight;}
return height;},getViewportWidth:function(){var width=self.innerWidth;var mode=document.compatMode;if(mode||isIE){width=(mode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth;}
return width;}};})();YAHOO.util.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};YAHOO.util.Region.prototype.contains=function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new YAHOO.util.Region(t,r,b,l);}else{return null;}};YAHOO.util.Region.prototype.union=function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(el){var p=YAHOO.util.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Point=function(x,y){if(x instanceof Array){y=x[1];x=x[0];}
this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.2.2",build:"204"});
YAHOO.util.CustomEvent=function(type,oScope,silent,signature){this.type=type;this.scope=oScope||window;this.silent=silent;this.signature=signature||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}
var onsubscribeType="_YUICEOnSubscribe";if(type!==onsubscribeType){this.subscribeEvent=new YAHOO.util.CustomEvent(onsubscribeType,this,true);}};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(fn,obj,override){if(!fn){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}
if(this.subscribeEvent){this.subscribeEvent.fire(fn,obj,override);}
this.subscribers.push(new YAHOO.util.Subscriber(fn,obj,override));},unsubscribe:function(fn,obj){if(!fn){return this.unsubscribeAll();}
var found=false;for(var i=0,len=this.subscribers.length;i<len;++i){var s=this.subscribers[i];if(s&&s.contains(fn,obj)){this._delete(i);found=true;}}
return found;},fire:function(){var len=this.subscribers.length;if(!len&&this.silent){return true;}
var args=[],ret=true,i;for(i=0;i<arguments.length;++i){args.push(arguments[i]);}
var argslength=args.length;if(!this.silent){}
for(i=0;i<len;++i){var s=this.subscribers[i];if(s){if(!this.silent){}
var scope=s.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var param=null;if(args.length>0){param=args[0];}
ret=s.fn.call(scope,param,s.obj);}else{ret=s.fn.call(scope,this.type,args,s.obj);}
if(false===ret){if(!this.silent){}
return false;}}}
return true;},unsubscribeAll:function(){for(var i=0,len=this.subscribers.length;i<len;++i){this._delete(len-1-i);}
return i;},_delete:function(index){var s=this.subscribers[index];if(s){delete s.fn;delete s.obj;}
this.subscribers.splice(index,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(fn,obj,override){this.fn=fn;this.obj=obj||null;this.override=override;};YAHOO.util.Subscriber.prototype.getScope=function(defaultScope){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}
return defaultScope;};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){if(obj){return(this.fn==fn&&this.obj==obj);}else{return(this.fn==fn);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+(this.obj||"")+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var loadComplete=false;var DOMReady=false;var listeners=[];var unloadListeners=[];var legacyEvents=[];var legacyHandlers=[];var retryCount=0;var onAvailStack=[];var legacyMap=[];var counter=0;var lastError=null;return{POLL_RETRYS:200,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,OBJ:3,ADJ_SCOPE:4,isSafari:(/KHTML/gi).test(navigator.userAgent),webkit:function(){var v=navigator.userAgent.match(/AppleWebKit\/([^ ]*)/);if(v&&v[1]){return v[1];}
return null;}(),isIE:(!this.webkit&&!navigator.userAgent.match(/opera/gi)&&navigator.userAgent.match(/msie/gi)),_interval:null,startInterval:function(){if(!this._interval){var self=this;var callback=function(){self._tryPreloadAttach();};this._interval=setInterval(callback,this.POLL_INTERVAL);}},onAvailable:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:false});retryCount=this.POLL_RETRYS;this.startInterval();},onDOMReady:function(p_fn,p_obj,p_override){this.DOMReadyEvent.subscribe(p_fn,p_obj,p_override);},onContentReady:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:true});retryCount=this.POLL_RETRYS;this.startInterval();},addListener:function(el,sType,fn,obj,override){if(!fn||!fn.call){return false;}
if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=this.on(el[i],sType,fn,obj,override)&&ok;}
return ok;}else if(typeof el=="string"){var oEl=this.getEl(el);if(oEl){el=oEl;}else{this.onAvailable(el,function(){YAHOO.util.Event.on(el,sType,fn,obj,override);});return true;}}
if(!el){return false;}
if("unload"==sType&&obj!==this){unloadListeners[unloadListeners.length]=[el,sType,fn,obj,override];return true;}
var scope=el;if(override){if(override===true){scope=obj;}else{scope=override;}}
var wrappedFn=function(e){return fn.call(scope,YAHOO.util.Event.getEvent(e),obj);};var li=[el,sType,fn,wrappedFn,scope];var index=listeners.length;listeners[index]=li;if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);if(legacyIndex==-1||el!=legacyEvents[legacyIndex][0]){legacyIndex=legacyEvents.length;legacyMap[el.id+sType]=legacyIndex;legacyEvents[legacyIndex]=[el,sType,el["on"+sType]];legacyHandlers[legacyIndex]=[];el["on"+sType]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),legacyIndex);};}
legacyHandlers[legacyIndex].push(li);}else{try{this._simpleAdd(el,sType,wrappedFn,false);}catch(ex){this.lastError=ex;this.removeListener(el,sType,fn);return false;}}
return true;},fireLegacyEvent:function(e,legacyIndex){var ok=true,le,lh,li,scope,ret;lh=legacyHandlers[legacyIndex];for(var i=0,len=lh.length;i<len;++i){li=lh[i];if(li&&li[this.WFN]){scope=li[this.ADJ_SCOPE];ret=li[this.WFN].call(scope,e);ok=(ok&&ret);}}
le=legacyEvents[legacyIndex];if(le&&le[2]){le[2](e);}
return ok;},getLegacyIndex:function(el,sType){var key=this.generateId(el)+sType;if(typeof legacyMap[key]=="undefined"){return-1;}else{return legacyMap[key];}},useLegacyEvent:function(el,sType){if(this.webkit&&("click"==sType||"dblclick"==sType)){var v=parseInt(this.webkit,10);if(!isNaN(v)&&v<418){return true;}}
return false;},removeListener:function(el,sType,fn){var i,len;if(typeof el=="string"){el=this.getEl(el);}else if(this._isValidCollection(el)){var ok=true;for(i=0,len=el.length;i<len;++i){ok=(this.removeListener(el[i],sType,fn)&&ok);}
return ok;}
if(!fn||!fn.call){return this.purgeElement(el,false,sType);}
if("unload"==sType){for(i=0,len=unloadListeners.length;i<len;i++){var li=unloadListeners[i];if(li&&li[0]==el&&li[1]==sType&&li[2]==fn){unloadListeners.splice(i,1);return true;}}
return false;}
var cacheItem=null;var index=arguments[3];if("undefined"==typeof index){index=this._getCacheIndex(el,sType,fn);}
if(index>=0){cacheItem=listeners[index];}
if(!el||!cacheItem){return false;}
if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);var llist=legacyHandlers[legacyIndex];if(llist){for(i=0,len=llist.length;i<len;++i){li=llist[i];if(li&&li[this.EL]==el&&li[this.TYPE]==sType&&li[this.FN]==fn){llist.splice(i,1);break;}}}}else{try{this._simpleRemove(el,sType,cacheItem[this.WFN],false);}catch(ex){this.lastError=ex;return false;}}
delete listeners[index][this.WFN];delete listeners[index][this.FN];listeners.splice(index,1);return true;},getTarget:function(ev,resolveTextNode){var t=ev.target||ev.srcElement;return this.resolveTextNode(t);},resolveTextNode:function(node){if(node&&3==node.nodeType){return node.parentNode;}else{return node;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}
return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}
return y;},getXY:function(ev){return[this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else if(ev.type=="mouseover"){t=ev.fromElement;}}
return this.resolveTextNode(t);},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(ex){this.lastError=ex;return t;}}
return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}
c=c.caller;}}
return ev;},getCharCode:function(ev){return ev.charCode||ev.keyCode||0;},_getCacheIndex:function(el,sType,fn){for(var i=0,len=listeners.length;i<len;++i){var li=listeners[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==sType){return i;}}
return-1;},generateId:function(el){var id=el.id;if(!id){id="yuievtautoid-"+counter;++counter;el.id=id;}
return id;},_isValidCollection:function(o){return(o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(e){if(!loadComplete){loadComplete=true;var EU=YAHOO.util.Event;EU._ready();if(this.isIE){EU._simpleRemove(window,"load",EU._load);}}},_ready:function(e){if(!DOMReady){DOMReady=true;var EU=YAHOO.util.Event;EU.DOMReadyEvent.fire();EU._simpleRemove(document,"DOMContentLoaded",EU._ready);}},_tryPreloadAttach:function(){if(this.locked){return false;}
if(this.isIE&&!DOMReady){return false;}
this.locked=true;var tryAgain=!loadComplete;if(!tryAgain){tryAgain=(retryCount>0);}
var notAvail=[];var executeItem=function(el,item){var scope=el;if(item.override){if(item.override===true){scope=item.obj;}else{scope=item.override;}}
item.fn.call(scope,item.obj);};var i,len,item,el;for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&!item.checkReady){el=this.getEl(item.id);if(el){executeItem(el,item);onAvailStack[i]=null;}else{notAvail.push(item);}}}
for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&item.checkReady){el=this.getEl(item.id);if(el){if(loadComplete||el.nextSibling){executeItem(el,item);onAvailStack[i]=null;}}else{notAvail.push(item);}}}
retryCount=(notAvail.length===0)?0:retryCount-1;if(tryAgain){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}
this.locked=false;return true;},purgeElement:function(el,recurse,sType){var elListeners=this.getListeners(el,sType);if(elListeners){for(var i=0,len=elListeners.length;i<len;++i){var l=elListeners[i];this.removeListener(el,l.type,l.fn);}}
if(recurse&&el&&el.childNodes){for(i=0,len=el.childNodes.length;i<len;++i){this.purgeElement(el.childNodes[i],recurse,sType);}}},getListeners:function(el,sType){var results=[],searchLists;if(!sType){searchLists=[listeners,unloadListeners];}else if(sType=="unload"){searchLists=[unloadListeners];}else{searchLists=[listeners];}
for(var j=0;j<searchLists.length;++j){var searchList=searchLists[j];if(searchList&&searchList.length>0){for(var i=0,len=searchList.length;i<len;++i){var l=searchList[i];if(l&&l[this.EL]===el&&(!sType||sType===l[this.TYPE])){results.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.OBJ],adjust:l[this.ADJ_SCOPE],index:i});}}}}
return(results.length)?results:null;},_unload:function(e){var EU=YAHOO.util.Event,i,j,l,len,index;for(i=0,len=unloadListeners.length;i<len;++i){l=unloadListeners[i];if(l){var scope=window;if(l[EU.ADJ_SCOPE]){if(l[EU.ADJ_SCOPE]===true){scope=l[EU.OBJ];}else{scope=l[EU.ADJ_SCOPE];}}
l[EU.FN].call(scope,EU.getEvent(e),l[EU.OBJ]);unloadListeners[i]=null;l=null;scope=null;}}
unloadListeners=null;if(listeners&&listeners.length>0){j=listeners.length;while(j){index=j-1;l=listeners[index];if(l){EU.removeListener(l[EU.EL],l[EU.TYPE],l[EU.FN],index);}
j=j-1;}
l=null;EU.clearCache();}
for(i=0,len=legacyEvents.length;i<len;++i){legacyEvents[i][0]=null;legacyEvents[i]=null;}
legacyEvents=null;EU._simpleRemove(window,"unload",EU._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement,db=document.body;if(dd&&(dd.scrollTop||dd.scrollLeft)){return[dd.scrollTop,dd.scrollLeft];}else if(db){return[db.scrollTop,db.scrollLeft];}else{return[0,0];}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(el,sType,fn,capture){el.addEventListener(sType,fn,(capture));};}else if(window.attachEvent){return function(el,sType,fn,capture){el.attachEvent("on"+sType,fn);};}else{return function(){};}}(),_simpleRemove:function(){if(window.removeEventListener){return function(el,sType,fn,capture){el.removeEventListener(sType,fn,(capture));};}else if(window.detachEvent){return function(el,sType,fn){el.detachEvent("on"+sType,fn);};}else{return function(){};}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;if(EU.isIE){document.write('<scr'+'ipt id="_yui_eu_dr" defer="true" src="//:"></script>');var el=document.getElementById("_yui_eu_dr");el.onreadystatechange=function(){if("complete"==this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready();}};el=null;YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);}else if(EU.webkit){EU._drwatch=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._drwatch);EU._drwatch=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}
EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}
YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(p_type,p_fn,p_obj,p_override){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){ce.subscribe(p_fn,p_obj,p_override);}else{this.__yui_subscribers=this.__yui_subscribers||{};var subs=this.__yui_subscribers;if(!subs[p_type]){subs[p_type]=[];}
subs[p_type].push({fn:p_fn,obj:p_obj,override:p_override});}},unsubscribe:function(p_type,p_fn,p_obj){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){return ce.unsubscribe(p_fn,p_obj);}else{return false;}},unsubscribeAll:function(p_type){return this.unsubscribe(p_type);},createEvent:function(p_type,p_config){this.__yui_events=this.__yui_events||{};var opts=p_config||{};var events=this.__yui_events;if(events[p_type]){}else{var scope=opts.scope||this;var silent=opts.silent||null;var ce=new YAHOO.util.CustomEvent(p_type,scope,silent,YAHOO.util.CustomEvent.FLAT);events[p_type]=ce;if(opts.onSubscribeCallback){ce.subscribeEvent.subscribe(opts.onSubscribeCallback);}
this.__yui_subscribers=this.__yui_subscribers||{};var qs=this.__yui_subscribers[p_type];if(qs){for(var i=0;i<qs.length;++i){ce.subscribe(qs[i].fn,qs[i].obj,qs[i].override);}}}
return events[p_type];},fireEvent:function(p_type,arg1,arg2,etc){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){var args=[];for(var i=1;i<arguments.length;++i){args.push(arguments[i]);}
return ce.fire.apply(ce,args);}else{return null;}},hasEvent:function(type){if(this.__yui_events){if(this.__yui_events[type]){return true;}}
return false;}};YAHOO.util.KeyListener=function(attachTo,keyData,handler,event){if(!attachTo){}else if(!keyData){}else if(!handler){}
if(!event){event=YAHOO.util.KeyListener.KEYDOWN;}
var keyEvent=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof attachTo=='string'){attachTo=document.getElementById(attachTo);}
if(typeof handler=='function'){keyEvent.subscribe(handler);}else{keyEvent.subscribe(handler.fn,handler.scope,handler.correctScope);}
function handleKeyPress(e,obj){if(!keyData.shift){keyData.shift=false;}
if(!keyData.alt){keyData.alt=false;}
if(!keyData.ctrl){keyData.ctrl=false;}
if(e.shiftKey==keyData.shift&&e.altKey==keyData.alt&&e.ctrlKey==keyData.ctrl){var dataItem;var keyPressed;if(keyData.keys instanceof Array){for(var i=0;i<keyData.keys.length;i++){dataItem=keyData.keys[i];if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);break;}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);break;}}}else{dataItem=keyData.keys;if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);}}}}
this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(attachTo,event,handleKeyPress);this.enabledEvent.fire(keyData);}
this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(attachTo,event,handleKeyPress);this.disabledEvent.fire(keyData);}
this.enabled=false;};this.toString=function(){return"KeyListener ["+keyData.keys+"] "+attachTo.tagName+
(attachTo.id?"["+attachTo.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.2.2",build:"204"});
YAHOO.util.Connect={_msxml_progid:['MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:'application/x-www-form-urlencoded; charset=UTF-8',_use_default_xhr_header:true,_default_xhr_header:'XMLHttpRequest',_has_default_headers:true,_default_headers:{},_isFormSubmit:false,_isFileUpload:false,_formNode:null,_sFormData:null,_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,_submitElementValue:null,_hasSubmitListener:(function()
{if(YAHOO.util.Event){YAHOO.util.Event.addListener(document,'click',function(e){var obj=YAHOO.util.Event.getTarget(e);if(obj.type=='submit'){YAHOO.util.Connect._submitElementValue=encodeURIComponent(obj.name)+"="+encodeURIComponent(obj.value);}})
return true;}
return false;})(),setProgId:function(id)
{this._msxml_progid.unshift(id);},setDefaultPostHeader:function(b)
{this._use_default_post_header=b;},setDefaultXhrHeader:function(b)
{this._use_default_xhr_header=b;},setPollingInterval:function(i)
{if(typeof i=='number'&&isFinite(i)){this._polling_interval=i;}},createXhrObject:function(transactionId)
{var obj,http;try
{http=new XMLHttpRequest();obj={conn:http,tId:transactionId};}
catch(e)
{for(var i=0;i<this._msxml_progid.length;++i){try
{http=new ActiveXObject(this._msxml_progid[i]);obj={conn:http,tId:transactionId};break;}
catch(e){}}}
finally
{return obj;}},getConnectionObject:function()
{var o;var tId=this._transaction_id;try
{o=this.createXhrObject(tId);if(o){this._transaction_id++;}}
catch(e){}
finally
{return o;}},asyncRequest:function(method,uri,callback,postData)
{var o=this.getConnectionObject();if(!o){return null;}
else{if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(o.tId,callback,uri,postData);this.releaseObject(o);return;}
if(method.toUpperCase()=='GET'){if(this._sFormData.length!=0){uri+=((uri.indexOf('?')==-1)?'?':'&')+this._sFormData;}
else{uri+="?"+this._sFormData;}}
else if(method.toUpperCase()=='POST'){postData=postData?this._sFormData+"&"+postData:this._sFormData;}}
o.conn.open(method,uri,true);if(this._use_default_xhr_header){if(!this._default_headers['X-Requested-With']){this.initHeader('X-Requested-With',this._default_xhr_header,true);}}
if(this._isFormSubmit||(postData&&this._use_default_post_header)){this.initHeader('Content-Type',this._default_post_header);if(this._isFormSubmit){this.resetFormState();}}
if(this._has_default_headers||this._has_http_headers){this.setHeader(o);}
this.handleReadyState(o,callback);o.conn.send(postData||null);return o;}},handleReadyState:function(o,callback)
{var oConn=this;if(callback&&callback.timeout){this._timeOut[o.tId]=window.setTimeout(function(){oConn.abort(o,callback,true);},callback.timeout);}
this._poll[o.tId]=window.setInterval(function(){if(o.conn&&o.conn.readyState===4){window.clearInterval(oConn._poll[o.tId]);delete oConn._poll[o.tId];if(callback&&callback.timeout){delete oConn._timeOut[o.tId];}
oConn.handleTransactionResponse(o,callback);}},this._polling_interval);},handleTransactionResponse:function(o,callback,isAbort)
{if(!callback){this.releaseObject(o);return;}
var httpStatus,responseObject;try
{if(o.conn.status!==undefined&&o.conn.status!==0){httpStatus=o.conn.status;}
else{httpStatus=13030;}}
catch(e){httpStatus=13030;}
if(httpStatus>=200&&httpStatus<300||httpStatus===1223){responseObject=this.createResponseObject(o,callback.argument);if(callback.success){if(!callback.scope){callback.success(responseObject);}
else{callback.success.apply(callback.scope,[responseObject]);}}}
else{switch(httpStatus){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:responseObject=this.createExceptionObject(o.tId,callback.argument,(isAbort?isAbort:false));if(callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}
break;default:responseObject=this.createResponseObject(o,callback.argument);if(callback.failure){if(!callback.scope){callback.failure(responseObject);}
else{callback.failure.apply(callback.scope,[responseObject]);}}}}
this.releaseObject(o);responseObject=null;},createResponseObject:function(o,callbackArg)
{var obj={};var headerObj={};try
{var headerStr=o.conn.getAllResponseHeaders();var header=headerStr.split('\n');for(var i=0;i<header.length;i++){var delimitPos=header[i].indexOf(':');if(delimitPos!=-1){headerObj[header[i].substring(0,delimitPos)]=header[i].substring(delimitPos+2);}}}
catch(e){}
obj.tId=o.tId;obj.status=(o.conn.status==1223)?204:o.conn.status;obj.statusText=(o.conn.status==1223)?"No Content":o.conn.statusText;obj.getResponseHeader=headerObj;obj.getAllResponseHeaders=headerStr;obj.responseText=o.conn.responseText;obj.responseXML=o.conn.responseXML;if(typeof callbackArg!==undefined){obj.argument=callbackArg;}
return obj;},createExceptionObject:function(tId,callbackArg,isAbort)
{var COMM_CODE=0;var COMM_ERROR='communication failure';var ABORT_CODE=-1;var ABORT_ERROR='transaction aborted';var obj={};obj.tId=tId;if(isAbort){obj.status=ABORT_CODE;obj.statusText=ABORT_ERROR;}
else{obj.status=COMM_CODE;obj.statusText=COMM_ERROR;}
if(callbackArg){obj.argument=callbackArg;}
return obj;},initHeader:function(label,value,isDefault)
{var headerObj=(isDefault)?this._default_headers:this._http_headers;if(headerObj[label]===undefined){headerObj[label]=value;}
else{headerObj[label]=value+","+headerObj[label];}
if(isDefault){this._has_default_headers=true;}
else{this._has_http_headers=true;}},setHeader:function(o)
{if(this._has_default_headers){for(var prop in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,prop)){o.conn.setRequestHeader(prop,this._default_headers[prop]);}}}
if(this._has_http_headers){for(var prop in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,prop)){o.conn.setRequestHeader(prop,this._http_headers[prop]);}}
delete this._http_headers;this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){delete this._default_headers
this._default_headers={};this._has_default_headers=false;},setForm:function(formId,isUpload,secureUri)
{this.resetFormState();var oForm;if(typeof formId=='string'){oForm=(document.getElementById(formId)||document.forms[formId]);}
else if(typeof formId=='object'){oForm=formId;}
else{return;}
if(isUpload){this.createFrame(secureUri?secureUri:null);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=oForm;return;}
var oElement,oName,oValue,oDisabled;var hasSubmit=false;for(var i=0;i<oForm.elements.length;i++){oElement=oForm.elements[i];oDisabled=oForm.elements[i].disabled;oName=oForm.elements[i].name;oValue=oForm.elements[i].value;if(!oDisabled&&oName)
{switch(oElement.type)
{case'select-one':case'select-multiple':for(var j=0;j<oElement.options.length;j++){if(oElement.options[j].selected){if(window.ActiveXObject){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oElement.options[j].attributes['value'].specified?oElement.options[j].value:oElement.options[j].text)+'&';}
else{this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oElement.options[j].hasAttribute('value')?oElement.options[j].value:oElement.options[j].text)+'&';}}}
break;case'radio':case'checkbox':if(oElement.checked){this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}
break;case'file':case undefined:case'reset':case'button':break;case'submit':if(hasSubmit===false){if(this._hasSubmitListener){this._sFormData+=this._submitElementValue+'&';}
else{this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';}
hasSubmit=true;}
break;default:this._sFormData+=encodeURIComponent(oName)+'='+encodeURIComponent(oValue)+'&';break;}}}
this._isFormSubmit=true;this._sFormData=this._sFormData.substr(0,this._sFormData.length-1);return this._sFormData;},resetFormState:function(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";},createFrame:function(secureUri){var frameId='yuiIO'+this._transaction_id;if(window.ActiveXObject){var io=document.createElement('<iframe id="'+frameId+'" name="'+frameId+'" />');if(typeof secureUri=='boolean'){io.src='javascript:false';}
else if(typeof secureURI=='string'){io.src=secureUri;}}
else{var io=document.createElement('iframe');io.id=frameId;io.name=frameId;}
io.style.position='absolute';io.style.top='-1000px';io.style.left='-1000px';document.body.appendChild(io);},appendPostData:function(postData)
{var formElements=[];var postMessage=postData.split('&');for(var i=0;i<postMessage.length;i++){var delimitPos=postMessage[i].indexOf('=');if(delimitPos!=-1){formElements[i]=document.createElement('input');formElements[i].type='hidden';formElements[i].name=postMessage[i].substring(0,delimitPos);formElements[i].value=postMessage[i].substring(delimitPos+1);this._formNode.appendChild(formElements[i]);}}
return formElements;},uploadFile:function(id,callback,uri,postData){var frameId='yuiIO'+id;var uploadEncoding='multipart/form-data';var io=document.getElementById(frameId);this._formNode.setAttribute('action',uri);this._formNode.setAttribute('method','POST');this._formNode.setAttribute("target",frameId);if(this._formNode.encoding){this._formNode.encoding=uploadEncoding;}
else{this._formNode.enctype=uploadEncoding;}
if(postData){var oElements=this.appendPostData(postData);}
this._formNode.submit();if(oElements&&oElements.length>0){for(var i=0;i<oElements.length;i++){this._formNode.removeChild(oElements[i]);}}
this.resetFormState();var uploadCallback=function()
{var obj={};obj.tId=id;obj.argument=callback.argument;try
{obj.responseText=io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;obj.responseXML=io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;}
catch(e){}
if(callback&&callback.upload){if(!callback.scope){callback.upload(obj);}
else{callback.upload.apply(callback.scope,[obj]);}}
if(YAHOO.util.Event){YAHOO.util.Event.removeListener(io,"load",uploadCallback);}
else if(window.detachEvent){io.detachEvent('onload',uploadCallback);}
else{io.removeEventListener('load',uploadCallback,false);}
setTimeout(function(){document.body.removeChild(io);},100);};if(YAHOO.util.Event){YAHOO.util.Event.addListener(io,"load",uploadCallback);}
else if(window.attachEvent){io.attachEvent('onload',uploadCallback);}
else{io.addEventListener('load',uploadCallback,false);}},abort:function(o,callback,isTimeout)
{if(this.isCallInProgress(o)){o.conn.abort();window.clearInterval(this._poll[o.tId]);delete this._poll[o.tId];if(isTimeout){delete this._timeOut[o.tId];}
this.handleTransactionResponse(o,callback,true);return true;}
else{return false;}},isCallInProgress:function(o)
{if(o.conn){return o.conn.readyState!==4&&o.conn.readyState!==0;}
else{return false;}},releaseObject:function(o)
{o.conn=null;o=null;}};YAHOO.register("connection",YAHOO.util.Connect,{version:"2.2.2",build:"204"});
YAHOO.util.Anim=function(el,attributes,duration,method){if(el){this.init(el,attributes,duration,method);}};YAHOO.util.Anim.prototype={toString:function(){var el=this.getEl();var id=el.id||el.tagName;return("Anim "+id);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(attr,start,end){return this.method(this.currentFrame,start,end-start,this.totalFrames);},setAttribute:function(attr,val,unit){if(this.patterns.noNegatives.test(attr)){val=(val>0)?val:0;}
YAHOO.util.Dom.setStyle(this.getEl(),attr,val+unit);},getAttribute:function(attr){var el=this.getEl();var val=YAHOO.util.Dom.getStyle(el,attr);if(val!=='auto'&&!this.patterns.offsetUnit.test(val)){return parseFloat(val);}
var a=this.patterns.offsetAttribute.exec(attr)||[];var pos=!!(a[3]);var box=!!(a[2]);if(box||(YAHOO.util.Dom.getStyle(el,'position')=='absolute'&&pos)){val=el['offset'+a[0].charAt(0).toUpperCase()+a[0].substr(1)];}else{val=0;}
return val;},getDefaultUnit:function(attr){if(this.patterns.defaultUnit.test(attr)){return'px';}
return'';},setRuntimeAttribute:function(attr){var start;var end;var attributes=this.attributes;this.runtimeAttributes[attr]={};var isset=function(prop){return(typeof prop!=='undefined');};if(!isset(attributes[attr]['to'])&&!isset(attributes[attr]['by'])){return false;}
start=(isset(attributes[attr]['from']))?attributes[attr]['from']:this.getAttribute(attr);if(isset(attributes[attr]['to'])){end=attributes[attr]['to'];}else if(isset(attributes[attr]['by'])){if(start.constructor==Array){end=[];for(var i=0,len=start.length;i<len;++i){end[i]=start[i]+attributes[attr]['by'][i];}}else{end=start+attributes[attr]['by'];}}
this.runtimeAttributes[attr].start=start;this.runtimeAttributes[attr].end=end;this.runtimeAttributes[attr].unit=(isset(attributes[attr].unit))?attributes[attr]['unit']:this.getDefaultUnit(attr);},init:function(el,attributes,duration,method){var isAnimated=false;var startTime=null;var actualFrames=0;el=YAHOO.util.Dom.get(el);this.attributes=attributes||{};this.duration=duration||1;this.method=method||YAHOO.util.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=YAHOO.util.AnimMgr.fps;this.getEl=function(){return el;};this.isAnimated=function(){return isAnimated;};this.getStartTime=function(){return startTime;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}
this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(YAHOO.util.AnimMgr.fps*this.duration):this.duration;YAHOO.util.AnimMgr.registerElement(this);};this.stop=function(finish){if(finish){this.currentFrame=this.totalFrames;this._onTween.fire();}
YAHOO.util.AnimMgr.stop(this);};var onStart=function(){this.onStart.fire();this.runtimeAttributes={};for(var attr in this.attributes){this.setRuntimeAttribute(attr);}
isAnimated=true;actualFrames=0;startTime=new Date();};var onTween=function(){var data={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};data.toString=function(){return('duration: '+data.duration+', currentFrame: '+data.currentFrame);};this.onTween.fire(data);var runtimeAttributes=this.runtimeAttributes;for(var attr in runtimeAttributes){this.setAttribute(attr,this.doMethod(attr,runtimeAttributes[attr].start,runtimeAttributes[attr].end),runtimeAttributes[attr].unit);}
actualFrames+=1;};var onComplete=function(){var actual_duration=(new Date()-startTime)/1000;var data={duration:actual_duration,frames:actualFrames,fps:actualFrames/actual_duration};data.toString=function(){return('duration: '+data.duration+', frames: '+data.frames+', fps: '+data.fps);};isAnimated=false;actualFrames=0;this.onComplete.fire(data);};this._onStart=new YAHOO.util.CustomEvent('_start',this,true);this.onStart=new YAHOO.util.CustomEvent('start',this);this.onTween=new YAHOO.util.CustomEvent('tween',this);this._onTween=new YAHOO.util.CustomEvent('_tween',this,true);this.onComplete=new YAHOO.util.CustomEvent('complete',this);this._onComplete=new YAHOO.util.CustomEvent('_complete',this,true);this._onStart.subscribe(onStart);this._onTween.subscribe(onTween);this._onComplete.subscribe(onComplete);}};YAHOO.util.AnimMgr=new function(){var thread=null;var queue=[];var tweenCount=0;this.fps=1000;this.delay=1;this.registerElement=function(tween){queue[queue.length]=tween;tweenCount+=1;tween._onStart.fire();this.start();};this.unRegister=function(tween,index){tween._onComplete.fire();index=index||getIndex(tween);if(index!=-1){queue.splice(index,1);}
tweenCount-=1;if(tweenCount<=0){this.stop();}};this.start=function(){if(thread===null){thread=setInterval(this.run,this.delay);}};this.stop=function(tween){if(!tween){clearInterval(thread);for(var i=0,len=queue.length;i<len;++i){if(queue[0].isAnimated()){this.unRegister(queue[0],0);}}
queue=[];thread=null;tweenCount=0;}
else{this.unRegister(tween);}};this.run=function(){for(var i=0,len=queue.length;i<len;++i){var tween=queue[i];if(!tween||!tween.isAnimated()){continue;}
if(tween.currentFrame<tween.totalFrames||tween.totalFrames===null)
{tween.currentFrame+=1;if(tween.useSeconds){correctFrame(tween);}
tween._onTween.fire();}
else{YAHOO.util.AnimMgr.stop(tween,i);}}};var getIndex=function(anim){for(var i=0,len=queue.length;i<len;++i){if(queue[i]==anim){return i;}}
return-1;};var correctFrame=function(tween){var frames=tween.totalFrames;var frame=tween.currentFrame;var expected=(tween.currentFrame*tween.duration*1000/tween.totalFrames);var elapsed=(new Date()-tween.getStartTime());var tweak=0;if(elapsed<tween.duration*1000){tweak=Math.round((elapsed/expected-1)*tween.currentFrame);}else{tweak=frames-(frame+1);}
if(tweak>0&&isFinite(tweak)){if(tween.currentFrame+tweak>=frames){tweak=frames-(frame+1);}
tween.currentFrame+=tweak;}};};YAHOO.util.Bezier=new function(){this.getPosition=function(points,t){var n=points.length;var tmp=[];for(var i=0;i<n;++i){tmp[i]=[points[i][0],points[i][1]];}
for(var j=1;j<n;++j){for(i=0;i<n-j;++i){tmp[i][0]=(1-t)*tmp[i][0]+t*tmp[parseInt(i+1,10)][0];tmp[i][1]=(1-t)*tmp[i][1]+t*tmp[parseInt(i+1,10)][1];}}
return[tmp[0][0],tmp[0][1]];};};(function(){YAHOO.util.ColorAnim=function(el,attributes,duration,method){YAHOO.util.ColorAnim.superclass.constructor.call(this,el,attributes,duration,method);};YAHOO.extend(YAHOO.util.ColorAnim,YAHOO.util.Anim);var Y=YAHOO.util;var superclass=Y.ColorAnim.superclass;var proto=Y.ColorAnim.prototype;proto.toString=function(){var el=this.getEl();var id=el.id||el.tagName;return("ColorAnim "+id);};proto.patterns.color=/color$/i;proto.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;proto.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;proto.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;proto.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;proto.parseColor=function(s){if(s.length==3){return s;}
var c=this.patterns.hex.exec(s);if(c&&c.length==4){return[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)];}
c=this.patterns.rgb.exec(s);if(c&&c.length==4){return[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)];}
c=this.patterns.hex3.exec(s);if(c&&c.length==4){return[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)];}
return null;};proto.getAttribute=function(attr){var el=this.getEl();if(this.patterns.color.test(attr)){var val=YAHOO.util.Dom.getStyle(el,attr);if(this.patterns.transparent.test(val)){var parent=el.parentNode;val=Y.Dom.getStyle(parent,attr);while(parent&&this.patterns.transparent.test(val)){parent=parent.parentNode;val=Y.Dom.getStyle(parent,attr);if(parent.tagName.toUpperCase()=='HTML'){val='#fff';}}}}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.doMethod=function(attr,start,end){var val;if(this.patterns.color.test(attr)){val=[];for(var i=0,len=start.length;i<len;++i){val[i]=superclass.doMethod.call(this,attr,start[i],end[i]);}
val='rgb('+Math.floor(val[0])+','+Math.floor(val[1])+','+Math.floor(val[2])+')';}
else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.setRuntimeAttribute=function(attr){superclass.setRuntimeAttribute.call(this,attr);if(this.patterns.color.test(attr)){var attributes=this.attributes;var start=this.parseColor(this.runtimeAttributes[attr].start);var end=this.parseColor(this.runtimeAttributes[attr].end);if(typeof attributes[attr]['to']==='undefined'&&typeof attributes[attr]['by']!=='undefined'){end=this.parseColor(attributes[attr].by);for(var i=0,len=start.length;i<len;++i){end[i]=start[i]+end[i];}}
this.runtimeAttributes[attr].start=start;this.runtimeAttributes[attr].end=end;}};})();YAHOO.util.Easing={easeNone:function(t,b,c,d){return c*t/d+b;},easeIn:function(t,b,c,d){return c*(t/=d)*t+b;},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeBoth:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b;}
return-c/2*((--t)*(t-2)-1)+b;},easeInStrong:function(t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutStrong:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeBothStrong:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b;}
return-c/2*((t-=2)*t*t*t-2)+b;},elasticIn:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d)==1){return b+c;}
if(!p){p=d*.3;}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},elasticOut:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d)==1){return b+c;}
if(!p){p=d*.3;}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},elasticBoth:function(t,b,c,d,a,p){if(t==0){return b;}
if((t/=d/2)==2){return b+c;}
if(!p){p=d*(.3*1.5);}
if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else{var s=p/(2*Math.PI)*Math.asin(c/a);}
if(t<1){return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},backIn:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
return c*(t/=d)*t*((s+1)*t-s)+b;},backOut:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},backBoth:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158;}
if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},bounceIn:function(t,b,c,d){return c-YAHOO.util.Easing.bounceOut(d-t,0,c,d)+b;},bounceOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}
return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},bounceBoth:function(t,b,c,d){if(t<d/2){return YAHOO.util.Easing.bounceIn(t*2,0,c,d)*.5+b;}
return YAHOO.util.Easing.bounceOut(t*2-d,0,c,d)*.5+c*.5+b;}};(function(){YAHOO.util.Motion=function(el,attributes,duration,method){if(el){YAHOO.util.Motion.superclass.constructor.call(this,el,attributes,duration,method);}};YAHOO.extend(YAHOO.util.Motion,YAHOO.util.ColorAnim);var Y=YAHOO.util;var superclass=Y.Motion.superclass;var proto=Y.Motion.prototype;proto.toString=function(){var el=this.getEl();var id=el.id||el.tagName;return("Motion "+id);};proto.patterns.points=/^points$/i;proto.setAttribute=function(attr,val,unit){if(this.patterns.points.test(attr)){unit=unit||'px';superclass.setAttribute.call(this,'left',val[0],unit);superclass.setAttribute.call(this,'top',val[1],unit);}else{superclass.setAttribute.call(this,attr,val,unit);}};proto.getAttribute=function(attr){if(this.patterns.points.test(attr)){var val=[superclass.getAttribute.call(this,'left'),superclass.getAttribute.call(this,'top')];}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.doMethod=function(attr,start,end){var val=null;if(this.patterns.points.test(attr)){var t=this.method(this.currentFrame,0,100,this.totalFrames)/100;val=Y.Bezier.getPosition(this.runtimeAttributes[attr],t);}else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.setRuntimeAttribute=function(attr){if(this.patterns.points.test(attr)){var el=this.getEl();var attributes=this.attributes;var start;var control=attributes['points']['control']||[];var end;var i,len;if(control.length>0&&!(control[0]instanceof Array)){control=[control];}else{var tmp=[];for(i=0,len=control.length;i<len;++i){tmp[i]=control[i];}
control=tmp;}
if(Y.Dom.getStyle(el,'position')=='static'){Y.Dom.setStyle(el,'position','relative');}
if(isset(attributes['points']['from'])){Y.Dom.setXY(el,attributes['points']['from']);}
else{Y.Dom.setXY(el,Y.Dom.getXY(el));}
start=this.getAttribute('points');if(isset(attributes['points']['to'])){end=translateValues.call(this,attributes['points']['to'],start);var pageXY=Y.Dom.getXY(this.getEl());for(i=0,len=control.length;i<len;++i){control[i]=translateValues.call(this,control[i],start);}}else if(isset(attributes['points']['by'])){end=[start[0]+attributes['points']['by'][0],start[1]+attributes['points']['by'][1]];for(i=0,len=control.length;i<len;++i){control[i]=[start[0]+control[i][0],start[1]+control[i][1]];}}
this.runtimeAttributes[attr]=[start];if(control.length>0){this.runtimeAttributes[attr]=this.runtimeAttributes[attr].concat(control);}
this.runtimeAttributes[attr][this.runtimeAttributes[attr].length]=end;}
else{superclass.setRuntimeAttribute.call(this,attr);}};var translateValues=function(val,start){var pageXY=Y.Dom.getXY(this.getEl());val=[val[0]-pageXY[0]+start[0],val[1]-pageXY[1]+start[1]];return val;};var isset=function(prop){return(typeof prop!=='undefined');};})();(function(){YAHOO.util.Scroll=function(el,attributes,duration,method){if(el){YAHOO.util.Scroll.superclass.constructor.call(this,el,attributes,duration,method);}};YAHOO.extend(YAHOO.util.Scroll,YAHOO.util.ColorAnim);var Y=YAHOO.util;var superclass=Y.Scroll.superclass;var proto=Y.Scroll.prototype;proto.toString=function(){var el=this.getEl();var id=el.id||el.tagName;return("Scroll "+id);};proto.doMethod=function(attr,start,end){var val=null;if(attr=='scroll'){val=[this.method(this.currentFrame,start[0],end[0]-start[0],this.totalFrames),this.method(this.currentFrame,start[1],end[1]-start[1],this.totalFrames)];}else{val=superclass.doMethod.call(this,attr,start,end);}
return val;};proto.getAttribute=function(attr){var val=null;var el=this.getEl();if(attr=='scroll'){val=[el.scrollLeft,el.scrollTop];}else{val=superclass.getAttribute.call(this,attr);}
return val;};proto.setAttribute=function(attr,val,unit){var el=this.getEl();if(attr=='scroll'){el.scrollLeft=val[0];el.scrollTop=val[1];}else{superclass.setAttribute.call(this,attr,val,unit);}};})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.2.2",build:"204"});
if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var Event=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initalized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(sMethod,args){for(var i in this.ids){for(var j in this.ids[i]){var oDD=this.ids[i][j];if(!this.isTypeOfDD(oDD)){continue;}
oDD[sMethod].apply(oDD,args);}}},_onLoad:function(){this.init();Event.on(document,"mouseup",this.handleMouseUp,this,true);Event.on(document,"mousemove",this.handleMouseMove,this,true);Event.on(window,"unload",this._onUnload,this,true);Event.on(window,"resize",this._onResize,this,true);},_onResize:function(e){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(oDD,sGroup){if(!this.initialized){this.init();}
if(!this.ids[sGroup]){this.ids[sGroup]={};}
this.ids[sGroup][oDD.id]=oDD;},removeDDFromGroup:function(oDD,sGroup){if(!this.ids[sGroup]){this.ids[sGroup]={};}
var obj=this.ids[sGroup];if(obj&&obj[oDD.id]){delete obj[oDD.id];}},_remove:function(oDD){for(var g in oDD.groups){if(g&&this.ids[g][oDD.id]){delete this.ids[g][oDD.id];}}
delete this.handleIds[oDD.id];},regHandle:function(sDDId,sHandleId){if(!this.handleIds[sDDId]){this.handleIds[sDDId]={};}
this.handleIds[sDDId][sHandleId]=sHandleId;},isDragDrop:function(id){return(this.getDDById(id))?true:false;},getRelated:function(p_oDD,bTargetsOnly){var oDDs=[];for(var i in p_oDD.groups){for(j in this.ids[i]){var dd=this.ids[i][j];if(!this.isTypeOfDD(dd)){continue;}
if(!bTargetsOnly||dd.isTarget){oDDs[oDDs.length]=dd;}}}
return oDDs;},isLegalTarget:function(oDD,oTargetDD){var targets=this.getRelated(oDD,true);for(var i=0,len=targets.length;i<len;++i){if(targets[i].id==oTargetDD.id){return true;}}
return false;},isTypeOfDD:function(oDD){return(oDD&&oDD.__ygDragDrop);},isHandle:function(sDDId,sHandleId){return(this.handleIds[sDDId]&&this.handleIds[sDDId][sHandleId]);},getDDById:function(id){for(var i in this.ids){if(this.ids[i][id]){return this.ids[i][id];}}
return null;},handleMouseDown:function(e,oDD){this.currentTarget=YAHOO.util.Event.getTarget(e);this.dragCurrent=oDD;var el=oDD.getEl();this.startX=YAHOO.util.Event.getPageX(e);this.startY=YAHOO.util.Event.getPageY(e);this.deltaX=this.startX-el.offsetLeft;this.deltaY=this.startY-el.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var DDM=YAHOO.util.DDM;DDM.startDrag(DDM.startX,DDM.startY);},this.clickTimeThresh);},startDrag:function(x,y){clearTimeout(this.clickTimeout);if(this.dragCurrent){this.dragCurrent.b4StartDrag(x,y);this.dragCurrent.startDrag(x,y);}
this.dragThreshMet=true;},handleMouseUp:function(e){if(!this.dragCurrent){return;}
clearTimeout(this.clickTimeout);if(this.dragThreshMet){this.fireEvents(e,true);}else{}
this.stopDrag(e);this.stopEvent(e);},stopEvent:function(e){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(e);}
if(this.preventDefault){YAHOO.util.Event.preventDefault(e);}},stopDrag:function(e){if(this.dragCurrent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(e);this.dragCurrent.endDrag(e);}
this.dragCurrent.onMouseUp(e);}
this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(e){if(!this.dragCurrent){return true;}
if(YAHOO.util.Event.isIE&&!e.button){this.stopEvent(e);return this.handleMouseUp(e);}
if(!this.dragThreshMet){var diffX=Math.abs(this.startX-YAHOO.util.Event.getPageX(e));var diffY=Math.abs(this.startY-YAHOO.util.Event.getPageY(e));if(diffX>this.clickPixelThresh||diffY>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}
if(this.dragThreshMet){this.dragCurrent.b4Drag(e);this.dragCurrent.onDrag(e);this.fireEvents(e,false);}
this.stopEvent(e);return true;},fireEvents:function(e,isDrop){var dc=this.dragCurrent;if(!dc||dc.isLocked()){return;}
var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);var pt=new YAHOO.util.Point(x,y);var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);var oldOvers=[];var outEvts=[];var overEvts=[];var dropEvts=[];var enterEvts=[];for(var i in this.dragOvers){var ddo=this.dragOvers[i];if(!this.isTypeOfDD(ddo)){continue;}
if(!this.isOverTarget(pt,ddo,this.mode,curRegion)){outEvts.push(ddo);}
oldOvers[i]=true;delete this.dragOvers[i];}
for(var sGroup in dc.groups){if("string"!=typeof sGroup){continue;}
for(i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(!this.isTypeOfDD(oDD)){continue;}
if(oDD.isTarget&&!oDD.isLocked()&&oDD!=dc){if(this.isOverTarget(pt,oDD,this.mode,curRegion)){if(isDrop){dropEvts.push(oDD);}else{if(!oldOvers[oDD.id]){enterEvts.push(oDD);}else{overEvts.push(oDD);}
this.dragOvers[oDD.id]=oDD;}}}}}
this.interactionInfo={out:outEvts,enter:enterEvts,over:overEvts,drop:dropEvts,point:pt,draggedRegion:curRegion,sourceRegion:this.locationCache[dc.id],validDrop:isDrop};if(isDrop&&!dropEvts.length){this.interactionInfo.validDrop=false;dc.onInvalidDrop(e);}
if(this.mode){if(outEvts.length){dc.b4DragOut(e,outEvts);dc.onDragOut(e,outEvts);}
if(enterEvts.length){dc.onDragEnter(e,enterEvts);}
if(overEvts.length){dc.b4DragOver(e,overEvts);dc.onDragOver(e,overEvts);}
if(dropEvts.length){dc.b4DragDrop(e,dropEvts);dc.onDragDrop(e,dropEvts);}}else{var len=0;for(i=0,len=outEvts.length;i<len;++i){dc.b4DragOut(e,outEvts[i].id);dc.onDragOut(e,outEvts[i].id);}
for(i=0,len=enterEvts.length;i<len;++i){dc.onDragEnter(e,enterEvts[i].id);}
for(i=0,len=overEvts.length;i<len;++i){dc.b4DragOver(e,overEvts[i].id);dc.onDragOver(e,overEvts[i].id);}
for(i=0,len=dropEvts.length;i<len;++i){dc.b4DragDrop(e,dropEvts[i].id);dc.onDragDrop(e,dropEvts[i].id);}}},getBestMatch:function(dds){var winner=null;var len=dds.length;if(len==1){winner=dds[0];}else{for(var i=0;i<len;++i){var dd=dds[i];if(this.mode==this.INTERSECT&&dd.cursorIsOver){winner=dd;break;}else{if(!winner||!winner.overlap||(dd.overlap&&winner.overlap.getArea()<dd.overlap.getArea())){winner=dd;}}}}
return winner;},refreshCache:function(groups){var g=groups||this.ids;for(var sGroup in g){if("string"!=typeof sGroup){continue;}
for(var i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(this.isTypeOfDD(oDD)){var loc=this.getLocation(oDD);if(loc){this.locationCache[oDD.id]=loc;}else{delete this.locationCache[oDD.id];}}}}},verifyEl:function(el){try{if(el){var parent=el.offsetParent;if(parent){return true;}}}catch(e){}
return false;},getLocation:function(oDD){if(!this.isTypeOfDD(oDD)){return null;}
var el=oDD.getEl(),pos,x1,x2,y1,y2,t,r,b,l;try{pos=YAHOO.util.Dom.getXY(el);}catch(e){}
if(!pos){return null;}
x1=pos[0];x2=x1+el.offsetWidth;y1=pos[1];y2=y1+el.offsetHeight;t=y1-oDD.padding[0];r=x2+oDD.padding[1];b=y2+oDD.padding[2];l=x1-oDD.padding[3];return new YAHOO.util.Region(t,r,b,l);},isOverTarget:function(pt,oTarget,intersect,curRegion){var loc=this.locationCache[oTarget.id];if(!loc||!this.useCache){loc=this.getLocation(oTarget);this.locationCache[oTarget.id]=loc;}
if(!loc){return false;}
oTarget.cursorIsOver=loc.contains(pt);var dc=this.dragCurrent;if(!dc||(!intersect&&!dc.constrainX&&!dc.constrainY)){return oTarget.cursorIsOver;}
oTarget.overlap=null;if(!curRegion){var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);}
var overlap=curRegion.intersect(loc);if(overlap){oTarget.overlap=overlap;return(intersect)?true:oTarget.cursorIsOver;}else{return false;}},_onUnload:function(e,me){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}
this._execOnAll("unreg",[]);for(i in this.elementCache){delete this.elementCache[i];}
this.elementCache={};this.ids={};},elementCache:{},getElWrapper:function(id){var oWrapper=this.elementCache[id];if(!oWrapper||!oWrapper.el){oWrapper=this.elementCache[id]=new this.ElementWrapper(YAHOO.util.Dom.get(id));}
return oWrapper;},getElement:function(id){return YAHOO.util.Dom.get(id);},getCss:function(id){var el=YAHOO.util.Dom.get(id);return(el)?el.style:null;},ElementWrapper:function(el){this.el=el||null;this.id=this.el&&el.id;this.css=this.el&&el.style;},getPosX:function(el){return YAHOO.util.Dom.getX(el);},getPosY:function(el){return YAHOO.util.Dom.getY(el);},swapNode:function(n1,n2){if(n1.swapNode){n1.swapNode(n2);}else{var p=n2.parentNode;var s=n2.nextSibling;if(s==n1){p.insertBefore(n1,n2);}else if(n2==n1.nextSibling){p.insertBefore(n2,n1);}else{n1.parentNode.replaceChild(n2,n1);p.insertBefore(n1,s);}}},getScroll:function(){var t,l,dde=document.documentElement,db=document.body;if(dde&&(dde.scrollTop||dde.scrollLeft)){t=dde.scrollTop;l=dde.scrollLeft;}else if(db){t=db.scrollTop;l=db.scrollLeft;}else{}
return{top:t,left:l};},getStyle:function(el,styleProp){return YAHOO.util.Dom.getStyle(el,styleProp);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(moveEl,targetEl){var aCoord=YAHOO.util.Dom.getXY(targetEl);YAHOO.util.Dom.setXY(moveEl,aCoord);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(a,b){return(a-b);},_timeoutCount:0,_addListeners:function(){var DDM=YAHOO.util.DDM;if(YAHOO.util.Event&&document){DDM._onLoad();}else{if(DDM._timeoutCount>2000){}else{setTimeout(DDM._addListeners,10);if(document&&document.body){DDM._timeoutCount+=1;}}}},handleWasClicked:function(node,id){if(this.isHandle(id,node.id)){return true;}else{var p=node.parentNode;while(p){if(this.isHandle(id,p.id)){return true;}else{p=p.parentNode;}}}
return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}
(function(){var Event=YAHOO.util.Event;var Dom=YAHOO.util.Dom;YAHOO.util.DragDrop=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.util.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,b4StartDrag:function(x,y){},startDrag:function(x,y){},b4Drag:function(e){},onDrag:function(e){},onDragEnter:function(e,id){},b4DragOver:function(e){},onDragOver:function(e,id){},b4DragOut:function(e){},onDragOut:function(e,id){},b4DragDrop:function(e){},onDragDrop:function(e,id){},onInvalidDrop:function(e){},b4EndDrag:function(e){},endDrag:function(e){},b4MouseDown:function(e){},onMouseDown:function(e){},onMouseUp:function(e){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=Dom.get(this.id);}
return this._domRef;},getDragEl:function(){return Dom.get(this.dragElId);},init:function(id,sGroup,config){this.initTarget(id,sGroup,config);Event.on(this.id,"mousedown",this.handleMouseDown,this,true);},initTarget:function(id,sGroup,config){this.config=config||{};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof id!=="string"){id=Dom.generateId(id);}
this.id=id;this.addToGroup((sGroup)?sGroup:"default");this.handleElId=id;Event.onAvailable(id,this.handleOnAvailable,this,true);this.setDragElId(id);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(iTop,iRight,iBot,iLeft){if(!iRight&&0!==iRight){this.padding=[iTop,iTop,iTop,iTop];}else if(!iBot&&0!==iBot){this.padding=[iTop,iRight,iTop,iRight];}else{this.padding=[iTop,iRight,iBot,iLeft];}},setInitPosition:function(diffX,diffY){var el=this.getEl();if(!this.DDM.verifyEl(el)){return;}
var dx=diffX||0;var dy=diffY||0;var p=Dom.getXY(el);this.initPageX=p[0]-dx;this.initPageY=p[1]-dy;this.lastPageX=p[0];this.lastPageY=p[1];this.setStartPosition(p);},setStartPosition:function(pos){var p=pos||Dom.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=p[0];this.startPageY=p[1];},addToGroup:function(sGroup){this.groups[sGroup]=true;this.DDM.regDragDrop(this,sGroup);},removeFromGroup:function(sGroup){if(this.groups[sGroup]){delete this.groups[sGroup];}
this.DDM.removeDDFromGroup(this,sGroup);},setDragElId:function(id){this.dragElId=id;},setHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.handleElId=id;this.DDM.regHandle(this.id,id);},setOuterHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
Event.on(id,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(id);this.hasOuterHandles=true;},unreg:function(){Event.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(e,oDD){var button=e.which||e.button;if(this.primaryButtonOnly&&button>1){return;}
if(this.isLocked()){return;}
this.b4MouseDown(e);this.onMouseDown(e);this.DDM.refreshCache(this.groups);var pt=new YAHOO.util.Point(Event.getPageX(e),Event.getPageY(e));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(pt,this)){}else{if(this.clickValidator(e)){this.setStartPosition();this.DDM.handleMouseDown(e,this);this.DDM.stopEvent(e);}else{}}},clickValidator:function(e){var target=Event.getTarget(e);return(this.isValidHandleChild(target)&&(this.id==this.handleElId||this.DDM.handleWasClicked(target,this.id)));},getTargetCoord:function(iPageX,iPageY){var x=iPageX-this.deltaX;var y=iPageY-this.deltaY;if(this.constrainX){if(x<this.minX){x=this.minX;}
if(x>this.maxX){x=this.maxX;}}
if(this.constrainY){if(y<this.minY){y=this.minY;}
if(y>this.maxY){y=this.maxY;}}
x=this.getTick(x,this.xTicks);y=this.getTick(y,this.yTicks);return{x:x,y:y};},addInvalidHandleType:function(tagName){var type=tagName.toUpperCase();this.invalidHandleTypes[type]=type;},addInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.invalidHandleIds[id]=id;},addInvalidHandleClass:function(cssClass){this.invalidHandleClasses.push(cssClass);},removeInvalidHandleType:function(tagName){var type=tagName.toUpperCase();delete this.invalidHandleTypes[type];},removeInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
delete this.invalidHandleIds[id];},removeInvalidHandleClass:function(cssClass){for(var i=0,len=this.invalidHandleClasses.length;i<len;++i){if(this.invalidHandleClasses[i]==cssClass){delete this.invalidHandleClasses[i];}}},isValidHandleChild:function(node){var valid=true;var nodeName;try{nodeName=node.nodeName.toUpperCase();}catch(e){nodeName=node.nodeName;}
valid=valid&&!this.invalidHandleTypes[nodeName];valid=valid&&!this.invalidHandleIds[node.id];for(var i=0,len=this.invalidHandleClasses.length;valid&&i<len;++i){valid=!Dom.hasClass(node,this.invalidHandleClasses[i]);}
return valid;},setXTicks:function(iStartX,iTickSize){this.xTicks=[];this.xTickSize=iTickSize;var tickMap={};for(var i=this.initPageX;i>=this.minX;i=i-iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageX;i<=this.maxX;i=i+iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(iStartY,iTickSize){this.yTicks=[];this.yTickSize=iTickSize;var tickMap={};for(var i=this.initPageY;i>=this.minY;i=i-iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageY;i<=this.maxY;i=i+iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(iLeft,iRight,iTickSize){this.leftConstraint=parseInt(iLeft,10);this.rightConstraint=parseInt(iRight,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(iTickSize){this.setXTicks(this.initPageX,iTickSize);}
this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(iUp,iDown,iTickSize){this.topConstraint=parseInt(iUp,10);this.bottomConstraint=parseInt(iDown,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(iTickSize){this.setYTicks(this.initPageY,iTickSize);}
this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var dx=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var dy=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(dx,dy);}else{this.setInitPosition();}
if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}
if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(val,tickArray){if(!tickArray){return val;}else if(tickArray[0]>=val){return tickArray[0];}else{for(var i=0,len=tickArray.length;i<len;++i){var next=i+1;if(tickArray[next]&&tickArray[next]>=val){var diff1=val-tickArray[i];var diff2=tickArray[next]-val;return(diff2>diff1)?tickArray[i]:tickArray[next];}}
return tickArray[tickArray.length-1];}},toString:function(){return("DragDrop "+this.id);}};})();YAHOO.util.DD=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(iPageX,iPageY){var x=iPageX-this.startPageX;var y=iPageY-this.startPageY;this.setDelta(x,y);},setDelta:function(iDeltaX,iDeltaY){this.deltaX=iDeltaX;this.deltaY=iDeltaY;},setDragElPos:function(iPageX,iPageY){var el=this.getDragEl();this.alignElWithMouse(el,iPageX,iPageY);},alignElWithMouse:function(el,iPageX,iPageY){var oCoord=this.getTargetCoord(iPageX,iPageY);if(!this.deltaSetXY){var aCoord=[oCoord.x,oCoord.y];YAHOO.util.Dom.setXY(el,aCoord);var newLeft=parseInt(YAHOO.util.Dom.getStyle(el,"left"),10);var newTop=parseInt(YAHOO.util.Dom.getStyle(el,"top"),10);this.deltaSetXY=[newLeft-oCoord.x,newTop-oCoord.y];}else{YAHOO.util.Dom.setStyle(el,"left",(oCoord.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(el,"top",(oCoord.y+this.deltaSetXY[1])+"px");}
this.cachePosition(oCoord.x,oCoord.y);this.autoScroll(oCoord.x,oCoord.y,el.offsetHeight,el.offsetWidth);},cachePosition:function(iPageX,iPageY){if(iPageX){this.lastPageX=iPageX;this.lastPageY=iPageY;}else{var aCoord=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=aCoord[0];this.lastPageY=aCoord[1];}},autoScroll:function(x,y,h,w){if(this.scroll){var clientH=this.DDM.getClientHeight();var clientW=this.DDM.getClientWidth();var st=this.DDM.getScrollTop();var sl=this.DDM.getScrollLeft();var bot=h+y;var right=w+x;var toBot=(clientH+st-y-this.deltaY);var toRight=(clientW+sl-x-this.deltaX);var thresh=40;var scrAmt=(document.all)?80:30;if(bot>clientH&&toBot<thresh){window.scrollTo(sl,st+scrAmt);}
if(y<st&&st>0&&y-st<thresh){window.scrollTo(sl,st-scrAmt);}
if(right>clientW&&toRight<thresh){window.scrollTo(sl+scrAmt,st);}
if(x<sl&&sl>0&&x-sl<thresh){window.scrollTo(sl-scrAmt,st);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(e){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},b4Drag:function(e){this.setDragElPos(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(id,sGroup,config){if(id){this.init(id,sGroup,config);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var self=this;var body=document.body;if(!body||!body.firstChild){setTimeout(function(){self.createFrame();},50);return;}
var div=this.getDragEl();if(!div){div=document.createElement("div");div.id=this.dragElId;var s=div.style;s.position="absolute";s.visibility="hidden";s.cursor="move";s.border="2px solid #aaa";s.zIndex=999;body.insertBefore(div,body.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(iPageX,iPageY){var el=this.getEl();var dragEl=this.getDragEl();var s=dragEl.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(s.width,10)/2),Math.round(parseInt(s.height,10)/2));}
this.setDragElPos(iPageX,iPageY);YAHOO.util.Dom.setStyle(dragEl,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var DOM=YAHOO.util.Dom;var el=this.getEl();var dragEl=this.getDragEl();var bt=parseInt(DOM.getStyle(dragEl,"borderTopWidth"),10);var br=parseInt(DOM.getStyle(dragEl,"borderRightWidth"),10);var bb=parseInt(DOM.getStyle(dragEl,"borderBottomWidth"),10);var bl=parseInt(DOM.getStyle(dragEl,"borderLeftWidth"),10);if(isNaN(bt)){bt=0;}
if(isNaN(br)){br=0;}
if(isNaN(bb)){bb=0;}
if(isNaN(bl)){bl=0;}
var newWidth=Math.max(0,el.offsetWidth-br-bl);var newHeight=Math.max(0,el.offsetHeight-bt-bb);DOM.setStyle(dragEl,"width",newWidth+"px");DOM.setStyle(dragEl,"height",newHeight+"px");}},b4MouseDown:function(e){this.setStartPosition();var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);this.autoOffset(x,y);this.setDragElPos(x,y);},b4StartDrag:function(x,y){this.showFrame(x,y);},b4EndDrag:function(e){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(e){var DOM=YAHOO.util.Dom;var lel=this.getEl();var del=this.getDragEl();DOM.setStyle(del,"visibility","");DOM.setStyle(lel,"visibility","hidden");YAHOO.util.DDM.moveToEl(lel,del);DOM.setStyle(del,"visibility","hidden");DOM.setStyle(lel,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(id,sGroup,config){if(id){this.initTarget(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.2.2",build:"204"});
YAHOO.util.Attribute=function(hash,owner){if(owner){this.owner=owner;this.configure(hash,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,validator:null,getValue:function(){return this.value;},setValue:function(value,silent){var beforeRetVal;var owner=this.owner;var name=this.name;var event={type:name,prevValue:this.getValue(),newValue:value};if(this.readOnly||(this.writeOnce&&this._written)){return false;}
if(this.validator&&!this.validator.call(owner,value)){return false;}
if(!silent){beforeRetVal=owner.fireBeforeChangeEvent(event);if(beforeRetVal===false){return false;}}
if(this.method){this.method.call(owner,value);}
this.value=value;this._written=true;event.type=name;if(!silent){this.owner.fireChangeEvent(event);}
return true;},configure:function(map,init){map=map||{};this._written=false;this._initialConfig=this._initialConfig||{};for(var key in map){if(key&&YAHOO.lang.hasOwnProperty(map,key)){this[key]=map[key];if(init){this._initialConfig[key]=map[key];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig);},refresh:function(silent){this.setValue(this.value,silent);}};(function(){var Lang=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(key){var configs=this._configs||{};var config=configs[key];if(!config){return undefined;}
return config.value;},set:function(key,value,silent){var configs=this._configs||{};var config=configs[key];if(!config){return false;}
return config.setValue(value,silent);},getAttributeKeys:function(){var configs=this._configs;var keys=[];var config;for(var key in configs){config=configs[key];if(Lang.hasOwnProperty(configs,key)&&!Lang.isUndefined(config)){keys[keys.length]=key;}}
return keys;},setAttributes:function(map,silent){for(var key in map){if(Lang.hasOwnProperty(map,key)){this.set(key,map[key],silent);}}},resetValue:function(key,silent){var configs=this._configs||{};if(configs[key]){this.set(key,configs[key]._initialConfig.value,silent);return true;}
return false;},refresh:function(key,silent){var configs=this._configs;key=((Lang.isString(key))?[key]:key)||this.getAttributeKeys();for(var i=0,len=key.length;i<len;++i){if(configs[key[i]]&&!Lang.isUndefined(configs[key[i]].value)&&!Lang.isNull(configs[key[i]].value)){configs[key[i]].refresh(silent);}}},register:function(key,map){this.setAttributeConfig(key,map);},getAttributeConfig:function(key){var configs=this._configs||{};var config=configs[key]||{};var map={};for(key in config){if(Lang.hasOwnProperty(config,key)){map[key]=config[key];}}
return map;},setAttributeConfig:function(key,map,init){var configs=this._configs||{};map=map||{};if(!configs[key]){map.name=key;configs[key]=new YAHOO.util.Attribute(map,this);}else{configs[key].configure(map,init);}},configureAttribute:function(key,map,init){this.setAttributeConfig(key,map,init);},resetAttributeConfig:function(key){var configs=this._configs||{};configs[key].resetConfig();},fireBeforeChangeEvent:function(e){var type='before';type+=e.type.charAt(0).toUpperCase()+e.type.substr(1)+'Change';e.type=type;return this.fireEvent(e.type,e);},fireChangeEvent:function(e){e.type+='Change';return this.fireEvent(e.type,e);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var Dom=YAHOO.util.Dom,AttributeProvider=YAHOO.util.AttributeProvider;YAHOO.util.Element=function(el,map){if(arguments.length){this.init(el,map);}};YAHOO.util.Element.prototype={DOM_EVENTS:null,appendChild:function(child){child=child.get?child.get('element'):child;this.get('element').appendChild(child);},getElementsByTagName:function(tag){return this.get('element').getElementsByTagName(tag);},hasChildNodes:function(){return this.get('element').hasChildNodes();},insertBefore:function(element,before){element=element.get?element.get('element'):element;before=(before&&before.get)?before.get('element'):before;this.get('element').insertBefore(element,before);},removeChild:function(child){child=child.get?child.get('element'):child;this.get('element').removeChild(child);return true;},replaceChild:function(newNode,oldNode){newNode=newNode.get?newNode.get('element'):newNode;oldNode=oldNode.get?oldNode.get('element'):oldNode;return this.get('element').replaceChild(newNode,oldNode);},initAttributes:function(map){},addListener:function(type,fn,obj,scope){var el=this.get('element');scope=scope||this;el=this.get('id')||el;var self=this;if(!this._events[type]){if(this.DOM_EVENTS[type]){YAHOO.util.Event.addListener(el,type,function(e){if(e.srcElement&&!e.target){e.target=e.srcElement;}
self.fireEvent(type,e);},obj,scope);}
this.createEvent(type,this);}
this.subscribe.apply(this,arguments);},on:function(){this.addListener.apply(this,arguments);},removeListener:function(type,fn){this.unsubscribe.apply(this,arguments);},addClass:function(className){Dom.addClass(this.get('element'),className);},getElementsByClassName:function(className,tag){return Dom.getElementsByClassName(className,tag,this.get('element'));},hasClass:function(className){return Dom.hasClass(this.get('element'),className);},removeClass:function(className){return Dom.removeClass(this.get('element'),className);},replaceClass:function(oldClassName,newClassName){return Dom.replaceClass(this.get('element'),oldClassName,newClassName);},setStyle:function(property,value){var el=this.get('element');if(!el){return this._queue[this._queue.length]=['setStyle',arguments];}
return Dom.setStyle(el,property,value);},getStyle:function(property){return Dom.getStyle(this.get('element'),property);},fireQueue:function(){var queue=this._queue;for(var i=0,len=queue.length;i<len;++i){this[queue[i][0]].apply(this,queue[i][1]);}},appendTo:function(parent,before){parent=(parent.get)?parent.get('element'):Dom.get(parent);this.fireEvent('beforeAppendTo',{type:'beforeAppendTo',target:parent});before=(before&&before.get)?before.get('element'):Dom.get(before);var element=this.get('element');if(!element){return false;}
if(!parent){return false;}
if(element.parent!=parent){if(before){parent.insertBefore(element,before);}else{parent.appendChild(element);}}
this.fireEvent('appendTo',{type:'appendTo',target:parent});},get:function(key){var configs=this._configs||{};var el=configs.element;if(el&&!configs[key]&&!YAHOO.lang.isUndefined(el.value[key])){return el.value[key];}
return AttributeProvider.prototype.get.call(this,key);},set:function(key,value,silent){var el=this.get('element');if(!el){this._queue[this._queue.length]=['set',arguments];if(this._configs[key]){this._configs[key].value=value;}
return;}
if(!this._configs[key]&&!YAHOO.lang.isUndefined(el[key])){_registerHTMLAttr.call(this,key);}
return AttributeProvider.prototype.set.apply(this,arguments);},setAttributeConfig:function(key,map,init){var el=this.get('element');if(el&&!this._configs[key]&&!YAHOO.lang.isUndefined(el[key])){_registerHTMLAttr.call(this,key,map);}else{AttributeProvider.prototype.setAttributeConfig.apply(this,arguments);}},getAttributeKeys:function(){var el=this.get('element');var keys=AttributeProvider.prototype.getAttributeKeys.call(this);for(var key in el){if(!this._configs[key]){keys[key]=keys[key]||el[key];}}
return keys;},createEvent:function(type,scope){this._events[type]=true;AttributeProvider.prototype.createEvent.apply(this,arguments);},init:function(el,attr){_initElement.apply(this,arguments);}};var _initElement=function(el,attr){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};attr=attr||{};attr.element=attr.element||el||null;this.DOM_EVENTS={'click':true,'dblclick':true,'keydown':true,'keypress':true,'keyup':true,'mousedown':true,'mousemove':true,'mouseout':true,'mouseover':true,'mouseup':true,'focus':true,'blur':true,'submit':true};var isReady=false;if(YAHOO.lang.isString(el)){_registerHTMLAttr.call(this,'id',{value:attr.element});}
if(Dom.get(el)){isReady=true;_initHTMLElement.call(this,attr);_initContent.call(this,attr);}
YAHOO.util.Event.onAvailable(attr.element,function(){if(!isReady){_initHTMLElement.call(this,attr);}
this.fireEvent('available',{type:'available',target:attr.element});},this,true);YAHOO.util.Event.onContentReady(attr.element,function(){if(!isReady){_initContent.call(this,attr);}
this.fireEvent('contentReady',{type:'contentReady',target:attr.element});},this,true);};var _initHTMLElement=function(attr){this.setAttributeConfig('element',{value:Dom.get(attr.element),readOnly:true});};var _initContent=function(attr){this.initAttributes(attr);this.setAttributes(attr,true);this.fireQueue();};var _registerHTMLAttr=function(key,map){var el=this.get('element');map=map||{};map.name=key;map.method=map.method||function(value){el[key]=value;};map.value=map.value||el[key];this._configs[key]=new YAHOO.util.Attribute(map,this);};YAHOO.augment(YAHOO.util.Element,AttributeProvider);})();YAHOO.register("element",YAHOO.util.Element,{version:"2.2.2",build:"204"});

/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.2.2
*/

if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var Event=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initalized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(sMethod,args){for(var i in this.ids){for(var j in this.ids[i]){var oDD=this.ids[i][j];if(!this.isTypeOfDD(oDD)){continue;}
oDD[sMethod].apply(oDD,args);}}},_onLoad:function(){this.init();Event.on(document,"mouseup",this.handleMouseUp,this,true);Event.on(document,"mousemove",this.handleMouseMove,this,true);Event.on(window,"unload",this._onUnload,this,true);Event.on(window,"resize",this._onResize,this,true);},_onResize:function(e){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(oDD,sGroup){if(!this.initialized){this.init();}
if(!this.ids[sGroup]){this.ids[sGroup]={};}
this.ids[sGroup][oDD.id]=oDD;},removeDDFromGroup:function(oDD,sGroup){if(!this.ids[sGroup]){this.ids[sGroup]={};}
var obj=this.ids[sGroup];if(obj&&obj[oDD.id]){delete obj[oDD.id];}},_remove:function(oDD){for(var g in oDD.groups){if(g&&this.ids[g][oDD.id]){delete this.ids[g][oDD.id];}}
delete this.handleIds[oDD.id];},regHandle:function(sDDId,sHandleId){if(!this.handleIds[sDDId]){this.handleIds[sDDId]={};}
this.handleIds[sDDId][sHandleId]=sHandleId;},isDragDrop:function(id){return(this.getDDById(id))?true:false;},getRelated:function(p_oDD,bTargetsOnly){var oDDs=[];for(var i in p_oDD.groups){for(j in this.ids[i]){var dd=this.ids[i][j];if(!this.isTypeOfDD(dd)){continue;}
if(!bTargetsOnly||dd.isTarget){oDDs[oDDs.length]=dd;}}}
return oDDs;},isLegalTarget:function(oDD,oTargetDD){var targets=this.getRelated(oDD,true);for(var i=0,len=targets.length;i<len;++i){if(targets[i].id==oTargetDD.id){return true;}}
return false;},isTypeOfDD:function(oDD){return(oDD&&oDD.__ygDragDrop);},isHandle:function(sDDId,sHandleId){return(this.handleIds[sDDId]&&this.handleIds[sDDId][sHandleId]);},getDDById:function(id){for(var i in this.ids){if(this.ids[i][id]){return this.ids[i][id];}}
return null;},handleMouseDown:function(e,oDD){this.currentTarget=YAHOO.util.Event.getTarget(e);this.dragCurrent=oDD;var el=oDD.getEl();this.startX=YAHOO.util.Event.getPageX(e);this.startY=YAHOO.util.Event.getPageY(e);this.deltaX=this.startX-el.offsetLeft;this.deltaY=this.startY-el.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var DDM=YAHOO.util.DDM;DDM.startDrag(DDM.startX,DDM.startY);},this.clickTimeThresh);},startDrag:function(x,y){clearTimeout(this.clickTimeout);if(this.dragCurrent){this.dragCurrent.b4StartDrag(x,y);this.dragCurrent.startDrag(x,y);}
this.dragThreshMet=true;},handleMouseUp:function(e){if(!this.dragCurrent){return;}
clearTimeout(this.clickTimeout);if(this.dragThreshMet){this.fireEvents(e,true);}else{}
this.stopDrag(e);this.stopEvent(e);},stopEvent:function(e){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(e);}
if(this.preventDefault){YAHOO.util.Event.preventDefault(e);}},stopDrag:function(e){if(this.dragCurrent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(e);this.dragCurrent.endDrag(e);}
this.dragCurrent.onMouseUp(e);}
this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(e){if(!this.dragCurrent){return true;}
if(YAHOO.util.Event.isIE&&!e.button){this.stopEvent(e);return this.handleMouseUp(e);}
if(!this.dragThreshMet){var diffX=Math.abs(this.startX-YAHOO.util.Event.getPageX(e));var diffY=Math.abs(this.startY-YAHOO.util.Event.getPageY(e));if(diffX>this.clickPixelThresh||diffY>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}
if(this.dragThreshMet){this.dragCurrent.b4Drag(e);this.dragCurrent.onDrag(e);this.fireEvents(e,false);}
this.stopEvent(e);return true;},fireEvents:function(e,isDrop){var dc=this.dragCurrent;if(!dc||dc.isLocked()){return;}
var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);var pt=new YAHOO.util.Point(x,y);var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);var oldOvers=[];var outEvts=[];var overEvts=[];var dropEvts=[];var enterEvts=[];for(var i in this.dragOvers){var ddo=this.dragOvers[i];if(!this.isTypeOfDD(ddo)){continue;}
if(!this.isOverTarget(pt,ddo,this.mode,curRegion)){outEvts.push(ddo);}
oldOvers[i]=true;delete this.dragOvers[i];}
for(var sGroup in dc.groups){if("string"!=typeof sGroup){continue;}
for(i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(!this.isTypeOfDD(oDD)){continue;}
if(oDD.isTarget&&!oDD.isLocked()&&oDD!=dc){if(this.isOverTarget(pt,oDD,this.mode,curRegion)){if(isDrop){dropEvts.push(oDD);}else{if(!oldOvers[oDD.id]){enterEvts.push(oDD);}else{overEvts.push(oDD);}
this.dragOvers[oDD.id]=oDD;}}}}}
this.interactionInfo={out:outEvts,enter:enterEvts,over:overEvts,drop:dropEvts,point:pt,draggedRegion:curRegion,sourceRegion:this.locationCache[dc.id],validDrop:isDrop};if(isDrop&&!dropEvts.length){this.interactionInfo.validDrop=false;dc.onInvalidDrop(e);}
if(this.mode){if(outEvts.length){dc.b4DragOut(e,outEvts);dc.onDragOut(e,outEvts);}
if(enterEvts.length){dc.onDragEnter(e,enterEvts);}
if(overEvts.length){dc.b4DragOver(e,overEvts);dc.onDragOver(e,overEvts);}
if(dropEvts.length){dc.b4DragDrop(e,dropEvts);dc.onDragDrop(e,dropEvts);}}else{var len=0;for(i=0,len=outEvts.length;i<len;++i){dc.b4DragOut(e,outEvts[i].id);dc.onDragOut(e,outEvts[i].id);}
for(i=0,len=enterEvts.length;i<len;++i){dc.onDragEnter(e,enterEvts[i].id);}
for(i=0,len=overEvts.length;i<len;++i){dc.b4DragOver(e,overEvts[i].id);dc.onDragOver(e,overEvts[i].id);}
for(i=0,len=dropEvts.length;i<len;++i){dc.b4DragDrop(e,dropEvts[i].id);dc.onDragDrop(e,dropEvts[i].id);}}},getBestMatch:function(dds){var winner=null;var len=dds.length;if(len==1){winner=dds[0];}else{for(var i=0;i<len;++i){var dd=dds[i];if(this.mode==this.INTERSECT&&dd.cursorIsOver){winner=dd;break;}else{if(!winner||!winner.overlap||(dd.overlap&&winner.overlap.getArea()<dd.overlap.getArea())){winner=dd;}}}}
return winner;},refreshCache:function(groups){var g=groups||this.ids;for(var sGroup in g){if("string"!=typeof sGroup){continue;}
for(var i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(this.isTypeOfDD(oDD)){var loc=this.getLocation(oDD);if(loc){this.locationCache[oDD.id]=loc;}else{delete this.locationCache[oDD.id];}}}}},verifyEl:function(el){try{if(el){var parent=el.offsetParent;if(parent){return true;}}}catch(e){}
return false;},getLocation:function(oDD){if(!this.isTypeOfDD(oDD)){return null;}
var el=oDD.getEl(),pos,x1,x2,y1,y2,t,r,b,l;try{pos=YAHOO.util.Dom.getXY(el);}catch(e){}
if(!pos){return null;}
x1=pos[0];x2=x1+el.offsetWidth;y1=pos[1];y2=y1+el.offsetHeight;t=y1-oDD.padding[0];r=x2+oDD.padding[1];b=y2+oDD.padding[2];l=x1-oDD.padding[3];return new YAHOO.util.Region(t,r,b,l);},isOverTarget:function(pt,oTarget,intersect,curRegion){var loc=this.locationCache[oTarget.id];if(!loc||!this.useCache){loc=this.getLocation(oTarget);this.locationCache[oTarget.id]=loc;}
if(!loc){return false;}
oTarget.cursorIsOver=loc.contains(pt);var dc=this.dragCurrent;if(!dc||(!intersect&&!dc.constrainX&&!dc.constrainY)){return oTarget.cursorIsOver;}
oTarget.overlap=null;if(!curRegion){var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);}
var overlap=curRegion.intersect(loc);if(overlap){oTarget.overlap=overlap;return(intersect)?true:oTarget.cursorIsOver;}else{return false;}},_onUnload:function(e,me){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}
this._execOnAll("unreg",[]);for(i in this.elementCache){delete this.elementCache[i];}
this.elementCache={};this.ids={};},elementCache:{},getElWrapper:function(id){var oWrapper=this.elementCache[id];if(!oWrapper||!oWrapper.el){oWrapper=this.elementCache[id]=new this.ElementWrapper(YAHOO.util.Dom.get(id));}
return oWrapper;},getElement:function(id){return YAHOO.util.Dom.get(id);},getCss:function(id){var el=YAHOO.util.Dom.get(id);return(el)?el.style:null;},ElementWrapper:function(el){this.el=el||null;this.id=this.el&&el.id;this.css=this.el&&el.style;},getPosX:function(el){return YAHOO.util.Dom.getX(el);},getPosY:function(el){return YAHOO.util.Dom.getY(el);},swapNode:function(n1,n2){if(n1.swapNode){n1.swapNode(n2);}else{var p=n2.parentNode;var s=n2.nextSibling;if(s==n1){p.insertBefore(n1,n2);}else if(n2==n1.nextSibling){p.insertBefore(n2,n1);}else{n1.parentNode.replaceChild(n2,n1);p.insertBefore(n1,s);}}},getScroll:function(){var t,l,dde=document.documentElement,db=document.body;if(dde&&(dde.scrollTop||dde.scrollLeft)){t=dde.scrollTop;l=dde.scrollLeft;}else if(db){t=db.scrollTop;l=db.scrollLeft;}else{}
return{top:t,left:l};},getStyle:function(el,styleProp){return YAHOO.util.Dom.getStyle(el,styleProp);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(moveEl,targetEl){var aCoord=YAHOO.util.Dom.getXY(targetEl);YAHOO.util.Dom.setXY(moveEl,aCoord);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(a,b){return(a-b);},_timeoutCount:0,_addListeners:function(){var DDM=YAHOO.util.DDM;if(YAHOO.util.Event&&document){DDM._onLoad();}else{if(DDM._timeoutCount>2000){}else{setTimeout(DDM._addListeners,10);if(document&&document.body){DDM._timeoutCount+=1;}}}},handleWasClicked:function(node,id){if(this.isHandle(id,node.id)){return true;}else{var p=node.parentNode;while(p){if(this.isHandle(id,p.id)){return true;}else{p=p.parentNode;}}}
return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}
(function(){var Event=YAHOO.util.Event;var Dom=YAHOO.util.Dom;YAHOO.util.DragDrop=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.util.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,b4StartDrag:function(x,y){},startDrag:function(x,y){},b4Drag:function(e){},onDrag:function(e){},onDragEnter:function(e,id){},b4DragOver:function(e){},onDragOver:function(e,id){},b4DragOut:function(e){},onDragOut:function(e,id){},b4DragDrop:function(e){},onDragDrop:function(e,id){},onInvalidDrop:function(e){},b4EndDrag:function(e){},endDrag:function(e){},b4MouseDown:function(e){},onMouseDown:function(e){},onMouseUp:function(e){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=Dom.get(this.id);}
return this._domRef;},getDragEl:function(){return Dom.get(this.dragElId);},init:function(id,sGroup,config){this.initTarget(id,sGroup,config);Event.on(this.id,"mousedown",this.handleMouseDown,this,true);},initTarget:function(id,sGroup,config){this.config=config||{};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof id!=="string"){id=Dom.generateId(id);}
this.id=id;this.addToGroup((sGroup)?sGroup:"default");this.handleElId=id;Event.onAvailable(id,this.handleOnAvailable,this,true);this.setDragElId(id);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(iTop,iRight,iBot,iLeft){if(!iRight&&0!==iRight){this.padding=[iTop,iTop,iTop,iTop];}else if(!iBot&&0!==iBot){this.padding=[iTop,iRight,iTop,iRight];}else{this.padding=[iTop,iRight,iBot,iLeft];}},setInitPosition:function(diffX,diffY){var el=this.getEl();if(!this.DDM.verifyEl(el)){return;}
var dx=diffX||0;var dy=diffY||0;var p=Dom.getXY(el);this.initPageX=p[0]-dx;this.initPageY=p[1]-dy;this.lastPageX=p[0];this.lastPageY=p[1];this.setStartPosition(p);},setStartPosition:function(pos){var p=pos||Dom.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=p[0];this.startPageY=p[1];},addToGroup:function(sGroup){this.groups[sGroup]=true;this.DDM.regDragDrop(this,sGroup);},removeFromGroup:function(sGroup){if(this.groups[sGroup]){delete this.groups[sGroup];}
this.DDM.removeDDFromGroup(this,sGroup);},setDragElId:function(id){this.dragElId=id;},setHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.handleElId=id;this.DDM.regHandle(this.id,id);},setOuterHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
Event.on(id,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(id);this.hasOuterHandles=true;},unreg:function(){Event.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(e,oDD){var button=e.which||e.button;if(this.primaryButtonOnly&&button>1){return;}
if(this.isLocked()){return;}
this.b4MouseDown(e);this.onMouseDown(e);this.DDM.refreshCache(this.groups);var pt=new YAHOO.util.Point(Event.getPageX(e),Event.getPageY(e));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(pt,this)){}else{if(this.clickValidator(e)){this.setStartPosition();this.DDM.handleMouseDown(e,this);this.DDM.stopEvent(e);}else{}}},clickValidator:function(e){var target=Event.getTarget(e);return(this.isValidHandleChild(target)&&(this.id==this.handleElId||this.DDM.handleWasClicked(target,this.id)));},getTargetCoord:function(iPageX,iPageY){var x=iPageX-this.deltaX;var y=iPageY-this.deltaY;if(this.constrainX){if(x<this.minX){x=this.minX;}
if(x>this.maxX){x=this.maxX;}}
if(this.constrainY){if(y<this.minY){y=this.minY;}
if(y>this.maxY){y=this.maxY;}}
x=this.getTick(x,this.xTicks);y=this.getTick(y,this.yTicks);return{x:x,y:y};},addInvalidHandleType:function(tagName){var type=tagName.toUpperCase();this.invalidHandleTypes[type]=type;},addInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.invalidHandleIds[id]=id;},addInvalidHandleClass:function(cssClass){this.invalidHandleClasses.push(cssClass);},removeInvalidHandleType:function(tagName){var type=tagName.toUpperCase();delete this.invalidHandleTypes[type];},removeInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
delete this.invalidHandleIds[id];},removeInvalidHandleClass:function(cssClass){for(var i=0,len=this.invalidHandleClasses.length;i<len;++i){if(this.invalidHandleClasses[i]==cssClass){delete this.invalidHandleClasses[i];}}},isValidHandleChild:function(node){var valid=true;var nodeName;try{nodeName=node.nodeName.toUpperCase();}catch(e){nodeName=node.nodeName;}
valid=valid&&!this.invalidHandleTypes[nodeName];valid=valid&&!this.invalidHandleIds[node.id];for(var i=0,len=this.invalidHandleClasses.length;valid&&i<len;++i){valid=!Dom.hasClass(node,this.invalidHandleClasses[i]);}
return valid;},setXTicks:function(iStartX,iTickSize){this.xTicks=[];this.xTickSize=iTickSize;var tickMap={};for(var i=this.initPageX;i>=this.minX;i=i-iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageX;i<=this.maxX;i=i+iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(iStartY,iTickSize){this.yTicks=[];this.yTickSize=iTickSize;var tickMap={};for(var i=this.initPageY;i>=this.minY;i=i-iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageY;i<=this.maxY;i=i+iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(iLeft,iRight,iTickSize){this.leftConstraint=parseInt(iLeft,10);this.rightConstraint=parseInt(iRight,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(iTickSize){this.setXTicks(this.initPageX,iTickSize);}
this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(iUp,iDown,iTickSize){this.topConstraint=parseInt(iUp,10);this.bottomConstraint=parseInt(iDown,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(iTickSize){this.setYTicks(this.initPageY,iTickSize);}
this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var dx=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var dy=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(dx,dy);}else{this.setInitPosition();}
if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}
if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(val,tickArray){if(!tickArray){return val;}else if(tickArray[0]>=val){return tickArray[0];}else{for(var i=0,len=tickArray.length;i<len;++i){var next=i+1;if(tickArray[next]&&tickArray[next]>=val){var diff1=val-tickArray[i];var diff2=tickArray[next]-val;return(diff2>diff1)?tickArray[i]:tickArray[next];}}
return tickArray[tickArray.length-1];}},toString:function(){return("DragDrop "+this.id);}};})();YAHOO.util.DD=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(iPageX,iPageY){var x=iPageX-this.startPageX;var y=iPageY-this.startPageY;this.setDelta(x,y);},setDelta:function(iDeltaX,iDeltaY){this.deltaX=iDeltaX;this.deltaY=iDeltaY;},setDragElPos:function(iPageX,iPageY){var el=this.getDragEl();this.alignElWithMouse(el,iPageX,iPageY);},alignElWithMouse:function(el,iPageX,iPageY){var oCoord=this.getTargetCoord(iPageX,iPageY);if(!this.deltaSetXY){var aCoord=[oCoord.x,oCoord.y];YAHOO.util.Dom.setXY(el,aCoord);var newLeft=parseInt(YAHOO.util.Dom.getStyle(el,"left"),10);var newTop=parseInt(YAHOO.util.Dom.getStyle(el,"top"),10);this.deltaSetXY=[newLeft-oCoord.x,newTop-oCoord.y];}else{YAHOO.util.Dom.setStyle(el,"left",(oCoord.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(el,"top",(oCoord.y+this.deltaSetXY[1])+"px");}
this.cachePosition(oCoord.x,oCoord.y);this.autoScroll(oCoord.x,oCoord.y,el.offsetHeight,el.offsetWidth);},cachePosition:function(iPageX,iPageY){if(iPageX){this.lastPageX=iPageX;this.lastPageY=iPageY;}else{var aCoord=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=aCoord[0];this.lastPageY=aCoord[1];}},autoScroll:function(x,y,h,w){if(this.scroll){var clientH=this.DDM.getClientHeight();var clientW=this.DDM.getClientWidth();var st=this.DDM.getScrollTop();var sl=this.DDM.getScrollLeft();var bot=h+y;var right=w+x;var toBot=(clientH+st-y-this.deltaY);var toRight=(clientW+sl-x-this.deltaX);var thresh=40;var scrAmt=(document.all)?80:30;if(bot>clientH&&toBot<thresh){window.scrollTo(sl,st+scrAmt);}
if(y<st&&st>0&&y-st<thresh){window.scrollTo(sl,st-scrAmt);}
if(right>clientW&&toRight<thresh){window.scrollTo(sl+scrAmt,st);}
if(x<sl&&sl>0&&x-sl<thresh){window.scrollTo(sl-scrAmt,st);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(e){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},b4Drag:function(e){this.setDragElPos(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(id,sGroup,config){if(id){this.init(id,sGroup,config);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var self=this;var body=document.body;if(!body||!body.firstChild){setTimeout(function(){self.createFrame();},50);return;}
var div=this.getDragEl();if(!div){div=document.createElement("div");div.id=this.dragElId;var s=div.style;s.position="absolute";s.visibility="hidden";s.cursor="move";s.border="2px solid #aaa";s.zIndex=999;body.insertBefore(div,body.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(iPageX,iPageY){var el=this.getEl();var dragEl=this.getDragEl();var s=dragEl.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(s.width,10)/2),Math.round(parseInt(s.height,10)/2));}
this.setDragElPos(iPageX,iPageY);YAHOO.util.Dom.setStyle(dragEl,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var DOM=YAHOO.util.Dom;var el=this.getEl();var dragEl=this.getDragEl();var bt=parseInt(DOM.getStyle(dragEl,"borderTopWidth"),10);var br=parseInt(DOM.getStyle(dragEl,"borderRightWidth"),10);var bb=parseInt(DOM.getStyle(dragEl,"borderBottomWidth"),10);var bl=parseInt(DOM.getStyle(dragEl,"borderLeftWidth"),10);if(isNaN(bt)){bt=0;}
if(isNaN(br)){br=0;}
if(isNaN(bb)){bb=0;}
if(isNaN(bl)){bl=0;}
var newWidth=Math.max(0,el.offsetWidth-br-bl);var newHeight=Math.max(0,el.offsetHeight-bt-bb);DOM.setStyle(dragEl,"width",newWidth+"px");DOM.setStyle(dragEl,"height",newHeight+"px");}},b4MouseDown:function(e){this.setStartPosition();var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);this.autoOffset(x,y);this.setDragElPos(x,y);},b4StartDrag:function(x,y){this.showFrame(x,y);},b4EndDrag:function(e){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(e){var DOM=YAHOO.util.Dom;var lel=this.getEl();var del=this.getDragEl();DOM.setStyle(del,"visibility","");DOM.setStyle(lel,"visibility","hidden");YAHOO.util.DDM.moveToEl(lel,del);DOM.setStyle(del,"visibility","hidden");DOM.setStyle(lel,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(id,sGroup,config){if(id){this.initTarget(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.2.2",build:"204"});

/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.2.2
*/

if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var Event=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initalized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(sMethod,args){for(var i in this.ids){for(var j in this.ids[i]){var oDD=this.ids[i][j];if(!this.isTypeOfDD(oDD)){continue;}
oDD[sMethod].apply(oDD,args);}}},_onLoad:function(){this.init();Event.on(document,"mouseup",this.handleMouseUp,this,true);Event.on(document,"mousemove",this.handleMouseMove,this,true);Event.on(window,"unload",this._onUnload,this,true);Event.on(window,"resize",this._onResize,this,true);},_onResize:function(e){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(oDD,sGroup){if(!this.initialized){this.init();}
if(!this.ids[sGroup]){this.ids[sGroup]={};}
this.ids[sGroup][oDD.id]=oDD;},removeDDFromGroup:function(oDD,sGroup){if(!this.ids[sGroup]){this.ids[sGroup]={};}
var obj=this.ids[sGroup];if(obj&&obj[oDD.id]){delete obj[oDD.id];}},_remove:function(oDD){for(var g in oDD.groups){if(g&&this.ids[g][oDD.id]){delete this.ids[g][oDD.id];}}
delete this.handleIds[oDD.id];},regHandle:function(sDDId,sHandleId){if(!this.handleIds[sDDId]){this.handleIds[sDDId]={};}
this.handleIds[sDDId][sHandleId]=sHandleId;},isDragDrop:function(id){return(this.getDDById(id))?true:false;},getRelated:function(p_oDD,bTargetsOnly){var oDDs=[];for(var i in p_oDD.groups){for(j in this.ids[i]){var dd=this.ids[i][j];if(!this.isTypeOfDD(dd)){continue;}
if(!bTargetsOnly||dd.isTarget){oDDs[oDDs.length]=dd;}}}
return oDDs;},isLegalTarget:function(oDD,oTargetDD){var targets=this.getRelated(oDD,true);for(var i=0,len=targets.length;i<len;++i){if(targets[i].id==oTargetDD.id){return true;}}
return false;},isTypeOfDD:function(oDD){return(oDD&&oDD.__ygDragDrop);},isHandle:function(sDDId,sHandleId){return(this.handleIds[sDDId]&&this.handleIds[sDDId][sHandleId]);},getDDById:function(id){for(var i in this.ids){if(this.ids[i][id]){return this.ids[i][id];}}
return null;},handleMouseDown:function(e,oDD){this.currentTarget=YAHOO.util.Event.getTarget(e);this.dragCurrent=oDD;var el=oDD.getEl();this.startX=YAHOO.util.Event.getPageX(e);this.startY=YAHOO.util.Event.getPageY(e);this.deltaX=this.startX-el.offsetLeft;this.deltaY=this.startY-el.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var DDM=YAHOO.util.DDM;DDM.startDrag(DDM.startX,DDM.startY);},this.clickTimeThresh);},startDrag:function(x,y){clearTimeout(this.clickTimeout);if(this.dragCurrent){this.dragCurrent.b4StartDrag(x,y);this.dragCurrent.startDrag(x,y);}
this.dragThreshMet=true;},handleMouseUp:function(e){if(!this.dragCurrent){return;}
clearTimeout(this.clickTimeout);if(this.dragThreshMet){this.fireEvents(e,true);}else{}
this.stopDrag(e);this.stopEvent(e);},stopEvent:function(e){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(e);}
if(this.preventDefault){YAHOO.util.Event.preventDefault(e);}},stopDrag:function(e){if(this.dragCurrent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(e);this.dragCurrent.endDrag(e);}
this.dragCurrent.onMouseUp(e);}
this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(e){if(!this.dragCurrent){return true;}
if(YAHOO.util.Event.isIE&&!e.button){this.stopEvent(e);return this.handleMouseUp(e);}
if(!this.dragThreshMet){var diffX=Math.abs(this.startX-YAHOO.util.Event.getPageX(e));var diffY=Math.abs(this.startY-YAHOO.util.Event.getPageY(e));if(diffX>this.clickPixelThresh||diffY>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}
if(this.dragThreshMet){this.dragCurrent.b4Drag(e);this.dragCurrent.onDrag(e);this.fireEvents(e,false);}
this.stopEvent(e);return true;},fireEvents:function(e,isDrop){var dc=this.dragCurrent;if(!dc||dc.isLocked()){return;}
var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);var pt=new YAHOO.util.Point(x,y);var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);var oldOvers=[];var outEvts=[];var overEvts=[];var dropEvts=[];var enterEvts=[];for(var i in this.dragOvers){var ddo=this.dragOvers[i];if(!this.isTypeOfDD(ddo)){continue;}
if(!this.isOverTarget(pt,ddo,this.mode,curRegion)){outEvts.push(ddo);}
oldOvers[i]=true;delete this.dragOvers[i];}
for(var sGroup in dc.groups){if("string"!=typeof sGroup){continue;}
for(i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(!this.isTypeOfDD(oDD)){continue;}
if(oDD.isTarget&&!oDD.isLocked()&&oDD!=dc){if(this.isOverTarget(pt,oDD,this.mode,curRegion)){if(isDrop){dropEvts.push(oDD);}else{if(!oldOvers[oDD.id]){enterEvts.push(oDD);}else{overEvts.push(oDD);}
this.dragOvers[oDD.id]=oDD;}}}}}
this.interactionInfo={out:outEvts,enter:enterEvts,over:overEvts,drop:dropEvts,point:pt,draggedRegion:curRegion,sourceRegion:this.locationCache[dc.id],validDrop:isDrop};if(isDrop&&!dropEvts.length){this.interactionInfo.validDrop=false;dc.onInvalidDrop(e);}
if(this.mode){if(outEvts.length){dc.b4DragOut(e,outEvts);dc.onDragOut(e,outEvts);}
if(enterEvts.length){dc.onDragEnter(e,enterEvts);}
if(overEvts.length){dc.b4DragOver(e,overEvts);dc.onDragOver(e,overEvts);}
if(dropEvts.length){dc.b4DragDrop(e,dropEvts);dc.onDragDrop(e,dropEvts);}}else{var len=0;for(i=0,len=outEvts.length;i<len;++i){dc.b4DragOut(e,outEvts[i].id);dc.onDragOut(e,outEvts[i].id);}
for(i=0,len=enterEvts.length;i<len;++i){dc.onDragEnter(e,enterEvts[i].id);}
for(i=0,len=overEvts.length;i<len;++i){dc.b4DragOver(e,overEvts[i].id);dc.onDragOver(e,overEvts[i].id);}
for(i=0,len=dropEvts.length;i<len;++i){dc.b4DragDrop(e,dropEvts[i].id);dc.onDragDrop(e,dropEvts[i].id);}}},getBestMatch:function(dds){var winner=null;var len=dds.length;if(len==1){winner=dds[0];}else{for(var i=0;i<len;++i){var dd=dds[i];if(this.mode==this.INTERSECT&&dd.cursorIsOver){winner=dd;break;}else{if(!winner||!winner.overlap||(dd.overlap&&winner.overlap.getArea()<dd.overlap.getArea())){winner=dd;}}}}
return winner;},refreshCache:function(groups){var g=groups||this.ids;for(var sGroup in g){if("string"!=typeof sGroup){continue;}
for(var i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(this.isTypeOfDD(oDD)){var loc=this.getLocation(oDD);if(loc){this.locationCache[oDD.id]=loc;}else{delete this.locationCache[oDD.id];}}}}},verifyEl:function(el){try{if(el){var parent=el.offsetParent;if(parent){return true;}}}catch(e){}
return false;},getLocation:function(oDD){if(!this.isTypeOfDD(oDD)){return null;}
var el=oDD.getEl(),pos,x1,x2,y1,y2,t,r,b,l;try{pos=YAHOO.util.Dom.getXY(el);}catch(e){}
if(!pos){return null;}
x1=pos[0];x2=x1+el.offsetWidth;y1=pos[1];y2=y1+el.offsetHeight;t=y1-oDD.padding[0];r=x2+oDD.padding[1];b=y2+oDD.padding[2];l=x1-oDD.padding[3];return new YAHOO.util.Region(t,r,b,l);},isOverTarget:function(pt,oTarget,intersect,curRegion){var loc=this.locationCache[oTarget.id];if(!loc||!this.useCache){loc=this.getLocation(oTarget);this.locationCache[oTarget.id]=loc;}
if(!loc){return false;}
oTarget.cursorIsOver=loc.contains(pt);var dc=this.dragCurrent;if(!dc||(!intersect&&!dc.constrainX&&!dc.constrainY)){return oTarget.cursorIsOver;}
oTarget.overlap=null;if(!curRegion){var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);}
var overlap=curRegion.intersect(loc);if(overlap){oTarget.overlap=overlap;return(intersect)?true:oTarget.cursorIsOver;}else{return false;}},_onUnload:function(e,me){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}
this._execOnAll("unreg",[]);for(i in this.elementCache){delete this.elementCache[i];}
this.elementCache={};this.ids={};},elementCache:{},getElWrapper:function(id){var oWrapper=this.elementCache[id];if(!oWrapper||!oWrapper.el){oWrapper=this.elementCache[id]=new this.ElementWrapper(YAHOO.util.Dom.get(id));}
return oWrapper;},getElement:function(id){return YAHOO.util.Dom.get(id);},getCss:function(id){var el=YAHOO.util.Dom.get(id);return(el)?el.style:null;},ElementWrapper:function(el){this.el=el||null;this.id=this.el&&el.id;this.css=this.el&&el.style;},getPosX:function(el){return YAHOO.util.Dom.getX(el);},getPosY:function(el){return YAHOO.util.Dom.getY(el);},swapNode:function(n1,n2){if(n1.swapNode){n1.swapNode(n2);}else{var p=n2.parentNode;var s=n2.nextSibling;if(s==n1){p.insertBefore(n1,n2);}else if(n2==n1.nextSibling){p.insertBefore(n2,n1);}else{n1.parentNode.replaceChild(n2,n1);p.insertBefore(n1,s);}}},getScroll:function(){var t,l,dde=document.documentElement,db=document.body;if(dde&&(dde.scrollTop||dde.scrollLeft)){t=dde.scrollTop;l=dde.scrollLeft;}else if(db){t=db.scrollTop;l=db.scrollLeft;}else{}
return{top:t,left:l};},getStyle:function(el,styleProp){return YAHOO.util.Dom.getStyle(el,styleProp);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(moveEl,targetEl){var aCoord=YAHOO.util.Dom.getXY(targetEl);YAHOO.util.Dom.setXY(moveEl,aCoord);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(a,b){return(a-b);},_timeoutCount:0,_addListeners:function(){var DDM=YAHOO.util.DDM;if(YAHOO.util.Event&&document){DDM._onLoad();}else{if(DDM._timeoutCount>2000){}else{setTimeout(DDM._addListeners,10);if(document&&document.body){DDM._timeoutCount+=1;}}}},handleWasClicked:function(node,id){if(this.isHandle(id,node.id)){return true;}else{var p=node.parentNode;while(p){if(this.isHandle(id,p.id)){return true;}else{p=p.parentNode;}}}
return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}
(function(){var Event=YAHOO.util.Event;var Dom=YAHOO.util.Dom;YAHOO.util.DragDrop=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.util.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,b4StartDrag:function(x,y){},startDrag:function(x,y){},b4Drag:function(e){},onDrag:function(e){},onDragEnter:function(e,id){},b4DragOver:function(e){},onDragOver:function(e,id){},b4DragOut:function(e){},onDragOut:function(e,id){},b4DragDrop:function(e){},onDragDrop:function(e,id){},onInvalidDrop:function(e){},b4EndDrag:function(e){},endDrag:function(e){},b4MouseDown:function(e){},onMouseDown:function(e){},onMouseUp:function(e){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=Dom.get(this.id);}
return this._domRef;},getDragEl:function(){return Dom.get(this.dragElId);},init:function(id,sGroup,config){this.initTarget(id,sGroup,config);Event.on(this.id,"mousedown",this.handleMouseDown,this,true);},initTarget:function(id,sGroup,config){this.config=config||{};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof id!=="string"){id=Dom.generateId(id);}
this.id=id;this.addToGroup((sGroup)?sGroup:"default");this.handleElId=id;Event.onAvailable(id,this.handleOnAvailable,this,true);this.setDragElId(id);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(iTop,iRight,iBot,iLeft){if(!iRight&&0!==iRight){this.padding=[iTop,iTop,iTop,iTop];}else if(!iBot&&0!==iBot){this.padding=[iTop,iRight,iTop,iRight];}else{this.padding=[iTop,iRight,iBot,iLeft];}},setInitPosition:function(diffX,diffY){var el=this.getEl();if(!this.DDM.verifyEl(el)){return;}
var dx=diffX||0;var dy=diffY||0;var p=Dom.getXY(el);this.initPageX=p[0]-dx;this.initPageY=p[1]-dy;this.lastPageX=p[0];this.lastPageY=p[1];this.setStartPosition(p);},setStartPosition:function(pos){var p=pos||Dom.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=p[0];this.startPageY=p[1];},addToGroup:function(sGroup){this.groups[sGroup]=true;this.DDM.regDragDrop(this,sGroup);},removeFromGroup:function(sGroup){if(this.groups[sGroup]){delete this.groups[sGroup];}
this.DDM.removeDDFromGroup(this,sGroup);},setDragElId:function(id){this.dragElId=id;},setHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.handleElId=id;this.DDM.regHandle(this.id,id);},setOuterHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
Event.on(id,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(id);this.hasOuterHandles=true;},unreg:function(){Event.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(e,oDD){var button=e.which||e.button;if(this.primaryButtonOnly&&button>1){return;}
if(this.isLocked()){return;}
this.b4MouseDown(e);this.onMouseDown(e);this.DDM.refreshCache(this.groups);var pt=new YAHOO.util.Point(Event.getPageX(e),Event.getPageY(e));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(pt,this)){}else{if(this.clickValidator(e)){this.setStartPosition();this.DDM.handleMouseDown(e,this);this.DDM.stopEvent(e);}else{}}},clickValidator:function(e){var target=Event.getTarget(e);return(this.isValidHandleChild(target)&&(this.id==this.handleElId||this.DDM.handleWasClicked(target,this.id)));},getTargetCoord:function(iPageX,iPageY){var x=iPageX-this.deltaX;var y=iPageY-this.deltaY;if(this.constrainX){if(x<this.minX){x=this.minX;}
if(x>this.maxX){x=this.maxX;}}
if(this.constrainY){if(y<this.minY){y=this.minY;}
if(y>this.maxY){y=this.maxY;}}
x=this.getTick(x,this.xTicks);y=this.getTick(y,this.yTicks);return{x:x,y:y};},addInvalidHandleType:function(tagName){var type=tagName.toUpperCase();this.invalidHandleTypes[type]=type;},addInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.invalidHandleIds[id]=id;},addInvalidHandleClass:function(cssClass){this.invalidHandleClasses.push(cssClass);},removeInvalidHandleType:function(tagName){var type=tagName.toUpperCase();delete this.invalidHandleTypes[type];},removeInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
delete this.invalidHandleIds[id];},removeInvalidHandleClass:function(cssClass){for(var i=0,len=this.invalidHandleClasses.length;i<len;++i){if(this.invalidHandleClasses[i]==cssClass){delete this.invalidHandleClasses[i];}}},isValidHandleChild:function(node){var valid=true;var nodeName;try{nodeName=node.nodeName.toUpperCase();}catch(e){nodeName=node.nodeName;}
valid=valid&&!this.invalidHandleTypes[nodeName];valid=valid&&!this.invalidHandleIds[node.id];for(var i=0,len=this.invalidHandleClasses.length;valid&&i<len;++i){valid=!Dom.hasClass(node,this.invalidHandleClasses[i]);}
return valid;},setXTicks:function(iStartX,iTickSize){this.xTicks=[];this.xTickSize=iTickSize;var tickMap={};for(var i=this.initPageX;i>=this.minX;i=i-iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageX;i<=this.maxX;i=i+iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(iStartY,iTickSize){this.yTicks=[];this.yTickSize=iTickSize;var tickMap={};for(var i=this.initPageY;i>=this.minY;i=i-iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageY;i<=this.maxY;i=i+iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(iLeft,iRight,iTickSize){this.leftConstraint=parseInt(iLeft,10);this.rightConstraint=parseInt(iRight,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(iTickSize){this.setXTicks(this.initPageX,iTickSize);}
this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(iUp,iDown,iTickSize){this.topConstraint=parseInt(iUp,10);this.bottomConstraint=parseInt(iDown,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(iTickSize){this.setYTicks(this.initPageY,iTickSize);}
this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var dx=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var dy=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(dx,dy);}else{this.setInitPosition();}
if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}
if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(val,tickArray){if(!tickArray){return val;}else if(tickArray[0]>=val){return tickArray[0];}else{for(var i=0,len=tickArray.length;i<len;++i){var next=i+1;if(tickArray[next]&&tickArray[next]>=val){var diff1=val-tickArray[i];var diff2=tickArray[next]-val;return(diff2>diff1)?tickArray[i]:tickArray[next];}}
return tickArray[tickArray.length-1];}},toString:function(){return("DragDrop "+this.id);}};})();YAHOO.util.DD=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(iPageX,iPageY){var x=iPageX-this.startPageX;var y=iPageY-this.startPageY;this.setDelta(x,y);},setDelta:function(iDeltaX,iDeltaY){this.deltaX=iDeltaX;this.deltaY=iDeltaY;},setDragElPos:function(iPageX,iPageY){var el=this.getDragEl();this.alignElWithMouse(el,iPageX,iPageY);},alignElWithMouse:function(el,iPageX,iPageY){var oCoord=this.getTargetCoord(iPageX,iPageY);if(!this.deltaSetXY){var aCoord=[oCoord.x,oCoord.y];YAHOO.util.Dom.setXY(el,aCoord);var newLeft=parseInt(YAHOO.util.Dom.getStyle(el,"left"),10);var newTop=parseInt(YAHOO.util.Dom.getStyle(el,"top"),10);this.deltaSetXY=[newLeft-oCoord.x,newTop-oCoord.y];}else{YAHOO.util.Dom.setStyle(el,"left",(oCoord.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(el,"top",(oCoord.y+this.deltaSetXY[1])+"px");}
this.cachePosition(oCoord.x,oCoord.y);this.autoScroll(oCoord.x,oCoord.y,el.offsetHeight,el.offsetWidth);},cachePosition:function(iPageX,iPageY){if(iPageX){this.lastPageX=iPageX;this.lastPageY=iPageY;}else{var aCoord=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=aCoord[0];this.lastPageY=aCoord[1];}},autoScroll:function(x,y,h,w){if(this.scroll){var clientH=this.DDM.getClientHeight();var clientW=this.DDM.getClientWidth();var st=this.DDM.getScrollTop();var sl=this.DDM.getScrollLeft();var bot=h+y;var right=w+x;var toBot=(clientH+st-y-this.deltaY);var toRight=(clientW+sl-x-this.deltaX);var thresh=40;var scrAmt=(document.all)?80:30;if(bot>clientH&&toBot<thresh){window.scrollTo(sl,st+scrAmt);}
if(y<st&&st>0&&y-st<thresh){window.scrollTo(sl,st-scrAmt);}
if(right>clientW&&toRight<thresh){window.scrollTo(sl+scrAmt,st);}
if(x<sl&&sl>0&&x-sl<thresh){window.scrollTo(sl-scrAmt,st);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(e){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},b4Drag:function(e){this.setDragElPos(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(id,sGroup,config){if(id){this.init(id,sGroup,config);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var self=this;var body=document.body;if(!body||!body.firstChild){setTimeout(function(){self.createFrame();},50);return;}
var div=this.getDragEl();if(!div){div=document.createElement("div");div.id=this.dragElId;var s=div.style;s.position="absolute";s.visibility="hidden";s.cursor="move";s.border="2px solid #aaa";s.zIndex=999;body.insertBefore(div,body.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(iPageX,iPageY){var el=this.getEl();var dragEl=this.getDragEl();var s=dragEl.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(s.width,10)/2),Math.round(parseInt(s.height,10)/2));}
this.setDragElPos(iPageX,iPageY);YAHOO.util.Dom.setStyle(dragEl,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var DOM=YAHOO.util.Dom;var el=this.getEl();var dragEl=this.getDragEl();var bt=parseInt(DOM.getStyle(dragEl,"borderTopWidth"),10);var br=parseInt(DOM.getStyle(dragEl,"borderRightWidth"),10);var bb=parseInt(DOM.getStyle(dragEl,"borderBottomWidth"),10);var bl=parseInt(DOM.getStyle(dragEl,"borderLeftWidth"),10);if(isNaN(bt)){bt=0;}
if(isNaN(br)){br=0;}
if(isNaN(bb)){bb=0;}
if(isNaN(bl)){bl=0;}
var newWidth=Math.max(0,el.offsetWidth-br-bl);var newHeight=Math.max(0,el.offsetHeight-bt-bb);DOM.setStyle(dragEl,"width",newWidth+"px");DOM.setStyle(dragEl,"height",newHeight+"px");}},b4MouseDown:function(e){this.setStartPosition();var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);this.autoOffset(x,y);this.setDragElPos(x,y);},b4StartDrag:function(x,y){this.showFrame(x,y);},b4EndDrag:function(e){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(e){var DOM=YAHOO.util.Dom;var lel=this.getEl();var del=this.getDragEl();DOM.setStyle(del,"visibility","");DOM.setStyle(lel,"visibility","hidden");YAHOO.util.DDM.moveToEl(lel,del);DOM.setStyle(del,"visibility","hidden");DOM.setStyle(lel,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(id,sGroup,config){if(id){this.initTarget(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.2.2",build:"204"});

/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.2.2
*/

YAHOO.util.Config=function(owner){if(owner){this.init(owner);}};YAHOO.util.Config.CONFIG_CHANGED_EVENT="configChanged";YAHOO.util.Config.BOOLEAN_TYPE="boolean";YAHOO.util.Config.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,checkBoolean:function(val){return(typeof val==YAHOO.util.Config.BOOLEAN_TYPE);},checkNumber:function(val){return(!isNaN(val));},fireEvent:function(key,value){var property=this.config[key];if(property&&property.event){property.event.fire(value);}},addProperty:function(key,propertyObject){key=key.toLowerCase();this.config[key]=propertyObject;propertyObject.event=new YAHOO.util.CustomEvent(key,this.owner);propertyObject.key=key;if(propertyObject.handler){propertyObject.event.subscribe(propertyObject.handler,this.owner);}
this.setProperty(key,propertyObject.value,true);if(!propertyObject.suppressEvent){this.queueProperty(key,propertyObject.value);}},getConfig:function(){var cfg={};for(var prop in this.config){var property=this.config[prop];if(property&&property.event){cfg[prop]=property.value;}}
return cfg;},getProperty:function(key){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.value;}else{return undefined;}},resetProperty:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event){if(this.initialConfig[key]&&!YAHOO.lang.isUndefined(this.initialConfig[key])){this.setProperty(key,this.initialConfig[key]);}
return true;}else{return false;}},setProperty:function(key,value,silent){key=key.toLowerCase();if(this.queueInProgress&&!silent){this.queueProperty(key,value);return true;}else{var property=this.config[key];if(property&&property.event){if(property.validator&&!property.validator(value)){return false;}else{property.value=value;if(!silent){this.fireEvent(key,value);this.configChangedEvent.fire([key,value]);}
return true;}}else{return false;}}},queueProperty:function(key,value){key=key.toLowerCase();var property=this.config[key];if(property&&property.event){if(!YAHOO.lang.isUndefined(value)&&property.validator&&!property.validator(value)){return false;}else{if(!YAHOO.lang.isUndefined(value)){property.value=value;}else{value=property.value;}
var foundDuplicate=false;var iLen=this.eventQueue.length;for(var i=0;i<iLen;i++){var queueItem=this.eventQueue[i];if(queueItem){var queueItemKey=queueItem[0];var queueItemValue=queueItem[1];if(queueItemKey==key){this.eventQueue[i]=null;this.eventQueue.push([key,(!YAHOO.lang.isUndefined(value)?value:queueItemValue)]);foundDuplicate=true;break;}}}
if(!foundDuplicate&&!YAHOO.lang.isUndefined(value)){this.eventQueue.push([key,value]);}}
if(property.supercedes){var sLen=property.supercedes.length;for(var s=0;s<sLen;s++){var supercedesCheck=property.supercedes[s];var qLen=this.eventQueue.length;for(var q=0;q<qLen;q++){var queueItemCheck=this.eventQueue[q];if(queueItemCheck){var queueItemCheckKey=queueItemCheck[0];var queueItemCheckValue=queueItemCheck[1];if(queueItemCheckKey==supercedesCheck.toLowerCase()){this.eventQueue.push([queueItemCheckKey,queueItemCheckValue]);this.eventQueue[q]=null;break;}}}}}
return true;}else{return false;}},refireEvent:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event&&!YAHOO.lang.isUndefined(property.value)){if(this.queueInProgress){this.queueProperty(key);}else{this.fireEvent(key,property.value);}}},applyConfig:function(userConfig,init){if(init){this.initialConfig=userConfig;}
for(var prop in userConfig){this.queueProperty(prop,userConfig[prop]);}},refresh:function(){for(var prop in this.config){this.refireEvent(prop);}},fireQueue:function(){this.queueInProgress=true;for(var i=0;i<this.eventQueue.length;i++){var queueItem=this.eventQueue[i];if(queueItem){var key=queueItem[0];var value=queueItem[1];var property=this.config[key];property.value=value;this.fireEvent(key,value);}}
this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(key,handler,obj,override){var property=this.config[key.toLowerCase()];if(property&&property.event){if(!YAHOO.util.Config.alreadySubscribed(property.event,handler,obj)){property.event.subscribe(handler,obj,override);}
return true;}else{return false;}},unsubscribeFromConfigEvent:function(key,handler,obj){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.event.unsubscribe(handler,obj);}else{return false;}},toString:function(){var output="Config";if(this.owner){output+=" ["+this.owner.toString()+"]";}
return output;},outputEventQueue:function(){var output="";for(var q=0;q<this.eventQueue.length;q++){var queueItem=this.eventQueue[q];if(queueItem){output+=queueItem[0]+"="+queueItem[1]+", ";}}
return output;}};YAHOO.util.Config.prototype.init=function(owner){this.owner=owner;this.configChangedEvent=new YAHOO.util.CustomEvent(YAHOO.util.CONFIG_CHANGED_EVENT,this);this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];};YAHOO.util.Config.alreadySubscribed=function(evt,fn,obj){for(var e=0;e<evt.subscribers.length;e++){var subsc=evt.subscribers[e];if(subsc&&subsc.obj==obj&&subsc.fn==fn){return true;}}
return false;};YAHOO.widget.Module=function(el,userConfig){if(el){this.init(el,userConfig);}else{}};YAHOO.widget.Module.IMG_ROOT=null;YAHOO.widget.Module.IMG_ROOT_SSL=null;YAHOO.widget.Module.CSS_MODULE="yui-module";YAHOO.widget.Module.CSS_HEADER="hd";YAHOO.widget.Module.CSS_BODY="bd";YAHOO.widget.Module.CSS_FOOTER="ft";YAHOO.widget.Module.RESIZE_MONITOR_SECURE_URL="javascript:false;";YAHOO.widget.Module.textResizeEvent=new YAHOO.util.CustomEvent("textResize");YAHOO.widget.Module._EVENT_TYPES={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"};YAHOO.widget.Module._DEFAULT_CONFIG={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true}};YAHOO.widget.Module.prototype={constructor:YAHOO.widget.Module,element:null,header:null,body:null,footer:null,id:null,imageRoot:YAHOO.widget.Module.IMG_ROOT,initEvents:function(){var EVENT_TYPES=YAHOO.widget.Module._EVENT_TYPES;this.beforeInitEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_INIT,this);this.initEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.INIT,this);this.appendEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.APPEND,this);this.beforeRenderEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_RENDER,this);this.renderEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.RENDER,this);this.changeHeaderEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.CHANGE_HEADER,this);this.changeBodyEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.CHANGE_BODY,this);this.changeFooterEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.CHANGE_FOOTER,this);this.changeContentEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.CHANGE_CONTENT,this);this.destroyEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.DESTORY,this);this.beforeShowEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_SHOW,this);this.showEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.SHOW,this);this.beforeHideEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_HIDE,this);this.hideEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.HIDE,this);},platform:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1){return"windows";}else if(ua.indexOf("macintosh")!=-1){return"mac";}else{return false;}}(),browser:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf('opera')!=-1){return'opera';}else if(ua.indexOf('msie 7')!=-1){return'ie7';}else if(ua.indexOf('msie')!=-1){return'ie';}else if(ua.indexOf('safari')!=-1){return'safari';}else if(ua.indexOf('gecko')!=-1){return'gecko';}else{return false;}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){var DEFAULT_CONFIG=YAHOO.widget.Module._DEFAULT_CONFIG;this.cfg.addProperty(DEFAULT_CONFIG.VISIBLE.key,{handler:this.configVisible,value:DEFAULT_CONFIG.VISIBLE.value,validator:DEFAULT_CONFIG.VISIBLE.validator});this.cfg.addProperty(DEFAULT_CONFIG.EFFECT.key,{suppressEvent:DEFAULT_CONFIG.EFFECT.suppressEvent,supercedes:DEFAULT_CONFIG.EFFECT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:DEFAULT_CONFIG.MONITOR_RESIZE.value});},init:function(el,userConfig){this.initEvents();this.beforeInitEvent.fire(YAHOO.widget.Module);this.cfg=new YAHOO.util.Config(this);if(this.isSecure){this.imageRoot=YAHOO.widget.Module.IMG_ROOT_SSL;}
if(typeof el=="string"){var elId=el;el=document.getElementById(el);if(!el){el=document.createElement("div");el.id=elId;}}
this.element=el;if(el.id){this.id=el.id;}
var childNodes=this.element.childNodes;if(childNodes){for(var i=0;i<childNodes.length;i++){var child=childNodes[i];switch(child.className){case YAHOO.widget.Module.CSS_HEADER:this.header=child;break;case YAHOO.widget.Module.CSS_BODY:this.body=child;break;case YAHOO.widget.Module.CSS_FOOTER:this.footer=child;break;}}}
this.initDefaultConfig();YAHOO.util.Dom.addClass(this.element,YAHOO.widget.Module.CSS_MODULE);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}
this.initEvent.fire(YAHOO.widget.Module);},initResizeMonitor:function(){if(this.browser!="opera"){var resizeMonitor=document.getElementById("_yuiResizeMonitor");if(!resizeMonitor){resizeMonitor=document.createElement("iframe");var bIE=(this.browser.indexOf("ie")===0);if(this.isSecure&&YAHOO.widget.Module.RESIZE_MONITOR_SECURE_URL&&bIE){resizeMonitor.src=YAHOO.widget.Module.RESIZE_MONITOR_SECURE_URL;}
resizeMonitor.id="_yuiResizeMonitor";resizeMonitor.style.visibility="hidden";document.body.appendChild(resizeMonitor);resizeMonitor.style.width="10em";resizeMonitor.style.height="10em";resizeMonitor.style.position="absolute";var nLeft=-1*resizeMonitor.offsetWidth;var nTop=-1*resizeMonitor.offsetHeight;resizeMonitor.style.top=nTop+"px";resizeMonitor.style.left=nLeft+"px";resizeMonitor.style.borderStyle="none";resizeMonitor.style.borderWidth="0";YAHOO.util.Dom.setStyle(resizeMonitor,"opacity","0");resizeMonitor.style.visibility="visible";if(!bIE){var doc=resizeMonitor.contentWindow.document;doc.open();doc.close();}}
var fireTextResize=function(){YAHOO.widget.Module.textResizeEvent.fire();};if(resizeMonitor&&resizeMonitor.contentWindow){this.resizeMonitor=resizeMonitor;YAHOO.widget.Module.textResizeEvent.subscribe(this.onDomResize,this,true);if(!YAHOO.widget.Module.textResizeInitialized){if(!YAHOO.util.Event.addListener(this.resizeMonitor.contentWindow,"resize",fireTextResize)){YAHOO.util.Event.addListener(this.resizeMonitor,"resize",fireTextResize);}
YAHOO.widget.Module.textResizeInitialized=true;}}}},onDomResize:function(e,obj){var nLeft=-1*this.resizeMonitor.offsetWidth,nTop=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=nTop+"px";this.resizeMonitor.style.left=nLeft+"px";},setHeader:function(headerContent){if(!this.header){this.header=document.createElement("div");this.header.className=YAHOO.widget.Module.CSS_HEADER;}
if(typeof headerContent=="string"){this.header.innerHTML=headerContent;}else{this.header.innerHTML="";this.header.appendChild(headerContent);}
this.changeHeaderEvent.fire(headerContent);this.changeContentEvent.fire();},appendToHeader:function(element){if(!this.header){this.header=document.createElement("div");this.header.className=YAHOO.widget.Module.CSS_HEADER;}
this.header.appendChild(element);this.changeHeaderEvent.fire(element);this.changeContentEvent.fire();},setBody:function(bodyContent){if(!this.body){this.body=document.createElement("div");this.body.className=YAHOO.widget.Module.CSS_BODY;}
if(typeof bodyContent=="string")
{this.body.innerHTML=bodyContent;}else{this.body.innerHTML="";this.body.appendChild(bodyContent);}
this.changeBodyEvent.fire(bodyContent);this.changeContentEvent.fire();},appendToBody:function(element){if(!this.body){this.body=document.createElement("div");this.body.className=YAHOO.widget.Module.CSS_BODY;}
this.body.appendChild(element);this.changeBodyEvent.fire(element);this.changeContentEvent.fire();},setFooter:function(footerContent){if(!this.footer){this.footer=document.createElement("div");this.footer.className=YAHOO.widget.Module.CSS_FOOTER;}
if(typeof footerContent=="string"){this.footer.innerHTML=footerContent;}else{this.footer.innerHTML="";this.footer.appendChild(footerContent);}
this.changeFooterEvent.fire(footerContent);this.changeContentEvent.fire();},appendToFooter:function(element){if(!this.footer){this.footer=document.createElement("div");this.footer.className=YAHOO.widget.Module.CSS_FOOTER;}
this.footer.appendChild(element);this.changeFooterEvent.fire(element);this.changeContentEvent.fire();},render:function(appendToNode,moduleElement){this.beforeRenderEvent.fire();if(!moduleElement){moduleElement=this.element;}
var me=this;var appendTo=function(element){if(typeof element=="string"){element=document.getElementById(element);}
if(element){element.appendChild(me.element);me.appendEvent.fire();}};if(appendToNode){appendTo(appendToNode);}else{if(!YAHOO.util.Dom.inDocument(this.element)){return false;}}
if(this.header&&!YAHOO.util.Dom.inDocument(this.header)){var firstChild=moduleElement.firstChild;if(firstChild){moduleElement.insertBefore(this.header,firstChild);}else{moduleElement.appendChild(this.header);}}
if(this.body&&!YAHOO.util.Dom.inDocument(this.body)){if(this.footer&&YAHOO.util.Dom.isAncestor(this.moduleElement,this.footer)){moduleElement.insertBefore(this.body,this.footer);}else{moduleElement.appendChild(this.body);}}
if(this.footer&&!YAHOO.util.Dom.inDocument(this.footer)){moduleElement.appendChild(this.footer);}
this.renderEvent.fire();return true;},destroy:function(){var parent;if(this.element){YAHOO.util.Event.purgeElement(this.element,true);parent=this.element.parentNode;}
if(parent){parent.removeChild(this.element);}
this.element=null;this.header=null;this.body=null;this.footer=null;for(var e in this){if(e instanceof YAHOO.util.CustomEvent){e.unsubscribeAll();}}
YAHOO.widget.Module.textResizeEvent.unsubscribe(this.onDomResize,this);this.destroyEvent.fire();},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(type,args,obj){var visible=args[0];if(visible){this.beforeShowEvent.fire();YAHOO.util.Dom.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();YAHOO.util.Dom.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(type,args,obj){var monitor=args[0];if(monitor){this.initResizeMonitor();}else{YAHOO.widget.Module.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}}};YAHOO.widget.Module.prototype.toString=function(){return"Module "+this.id;};YAHOO.widget.Overlay=function(el,userConfig){YAHOO.widget.Overlay.superclass.constructor.call(this,el,userConfig);};YAHOO.extend(YAHOO.widget.Overlay,YAHOO.widget.Module);YAHOO.widget.Overlay._EVENT_TYPES={"BEFORE_MOVE":"beforeMove","MOVE":"move"};YAHOO.widget.Overlay._DEFAULT_CONFIG={"X":{key:"x",validator:YAHOO.lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:YAHOO.lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:YAHOO.lang.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:YAHOO.lang.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.widget.Module.prototype.browser=="ie"?true:false),validator:YAHOO.lang.isBoolean,supercedes:["zIndex"]}};YAHOO.widget.Overlay.IFRAME_SRC="javascript:false;";YAHOO.widget.Overlay.TOP_LEFT="tl";YAHOO.widget.Overlay.TOP_RIGHT="tr";YAHOO.widget.Overlay.BOTTOM_LEFT="bl";YAHOO.widget.Overlay.BOTTOM_RIGHT="br";YAHOO.widget.Overlay.CSS_OVERLAY="yui-overlay";YAHOO.widget.Overlay.prototype.init=function(el,userConfig){YAHOO.widget.Overlay.superclass.init.call(this,el);this.beforeInitEvent.fire(YAHOO.widget.Overlay);YAHOO.util.Dom.addClass(this.element,YAHOO.widget.Overlay.CSS_OVERLAY);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(this.platform=="mac"&&this.browser=="gecko"){if(!YAHOO.util.Config.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}
this.initEvent.fire(YAHOO.widget.Overlay);};YAHOO.widget.Overlay.prototype.initEvents=function(){YAHOO.widget.Overlay.superclass.initEvents.call(this);var EVENT_TYPES=YAHOO.widget.Overlay._EVENT_TYPES;this.beforeMoveEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.BEFORE_MOVE,this);this.moveEvent=new YAHOO.util.CustomEvent(EVENT_TYPES.MOVE,this);};YAHOO.widget.Overlay.prototype.initDefaultConfig=function(){YAHOO.widget.Overlay.superclass.initDefaultConfig.call(this);var DEFAULT_CONFIG=YAHOO.widget.Overlay._DEFAULT_CONFIG;this.cfg.addProperty(DEFAULT_CONFIG.X.key,{handler:this.configX,validator:DEFAULT_CONFIG.X.validator,suppressEvent:DEFAULT_CONFIG.X.suppressEvent,supercedes:DEFAULT_CONFIG.X.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.Y.key,{handler:this.configY,validator:DEFAULT_CONFIG.Y.validator,suppressEvent:DEFAULT_CONFIG.Y.suppressEvent,supercedes:DEFAULT_CONFIG.Y.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.XY.key,{handler:this.configXY,suppressEvent:DEFAULT_CONFIG.XY.suppressEvent,supercedes:DEFAULT_CONFIG.XY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.CONTEXT.key,{handler:this.configContext,suppressEvent:DEFAULT_CONFIG.CONTEXT.suppressEvent,supercedes:DEFAULT_CONFIG.CONTEXT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.FIXED_CENTER.key,{handler:this.configFixedCenter,value:DEFAULT_CONFIG.FIXED_CENTER.value,validator:DEFAULT_CONFIG.FIXED_CENTER.validator,supercedes:DEFAULT_CONFIG.FIXED_CENTER.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.WIDTH.key,{handler:this.configWidth,suppressEvent:DEFAULT_CONFIG.WIDTH.suppressEvent,supercedes:DEFAULT_CONFIG.WIDTH.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.HEIGHT.key,{handler:this.configHeight,suppressEvent:DEFAULT_CONFIG.HEIGHT.suppressEvent,supercedes:DEFAULT_CONFIG.HEIGHT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.ZINDEX.key,{handler:this.configzIndex,value:DEFAULT_CONFIG.ZINDEX.value});this.cfg.addProperty(DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.value,validator:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.validator,supercedes:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.IFRAME.key,{handler:this.configIframe,value:DEFAULT_CONFIG.IFRAME.value,validator:DEFAULT_CONFIG.IFRAME.validator,supercedes:DEFAULT_CONFIG.IFRAME.supercedes});};YAHOO.widget.Overlay.prototype.moveTo=function(x,y){this.cfg.setProperty("xy",[x,y]);};YAHOO.widget.Overlay.prototype.hideMacGeckoScrollbars=function(){YAHOO.util.Dom.removeClass(this.element,"show-scrollbars");YAHOO.util.Dom.addClass(this.element,"hide-scrollbars");};YAHOO.widget.Overlay.prototype.showMacGeckoScrollbars=function(){YAHOO.util.Dom.removeClass(this.element,"hide-scrollbars");YAHOO.util.Dom.addClass(this.element,"show-scrollbars");};YAHOO.widget.Overlay.prototype.configVisible=function(type,args,obj){var visible=args[0];var currentVis=YAHOO.util.Dom.getStyle(this.element,"visibility");if(currentVis=="inherit"){var e=this.element.parentNode;while(e.nodeType!=9&&e.nodeType!=11){currentVis=YAHOO.util.Dom.getStyle(e,"visibility");if(currentVis!="inherit"){break;}
e=e.parentNode;}
if(currentVis=="inherit"){currentVis="visible";}}
var effect=this.cfg.getProperty("effect");var effectInstances=[];if(effect){if(effect instanceof Array){for(var i=0;i<effect.length;i++){var eff=effect[i];effectInstances[effectInstances.length]=eff.effect(this,eff.duration);}}else{effectInstances[effectInstances.length]=effect.effect(this,effect.duration);}}
var isMacGecko=(this.platform=="mac"&&this.browser=="gecko");if(visible){if(isMacGecko){this.showMacGeckoScrollbars();}
if(effect){if(visible){if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();for(var j=0;j<effectInstances.length;j++){var ei=effectInstances[j];if(j===0&&!YAHOO.util.Config.alreadySubscribed(ei.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){ei.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}
ei.animateIn();}}}}else{if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();YAHOO.util.Dom.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(isMacGecko){this.hideMacGeckoScrollbars();}
if(effect){if(currentVis=="visible"){this.beforeHideEvent.fire();for(var k=0;k<effectInstances.length;k++){var h=effectInstances[k];if(k===0&&!YAHOO.util.Config.alreadySubscribed(h.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){h.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}
h.animateOut();}}else if(currentVis===""){YAHOO.util.Dom.setStyle(this.element,"visibility","hidden");}}else{if(currentVis=="visible"||currentVis===""){this.beforeHideEvent.fire();YAHOO.util.Dom.setStyle(this.element,"visibility","hidden");this.cfg.refireEvent("iframe");this.hideEvent.fire();}}}};YAHOO.widget.Overlay.prototype.doCenterOnDOMEvent=function(){if(this.cfg.getProperty("visible")){this.center();}};YAHOO.widget.Overlay.prototype.configFixedCenter=function(type,args,obj){var val=args[0];if(val){this.center();if(!YAHOO.util.Config.alreadySubscribed(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(YAHOO.widget.Overlay.windowResizeEvent,this.doCenterOnDOMEvent,this)){YAHOO.widget.Overlay.windowResizeEvent.subscribe(this.doCenterOnDOMEvent,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(YAHOO.widget.Overlay.windowScrollEvent,this.doCenterOnDOMEvent,this)){YAHOO.widget.Overlay.windowScrollEvent.subscribe(this.doCenterOnDOMEvent,this,true);}}else{YAHOO.widget.Overlay.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);YAHOO.widget.Overlay.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);}};YAHOO.widget.Overlay.prototype.configHeight=function(type,args,obj){var height=args[0];var el=this.element;YAHOO.util.Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.configWidth=function(type,args,obj){var width=args[0];var el=this.element;YAHOO.util.Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.configzIndex=function(type,args,obj){var zIndex=args[0];var el=this.element;if(!zIndex){zIndex=YAHOO.util.Dom.getStyle(el,"zIndex");if(!zIndex||isNaN(zIndex)){zIndex=0;}}
if(this.iframe){if(zIndex<=0){zIndex=1;}
YAHOO.util.Dom.setStyle(this.iframe,"zIndex",(zIndex-1));}
YAHOO.util.Dom.setStyle(el,"zIndex",zIndex);this.cfg.setProperty("zIndex",zIndex,true);};YAHOO.widget.Overlay.prototype.configXY=function(type,args,obj){var pos=args[0];var x=pos[0];var y=pos[1];this.cfg.setProperty("x",x);this.cfg.setProperty("y",y);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);};YAHOO.widget.Overlay.prototype.configX=function(type,args,obj){var x=args[0];var y=this.cfg.getProperty("y");this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");YAHOO.util.Dom.setX(this.element,x,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);};YAHOO.widget.Overlay.prototype.configY=function(type,args,obj){var x=this.cfg.getProperty("x");var y=args[0];this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");YAHOO.util.Dom.setY(this.element,y,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);};YAHOO.widget.Overlay.prototype.showIframe=function(){if(this.iframe){this.iframe.style.display="block";}};YAHOO.widget.Overlay.prototype.hideIframe=function(){if(this.iframe){this.iframe.style.display="none";}};YAHOO.widget.Overlay.prototype.configIframe=function(type,args,obj){var val=args[0];if(val){if(!YAHOO.util.Config.alreadySubscribed(this.showEvent,this.showIframe,this)){this.showEvent.subscribe(this.showIframe,this,true);}
if(!YAHOO.util.Config.alreadySubscribed(this.hideEvent,this.hideIframe,this)){this.hideEvent.subscribe(this.hideIframe,this,true);}
var x=this.cfg.getProperty("x");var y=this.cfg.getProperty("y");if(!x||!y){this.syncPosition();x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");}
if(!isNaN(x)&&!isNaN(y)){if(!this.iframe){this.iframe=document.createElement("iframe");if(this.isSecure){this.iframe.src=YAHOO.widget.Overlay.IFRAME_SRC;}
var parent=this.element.parentNode;if(parent){parent.appendChild(this.iframe);}else{document.body.appendChild(this.iframe);}
YAHOO.util.Dom.setStyle(this.iframe,"position","absolute");YAHOO.util.Dom.setStyle(this.iframe,"border","none");YAHOO.util.Dom.setStyle(this.iframe,"margin","0");YAHOO.util.Dom.setStyle(this.iframe,"padding","0");YAHOO.util.Dom.setStyle(this.iframe,"opacity","0");if(this.cfg.getProperty("visible")){this.showIframe();}else{this.hideIframe();}}
var iframeDisplay=YAHOO.util.Dom.getStyle(this.iframe,"display");if(iframeDisplay=="none"){this.iframe.style.display="block";}
YAHOO.util.Dom.setXY(this.iframe,[x,y]);var width=this.element.clientWidth;var height=this.element.clientHeight;YAHOO.util.Dom.setStyle(this.iframe,"width",(width+2)+"px");YAHOO.util.Dom.setStyle(this.iframe,"height",(height+2)+"px");if(iframeDisplay=="none"){this.iframe.style.display="none";}}}else{if(this.iframe){this.iframe.style.display="none";}
this.showEvent.unsubscribe(this.showIframe,this);this.hideEvent.unsubscribe(this.hideIframe,this);}};YAHOO.widget.Overlay.prototype.configConstrainToViewport=function(type,args,obj){var val=args[0];if(val){if(!YAHOO.util.Config.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}}else{this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}};YAHOO.widget.Overlay.prototype.configContext=function(type,args,obj){var contextArgs=args[0];if(contextArgs){var contextEl=contextArgs[0];var elementMagnetCorner=contextArgs[1];var contextMagnetCorner=contextArgs[2];if(contextEl){if(typeof contextEl=="string"){this.cfg.setProperty("context",[document.getElementById(contextEl),elementMagnetCorner,contextMagnetCorner],true);}
if(elementMagnetCorner&&contextMagnetCorner){this.align(elementMagnetCorner,contextMagnetCorner);}}}};YAHOO.widget.Overlay.prototype.align=function(elementAlign,contextAlign){var contextArgs=this.cfg.getProperty("context");if(contextArgs){var context=contextArgs[0];var element=this.element;var me=this;if(!elementAlign){elementAlign=contextArgs[1];}
if(!contextAlign){contextAlign=contextArgs[2];}
if(element&&context){var contextRegion=YAHOO.util.Dom.getRegion(context);var doAlign=function(v,h){switch(elementAlign){case YAHOO.widget.Overlay.TOP_LEFT:me.moveTo(h,v);break;case YAHOO.widget.Overlay.TOP_RIGHT:me.moveTo(h-element.offsetWidth,v);break;case YAHOO.widget.Overlay.BOTTOM_LEFT:me.moveTo(h,v-element.offsetHeight);break;case YAHOO.widget.Overlay.BOTTOM_RIGHT:me.moveTo(h-element.offsetWidth,v-element.offsetHeight);break;}};switch(contextAlign){case YAHOO.widget.Overlay.TOP_LEFT:doAlign(contextRegion.top,contextRegion.left);break;case YAHOO.widget.Overlay.TOP_RIGHT:doAlign(contextRegion.top,contextRegion.right);break;case YAHOO.widget.Overlay.BOTTOM_LEFT:doAlign(contextRegion.bottom,contextRegion.left);break;case YAHOO.widget.Overlay.BOTTOM_RIGHT:doAlign(contextRegion.bottom,contextRegion.right);break;}}}};YAHOO.widget.Overlay.prototype.enforceConstraints=function(type,args,obj){var pos=args[0];var x=pos[0];var y=pos[1];var offsetHeight=this.element.offsetHeight;var offsetWidth=this.element.offsetWidth;var viewPortWidth=YAHOO.util.Dom.getViewportWidth();var viewPortHeight=YAHOO.util.Dom.getViewportHeight();var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;var topConstraint=scrollY+10;var leftConstraint=scrollX+10;var bottomConstraint=scrollY+viewPortHeight-offsetHeight-10;var rightConstraint=scrollX+viewPortWidth-offsetWidth-10;if(x<leftConstraint){x=leftConstraint;}else if(x>rightConstraint){x=rightConstraint;}
if(y<topConstraint){y=topConstraint;}else if(y>bottomConstraint){y=bottomConstraint;}
this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.cfg.setProperty("xy",[x,y],true);};YAHOO.widget.Overlay.prototype.center=function(){var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;var viewPortWidth=YAHOO.util.Dom.getClientWidth();var viewPortHeight=YAHOO.util.Dom.getClientHeight();var elementWidth=this.element.offsetWidth;var elementHeight=this.element.offsetHeight;var x=(viewPortWidth/2)-(elementWidth/2)+scrollX;var y=(viewPortHeight/2)-(elementHeight/2)+scrollY;this.cfg.setProperty("xy",[parseInt(x,10),parseInt(y,10)]);this.cfg.refireEvent("iframe");};YAHOO.widget.Overlay.prototype.syncPosition=function(){var pos=YAHOO.util.Dom.getXY(this.element);this.cfg.setProperty("x",pos[0],true);this.cfg.setProperty("y",pos[1],true);this.cfg.setProperty("xy",pos,true);};YAHOO.widget.Overlay.prototype.onDomResize=function(e,obj){YAHOO.widget.Overlay.superclass.onDomResize.call(this,e,obj);var me=this;setTimeout(function(){me.syncPosition();me.cfg.refireEvent("iframe");me.cfg.refireEvent("context");},0);};YAHOO.widget.Overlay.prototype.destroy=function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}
this.iframe=null;YAHOO.widget.Overlay.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);YAHOO.widget.Overlay.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);YAHOO.widget.Overlay.superclass.destroy.call(this);};YAHOO.widget.Overlay.prototype.toString=function(){return"Overlay "+this.id;};YAHOO.widget.Overlay.windowScrollEvent=new YAHOO.util.CustomEvent("windowScroll");YAHOO.widget.Overlay.windowResizeEvent=new YAHOO.util.CustomEvent("windowResize");YAHOO.widget.Overlay.windowScrollHandler=function(e){if(YAHOO.widget.Module.prototype.browser=="ie"||YAHOO.widget.Module.prototype.browser=="ie7"){if(!window.scrollEnd){window.scrollEnd=-1;}
clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){YAHOO.widget.Overlay.windowScrollEvent.fire();},1);}else{YAHOO.widget.Overlay.windowScrollEvent.fire();}};YAHOO.widget.Overlay.windowResizeHandler=function(e){if(YAHOO.widget.Module.prototype.browser=="ie"||YAHOO.widget.Module.prototype.browser=="ie7"){if(!window.resizeEnd){window.resizeEnd=-1;}
clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){YAHOO.widget.Overlay.windowResizeEvent.fire();},100);}else{YAHOO.widget.Overlay.windowResizeEvent.fire();}};YAHOO.widget.Overlay._initialized=null;if(YAHOO.widget.Overlay._initialized===null){YAHOO.util.Event.addListener(window,"scroll",YAHOO.widget.Overlay.windowScrollHandler);YAHOO.util.Event.addListener(window,"resize",YAHOO.widget.Overlay.windowResizeHandler);YAHOO.widget.Overlay._initialized=true;}
YAHOO.widget.OverlayManager=function(userConfig){this.init(userConfig);};YAHOO.widget.OverlayManager.CSS_FOCUSED="focused";YAHOO.widget.OverlayManager.prototype={constructor:YAHOO.widget.OverlayManager,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(userConfig){this.cfg=new YAHOO.util.Config(this);this.initDefaultConfig();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.fireQueue();var activeOverlay=null;this.getActive=function(){return activeOverlay;};this.focus=function(overlay){var o=this.find(overlay);if(o){if(activeOverlay!=o){if(activeOverlay){activeOverlay.blur();}
activeOverlay=o;YAHOO.util.Dom.addClass(activeOverlay.element,YAHOO.widget.OverlayManager.CSS_FOCUSED);this.overlays.sort(this.compareZIndexDesc);var topZIndex=YAHOO.util.Dom.getStyle(this.overlays[0].element,"zIndex");if(!isNaN(topZIndex)&&this.overlays[0]!=overlay){activeOverlay.cfg.setProperty("zIndex",(parseInt(topZIndex,10)+2));}
this.overlays.sort(this.compareZIndexDesc);o.focusEvent.fire();}}};this.remove=function(overlay){var o=this.find(overlay);if(o){var originalZ=YAHOO.util.Dom.getStyle(o.element,"zIndex");o.cfg.setProperty("zIndex",-1000,true);this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,this.overlays.length-1);o.hideEvent.unsubscribe(o.blur);o.destroyEvent.unsubscribe(this._onOverlayDestroy,o);if(o.element){YAHOO.util.Event.removeListener(o.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);}
o.cfg.setProperty("zIndex",originalZ,true);o.cfg.setProperty("manager",null);o.focusEvent.unsubscribeAll();o.blurEvent.unsubscribeAll();o.focusEvent=null;o.blurEvent=null;o.focus=null;o.blur=null;}};this.blurAll=function(){for(var o=0;o<this.overlays.length;o++){this.overlays[o].blur();}};this._onOverlayBlur=function(p_sType,p_aArgs){activeOverlay=null;};var overlays=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}
if(overlays){this.register(overlays);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(p_oEvent){var oTarget=YAHOO.util.Event.getTarget(p_oEvent),oClose=this.close;if(oClose&&(oTarget==oClose||YAHOO.util.Dom.isAncestor(oClose,oTarget))){this.blur();}
else{this.focus();}},_onOverlayDestroy:function(p_sType,p_aArgs,p_oOverlay){this.remove(p_oOverlay);},register:function(overlay){if(overlay instanceof YAHOO.widget.Overlay){overlay.cfg.addProperty("manager",{value:this});overlay.focusEvent=new YAHOO.util.CustomEvent("focus",overlay);overlay.blurEvent=new YAHOO.util.CustomEvent("blur",overlay);var mgr=this;overlay.focus=function(){mgr.focus(this);};overlay.blur=function(){if(mgr.getActive()==this){YAHOO.util.Dom.removeClass(this.element,YAHOO.widget.OverlayManager.CSS_FOCUSED);this.blurEvent.fire();}};overlay.blurEvent.subscribe(mgr._onOverlayBlur);overlay.hideEvent.subscribe(overlay.blur);overlay.destroyEvent.subscribe(this._onOverlayDestroy,overlay,this);YAHOO.util.Event.addListener(overlay.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,overlay);var zIndex=YAHOO.util.Dom.getStyle(overlay.element,"zIndex");if(!isNaN(zIndex)){overlay.cfg.setProperty("zIndex",parseInt(zIndex,10));}else{overlay.cfg.setProperty("zIndex",0);}
this.overlays.push(overlay);return true;}else if(overlay instanceof Array){var regcount=0;for(var i=0;i<overlay.length;i++){if(this.register(overlay[i])){regcount++;}}
if(regcount>0){return true;}}else{return false;}},find:function(overlay){if(overlay instanceof YAHOO.widget.Overlay){for(var o=0;o<this.overlays.length;o++){if(this.overlays[o]==overlay){return this.overlays[o];}}}else if(typeof overlay=="string"){for(var p=0;p<this.overlays.length;p++){if(this.overlays[p].id==overlay){return this.overlays[p];}}}
return null;},compareZIndexDesc:function(o1,o2){var zIndex1=o1.cfg.getProperty("zIndex");var zIndex2=o2.cfg.getProperty("zIndex");if(zIndex1>zIndex2){return-1;}else if(zIndex1<zIndex2){return 1;}else{return 0;}},showAll:function(){for(var o=0;o<this.overlays.length;o++){this.overlays[o].show();}},hideAll:function(){for(var o=0;o<this.overlays.length;o++){this.overlays[o].hide();}},toString:function(){return"OverlayManager";}};YAHOO.widget.ContainerEffect=function(overlay,attrIn,attrOut,targetElement,animClass){if(!animClass){animClass=YAHOO.util.Anim;}
this.overlay=overlay;this.attrIn=attrIn;this.attrOut=attrOut;this.targetElement=targetElement||overlay.element;this.animClass=animClass;};YAHOO.widget.ContainerEffect.prototype.init=function(){this.beforeAnimateInEvent=new YAHOO.util.CustomEvent("beforeAnimateIn",this);this.beforeAnimateOutEvent=new YAHOO.util.CustomEvent("beforeAnimateOut",this);this.animateInCompleteEvent=new YAHOO.util.CustomEvent("animateInComplete",this);this.animateOutCompleteEvent=new YAHOO.util.CustomEvent("animateOutComplete",this);this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);};YAHOO.widget.ContainerEffect.prototype.animateIn=function(){this.beforeAnimateInEvent.fire();this.animIn.animate();};YAHOO.widget.ContainerEffect.prototype.animateOut=function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();};YAHOO.widget.ContainerEffect.prototype.handleStartAnimateIn=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleTweenAnimateIn=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleCompleteAnimateIn=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleStartAnimateOut=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleTweenAnimateOut=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.handleCompleteAnimateOut=function(type,args,obj){};YAHOO.widget.ContainerEffect.prototype.toString=function(){var output="ContainerEffect";if(this.overlay){output+=" ["+this.overlay.toString()+"]";}
return output;};YAHOO.widget.ContainerEffect.FADE=function(overlay,dur){var fade=new YAHOO.widget.ContainerEffect(overlay,{attributes:{opacity:{from:0,to:1}},duration:dur,method:YAHOO.util.Easing.easeIn},{attributes:{opacity:{to:0}},duration:dur,method:YAHOO.util.Easing.easeOut},overlay.element);fade.handleStartAnimateIn=function(type,args,obj){YAHOO.util.Dom.addClass(obj.overlay.element,"hide-select");if(!obj.overlay.underlay){obj.overlay.cfg.refireEvent("underlay");}
if(obj.overlay.underlay){obj.initialUnderlayOpacity=YAHOO.util.Dom.getStyle(obj.overlay.underlay,"opacity");obj.overlay.underlay.style.filter=null;}
YAHOO.util.Dom.setStyle(obj.overlay.element,"visibility","visible");YAHOO.util.Dom.setStyle(obj.overlay.element,"opacity",0);};fade.handleCompleteAnimateIn=function(type,args,obj){YAHOO.util.Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
if(obj.overlay.underlay){YAHOO.util.Dom.setStyle(obj.overlay.underlay,"opacity",obj.initialUnderlayOpacity);}
obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};fade.handleStartAnimateOut=function(type,args,obj){YAHOO.util.Dom.addClass(obj.overlay.element,"hide-select");if(obj.overlay.underlay){obj.overlay.underlay.style.filter=null;}};fade.handleCompleteAnimateOut=function(type,args,obj){YAHOO.util.Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
YAHOO.util.Dom.setStyle(obj.overlay.element,"visibility","hidden");YAHOO.util.Dom.setStyle(obj.overlay.element,"opacity",1);obj.overlay.cfg.refireEvent("iframe");obj.animateOutCompleteEvent.fire();};fade.init();return fade;};YAHOO.widget.ContainerEffect.SLIDE=function(overlay,dur){var x=overlay.cfg.getProperty("x")||YAHOO.util.Dom.getX(overlay.element);var y=overlay.cfg.getProperty("y")||YAHOO.util.Dom.getY(overlay.element);var clientWidth=YAHOO.util.Dom.getClientWidth();var offsetWidth=overlay.element.offsetWidth;var slide=new YAHOO.widget.ContainerEffect(overlay,{attributes:{points:{to:[x,y]}},duration:dur,method:YAHOO.util.Easing.easeIn},{attributes:{points:{to:[(clientWidth+25),y]}},duration:dur,method:YAHOO.util.Easing.easeOut},overlay.element,YAHOO.util.Motion);slide.handleStartAnimateIn=function(type,args,obj){obj.overlay.element.style.left=(-25-offsetWidth)+"px";obj.overlay.element.style.top=y+"px";};slide.handleTweenAnimateIn=function(type,args,obj){var pos=YAHOO.util.Dom.getXY(obj.overlay.element);var currentX=pos[0];var currentY=pos[1];if(YAHOO.util.Dom.getStyle(obj.overlay.element,"visibility")=="hidden"&&currentX<x){YAHOO.util.Dom.setStyle(obj.overlay.element,"visibility","visible");}
obj.overlay.cfg.setProperty("xy",[currentX,currentY],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateIn=function(type,args,obj){obj.overlay.cfg.setProperty("xy",[x,y],true);obj.startX=x;obj.startY=y;obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};slide.handleStartAnimateOut=function(type,args,obj){var vw=YAHOO.util.Dom.getViewportWidth();var pos=YAHOO.util.Dom.getXY(obj.overlay.element);var yso=pos[1];var currentTo=obj.animOut.attributes.points.to;obj.animOut.attributes.points.to=[(vw+25),yso];};slide.handleTweenAnimateOut=function(type,args,obj){var pos=YAHOO.util.Dom.getXY(obj.overlay.element);var xto=pos[0];var yto=pos[1];obj.overlay.cfg.setProperty("xy",[xto,yto],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateOut=function(type,args,obj){YAHOO.util.Dom.setStyle(obj.overlay.element,"visibility","hidden");obj.overlay.cfg.setProperty("xy",[x,y]);obj.animateOutCompleteEvent.fire();};slide.init();return slide;};YAHOO.register("container_core",YAHOO.widget.Module,{version:"2.2.2",build:"204"});

/**
 * Copyright (c) 2006-2007, Bill W. Scott
 * All rights reserved.
 *
 * This work is licensed under the Creative Commons Attribution 2.5 License. To view a copy
 * of this license, visit http://creativecommons.org/licenses/by/2.5/ or send a letter to
 * Creative Commons, 543 Howard Street, 5th Floor, San Francisco, California, 94105, USA.
 *
 * This work was created by Bill Scott (billwscott.com, looksgoodworkswell.com).
 *
 * The only attribution I require is to keep this notice of copyright & license
 * in this original source file.
 *
 * Version 0.6.1 - 07.08.2007
 *
 */
YAHOO.namespace("extension");

/**
* @class
* The carousel class manages a content list (a set of LI elements within an UL list)  that can be displayed horizontally or vertically. The content can be scrolled back and forth  with or without animation. The content can reference static HTML content or the list items can  be created dynamically on-the-fly (with or without Ajax). The navigation and event handling  can be externalized from the class.
* @param {object|string} carouselElementID The element ID (id name or id object) of the DIV that will become a carousel
* @param {object} carouselCfg The configuration object literal containing the configuration that should be set for this module. See configuration documentation for more details.
* @constructor
*/
YAHOO.extension.Carousel = function(carouselElementID, carouselCfg) {
        this.init(carouselElementID, carouselCfg);
    };

YAHOO.extension.Carousel.prototype = {


    /**
    * Constant denoting that the carousel size is unbounded (no limits set on scrolling)
    * @type number
    */
    UNBOUNDED_SIZE: 1000000,

    /**
    * Initializes the carousel object and all of its local members.
     * @param {object|string} carouselElementID The element ID (id name or id object)
     * of the DIV that will become a carousel
     * @param {object} carouselCfg The configuration object literal containing the
     * configuration that should be set for this module. See configuration documentation for more details.
    */
    init: function(carouselElementID, carouselCfg) {

        var oThis = this;

        /**
        * For deprecation.
        * getItem is the replacement for getCarouselItem
        */
        this.getCarouselItem = this.getItem;

        // CSS style classes
        var carouselListClass = "carousel-list";
        var carouselClipRegionClass = "carousel-clip-region";
        var carouselNextClass = "carousel-next";
        var carouselPrevClass = "carousel-prev";

        this._carouselElemID = carouselElementID;
        this.carouselElem = YAHOO.util.Dom.get(carouselElementID);

        this._prevEnabled = true;
        this._nextEnabled = true;

        // Create the config object
        this.cfg = new YAHOO.util.Config(this);

        /**
        * scrollBeforeAmount property.
        * Normally, set to 0, this is how much you are allowed to
        * scroll below the first item. Setting it to 2 allows you
        * to scroll to the -1 position.
        * However, the load handlers will not be asked to load anything
        * below 1.
        *
        * A good example is the spotlight example which treats the middle item
        * as the "selected" item. It sets scrollBeforeAmount to 2 and
        * scrollAfterAmount to 2.
        *
        * The actual items loaded would be from 1 to 15 (size=15),
        * but scrolling range would be -1 to 17.
        */
        this.cfg.addProperty("scrollBeforeAmount", {
            value:0,
            handler: function(type, args, carouselElem) {
            },
            validator: oThis.cfg.checkNumber
        } );

        /**
        * scrollAfterAmount property.
        * Normally, set to 0, this is how much you are allowed to
        * scroll past the size. Setting it to 2 allows you
        * to scroll to the size+scrollAfterAmount position.
        * However, the load handlers will not be asked to load anything
        * beyond size.
        *
        * A good example is the spotlight example which treats the middle item
        * as the "selected" item. It sets scrollBeforeAmount to 2 and
        * scrollAfterAmount to 2.
        *
        * The actual items loaded would be from 1 to 15 (size=15),
        * but scrolling range would be -1 to 17.
        */
        this.cfg.addProperty("scrollAfterAmount", {
            value:0,
            handler: function(type, args, carouselElem) {
            },
            validator: oThis.cfg.checkNumber
        } );

        /**
        * loadOnStart property.
        * If true, will call loadInitHandler on startup.
        * If false, will not. Useful for delaying the initialization
        * of the carousel for a later time after creation.
        */
        this.cfg.addProperty("loadOnStart", {
            value:true,
            handler: function(type, args, carouselElem) {
                // no action, only affects startup
            },
            validator: oThis.cfg.checkBoolean
        } );

        /**
        * orientation property.
        * Either "horizontal" or "vertical". Changes carousel from a
        * left/right style carousel to a up/down style carousel.
        */
        this.cfg.addProperty("orientation", {
            value:"horizontal",
            handler: function(type, args, carouselElem) {
                oThis.reload();
            },
            validator: function(orientation) {
                if(typeof orientation == "string") {
                    return ("horizontal,vertical".indexOf(orientation.toLowerCase()) != -1);
                } else {
                    return false;
                }
            }
        } );

        /**
        * size property.
        * The upper bound for scrolling in the 'next' set of content.
        * Set to a large value by default (this means unlimited scrolling.)
        */
        this.cfg.addProperty("size", {
            value:this.UNBOUNDED_SIZE,
            handler: function(type, args, carouselElem) {
                oThis.reload();
            },
            validator: oThis.cfg.checkNumber
        } );

        /**
        * numVisible property.
        * The number of items that will be visible.
        */
        this.cfg.addProperty("numVisible", {
            value:3,
            handler: function(type, args, carouselElem) {
                oThis.reload();
            },
            validator: oThis.cfg.checkNumber
        } );

        /**
        * firstVisible property.
        * Sets which item should be the first visible item in the carousel. Use to set which item will
        * display as the first element when the carousel is first displayed. After the carousel is created,
        * you can manipulate which item is the first visible by using the moveTo() or scrollTo() convenience
        * methods. Can be < 1 or greater than size if the scrollBeforeAmount or scrollAmountAfter has been set
        * to non-zero values.
        */
        this.cfg.addProperty("firstVisible", {
            value:1,
            handler: function(type, args, carouselElem) {
                oThis.moveTo(args[0]);
            },
            validator: oThis.cfg.checkNumber
        } );

        /**
        * scrollInc property.
        * The number of items to scroll by. Think of this as the page increment.
        */
        this.cfg.addProperty("scrollInc", {
            value:3,
            handler: function(type, args, carouselElem) {
            },
            validator: oThis.cfg.checkNumber
        } );

        /**
        * animationSpeed property.
        * The time (in seconds) it takes to complete the scroll animation.
        * If set to 0, animated transitions are turned off and the new page of content is
        * moved immdediately into place.
        */
        this.cfg.addProperty("animationSpeed", {
            value:0.25,
            handler: function(type, args, carouselElem) {
                oThis.animationSpeed = args[0];
            },
            validator: oThis.cfg.checkNumber
        } );

        /**
        * animationMethod property.
        * The <a href="http://developer.yahoo.com/yui/docs/animation/YAHOO.util.Easing.html">YAHOO.util.Easing</a>
        * method.
        */
        this.cfg.addProperty("animationMethod", {
            value:  YAHOO.util.Easing.easeOut,
            handler: function(type, args, carouselElem) {
            }
        } );

        /**
        * animationCompleteHandler property.
        * JavaScript function that is called when the Carousel finishes animation
        * after a next or previous nagivation.
        * Only invoked if animationSpeed > 0.
        * Two parameters are passed: type (set to 'onAnimationComplete') and
        * args array (args[0] = direction [either: 'next' or 'previous']).
        */
        this.cfg.addProperty("animationCompleteHandler", {
            value:null,
            handler: function(type, args, carouselElem) {
                if(oThis._animationCompleteEvt) {
                    oThis._animationCompleteEvt.unsubscribe(oThis._currAnimationCompleteHandler, oThis);
                }
                oThis._currAnimationCompleteHandler = args[0];
                if(oThis._currAnimationCompleteHandler) {
                    if(!oThis._animationCompleteEvt) {
                        oThis._animationCompleteEvt = new YAHOO.util.CustomEvent("onAnimationComplete", oThis);
                    }
                    oThis._animationCompleteEvt.subscribe(oThis._currAnimationCompleteHandler, oThis);
                }
            }
        } );

        /**
        * autoPlay property.
        * Specifies how many milliseconds to periodically auto scroll the content.
        * If set to 0 (default) then autoPlay is turned off.
        * If the user interacts by clicking left or right navigation, autoPlay is turned off.
        * You can restart autoPlay by calling the <em>startAutoPlay()</em>.
        * If you externally control navigation (with your own event handlers)
        * then you may want to turn off the autoPlay by calling<em>stopAutoPlay()</em>
        */
        this.cfg.addProperty("autoPlay", {
            value:0,
            handler: function(type, args, carouselElem) {
                var autoPlay = args[0];
                if(autoPlay > 0)
                    oThis.startAutoPlay();
                else
                    oThis.stopAutoPlay();
            }
        } );

        /**
        * wrap property.
        * Specifies whether to wrap when at the end of scrolled content. When the end is reached,
        * the carousel will scroll backwards to the item 1 (the animationSpeed parameter is used to
        * determine how quickly it should animate back to the start.)
        * Ignored if the <em>size</em> attribute is not explicitly set
        * (i.e., value equals YAHOO.extension.Carousel.UNBOUNDED_SIZE)
        */
        this.cfg.addProperty("wrap", {
            value:false,
            handler: function(type, args, carouselElem) {
            },
            validator: oThis.cfg.checkBoolean
        } );

        /**
        * navMargin property.
        * The margin space for the navigation controls. This is only useful for horizontal carousels
        * in which you have embedded navigation controls.
        * The <em>navMargin</em> allocates space between the left and right margins
        * (each navMargin wide) giving space for the navigation controls.
        */
        this.cfg.addProperty("navMargin", {
            value:0,
            handler: function(type, args, carouselElem) {
                oThis.calculateSize();
            },
            validator: oThis.cfg.checkNumber
        } );

        /**
        * revealAmount property.
        * The amount to reveal of what comes before and what comes after the firstVisible and
        * the lastVisible items. Setting this will provide a slight preview that something
        * exists before and after, providing an additional hint for the user.
        * The <em>revealAmount</em> will reveal the specified number of pixels for any item
        * before the firstVisible and an item after the lastVisible. Additionall, the
        * loadNextHandler and loadPrevHandler methods will be passed a start or end that guarantees
        * the revealed item will be loaded (if set to non-zero).
        */
        this.cfg.addProperty("revealAmount", {
            value:0,
            handler: function(type, args, carouselElem) {
                oThis.reload();
            },
            validator: oThis.cfg.checkNumber
        } );

        // For backward compatibility. Deprecated.
        this.cfg.addProperty("prevElementID", {
            value: null,
            handler: function(type, args, carouselElem) {
                if(oThis._carouselPrev) {
                    YAHOO.util.Event.removeListener(oThis._carouselPrev, "click", oThis._scrollPrev);
                }
                oThis._prevElementID = args[0];
                if(oThis._prevElementID == null) {
                    oThis._carouselPrev = YAHOO.util.Dom.getElementsByClassName(carouselPrevClass,
                                                        "div", oThis.carouselElem)[0];
                } else {
                    oThis._carouselPrev = YAHOO.util.Dom.get(oThis._prevElementID);
                }
                YAHOO.util.Event.addListener(oThis._carouselPrev, "click", oThis._scrollPrev, oThis);
            }
        });

        /**
        * prevElement property.
        * An element or elements that will provide the previous navigation control.
        * prevElement may be a single element or an array of elements. The values may be strings denoting
        * the ID of the element or the object itself.
        * If supplied, then events are wired to this control to fire scroll events to move the carousel to
        * the previous content.
        * You may want to provide your own interaction for controlling the carousel. If
        * so leave this unset and provide your own event handling mechanism.
        */
        this.cfg.addProperty("prevElement", {
            value:null,
            handler: function(type, args, carouselElem) {
                if(oThis._carouselPrev) {
                    YAHOO.util.Event.removeListener(oThis._carouselPrev, "click", oThis._scrollPrev);
                }
                oThis._prevElementID = args[0];
                if(oThis._prevElementID == null) {
                    oThis._carouselPrev = YAHOO.util.Dom.getElementsByClassName(carouselPrevClass,
                                                        "div", oThis.carouselElem)[0];
                } else {
                    oThis._carouselPrev = YAHOO.util.Dom.get(oThis._prevElementID);
                }
                YAHOO.util.Event.addListener(oThis._carouselPrev, "click", oThis._scrollPrev, oThis);
            }
        } );

        // For backward compatibility. Deprecated.
        this.cfg.addProperty("nextElementID", {
            value: null,
            handler: function(type, args, carouselElem) {
                if(oThis._carouselNext) {
                    YAHOO.util.Event.removeListener(oThis._carouselNext, "click", oThis._scrollNext);
                }
                oThis._nextElementID = args[0];
                if(oThis._nextElementID == null) {
                    oThis._carouselNext = YAHOO.util.Dom.getElementsByClassName(carouselNextClass,
                                                        "div", oThis.carouselElem);
                } else {
                    oThis._carouselNext = YAHOO.util.Dom.get(oThis._nextElementID);
                }
                if(oThis._carouselNext) {
                    YAHOO.util.Event.addListener(oThis._carouselNext, "click", oThis._scrollNext, oThis);
                }
            }
        });

        /**
        * nextElement property.
        * An element or elements that will provide the next navigation control.
        * nextElement may be a single element or an array of elements. The values may be strings denoting
        * the ID of the element or the object itself.
        * If supplied, then events are wired to this control to fire scroll events to move the carousel to
        * the next content.
        * You may want to provide your own interaction for controlling the carousel. If
        * so leave this unset and provide your own event handling mechanism.
        */
        this.cfg.addProperty("nextElement", {
            value:null,
            handler: function(type, args, carouselElem) {
                if(oThis._carouselNext) {
                    YAHOO.util.Event.removeListener(oThis._carouselNext, "click", oThis._scrollNext);
                }
                oThis._nextElementID = args[0];
                if(oThis._nextElementID == null) {
                    oThis._carouselNext = YAHOO.util.Dom.getElementsByClassName(carouselNextClass,
                                                        "div", oThis.carouselElem);
                } else {
                    oThis._carouselNext = YAHOO.util.Dom.get(oThis._nextElementID);
                }
                if(oThis._carouselNext) {
                    YAHOO.util.Event.addListener(oThis._carouselNext, "click", oThis._scrollNext, oThis);
                }
            }
        } );

        /**
        * loadInitHandler property.
        * JavaScript function that is called when the Carousel needs to load
        * the initial set of visible items. Two parameters are passed:
        * type (set to 'onLoadInit') and an argument array (args[0] = start index, args[1] = last index).
        */
        this.cfg.addProperty("loadInitHandler", {
            value:null,
            handler: function(type, args, carouselElem) {
                if(oThis._loadInitHandlerEvt) {
                    oThis._loadInitHandlerEvt.unsubscribe(oThis._currLoadInitHandler, oThis);
                }
                oThis._currLoadInitHandler = args[0];
                if(oThis._currLoadInitHandler) {
                    if(!oThis._loadInitHandlerEvt) {
                        oThis._loadInitHandlerEvt = new YAHOO.util.CustomEvent("onLoadInit", oThis);
                    }
                    oThis._loadInitHandlerEvt.subscribe(oThis._currLoadInitHandler, oThis);
                }
            }
        } );

        /**
        * loadNextHandler property.
        * JavaScript function that is called when the Carousel needs to load
        * the next set of items (in response to the user navigating to the next set.)
        * Two parameters are passed: type (set to 'onLoadNext') and
        * args array (args[0] = start index, args[1] = last index).
        */
        this.cfg.addProperty("loadNextHandler", {
            value:null,
            handler: function(type, args, carouselElem) {
                if(oThis._loadNextHandlerEvt) {
                    oThis._loadNextHandlerEvt.unsubscribe(oThis._currLoadNextHandler, oThis);
                }
                oThis._currLoadNextHandler = args[0];
                if(oThis._currLoadNextHandler) {
                    if(!oThis._loadNextHandlerEvt) {
                        oThis._loadNextHandlerEvt = new YAHOO.util.CustomEvent("onLoadNext", oThis);
                    }
                    oThis._loadNextHandlerEvt.subscribe(oThis._currLoadNextHandler, oThis);
                }
            }
        } );

        /**
        * loadPrevHandler property.
        * JavaScript function that is called when the Carousel needs to load
        * the previous set of items (in response to the user navigating to the previous set.)
        * Two parameters are passed: type (set to 'onLoadPrev') and args array
        * (args[0] = start index, args[1] = last index).
        */
        this.cfg.addProperty("loadPrevHandler", {
            value:null,
            handler: function(type, args, carouselElem) {
                if(oThis._loadPrevHandlerEvt) {
                    oThis._loadPrevHandlerEvt.unsubscribe(oThis._currLoadPrevHandler, oThis);
                }
                oThis._currLoadPrevHandler = args[0];
                if(oThis._currLoadPrevHandler) {
                    if(!oThis._loadPrevHandlerEvt) {
                        oThis._loadPrevHandlerEvt = new YAHOO.util.CustomEvent("onLoadPrev", oThis);
                    }
                    oThis._loadPrevHandlerEvt.subscribe(oThis._currLoadPrevHandler, oThis);
                }
            }
        } );

        /**
        * prevButtonStateHandler property.
        * JavaScript function that is called when the enabled state of the
        * 'previous' control is changing. The responsibility of
        * this method is to enable or disable the 'previous' control.
        * Two parameters are passed to this method: <em>type</em>
        * (which is set to "onPrevButtonStateChange") and <em>args</em>,
        * an array that contains two values.
        * The parameter args[0] is a flag denoting whether the 'previous' control
        * is being enabled or disabled. The parameter args[1] is the element object
        * derived from the <em>prevElement</em> parameter.
        * If you do not supply a prevElement then you will need to track
        * the elements that you would want to enable/disable while handling the state change.
        */
        this.cfg.addProperty("prevButtonStateHandler", {
            value:null,
            handler: function(type, args, carouselElem) {
                if(oThis._currPrevButtonStateHandler) {
                    oThis._prevButtonStateHandlerEvt.unsubscribe(oThis._currPrevButtonStateHandler, oThis);
                }

                oThis._currPrevButtonStateHandler = args[0];

                if(oThis._currPrevButtonStateHandler) {
                    if(!oThis._prevButtonStateHandlerEvt) {
                        oThis._prevButtonStateHandlerEvt = new YAHOO.util.CustomEvent("onPrevButtonStateChange", oThis);
                    }
                    oThis._prevButtonStateHandlerEvt.subscribe(oThis._currPrevButtonStateHandler, oThis);
                }
            }
        } );

        /**
        * nextButtonStateHandler property.
        * JavaScript function that is called when the enabled state of the
        * 'next' control is changing. The responsibility of
        * this method is to enable or disable the 'next' control.
        * Two parameters are passed to this method: <em>type</em>
        * (which is set to "onNextButtonStateChange") and <em>args</em>,
        * an array that contains two values.
        * The parameter args[0] is a flag denoting whether the 'next' control
        * is being enabled or disabled. The parameter args[1] is the element object
        * derived from the <em>nextElement</em> parameter.
        * If you do not supply a nextElement then you will need to track
        * the elements that you would want to enable/disable while handling the state change.
        */
        this.cfg.addProperty("nextButtonStateHandler", {
            value:null,
            handler: function(type, args, carouselElem) {
                if(oThis._currNextButtonStateHandler) {
                    oThis._nextButtonStateHandlerEvt.unsubscribe(oThis._currNextButtonStateHandler, oThis);
                }
                oThis._currNextButtonStateHandler = args[0];

                if(oThis._currNextButtonStateHandler) {
                    if(!oThis._nextButtonStateHandlerEvt) {
                        oThis._nextButtonStateHandlerEvt = new YAHOO.util.CustomEvent("onNextButtonStateChange", oThis);
                    }
                    oThis._nextButtonStateHandlerEvt.subscribe(oThis._currNextButtonStateHandler, oThis);
                }
            }
        } );


        if(carouselCfg) {
            this.cfg.applyConfig(carouselCfg);
        }

        this._origFirstVisible = this.cfg.getProperty("firstVisible");

        // keep a copy of curr handler so it can be removed when a new handler is set
        this._currLoadInitHandler = this.cfg.getProperty("loadInitHandler");
        this._currLoadNextHandler = this.cfg.getProperty("loadNextHandler");
        this._currLoadPrevHandler = this.cfg.getProperty("loadPrevHandler");
        this._currPrevButtonStateHandler = this.cfg.getProperty("prevButtonStateHandler");
        this._currNextButtonStateHandler = this.cfg.getProperty("nextButtonStateHandler");
        this._currAnimationCompleteHandler = this.cfg.getProperty("animationCompleteHandler");

        this._nextElementID = this.cfg.getProperty("nextElementID");
        if(!this._nextElementID)
            this._nextElementID = this.cfg.getProperty("nextElement");

        this._prevElementID = this.cfg.getProperty("prevElementID");
        if(!this._prevElementID)
            this._prevElementID = this.cfg.getProperty("prevElement");

        this._autoPlayTimer = null;
        this._priorLastVisible = this._priorFirstVisible = this.cfg.getProperty("firstVisible");
        this._lastPrebuiltIdx = 0;
// this._currSize = 0;

        // prefetch elements
        this.carouselList = YAHOO.util.Dom.getElementsByClassName(carouselListClass,
                                                "ul", this.carouselElem)[0];

        if(this._nextElementID == null) {
            this._carouselNext = YAHOO.util.Dom.getElementsByClassName(carouselNextClass,
                                                "div", this.carouselElem)[0];
        } else {
            this._carouselNext = YAHOO.util.Dom.get(this._nextElementID);
        }

        if(this._prevElementID == null) {
            this._carouselPrev = YAHOO.util.Dom.getElementsByClassName(carouselPrevClass,
                                                "div", this.carouselElem)[0];
        } else {
            this._carouselPrev = YAHOO.util.Dom.get(this._prevElementID);
        }

        this._clipReg = YAHOO.util.Dom.getElementsByClassName(carouselClipRegionClass,
                                                "div", this.carouselElem)[0];

        // add a style class dynamically so that the correct styles get applied for a vertical carousel
        if(this.isVertical()) {
            YAHOO.util.Dom.addClass(this.carouselList, "carousel-vertical");
        }

        // initialize the animation objects for next/previous
        this._scrollNextAnim = new YAHOO.util.Motion(this.carouselList, this.scrollNextParams,
                                this.cfg.getProperty("animationSpeed"), this.cfg.getProperty("animationMethod"));
        this._scrollPrevAnim = new YAHOO.util.Motion(this.carouselList, this.scrollPrevParams,
                                this.cfg.getProperty("animationSpeed"), this.cfg.getProperty("animationMethod"));

        // If they supplied a nextElementID then wire an event listener for the click
        if(this._carouselNext) {
            YAHOO.util.Event.addListener(this._carouselNext, "click", this._scrollNext, this);
        }

        // If they supplied a prevElementID then wire an event listener for the click
        if(this._carouselPrev) {
            YAHOO.util.Event.addListener(this._carouselPrev, "click", this._scrollPrev, this);
        }

        // Wire up the various event handlers that they might have supplied
        var loadInitHandler = this.cfg.getProperty("loadInitHandler");
        if(loadInitHandler) {
            this._loadInitHandlerEvt = new YAHOO.util.CustomEvent("onLoadInit", this);
            this._loadInitHandlerEvt.subscribe(loadInitHandler, this);
        }
        var loadNextHandler = this.cfg.getProperty("loadNextHandler");
        if(loadNextHandler) {
            this._loadNextHandlerEvt = new YAHOO.util.CustomEvent("onLoadNext", this);
            this._loadNextHandlerEvt.subscribe(loadNextHandler, this);
        }
        var loadPrevHandler = this.cfg.getProperty("loadPrevHandler");
        if(loadPrevHandler) {
            this._loadPrevHandlerEvt = new YAHOO.util.CustomEvent("onLoadPrev", this);
            this._loadPrevHandlerEvt.subscribe(loadPrevHandler, this);
        }
        var animationCompleteHandler = this.cfg.getProperty("animationCompleteHandler");
        if(animationCompleteHandler) {
            this._animationCompleteEvt = new YAHOO.util.CustomEvent("onAnimationComplete", this);
            this._animationCompleteEvt.subscribe(animationCompleteHandler, this);
        }
        var prevButtonStateHandler = this.cfg.getProperty("prevButtonStateHandler");
        if(prevButtonStateHandler) {
            this._prevButtonStateHandlerEvt = new YAHOO.util.CustomEvent("onPrevButtonStateChange",
                            this);
            this._prevButtonStateHandlerEvt.subscribe(prevButtonStateHandler, this);
        }
        var nextButtonStateHandler = this.cfg.getProperty("nextButtonStateHandler");
        if(nextButtonStateHandler) {
            this._nextButtonStateHandlerEvt = new YAHOO.util.CustomEvent("onNextButtonStateChange", this);
            this._nextButtonStateHandlerEvt.subscribe(nextButtonStateHandler, this);
        }

        // Since loading may take some time, wire up a listener to fire when at least the first
        // element actually gets loaded
        var visibleExtent = this._calculateVisibleExtent();
        YAHOO.util.Event.onAvailable(this._carouselElemID + "-item-"+
                    visibleExtent.start,  this._calculateSize, this);

        // Call the initial loading sequence
        if(this.cfg.getProperty("loadOnStart"))
            this._loadInitial();

    },

    // /////////////////// Public API //////////////////////////////////////////

    /**
    * Clears all items from the list and resets to the carousel to its original initial state.
    */
    clear: function() {
        // remove all items from the carousel for dynamic content
        var loadInitHandler = this.cfg.getProperty("loadInitHandler");
        if(loadInitHandler) {
            this._removeChildrenFromNode(this.carouselList);
            this._lastPrebuiltIdx = 0;
        }
        // turn off autoplay
        this.stopAutoPlay(); // should we only turn this off for dynamic during reload?

        this._priorLastVisible = this._priorFirstVisible = this._origFirstVisible;

        // is this redundant since moveTo will set this?
        this.cfg.setProperty("firstVisible", this._origFirstVisible, true);
        this.moveTo(this._origFirstVisible);
    },

    /**
    * Clears all items from the list and calls the loadInitHandler to load new items into the list.
    * The carousel size is reset to the original size set during creation.
    * @param {number}    numVisible    Optional parameter: numVisible.
    * If set, the carousel will resize on the reload to show numVisible items.
    */
    reload: function(numVisible) {
        // this should be deprecated, not needed since can be set via property change
        if(this._isValidObj(numVisible)) {
            this.cfg.setProperty("numVisible", numVisible);
        }
        this.clear();

        // clear resets back to start
        var visibleExtent = this._calculateVisibleExtent();
        YAHOO.util.Event.onAvailable(this._carouselElemID+"-item-"+visibleExtent.start,
                                        this._calculateSize, this);
        this._loadInitial();

    },

    load: function() {
        var visibleExtent = this._calculateVisibleExtent();

        YAHOO.util.Event.onAvailable(this._carouselElemID + "-item-"+visibleExtent.start,
                        this._calculateSize, this);
        this._loadInitial();
    },

    /**
    * With patch from Dan Hobbs for handling unordered loading.
    * @param {number}    idx    which item in the list to potentially create.
    * If item already exists it will not create a new item.
    * @param {string}    innerHTML    The innerHTML string to use to create the contents of an LI element.
    * @param {string}    itemClass    A class optionally supplied to add to the LI item created
    */
    addItem: function(idx, innerHTMLOrElem, itemClass) {

        if(idx > this.cfg.getProperty("size")) {
            return null;
        }

        var liElem = this.getItem(idx);

        // Need to create the li
        if(!this._isValidObj(liElem)) {
            liElem = this._createItem(idx, innerHTMLOrElem);
            this.carouselList.appendChild(liElem);

        } else if(this._isValidObj(liElem.placeholder)) {
            var newLiElem = this._createItem(idx, innerHTMLOrElem);
            this.carouselList.replaceChild(newLiElem, liElem);
            liElem = newLiElem;
        }

        // if they supplied an item class add it to the element
        if(this._isValidObj(itemClass)){
            YAHOO.util.Dom.addClass(liElem, itemClass);
        }

        /**
        * Not real comfortable with this line of code. It exists for vertical
        * carousels for IE6. For some reason LI elements are not displaying
        * unless you after the fact set the display to block. (Even though
        * the CSS sets vertical LIs to display:block)
        */
        if(this.isVertical())
            setTimeout( function() { liElem.style.display="block"; }, 1 );

        return liElem;

    },

    /**
    * Inserts a new LI item before the index specified. Uses the innerHTML to create the contents of the new LI item
    * @param {number}    refIdx    which item in the list to insert this item before.
    * @param {string}    innerHTML    The innerHTML string to use to create the contents of an LI element.
    */
    insertBefore: function(refIdx, innerHTML) {
        // don't allow insertion beyond the size
        if(refIdx >= this.cfg.getProperty("size")) {
            return null;
        }

        if(refIdx < 1) {
            refIdx = 1;
        }

        var insertionIdx = refIdx - 1;

        if(insertionIdx > this._lastPrebuiltIdx) {
            this._prebuildItems(this._lastPrebuiltIdx, refIdx); // is this right?
        }

        var liElem = this._insertBeforeItem(refIdx, innerHTML);

        this._enableDisableControls();

        return liElem;
    },

    /**
    * Inserts a new LI item after the index specified. Uses the innerHTML to create the contents of the new LI item
    * @param {number}    refIdx    which item in the list to insert this item after.
    * @param {string}    innerHTML    The innerHTML string to use to create the contents of an LI element.
    */
    insertAfter: function(refIdx, innerHTML) {

        if(refIdx > this.cfg.getProperty("size")) {
            refIdx = this.cfg.getProperty("size");
        }

        var insertionIdx = refIdx + 1;

        // if we are inserting this item past where we have prebuilt items, then
        // prebuild up to this point.
        if(insertionIdx > this._lastPrebuiltIdx) {
            this._prebuildItems(this._lastPrebuiltIdx, insertionIdx+1);
        }

        var liElem = this._insertAfterItem(refIdx, innerHTML);

        if(insertionIdx > this.cfg.getProperty("size")) {
            this.cfg.setProperty("size", insertionIdx, true);
        }

        this._enableDisableControls();

        return liElem;
    },

    /**
    * Simulates a next button event. Causes the carousel to scroll the next set of content into view.
    */
    scrollNext: function() {
        this._scrollNext(null, this);

        // we know the timer has expired.
        //if(this._autoPlayTimer) clearTimeout(this._autoPlayTimer);
        this._autoPlayTimer = null;
        if(this.cfg.getProperty("autoPlay") !== 0) {
            this._autoPlayTimer = this.startAutoPlay();
        }
    },

    /**
    * Simulates a prev button event. Causes the carousel to scroll the previous set of content into view.
    */
    scrollPrev: function() {
        this._scrollPrev(null, this);
    },

    /**
    * Scrolls the content to place itemNum as the start item in the view
    * (if size is specified, the last element will not scroll past the end.).
    * Uses current animation speed & method.
    * @param {number}    newStart    The item to scroll to.
    */
    scrollTo: function(newStart) {
        this._position(newStart, true);
    },

    /**
    * Moves the content to place itemNum as the start item in the view
    * (if size is specified, the last element will not scroll past the end.)
    * Ignores animation speed & method; moves directly to the item.
    * Note that you can also set the <em>firstVisible</em> property upon initialization
    * to get the carousel to start at a position different than 1.
    * @param {number}    newStart    The item to move directly to.
    */
    moveTo: function(newStart) {
        this._position(newStart, false);
    },

    /**
    * Starts up autoplay. If autoPlay has been stopped (by calling stopAutoPlay or by user interaction),
    * you can start it back up by using this method.
    * @param {number}    interval    optional parameter that sets the interval
    * for auto play the next time that autoplay fires.
    */
    startAutoPlay: function(interval) {
        // if interval is passed as arg, then set autoPlay to this interval.
        if(this._isValidObj(interval)) {
            this.cfg.setProperty("autoPlay", interval, true);
        }

        // if we already are playing, then do nothing.
        if(this._autoPlayTimer !== null) {
            return this._autoPlayTimer;
        }

        var oThis = this;
        var autoScroll = function() { oThis.scrollNext(); };
        this._autoPlayTimer = setTimeout( autoScroll, this.cfg.getProperty("autoPlay") );

        return this._autoPlayTimer;
    },

    /**
    * Stops autoplay. Useful for when you want to control what events will stop the autoplay feature.
    * Call <em>startAutoPlay()</em> to restart autoplay.
    */
    stopAutoPlay: function() {
        if (this._autoPlayTimer !== null) {
            clearTimeout(this._autoPlayTimer);
            this._autoPlayTimer = null;
        }
    },

    /**
    * Returns whether the carousel's orientation is set to vertical.
    */
    isVertical: function() {
        return (this.cfg.getProperty("orientation") != "horizontal");
    },


    /**
    * Check to see if an element (by index) has been loaded or not. If the item is simply pre-built, but not
    * loaded this will return false. If the item has not been pre-built it will also return false.
    * @param {number}    idx    Index of the element to check load status for.
    */
    isItemLoaded: function(idx) {
        var liElem = this.getItem(idx);

        // if item exists and is not a placeholder, then it is already loaded.
        if(this._isValidObj(liElem) && !this._isValidObj(liElem.placeholder)) {
            return true;
        }

        return false;
    },

    /**
    * Lookup the element object for a carousel list item by index.
    * @param {number}    idx    Index of the element to lookup.
    */
    getItem: function(idx) {
        var elemName = this._carouselElemID + "-item-" + idx;
        var liElem = YAHOO.util.Dom.get(elemName);
        return liElem;
    },

    show: function() {
        YAHOO.util.Dom.setStyle(this.carouselElem, "display", "block");
        this.calculateSize();
    },

    hide: function() {
        YAHOO.util.Dom.setStyle(this.carouselElem, "display", "none");
    },

    calculateSize: function() {
        var ulKids = this.carouselList.childNodes;
        var li = null;
        for(var i=0; i<ulKids.length; i++) {

            li = ulKids[i];
            if(li.tagName == "LI" || li.tagName == "li") {
                break;
            }
        }

        var navMargin = this.cfg.getProperty("navMargin");
        var numVisible = this.cfg.getProperty("numVisible");
        var firstVisible = this.cfg.getProperty("firstVisible");
        var pl = this._getStyleVal(li, "paddingLeft");
        var pr = this._getStyleVal(li, "paddingRight");
        var ml = this._getStyleVal(li, "marginLeft");
        var mr = this._getStyleVal(li, "marginRight");
        var pt = this._getStyleVal(li, "paddingTop");
        var pb = this._getStyleVal(li, "paddingBottom");
        var mt = this._getStyleVal(li, "marginTop");
        var mb = this._getStyleVal(li, "marginBottom");

        YAHOO.util.Dom.removeClass(this.carouselList, "carousel-vertical");
        YAHOO.util.Dom.removeClass(this.carouselList, "carousel-horizontal");
        if(this.isVertical()) {
            var liPaddingMarginWidth = pl + pr + ml + mr;
            YAHOO.util.Dom.addClass(this.carouselList, "carousel-vertical");
            var liPaddingMarginHeight = pt + pb + mt + mb;

            var upt = this._getStyleVal(this.carouselList, "paddingTop");
            var upb = this._getStyleVal(this.carouselList, "paddingBottom");
            var umt = this._getStyleVal(this.carouselList, "marginTop")
            var umb = this._getStyleVal(this.carouselList, "marginBottom")
            var ulPaddingHeight = upt + upb + umt + umb;

            // try to reveal the amount taking into consideration the margin & padding.
            // This guarantees that this.revealAmount of pixels will be shown on both sides
            var revealAmt = (this._isExtraRevealed()) ?
                        (this.cfg.getProperty("revealAmount")+(liPaddingMarginHeight)/2) : 0;

            // get the height from the height computed style not the offset height
            // The reason is that on IE the offsetHeight when some part of the margin is
            // explicitly set to 'auto' can cause accessing that value to crash AND
            // on FF, in certain cases the actual value used for the LI's height is fractional
            // For example, while li.offsetHeight might return 93, YAHOO.util.Dom.getStyle(li, "height")
            // would return "93.2px". This fractional value will affect the scrolling, so it must be
            // factored in for FF.
            // The caveat is that for IE, you will need to set the LI's height explicitly
            // REPLACED: this.scrollAmountPerInc = (li.offsetHeight + liPaddingMarginHeight);
            // WITH:
            var liHeight = this._getStyleVal(li, "height", true);
            this.scrollAmountPerInc = (liHeight + liPaddingMarginHeight);

            var liWidth = this._getStyleVal(li, "width");
            this.carouselElem.style.width = (liWidth + liPaddingMarginWidth) + "px";
            this._clipReg.style.height =
                    (this.scrollAmountPerInc * numVisible + revealAmt*2 +
                    ulPaddingHeight) + "px";
//alert(this._clipReg.style.height);
            this.carouselElem.style.height =
                (this.scrollAmountPerInc * numVisible + revealAmt*2 + navMargin*2 +
                    ulPaddingHeight) + "px";

            // possible that the umt+upt is needed... need to test this.
            var revealTop = (this._isExtraRevealed()) ?
                    (revealAmt - (Math.abs(mt-mb)+Math.abs(pt-pb))/2
                    ) :
                    0;
            YAHOO.util.Dom.setStyle(this.carouselList, "position", "relative");
            YAHOO.util.Dom.setStyle(this.carouselList, "top", "" + revealTop + "px");

            // if we set the initial start > 1 then this will adjust the scrolled location
            var currY = YAHOO.util.Dom.getY(this.carouselList);
            YAHOO.util.Dom.setY(this.carouselList, currY - this.scrollAmountPerInc*(firstVisible-1));

        // --- HORIZONTAL
        } else {
            YAHOO.util.Dom.addClass(this.carouselList, "carousel-horizontal");

            var upl = this._getStyleVal(this.carouselList, "paddingLeft");
            var upr = this._getStyleVal(this.carouselList, "paddingRight");
            var uml = this._getStyleVal(this.carouselList, "marginLeft")
            var umr = this._getStyleVal(this.carouselList, "marginRight")
            var ulPaddingWidth = upl + upr + uml + umr;

            var liMarginWidth = ml + mr;
            var liPaddingMarginWidth = liMarginWidth + pr + pl;

            // try to reveal the amount taking into consideration the margin & padding.
            // This guarantees that this.revealAmount of pixels will be shown on both sides
            var revealAmt = (this._isExtraRevealed()) ?
                                (this.cfg.getProperty("revealAmount")+(liPaddingMarginWidth)/2) : 0;

            var liWidth = li.offsetWidth;
            this.scrollAmountPerInc = liWidth + liMarginWidth;

            this._clipReg.style.width =
                    (this.scrollAmountPerInc*numVisible + revealAmt*2) + "px";
            this.carouselElem.style.width =
                    (this.scrollAmountPerInc*numVisible + navMargin*2 + revealAmt*2 +
                    ulPaddingWidth) + "px";

            var revealLeft = (this._isExtraRevealed()) ?
                    (revealAmt - (Math.abs(mr-ml)+Math.abs(pr-pl))/2 - (uml+upl)
                    ) :
                    0;
            YAHOO.util.Dom.setStyle(this.carouselList, "position", "relative");
            YAHOO.util.Dom.setStyle(this.carouselList, "left", "" + revealLeft + "px");

            // if we set the initial start > 1 then this will adjust the scrolled location
            var currX = YAHOO.util.Dom.getX(this.carouselList);
            YAHOO.util.Dom.setX(this.carouselList, currX - this.scrollAmountPerInc*(firstVisible-1));
        }
    },

    // Hides the cfg object
    setProperty: function(property, value, silent) {
        this.cfg.setProperty(property, value, silent);
    },

    getProperty: function(property) {
        return this.cfg.getProperty(property);
    },

    getFirstItemRevealed: function() {
        return this._firstItemRevealed;
    },
    getLastItemRevealed: function() {
        return this._lastItemRevealed;
    },

    // Just for convenience and to be symmetrical with getFirstVisible
    getFirstVisible: function() {
        return this.cfg.getProperty("firstVisible");
    },

    getLastVisible: function() {
        var firstVisible = this.cfg.getProperty("firstVisible");
        var numVisible = this.cfg.getProperty("numVisible");

        return firstVisible + numVisible - 1;
    },

    // /////////////////// PRIVATE API //////////////////////////////////////////
    _getStyleVal : function(li, style, returnFloat) {
        var styleValStr = YAHOO.util.Dom.getStyle(li, style);

        var styleVal = returnFloat ? parseFloat(styleValStr) : parseInt(styleValStr, 10);
        if(style=="height" && isNaN(styleVal)) {
            styleVal = li.offsetHeight;
        } else if(isNaN(styleVal)) {
            styleVal = 0;
        }
        return styleVal;
    },

    _calculateSize: function(me) {
        me.calculateSize();
        me.show();
        //YAHOO.util.Dom.setStyle(me.carouselElem, "visibility", "visible");
    },

    // From Mike Chambers: http://weblogs.macromedia.com/mesh/archives/2006/01/removing_html_e.html
    _removeChildrenFromNode: function(node)
    {
        if(!this._isValidObj(node))
        {
            return;
        }

        var len = node.childNodes.length;

        while (node.hasChildNodes())
        {
            node.removeChild(node.firstChild);
        }
    },

    _prebuildLiElem: function(idx) {
        if(idx < 1) return;


        var liElem = document.createElement("li");
        liElem.id = this._carouselElemID + "-item-" + idx;
        // this is default flag to know that we're not really loaded yet.
        liElem.placeholder = true;
        this.carouselList.appendChild(liElem);

        this._lastPrebuiltIdx = (idx > this._lastPrebuiltIdx) ? idx : this._lastPrebuiltIdx;
    },

    _createItem: function(idx, innerHTMLOrElem) {
        if(idx < 1) return;


        var liElem = document.createElement("li");
        liElem.id = this._carouselElemID + "-item-" + idx;

        // if String then assume innerHTML, else an elem object
        if(typeof(innerHTMLOrElem) === "string") {
            liElem.innerHTML = innerHTMLOrElem;
        } else {
            liElem.appendChild(innerHTMLOrElem);
        }

        return liElem;
    },

    // idx is the location to insert after
    _insertAfterItem: function(refIdx, innerHTMLOrElem) {
        return this._insertBeforeItem(refIdx+1, innerHTMLOrElem);
    },


    _insertBeforeItem: function(refIdx, innerHTMLOrElem) {

        var refItem = this.getItem(refIdx);
        var size = this.cfg.getProperty("size");
        if(size != this.UNBOUNDED_SIZE) {
            this.cfg.setProperty("size", size + 1, true);
        }

        for(var i=this._lastPrebuiltIdx; i>=refIdx; i--) {
            var anItem = this.getItem(i);
            if(this._isValidObj(anItem)) {
                anItem.id = this._carouselElemID + "-item-" + (i+1);
            }
        }

        var liElem = this._createItem(refIdx, innerHTMLOrElem);

        var insertedItem = this.carouselList.insertBefore(liElem, refItem);
        this._lastPrebuiltIdx += 1;

        return liElem;
    },

    // TEST THIS... think it has to do with prebuild
    insertAfterEnd: function(innerHTMLOrElem) {
        return this.insertAfter(this.cfg.getProperty("size"), innerHTMLOrElem);
    },

    _position: function(newStart, showAnimation) {
        // do we bypass the isAnimated check?
        var currStart = this._priorFirstVisible;
        if(newStart > currStart) {
            var inc = newStart - currStart;
            this._scrollNextInc(inc, showAnimation);
        } else {
            var dec = currStart - newStart;
            this._scrollPrevInc(dec, showAnimation);
        }
    },

    _scrollPrev: function(e, carousel) {
        if(e !== null) { // event fired this so disable autoplay
            carousel.stopAutoPlay();
        }
        if(carousel._scrollPrevAnim.isAnimated()) {
            return false;
        }
        carousel._scrollPrevInc(carousel.cfg.getProperty("scrollInc"),
                            (carousel.cfg.getProperty("animationSpeed") !== 0));
    },

    // event handler
    _scrollNext: function(e, carousel) {
        if(e !== null) { // event fired this so disable autoplay
            carousel.stopAutoPlay();
        }
        if(carousel._scrollNextAnim.isAnimated()) {
            return false; // might be better to set ourself waiting for animation completion and
            // then just do this function. that will allow faster scroll responses.
        }

        carousel._scrollNextInc(carousel.cfg.getProperty("scrollInc"),
                                (carousel.cfg.getProperty("animationSpeed") !== 0));
    },


    _handleAnimationComplete: function(type, args, argList) {
        var carousel = argList[0];
        var direction = argList[1];

        carousel._animationCompleteEvt.fire(direction);


    },

    // If EVERY item is already loaded in the range then return true
    // Also prebuild whatever is not already created.
    _areAllItemsLoaded: function(first, last) {
        var itemsLoaded = true;
        for(var i=first; i<=last; i++) {
            var liElem = this.getItem(i);

            // If the li elem does not exist, then prebuild it in the correct order
            // but still flag as not loaded (just prebuilt the li item.
            if(!this._isValidObj(liElem)) {
                this._prebuildLiElem(i);
                itemsLoaded = false;
            // but if the item exists and is a placeholder, then
            // note that this item is not loaded (only a placeholder)
            } else if(this._isValidObj(liElem.placeholder)) {
                itemsLoaded = false;
            }
        }
        return itemsLoaded;
    },

    _prebuildItems: function(first, last) {
        for(var i=first; i<=last; i++) {
            var liElem = this.getItem(i);

            // If the li elem does not exist, then prebuild it in the correct order
            // but still flag as not loaded (just prebuilt the li item.
            if(!this._isValidObj(liElem)) {
                this._prebuildLiElem(i);
            }
        }
    },

    _isExtraRevealed: function() {
        return (this.cfg.getProperty("revealAmount") > 0);
    },

    // probably no longer need carousel passed in, this should be correct now.
    _scrollNextInc: function(inc, showAnimation) {
        var numVisible = this.cfg.getProperty("numVisible");
        var currStart = this._priorFirstVisible;
        var currEnd = this._priorLastVisible;
        var size = this.cfg.getProperty("size");

        var scrollExtent = this._calculateAllowableScrollExtent();

        if(this.cfg.getProperty("wrap") && currEnd == scrollExtent.end) {
            this.scrollTo(scrollExtent.start); // might need to check animation is on or not
            return;
        }

        // increment start by inc
        var newStart = currStart + inc;
        var newEnd = newStart + numVisible - 1;

        // If we are past the end, adjust or wrap
        if(newEnd > scrollExtent.end) {
            newEnd = scrollExtent.end;
            newStart = newEnd - numVisible + 1;
        }

        inc = newStart - currStart;

        // at this point the following variables are set
        // inc... amount to increment by
        // newStart... the firstVisible item after the scroll
        // newEnd... the last item visible after the scroll

        this.cfg.setProperty("firstVisible", newStart, true);


        if(inc > 0) {
            if(this._isValidObj(this.cfg.getProperty("loadNextHandler"))) {
                var visibleExtent = this._calculateVisibleExtent(newStart, newEnd);
                var cacheStart = (currEnd+1) < visibleExtent.start ? (currEnd+1) : visibleExtent.start;
                var alreadyCached = this._areAllItemsLoaded(cacheStart, visibleExtent.end);
                this._loadNextHandlerEvt.fire(visibleExtent.start, visibleExtent.end, alreadyCached);
            }

            if(showAnimation) {
                var nextParams = { points: { by: [-this.scrollAmountPerInc*inc, 0] } };
                if(this.isVertical()) {
                    nextParams = { points: { by: [0, -this.scrollAmountPerInc*inc] } };
                }

                this._scrollNextAnim = new YAHOO.util.Motion(this.carouselList,
                                nextParams,
                                this.cfg.getProperty("animationSpeed"),
                                this.cfg.getProperty("animationMethod"));

// is this getting added multiple times?
                if(this.cfg.getProperty("animationCompleteHandler")) {
                    this._scrollNextAnim.onComplete.subscribe(this._handleAnimationComplete, [this, "next"]);
                }
                this._scrollNextAnim.animate();
            } else {
                if(this.isVertical()) {
                    var currY = YAHOO.util.Dom.getY(this.carouselList);

                    YAHOO.util.Dom.setY(this.carouselList,
                                currY - this.scrollAmountPerInc*inc);
                } else {
                    var currX = YAHOO.util.Dom.getX(this.carouselList);
                    YAHOO.util.Dom.setX(this.carouselList,
                                currX - this.scrollAmountPerInc*inc);
                }
            }

        }
        this._priorFirstVisible = newStart;
        this._priorLastVisible = newEnd;

        this._enableDisableControls();
        return false;
    },

    // firstVisible is already set
    _scrollPrevInc: function(dec, showAnimation) {
        var numVisible = this.cfg.getProperty("numVisible");
        var currStart = this._priorFirstVisible;
        var currEnd = this._priorLastVisible;
        var size = this.cfg.getProperty("size");

        // decrement start by dec
        var newStart = currStart - dec;

        var scrollExtent = this._calculateAllowableScrollExtent();

        // How to decide whether to stop at 1 or not
        newStart = (newStart < scrollExtent.start) ? scrollExtent.start : newStart;

        // if we are going to extend past the end, then we need to correct the start
        var newEnd = newStart + numVisible - 1;
        if(newEnd > scrollExtent.end) {
            newEnd = scrollExtent.end;
            newStart = newEnd - numVisible + 1;
        }

        dec = currStart - newStart;

        // at this point the following variables are set
        // dec... amount to decrement by
        // newStart... the firstVisible item after the scroll
        // newEnd... the last item visible after the scroll
        this.cfg.setProperty("firstVisible", newStart, true);

        // if we are decrementing
        if(dec > 0) {
            if(this._isValidObj(this.cfg.getProperty("loadPrevHandler"))) {
                var visibleExtent = this._calculateVisibleExtent(newStart, newEnd);
                var cacheEnd = (currStart-1) > visibleExtent.end ? (currStart-1) : visibleExtent.end;
                var alreadyCached = this._areAllItemsLoaded(visibleExtent.start, cacheEnd);

                this._loadPrevHandlerEvt.fire(visibleExtent.start, visibleExtent.end, alreadyCached);
            }

            if(showAnimation) {
                var prevParams = { points: { by: [this.scrollAmountPerInc*dec, 0] } };
                if(this.isVertical()) {
                    prevParams = { points: { by: [0, this.scrollAmountPerInc*dec] } };
                }

                this._scrollPrevAnim = new YAHOO.util.Motion(this.carouselList,
                                prevParams,
                                this.cfg.getProperty("animationSpeed"), this.cfg.getProperty("animationMethod"));
                if(this.cfg.getProperty("animationCompleteHandler")) {
                    this._scrollPrevAnim.onComplete.subscribe(this._handleAnimationComplete, [this, "prev"]);
                }
                this._scrollPrevAnim.animate();
            } else {
                if(this.isVertical()) {
                    var currY = YAHOO.util.Dom.getY(this.carouselList);
                    YAHOO.util.Dom.setY(this.carouselList, currY +
                            this.scrollAmountPerInc*dec);
                } else {
                    var currX = YAHOO.util.Dom.getX(this.carouselList);
                    YAHOO.util.Dom.setX(this.carouselList, currX +
                            this.scrollAmountPerInc*dec);
                }
            }
        }
        this._priorFirstVisible = newStart;
        this._priorLastVisible = newEnd;

        this._enableDisableControls();

        return false;
    },

    // Check for all cases and enable/disable controls as needed by current state
    _enableDisableControls: function() {

        var firstVisible = this.cfg.getProperty("firstVisible");
        var lastVisible = this.getLastVisible();
        var scrollExtent = this._calculateAllowableScrollExtent();

        // previous arrow is turned on. Check to see if we need to turn it off
        if(this._prevEnabled) {
            if(firstVisible === scrollExtent.start) {
                this._disablePrev();
            }
        }

        // previous arrow is turned off. Check to see if we need to turn it on
        if(this._prevEnabled === false) {
            if(firstVisible > scrollExtent.start) {
                this._enablePrev();
            }
        }

        // next arrow is turned on. Check to see if we need to turn it off
        if(this._nextEnabled) {
            if(lastVisible === scrollExtent.end) {
                this._disableNext();
            }
        }

        // next arrow is turned off. Check to see if we need to turn it on
        if(this._nextEnabled === false) {
            if(lastVisible < scrollExtent.end) {
                this._enableNext();
            }
        }
    },

    /**
    * _loadInitial looks at firstItemVisible for the start (not necessarily 1)
    */
    _loadInitial: function() {
        var firstVisible = this.cfg.getProperty("firstVisible");
        this._priorLastVisible = this.getLastVisible();
        // Load from 1 to the last visible
        // The _calculateSize method will adjust the scroll position
        // for starts > 1
        if(this._loadInitHandlerEvt) {
            var visibleExtent = this._calculateVisibleExtent(firstVisible, this._priorLastVisible);
            // still treat the first real item as starting at 1
            var alreadyCached = this._areAllItemsLoaded(1, visibleExtent.end);

            this._loadInitHandlerEvt.fire(visibleExtent.start, visibleExtent.end, alreadyCached);
        }

        if(this.cfg.getProperty("autoPlay") !== 0) {
            this._autoPlayTimer = this.startAutoPlay();
        }

        this._enableDisableControls();
    },

    _calculateAllowableScrollExtent: function() {
        var scrollBeforeAmount = this.cfg.getProperty("scrollBeforeAmount");
        var scrollAfterAmount = this.cfg.getProperty("scrollAfterAmount");
        var size = this.cfg.getProperty("size");

        var extent = {start: 1-scrollBeforeAmount, end: size+scrollAfterAmount};
        return extent;

    },

    _calculateVisibleExtent: function(start, end) {
        if(!start) {
            start = this.cfg.getProperty("firstVisible");
            end = this.getLastVisible();
        }

        var size = this.cfg.getProperty("size");

        // we ignore the firstItem property... this method is used
        // for prebuilding the cache and signaling the developer
        // what to render on a given scroll.
        start = start<1?1:start;
        end = end>size?size:end;

        var extent = {start: start, end: end};

        // set up the indices for revealed items. If there is no item revealed, then set
        // the index to -1
        this._firstItemRevealed = -1;
        this._lastItemRevealed = -1;
        if(this._isExtraRevealed()) {
            if(start > 1) {
                this._firstItemRevealed = start - 1;
                extent.start = this._firstItemRevealed;
            }
            if(end < size) {
                this._lastItemRevealed = end + 1;
                extent.end = this._lastItemRevealed;
            }
        }

        return extent;
    },

    _disablePrev: function() {
        this._prevEnabled = false;
        if(this._prevButtonStateHandlerEvt) {
            this._prevButtonStateHandlerEvt.fire(false, this._carouselPrev);
        }
        if(this._isValidObj(this._carouselPrev)) {
            YAHOO.util.Event.removeListener(this._carouselPrev, "click", this._scrollPrev);
        }
    },

    _enablePrev: function() {
        this._prevEnabled = true;
        if(this._prevButtonStateHandlerEvt) {
            this._prevButtonStateHandlerEvt.fire(true, this._carouselPrev);
        }
        if(this._isValidObj(this._carouselPrev)) {
            YAHOO.util.Event.addListener(this._carouselPrev, "click", this._scrollPrev, this);
        }
    },

    _disableNext: function() {
        if(this.cfg.getProperty("wrap")) {
            return;
        }
        this._nextEnabled = false;
        if(this._isValidObj(this._nextButtonStateHandlerEvt)) {
            this._nextButtonStateHandlerEvt.fire(false, this._carouselNext);
        }
        if(this._isValidObj(this._carouselNext)) {
            YAHOO.util.Event.removeListener(this._carouselNext, "click", this._scrollNext);
        }
    },

    _enableNext: function() {
        this._nextEnabled = true;
        if(this._isValidObj(this._nextButtonStateHandlerEvt)) {
            this._nextButtonStateHandlerEvt.fire(true, this._carouselNext);
        }
        if(this._isValidObj(this._carouselNext)) {
            YAHOO.util.Event.addListener(this._carouselNext, "click", this._scrollNext, this);
        }
    },

    _isValidObj: function(obj) {

        if (null == obj) {
            return false;
        }
        if ("undefined" == typeof(obj) ) {
            return false;
        }
        return true;
    }
};

/**
 * Custom button state handler for enabling/disabling button state.
 * Called when the carousel has determined that the previous button
 * state should be changed.
 * Specified to the carousel as the configuration
 * parameter: prevButtonStateHandler
 **/
var handlePrevButtonState = function( type, args ) {
    var enabling = args[0];
    var leftImage = args[1];
    if( enabling ) {
        leftImage.src = "/img/carousel/left-enabled.png";
    } else {
        leftImage.src = "/img/carousel/left-disabled.png";
    }
};

/**
 * Custom button state handler for enabling/disabling button state.
 * Called when the carousel has determined that the next button
 * state should be changed.
 * Specified to the carousel as the configuration
 * parameter: nextButtonStateHandler
 **/
var handleNextButtonState = function( type, args ) {
    var enabling = args[0];
    var rightImage = args[1];
    if( enabling ) {
        rightImage.src = "/img/carousel/right-enabled.png";
    } else {
        rightImage.src = "/img/carousel/right-disabled.png";
    }

};

/**
 * You must create the carousel after the page is loaded since it is
 * dependent on an HTML element (in this case 'mycarousel'.) See the
 * HTML code below.
 **/
var carousel; // for ease of debugging; globals generally not a good idea
var pageLoad = function() {

    var list = document.getElementById( "carousel" );
    if( list ) {
        var size = list.getElementsByTagName( "li" ).length;
        carousel = new YAHOO.extension.Carousel( "mycarousel", {
            numVisible: 4,
            animationSpeed: 0.15,
            scrollInc: 4,
            navMargin: 4,
            prevElement: "prev-arrow",
            nextElement: "next-arrow",
            size: size,
            prevButtonStateHandler: handlePrevButtonState,
            nextButtonStateHandler: handleNextButtonState
        });
    }
};
YAHOO.util.Event.addListener( window, "load", pageLoad );
