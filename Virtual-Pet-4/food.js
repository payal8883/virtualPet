class Food {
    constructor(){

        this.foodStock = 0;
        this.lastFed = 0;

        this.image = loadImage("images/milk.png");

    }

    updateFoodStock(food){
        this.foodStock = food;
    }

    display(){

        var x = 80;
        var y = 130;

        var button=createButton("Feed the dog");
        button.position(400,125);

        if(button.mousePressed(function(){
            foodS=foodS-1;
            gameState=1;
            database.ref('/').update({'gameStae':gameState})
        }))

        var addFood=createButton("Add Food");
        addFood.position(500,125);

        if(addFood.mousePressed(function(){
            foodS=foodS+1;
            gameState=2;
            database.ref('/').update({'gameState':gameState})
        }));
    
       

        if(this.foodStock!=0){

            for(var i = 0; i<this.foodStock;i++){
                if(i % 10===0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
           
            }
        }

       
    

    }
}{

   bedroom()
        background(bedroomImg,550,500);
   
    garden()
        background(gardenImg,550,500);    

    washroom()
        background(washroomImg,550,500);

}