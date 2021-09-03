function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '/js/products.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function renderProducts(){
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category')
    const type = urlParams.get('type');   
    const idx = urlParams.get('index')
    const mainImg= document.getElementById('main-img')
    const imgList= document.getElementById('img-list')
    const stoneType= document.getElementById('stone-type')
    const stoneName= document.getElementById('stone-name')
    const related= document.getElementById('related')
     loadJSON((res)=>{
         const products = JSON.parse(res)
         console.log(products)
         

         stoneType.textContent=type==='granite'?'Granite':type==='marble'?'Marble':'Sand Stone'
         stoneName.textContent=products[category][type][idx].name

         let imgMain = document.createElement('img')
         imgMain.setAttribute('style','height: auto;max-width: 100%; padding-bottom:10px')
         imgMain.src=products[category][type][idx].images

         let img1 = document.createElement('img')
         img1.setAttribute('style','height: 105px;max-width: 155px; padding-right:10px;')
         img1.src=products[category][type][idx].images
         let img2 = document.createElement('img')
         img2.setAttribute('style','height: 105px;max-width: 155px; padding-right:10px;')
         img2.src=products[category][type][idx].images

         mainImg.appendChild(imgMain)
         
         imgList.appendChild(img1)
         imgList.appendChild(img2)
        const rel = products[category][type]
        rel.splice(idx,1)
        console.log(rel)
        for(let i=0;i<rel.length;i++){
            const div = document.createElement('div')
            div.classList.add('img-container')
            div.innerHTML=`<div class="positioning ">
            <a href="stone-detail.html?category=${category}&type=${type}&index=${i}">${rel[i].name}</a>
        </div>
        <img src="${rel[i].images}" />`
        related.appendChild(div)
        }

     })
 }


 window.addEventListener('load',()=>{
     renderProducts()
     console.log("loaded")
 })