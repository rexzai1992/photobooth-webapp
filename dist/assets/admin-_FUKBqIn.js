import"./modulepreload-polyfill-B5Qt9EMX.js";import{createClient as i}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";import{S as d,a as s}from"./config-6-4UJsQe.js";const r=i(d,s),o=document.getElementById("photoGrid"),c=document.getElementById("refreshBtn");async function a(){o.innerHTML='<p class="loading">Loading photos...</p>';try{const{data:e,error:n}=await r.from("photos").select("*").order("created_at",{ascending:!1});if(n)throw n;if(e.length===0){o.innerHTML='<p class="loading">No photos yet</p>';return}o.innerHTML=e.map(t=>`
      <div class="photo-card" data-id="${t.id}">
        <img src="${t.image_data}" alt="Photo">
        <div class="photo-info">
          <span>${new Date(t.created_at).toLocaleString()}</span>
          <span class="status">${t.printed?"✓ Printed":"Not printed"}</span>
        </div>
        <div class="photo-actions">
          <button class="download-btn" onclick="downloadPhoto('${t.id}', '${t.image_data}')">Download</button>
          <button class="mark-printed-btn ${t.printed?"printed":""}"
                  onclick="markPrinted('${t.id}')"
                  ${t.printed?"disabled":""}>
            ${t.printed?"Printed":"Mark Printed"}
          </button>
        </div>
      </div>
    `).join("")}catch(e){o.innerHTML=`<p class="loading">Error loading photos: ${e.message}</p>`}}window.downloadPhoto=function(e,n){const t=document.createElement("a");t.href=n,t.download=`photobooth-${e}.png`,t.click()};window.markPrinted=async function(e){try{const{error:n}=await r.from("photos").update({printed:!0}).eq("id",e);if(n)throw n;a()}catch(n){alert("Failed to mark as printed: "+n.message)}};c.addEventListener("click",a);document.querySelector(".logo").addEventListener("click",()=>{window.location.href="index.html"});a();
