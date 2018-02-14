//This is for Q.1
function func_uniform(n,callback) {
    let results = 0;
    let runs = 1000;
    for (let i = 0; i < runs; i++) {
        let running = true;
        let arr = [];  
        while (running) {
            let ele = Math.floor(Math.random() * n);
            if (arr.includes(ele)) {
                results += arr.length+1;    
                running = false;  
            }
            arr.push(ele);
        }
    }
    let estimated = Math.sqrt(Math.PI * n / 2)
    let calculated = (results / runs)
    callback(estimated,calculated)
}
//This is for Q.2
function func_coupon(n,callback){
let estimated = 0;
for (let i = 1; i < n+1; i++) {
    estimated+=1/(i);
    
}
estimated = estimated*n;
let arr = []
for (let i = 0; i < n; i++) {
    arr.push(i)
}
let calculated = 0;
while(arr.length != 0){
    ele = Math.floor(Math.random()*n);
    if(arr.includes(ele)){
        arr.splice(arr.indexOf(ele),1)
    }
    calculated++;
}
callback(estimated,calculated)
}
//This is for running Q.1 and Q.2 multiple times to reduce deviations
function func_esti(n,runs){
    let total_est = 0;
    let total_cal = 0;
    for (let i = 0; i < runs; i++) {
        func_uniform(n,(est,cal)=>{
            total_est+=est;
            total_cal+=cal
        }) 
    }
    console.log("uniform: estimated: " + total_est, "     calculated: " + total_cal,"          % diff: "+ Math.floor(100*(1-total_est/total_cal)) +"%");
    total_est = 0;
    total_cal = 0;
    for (let i = 0; i < runs; i++) {
        func_coupon(n,(est,cal)=>{
            total_est+=est;
            total_cal+=cal
        }) 
    }
    console.log("coupon: estimated: " + total_est, "     calculated: " + total_cal,"          % diff: "+ Math.floor(100*(1-total_est/total_cal)) +"%");
}
//This is for making a deck for Q.3
function func_make_deck(suits,numbers,callback){
    let deck = [];
suits.forEach(suit => {
    for (let i = 1; i < numbers+1; i++) {
        deck.push({suit:suit,numb:i});
        
    };
});
callback(suits,deck)
}
//This for randomizing the order of the Cards in the Deck for Q.3
function func_shuffle(deck,callback){
for (let i = 0; i < deck.length; i++) {
    deck.splice(Math.floor(Math.random()*deck.length),0,deck.pop());
    deck.splice(Math.floor(Math.random()*deck.length),0,deck.shift());
    
}
callback(deck)
}
//This is for sorting the Deck in Q.3
function func_sort(suits,deck,callback){
for (let i =1; i < deck.length; i++) {
    
    let current = deck[i];
    let otherCard = deck[i-1];
    
        if(i == 0){
            //do nothing
        }
        else if(suits.indexOf(current.suit)<suits.indexOf(otherCard.suit)){
            deck.splice(i-1,2,deck[i],deck[i-1]);
            i -= 2;
        }
        else if(suits.indexOf(current.suit)==suits.indexOf(otherCard.suit) && current.numb < otherCard.numb){
            deck.splice(i-1,2,deck[i],deck[i-1]);
            i -=2;
        }
}
callback(deck);
}
//This is for making, shuffling and sorting the deck
func_make_deck(["spade","heart","club","diamond"],13,(suits,deck)=>{
    func_shuffle(deck,(unsorted)=>{
        console.log(unsorted)
        func_sort(suits,unsorted,(sorted)=>{
            console.log(sorted)
        })
    })
})
//This is for Q.1 and Q.2
//Lefthand is n, the higher it is, the more accurate it becomes.
//Rightside is for how many times it should be run, the higher it is the less deviation there is.
func_esti(1000,30)

