(function(){
  //Каталог товаров
  let catalog = [
      {
        id:Math.floor(Math.random()*100),
        title:'xiomi',
        price:22000,      
        img:'https://i2.rozetka.ua/goods/1748260/apple_iphone_7_32gb_rose_gold_images_1748260340.jpg'  
      },
      {
        id:Math.floor(Math.random()*100),
        title:'redmi 7a',
        price:22000,       
        img:'https://i2.rozetka.ua/goods/1748260/apple_iphone_7_32gb_rose_gold_images_1748260340.jpg'
      },
      {
        id:Math.floor(Math.random()*100),
        title:'xiomi',
        price:22000,
        img:'https://i2.rozetka.ua/goods/1748260/apple_iphone_7_32gb_rose_gold_images_1748260340.jpg'
      },
      {
        id:Math.floor(Math.random()*100),
        title:'xiomi',
        price:22000,    
        img:'https://i2.rozetka.ua/goods/1748260/apple_iphone_7_32gb_rose_gold_images_1748260340.jpg'   
      },
      {
        id:Math.floor(Math.random()*100),
        title:'xiomi',
        price:22000,   
        img:'https://i2.rozetka.ua/goods/1748260/apple_iphone_7_32gb_rose_gold_images_1748260340.jpg'
      },
      {
        id:Math.floor(Math.random()*100),
        title:'xiomi',
        price:22000,   
        img:'https://i2.rozetka.ua/goods/1748260/apple_iphone_7_32gb_rose_gold_images_1748260340.jpg' 
      },
      {
        id:12,
        title:'xiomi',
        price:22000,
        img:'https://i2.rozetka.ua/goods/1748260/apple_iphone_7_32gb_rose_gold_images_1748260340.jpg'
      }
    ]

    //Вывод продуктов
    function renderProducts(){      
        Object.values(catalog).forEach(item => {
            let card = createProducts(item)
            document.querySelector('.products-items').insertAdjacentHTML("afterbegin",card)
            
        });   
    }
    
    //Получаем продекты из localstorage
    function renderAddProject(){
        let newCard = JSON.parse(localStorage.getItem("card"));    
        if(localStorage.getItem('card')){
            newCard.forEach(function(item){
                catalog.push(item)
            })        
        }
        else{
            newCard = [];
        }    
    }

    renderAddProject();
    renderProducts();

    //Создание моделей
    function createProducts({id,title,price,img}){
        let item = `
        <div class="card" >
            <div class ="card__content">
            <img class="img" src=${img} alt=${title} data-toggle="modal" data-target="#exampleModalCenter" data-info=${id}>
            <span class="title">${title}</span>
            <span class="price">${price} RUB</span>
            <a href="#" class="btn to-card btn-primary" data-id=${id}>В корзину</a>
            </div>
        </div>`
        return item
    }


    //Модальное окно с информацией
    document.querySelector('.products-items').addEventListener("click",function(event){
      event.preventDefault();   
      if(event.target.classList.contains('img')){
        createModal();
        Object.values(catalog).forEach(function(item){
          if(event.target.dataset['info'] == item.id){
            let cardInfo = renderModalInfo(item)

            document.querySelector('.modal-content').insertAdjacentHTML("afterbegin",cardInfo)
          }
        }) 
        
      }

    })

   //Вывод в модалку с информацией
   function renderModalInfo({id,img,title,price}){
     let html = `
     <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">${title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
     <div class="modal-body">
        <img class="img-info" src=${img} alt=${title}>
        <span>Цена: ${price}</span>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" id="deleteCard" data-delete=${id}>Удалить товар</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
    </div>`

    return html
   }


    //Корзина
    let data = {};
    document.querySelector('.products-items').addEventListener("click",function(event){
        event.preventDefault();
        if(event.target.classList.contains('to-card')){
           let dataId = event.target.dataset['id'];
            Object.values(catalog).forEach(function(item){
              if(dataId == item.id){
                let newCard = JSON.parse(localStorage.getItem("cardCount") || '[]');
                newCard.push(item);
                localStorage.setItem("cardCount", JSON.stringify(newCard));
              }
            })
          
           document.querySelector('.count').textContent = Object.keys(JSON.parse(localStorage.getItem('cardCount'))).length;
           
          }
          
    })

    //Колиство товаров в корзине
    document.querySelector('.count').textContent = Object.keys(JSON.parse(localStorage.getItem('cardCount'))).length;


    //Корзина событие
    document.querySelector('.shop').addEventListener("click",function(event){
      createShopModal();
      let getCard = JSON.parse(localStorage.getItem('cardCount'));
      let totalPrice = 0;
      Object.values(getCard).forEach(function(item){
        let cardModal = renderModalCard(item)
        totalPrice +=item.price;
      })
      document.querySelector(".total-price").textContent = `Итого: ${totalPrice}руб.`
        //Удаление корзины
         deleteShop();
    
    })
    
    function deleteShop(){
      document.querySelector("#deleteShop").addEventListener("click",function(event){
        localStorage.removeItem('cardCount');
        document.querySelector(".modal-cards").remove();
        document.querySelector(".total-price").textContent = "Корзина пуста!"
        document.querySelector('.count').textContent = 0;
      })
    }
    
    //Вывод в корзину
    function renderModalCard({img,price,title}){
      let html = `
      <li class="modal-card">
        <img class="img-shop" src=${img} alt="${title}"> 
        <span class="title-shop">${title}</span>
        <span class="price-shop">${price} RUB</span>
      </li>

      `
      document.querySelector('.modal-cards').insertAdjacentHTML("afterbegin",html)
    }

  
    //Сумма всех товаров в корзине
    

    function createModal(){
      let html = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
          </div>
        </div>
      </span>`
      document.querySelector(".modal-info").insertAdjacentHTML("afterbegin",html)
      }

      function createShopModal(){
        let html = `
        <div class="modal__shop-content">
        <div class="modal fade bd-example-modal-lg" id="shop"  tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Корзина</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <ul class="modal-cards">
          </ul>
          <span class="total-price"></span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="deleteShop">Очистить корзину</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
          </div>
          </div>
        </div>
      </div>
      </div>`
  
      document.querySelector('.modal-shop').insertAdjacentHTML("afterbegin",html)
      }
})()
