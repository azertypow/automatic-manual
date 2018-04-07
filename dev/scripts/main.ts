const protocolQuantity = 50;
const instructionQuantityInProtocol = 5 ;

declare function require (url: string): void;

const dataInstructions = require("./instructions.json");

for (let instruction of dataInstructions) {
    console.log(instruction);

    const imageDescription = document.createElement("span");
    imageDescription.innerHTML = instruction.value;
    imageDescription.className = "image-description";

    document.querySelector(`[data-index="${instruction.img}"]`).appendChild(imageDescription);
}

let blocGeneratedCounter = 0;
while( blocGeneratedCounter < protocolQuantity) {
    const protocolContainer = document.createElement("div");
    protocolContainer.className = "protocol-container";

    const protocolCounter = document.createElement("h4");
    protocolCounter.innerHTML = `PROTOCOLE <span class="protocole-counter">${blocGeneratedCounter + 1}</span>`;

    protocolContainer.appendChild(protocolCounter);

    for (let i = 0; i < instructionQuantityInProtocol; i++) {
        const instruction = document.createElement("p");
        instruction.innerText = getRandomInstruction();
        protocolContainer.appendChild(instruction);
    }

    document.querySelector(".random-protocol-container").appendChild(protocolContainer);

    blocGeneratedCounter ++;
}

function getRandomInstruction(): string {
    return dataInstructions[ getRandomDataInstructionArrayIndex() ].value;
}

function getRandomDataInstructionArrayIndex(): number {
    return Math.floor(Math.random() * dataInstructions.length ) + 0;
}