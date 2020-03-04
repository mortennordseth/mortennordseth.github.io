let currentNode, nodes, clicks, priorityQueue, run, wallInterval;

function setup() {
    let width = Math.floor(windowWidth/2);
    let height = Math.floor(windowHeight/2);
    let numberOfNodesHorizontal = Math.floor(width/20);
    let numberOfNodesVertical = Math.floor(height/20);

    createCanvas(width, height);
    
    currentNode = 0; priorityQueue = []; clicks = 0; clearInterval(run);
    nodes = [];
    for(let i = 0; i < numberOfNodesVertical; i++){
        nodes[i] = [];
        for(let j = 0; j < numberOfNodesHorizontal; j++){
            nodes[i].push(new Node());
        }
    }
}

function draw() {
    background('#0f0100');
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++){
            fill(nodes[i][j].getColor());
            square(j*20, i*20, 20);
        }
    }
}

function mousePressed() {
    let y = Math.floor(mouseY/20);
    let x = Math.floor(mouseX/20);

    if(!(y < 0) && !(x < 0) && !(y>nodes.length) && !(x > nodes[0].length)){
        if(clicks === 0) {
            nodes[y][x].isStart = true;
        } 
        else if(clicks === 1) {
            nodes[y][x].isEnd = true;
        } else {
            wallInterval = setInterval(markWalls, 20);  
        }
        clicks++;
    }
}

function markWalls(){
    let y = Math.floor(mouseY/20);
    let x = Math.floor(mouseX/20);
    if(!nodes[y][x].isStart && !nodes[y][x].isEnd){
        nodes[y][x].isWall = true;
    }
    if(!mouseIsPressed) clearInterval(wallInterval);
}

function getStartNode(){
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++){
            if(nodes[i][j].isStart) return nodes[i][j];
        }
    }
}

function getEndNode(){
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++){
            if(nodes[i][j].isEnd) return nodes[i][j];
        }
    }
}

function startDijkstra(){
    setNodePosition();
    setNeighbours();

    currentNode = getStartNode();
    run = setInterval(search, 20);
}

function setNodePosition(){
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++){
            nodes[i][j].y = i;
            nodes[i][j].x = j;
        }
    }
}


function setNeighbours(){
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++){
            if(i > 0 && !nodes[i-1][j].isWall){
                //Neighbour above
                nodes[i][j].neighbours.push(nodes[i-1][j]);
            }
            if(i < nodes.length-1 && !nodes[i+1][j].isWall){
                //Neighbour below
                nodes[i][j].neighbours.push(nodes[i+1][j]);
            } 
            if(j > 0 && !nodes[i][j-1].isWall){
                //Neighbour left
               nodes[i][j].neighbours.push(nodes[i][j-1]);
            }
            if(j < nodes[i].length-1 && !nodes[i][j+1].isWall){
                //Neighbour right
                nodes[i][j].neighbours.push(nodes[i][j+1]);
            }
        }
    }
}
function search(){
    currentNode.isVisited = true;
    currentNode.neighbours.forEach(neighbour => {
        if(!neighbour.isVisited){
            if(currentNode.cost + 1 > neighbour.cost){
                neighbour.cost = currentNode.cost + 1;
                neighbour.cameFrom = currentNode;
                
                if(!neighbour.isInQueue){
                    neighbour.isInQueue = true;
                    priorityQueue.push(neighbour);
                }
            }
        }
    });
    sortPriorityQueue();
    currentNode.isCurrent = false;
    currentNode = priorityQueue.shift();
    if(currentNode === undefined) {
        //cant find end
        clearInterval(run);
        alert("Cant find end node");
    }else{
        currentNode.isInQueue = false;
        currentNode.isCurrent = true;
        if(currentNode.isEnd){
            clearInterval(run);
            showPath();
        }
    }
}

function sortPriorityQueue(){
    priorityQueue.sort(function (a, b){
        return a.cost - b.cost;
    });
}

function showPath(){
    let node = getEndNode();
    while(node != null){
        node.isPartOfPath = true;
        node = node.cameFrom;
    }
}

class Node{
    constructor(){
        this.isWall = false;
        this.isStart = false;
        this.isEnd = false;
        this.isVisited = false;
        this.cost = 10000;
        this.neighbours = [];
        this.cameFrom = null;
        this.isInQueue = false;
        this.x = 0;
        this.y = 0;
        this.isPartOfPath = false;
        this.isCurrent = false;
    }

    getColor(){
        if(this.isStart){
            return '#22521c'; //Green
        }else if(this.isEnd){
            return '#911129'; //Red
        }else if(this.isCurrent){
            return '#05006e';
        }else if(this.isWall){
            return 'black';
        }else if(this.isPartOfPath){
            return '#22521c'; //Green
        }else if(this.isInQueue){
            return '#b0a235'; //yellow
        }else if(this.isVisited){
            return '#8e80a6'; //grayish
        }else{
            return 'white';
        }
    }
}

