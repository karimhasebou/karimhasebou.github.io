var labels = {};

// 
function readSourceCode(){
    
}

function seperateInstructions(){
    "use strict";
    var code = readSourceCode();
    var instructions = code.split('\\n');
    
    for(var i = 0; i < code;i++){
        instructions[i] = instructions[i].trim();
        console.write(instructions[i]);
    }
}

