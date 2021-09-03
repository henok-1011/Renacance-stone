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
     const catagories = ['high_end','classic']
     const types = ['granite','marble','sand-stone']
     const typesTitles = ['Granite','Marble','Sand Stone']
     loadJSON((res)=>{
         const products = JSON.parse(res)
         let container =document.querySelector(".filter-list")
         let lists = container.getElementsByClassName('gallery-list')
         for(let i =0;i<catagories.length;i++){
             for(let j=0;j<types.length;j++){
                 prod=products[catagories[i]][types[j]]
                 let title = document.createElement('h2')
                 title.classList.add('gallery-item','mix','all','w-100')
                 title.style.textAlign='center'
                 title.style.display='inline-block'
                 title.textContent=typesTitles[j]
                 lists[i].appendChild(title)
                 let prodList = document.createElement('div')
                 prodList.classList.add('d-flex','align-items-center','flex-wrap')
                 prodList.innerHTML='<!-- Gallery Item -->'
                 let listInner = ''
                 prod.forEach((el,idx) => {
                     let prodItem = document.createElement('div')
                     prodItem.classList.add('gallery-item','mix','all',types[j],'col-lg-3','col-md-6','col-sm-12')
                     prodItem.style.display='inline-block'
                     prodItem.onclick=()=>{
                        window.location.href=`stone-detail.html?category=${catagories[i]}&type=${types[j]}&index=${idx}`
                    }
                     prodItem.innerHTML=`<div class="inner-box">
                     <figure class="image-box">
                         <img src="${el.images}" alt="">
                         <!--Overlay Box-->
                         <div class="overlay-box">
                             <div class="overlay-inner">
                                 <div class="content">
                                     <h3><a href="stone-detail.html?category=${catagories[i]}&type=${types[j]}&index=${idx}">${el.name}</a></h3>
                                 </div>
                             </div>
                         </div>
                     </figure>
                    </div>`
                    prodList.appendChild(prodItem)
                 });
                 lists[i].appendChild(prodList)
             }
         }

     })
 }


 window.addEventListener('load',()=>{
     renderProducts()
     console.log("loaded")
 })