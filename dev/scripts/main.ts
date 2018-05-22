const protocolQuantity = 60;
const instructionQuantityInProtocol = 3;
const protocolInPageQuantity = 10;

declare function require (url: string): void;

const dataInstructions = require("./instructions.json");

const indexArray = [];
for (let i = 0; i < dataInstructions.length; i++) {
    indexArray.push(i);
}
const randomIndexArray = Shuffle(indexArray);

const imgContainers = document.querySelectorAll("[data-index]");
console.log(imgContainers);

let iterator = 0;
for (const imgContainer of imgContainers) {
    (imgContainer as HTMLElement).setAttribute("data-index", `${randomIndexArray[iterator] + 1}`);

    iterator++;
}

let instructionIterator = 0;
for(const dataInstruction: {image: string, value: string} of dataInstructions){
    const container = imgContainers[instructionIterator] as HTMLDivElement;

    dataInstructions[instructionIterator].url = container.querySelector("img").src;

    instructionIterator++;
}

for (let instruction of dataInstructions) {
    const randomImageContainer = document.querySelector(`[data-index="${instruction.img}"]`);

    const image = randomImageContainer.querySelector("img");
    image.src = instruction.url;

    const imageDescription = document.createElement("div");
    imageDescription.innerHTML = instruction.value;
    imageDescription.className = "legende";


    randomImageContainer.appendChild(image);
    randomImageContainer.appendChild(imageDescription);
}

let blocGeneratedCounter = 0;
let randomProtocolContainer: HTMLElement;
let randomProtocolContainer_left: HTMLElement;
let randomProtocolContainer_right: HTMLElement;

let listOfRandomInstruction = [];

while( blocGeneratedCounter < protocolQuantity) {
    const protocolContainer = document.createElement("div");
    protocolContainer.className = "protocol-container";

    const protocolCounter = document.createElement("h4");
    protocolCounter.innerHTML = `PROTOCOLE <span class="protocole-counter-container">
                                                <span class="protocole-counter">${blocGeneratedCounter + 1}</span>
                                                <svg class="circle" width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                    <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
                                                    <desc>Created with Sketch.</desc>
                                                    <defs></defs>
                                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g id="Artboard" stroke-width="0.25" stroke="#000000">
                                                            <circle id="Oval" cx="6" cy="6" r="5.875"></circle>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </span>`;

    protocolContainer.appendChild(protocolCounter);

    listOfRandomInstruction = [];

    for (let i = 0; i < instructionQuantityInProtocol; i++) {
        const instruction = document.createElement("p");

        instruction.innerHTML = getRandomInstruction();
        protocolContainer.appendChild(instruction);
    }

    if (blocGeneratedCounter % protocolInPageQuantity === 0) {
        randomProtocolContainer = document.createElement("div");
        randomProtocolContainer.className = `page-${blocGeneratedCounter / protocolInPageQuantity + 18}`;

        document.querySelector(".random-protocol-container").appendChild(randomProtocolContainer);

        if(blocGeneratedCounter === 0){
            const randomProtocolTitle = document.createElement("h2");
            randomProtocolTitle.innerHTML = "PROTOCOLES ALÉATOIRES";
            randomProtocolTitle.className = "random-protocol-title";
            randomProtocolContainer.appendChild(randomProtocolTitle);
        }

        randomProtocolContainer_left = document.createElement("div");
        randomProtocolContainer_left.className = "column-left";

        randomProtocolContainer_right = document.createElement("div");
        randomProtocolContainer_right.className = "column-right";

        randomProtocolContainer.appendChild(randomProtocolContainer_left);
        randomProtocolContainer.appendChild(randomProtocolContainer_right);
    }

    if (blocGeneratedCounter % protocolInPageQuantity < protocolInPageQuantity/2) {
        (randomProtocolContainer_left as HTMLElement).appendChild(protocolContainer);
    } else {
        (randomProtocolContainer_right as HTMLElement).appendChild(protocolContainer);
    }

    blocGeneratedCounter ++;
}

function getRandomInstruction(): string {

    let randomIndex = getRandomDataInstructionArrayIndex();
    while ( listOfRandomInstruction.indexOf(randomIndex) !== -1 ) {

        randomIndex = getRandomDataInstructionArrayIndex();
    }

    listOfRandomInstruction.push(randomIndex);

    return dataInstructions[ randomIndex ].value;
}

function getRandomDataInstructionArrayIndex(): number {
    return Math.floor(Math.random() * dataInstructions.length ) + 0;
}

function Shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};