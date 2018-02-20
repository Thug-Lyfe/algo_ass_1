//This is for Q.1, runs is for running the calculation multiple times to reduce deviation
function func_uniform(n, runs, callback) {
    let results = 0;
    for (let i = 0; i < runs; i++) {
        let running = true;
        let arr = [];
        while (running) {
            let ele = Math.floor(Math.random() * n);
            if (arr.includes(ele)) {
                results += arr.length + 1;
                running = false;
            }
            arr.push(ele);
        }
    }
    let estimated = Math.sqrt(Math.PI * n / 2)
    let calculated = (results / runs)
    callback(estimated, calculated)
}
//This is for Q.2 , runs is for running the calculation multiple times to reduce deviation
function func_coupon(n, runs, callback) {
    let estimated = 0;
    let arr_copy = []
    for (let i = 1; i < n + 1; i++) {
        estimated += 1 / i;
        arr_copy.push(i-1)
    }
    estimated = estimated * n;
    let arr = []
    let calculated = 0;
    for (let i = 0; i < runs; i++) {
        arr = arr.concat(arr_copy);
        while (arr.length != 0) {
            ele = Math.floor(Math.random() * n);
            if (arr.includes(ele)) {
                arr.splice(arr.indexOf(ele), 1)
            }
            calculated++;
        }
    }
    callback(estimated, calculated / runs)
}
//This is for making a deck for Q.3
function func_make_deck(suits, numbers, callback) {
    let deck = [];
    suits.forEach(suit => {
        for (let i = 1; i < numbers + 1; i++) {
            deck.push({ suit: suit, numb: i });
        };
    });
    callback(suits, deck)
}
//This for randomizing the order of the Cards in the Deck for Q.3
function func_shuffle(deck, callback) {
    for (let i = 0; i < deck.length; i++) {
        deck.splice(Math.floor(Math.random() * deck.length), 0, deck.pop());
        deck.splice(Math.floor(Math.random() * deck.length), 0, deck.shift());
    }
    callback(deck)
}
//This is for sorting the Deck in Q.3
function func_sort(suits, deck, callback) {
    for (let i = 1; i < deck.length; i++) {
        let current = deck[i];
        let otherCard = deck[i - 1];
        if (i == 0) {
            //do nothing
        }
        else if (suits.indexOf(current.suit) < suits.indexOf(otherCard.suit)) {
            deck.splice(i - 1, 2, deck[i], deck[i - 1]);
            i -= 2;
        }
        else if (suits.indexOf(current.suit) == suits.indexOf(otherCard.suit) && current.numb < otherCard.numb) {
            deck.splice(i - 1, 2, deck[i], deck[i - 1]);
            i -= 2;
        }
    }
    callback(deck);
}
//This is for making, shuffling and sorting the deck
func_make_deck(["spade", "heart", "club", "diamond"], 13, (suits, deck) => {
    func_shuffle(deck, (unsorted) => {
        console.log("\n------------Unsorted---------- \n\n", unsorted)
        func_sort(suits, unsorted, (sorted) => {
            console.log("\n------------Sorted---------- \n\n", sorted)
        })
    })
})
//This is for Q.1 and Q.2
//(n,runs,callback)
func_uniform(1000, 10000, (estimated, calculated) => {
    console.log("Estimated: " + estimated, "     Calculated: " + calculated, 
    "          % diff: " + Math.floor(10000 * Math.abs(estimated - calculated)/((estimated+calculated)/2))/100 + "%");
})
func_coupon(1000, 1000, (estimated, calculated) => {
    console.log("Estimated: " + estimated, "     Calculated: " + calculated,
    "          % diff: " + Math.floor(10000 * Math.abs(estimated - calculated)/((estimated+calculated)/2))/100 + "%");
})

