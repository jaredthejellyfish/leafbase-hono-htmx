var j=function(){console.log("lazyLoadImages");const w=document.querySelectorAll('[data-lazy="true"]'),f=new IntersectionObserver(function(E){E.forEach(function(h){if(h.isIntersecting){const c=h.target;if(!c.dataset.lazysrc)return;c.src=c.dataset.lazysrc,c.dataset.lazy="false",c.attributes.removeNamedItem("data-lazysrc"),f.unobserve(c)}})});w.forEach(function(E){f.observe(E)})};j();var k=new MutationObserver(function(w){for(let f of w)if(f.type==="childList"||f.type==="characterData")j()});k.observe(document.body,{childList:!0,subtree:!0});