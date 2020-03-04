
let numbers = [4, 3, 1, 8, 3, 9, 1, 4, 2, 6, 10, 6, 4, 7, 5, 3];
let run;


function setup() {
    clearInterval(run);
    let width = Math.floor(windowWidth/2);
    let height = Math.floor(windowHeight/2);

    createCanvas(width, height);

}

function draw() {
    background('#0f0100');    

    circle(200, 30, 40);
    //Ny sirkel som er 40*1,5 mere til venstre og 40*1.5 mere nedover
    circle(140, 90, 40);
    stroke('white');
    line(200, 30, 140, 90);
    circle(260, 90, 40);
    line(200, 30, 260, 90);

    fill('#ED225D');
    numbers = [1, 4, 5, 6];
    textSize(36);
    text('1', 190, 40);
    text('['+numbers+']', 30, 30);
    fill('white');
    /*
    for(let i = 0; i < numbers.length; i++){
        fill('white');
        if(curr2 === i) fill('green');
        if(curr2+1 === i) fill('red');

        for(let j = 0; j < numbers[i]; j++){
            square(0+(i*10), height-(j*10)-20, 10);
        }
    }*/
}

function heapsort(array){
    let n = array.length;
    for(let i = n/ 2 - 1; i >= 0; i--){
        heapify(array, n, i);
    }

    for(let i = n-1; i >= 0; i--){
        let tmp = array[0];
        array[0] = array[i];
        array[i] = tmp;

        heapify(array, i, 0);
    }
    console.log('sorted');
    console.log(array);
}

function heapify(array, n, i){
    let largest = i;
    let left = 2*i + 1; 
    let right = 2*i + 2;

    if(left < n && array[left] > array[largest]){
        largest = left;
    }

    if(right < n && array[right] > array[largest]){
        largest = right;
    }

    if(largest != i){
        let tmp = array[i];
        array[i] = array[largest];
        array[largest] = tmp;
        console.log(array);
        heapify(array, n, largest);
    }
}

function runHeapsort(){
    let numbers = [5, 2, 9, 5, 3, 8];
    console.log(numbers);
    heapsort(numbers);
    
}
