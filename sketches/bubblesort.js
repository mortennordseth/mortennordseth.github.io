
let numbers = [4, 3, 1, 8, 3, 9, 1, 4, 2, 6, 10, 6, 4, 7, 5, 3];
let run;
let curr1; 
let curr2;

function setup() {
    clearInterval(run);
    let width = Math.floor(windowWidth/2);
    let height = Math.floor(windowHeight/2);

    let possibleNumbers = width/10;
    numbers = [];
    for(let i = 0; i < possibleNumbers; i++){
        numbers.push(Math.floor(Math.random() * 40));
    }

    createCanvas(width, height);

}

function draw() {
    background('#0f0100');    
    for(let i = 0; i < numbers.length; i++){
        fill('white');
        if(curr2 === i) fill('green');
        if(curr2+1 === i) fill('red');

        for(let j = 0; j < numbers[i]; j++){
            square(0+(i*10), height-(j*10)-20, 10);
        }
    }
}

function bubble(){
    if(numbers[curr2] > numbers[curr2+1]){
        let tmp = numbers[curr2];
        numbers[curr2] = numbers[curr2+1];
        numbers[curr2+1] = tmp;
    }
    curr2++;

    if(curr2 === numbers.length-curr1-1) {
        curr2 = 0;
        curr1++;
    }

    if(curr1 === numbers.length-1) clearInterval(run);
}

function runBubblesort(){
    curr1 = 0;
    curr2 = 0;

    run = setInterval(bubble, 25);


}