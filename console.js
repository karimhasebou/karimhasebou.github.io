// for display instructions executed
// prints output to web ui
// all ui events are written here

function printInstruction(str){
    var formattedOut = '';
    for(var i = 0; i < str.length;i++)
        formattedOut += '<span style="background-color: lightgrey;">'+str[i]+'</span>'; document.getElementById('executed_instruction').innerHTML = formattedOut;
}

function printRegisterContent(regs){
  //  var data = '<tr><th>Register</th><th>Value</th></tr>';
    var headers = '<tr>',data='<tr>';
    for(var i = 0; i < regs.length;i++){
    //        data += '<tr>'+'<td>R'+i+'</td>'+'<td>'+regs[i]+'</td>'+'</tr>';
        headers += '<th>R'+i+'</th>';
        data += '<td>'+regs[i]+'</td>';
    }
    headers += '</tr>';
    data +='</tr>';
    document.getElementById('register_content').innerHTML = headers+data;
}


function openFile(){
    showDropBox();
}

function showDropBox(){
    document.getElementById('fileDropBox').style.display = "block";
}

function hideDropBox(){
    document.getElementById('fileDropBox').style.display = "none";
}

function readFileContent(event){
    "use strict";
    var file = event.target.files[0];

    if(file){
        var reader = new FileReader();

        reader.onload = function(e){
            var contents = e.target.result;
            var program = new Uint8Array(contents);

            for(var i = 0; i < program.length;i++)
                mem[i] = program[i]; // temp fix

            setBeginningConfig();
            notify('Success','File read');
        }
        reader.readAsArrayBuffer(file);
    }else{
        alert('Failed to load file');
    }
    hideDropBox();
}

function resizeUint8(baseArrayBuffer, newByteSize) {
    var resizedArrayBuffer = new ArrayBuffer(newByteSize),
        len = baseArrayBuffer.byteLength,
        resizeLen = (len > newByteSize)? newByteSize : len;

        (new Uint8Array(resizedArrayBuffer, 0, resizeLen)).set(new Uint8Array(baseArrayBuffer, 0, resizeLen));

    return resizedArrayBuffer;
}

function setBeginningConfig(){
    regs[13] = mem[0] | mem[1]<<8 | mem[2]<<16 | mem[3]<<24;
    regs[15] = (mem[4] | mem[5]<<8 | mem[6]<<16 | mem[7]<<24) + 4; // point two words ahead
}

function addEventListeners(){
 document.getElementById('filesIn').addEventListener('change',readFileContent,true);

  document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
        Notification.requestPermission();
  });
  printRegisterContent(regs);
  //testcode();
}
// for testing software interrupts
function testcode(){
    regs[0] = 120;
    regs[1] = 10;

    var instr = (0xdf << 8) | 2;
    softwareInterrupt(instr);

    regs[0] = 120;
    var instr = (0xdf << 8) | 5;
    softwareInterrupt(instr)
}

function notify(title,prompt){
    if(!Notification){
        alert('Desktop notifications not available');
        return;
    }

    if(Notification.permission !== "granted")
        Notification.requestPermission();
    else{
        var notification = new Notification(title, {
            body: prompt,
        });

    }
}

function printProgramOut(instr){
    document.getElementById("program_output").innerHTML += instr + "</br>";
}

function disableExecutionButtons(){
    var start = document.getElementById('start_button');
    var stop  = document.getElementById('stop_button');
    var step  = document.getElementById('step_button');

    start.disabled = true;
    stop.disabled = true;
    step.disabled = true;
}
