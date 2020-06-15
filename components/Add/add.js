(function(){
    let title = document.querySelector('#title');
    let price = document.querySelector('#price');
    let img = document.querySelector('#img');

    
    document.querySelector("#btn").addEventListener("click",function(event){
        let titleValue = title.value;
        let priceValue = +price.value;
        let imgValue = img.value;
        let card = createValues(titleValue,priceValue,imgValue)
        let newCard = JSON.parse(localStorage.getItem("card") || '[]');
        newCard.push(card);
        localStorage.setItem("card", JSON.stringify(newCard));
        
    
    })

    function createValues(title,price,img){
        let newObj = {
            id:Math.floor(Math.random()*20),
            title,
            price,
            img
            
        }
        return {...newObj}
    }

})()