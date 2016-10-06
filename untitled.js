var memASM = new Uint8Array(2048);
var regsASM = new Int32Array(16);

function assemble(instr)
{
	var code = instr.substr(0, 3);
	code = code.toUpperCase();
	console.log('assmeble ' + code);
	switch (code) {
	case 'ADC':
		asmADC(instr); 
		//add with carry
		break;
	case 'ADD':
		asmADD(instr); 
		//add variants
		break;
	case 'AND':
		asmAND(instr); 
		// AND
		break;
	case 'ASR':
		asmASR(instr); 
		//arithm shift right
		break;
	case 'CMN':
		asmCMN(instr); 
		//compare negative
		break;
	case 'CMP':
		asmCMP(instr); 
		//compare
		break;
	case 'EOR':
		asmEOR(instr); 
		//EOR
		break;
	case 'LDM':
		asmLDMIA(instr); 
		//loadmultiple
		break;
	case 'LDR':
		asmLDRBnH(instr); 
		//load byte and load halfword
		break;
	case 'LSL':
		asmLSL(instr); 	  
		//logical shift left
		break;
	case 'LDS':
		asmLDSBnH(instr); 
		//load sign ext. byte and halfword
		break;
	case 'LSR':
		asmLSR(instr); 	  
		//logical shift right
		break;
	case 'MOV':
		asmMOV(instr);	  
		//move register
		break;
	case 'MUL':
		asmMUL(instr);    
		//multiply
		break;
	case 'MVN':
		asmMVN(instr);    
		//move negative register
		break;
	case 'NEG':
		asmNEG(instr);    
		//negate
		break;
	case 'ORR':
		asmORR(instr);    
		//OR
		break;
	case 'POP':
		asmPOP(instr);    
		//pop registers
		break;
	case 'PUS':
		asmPUSH(instr);   
		//push registers
		break;
	case 'ROR':
		asmROR(instr);    
		//rotate right
		break;
	case 'SBC':
		asmSBC(instr);    
		//subtract with carry
		break;
	case 'STM':
		asmSTMIA(instr);  
		//stire multiple
		break;
	case 'STR':
		asmSTRWnBnH(instr); 
		//store word or half or byte
		break;
	case 'SWI':
		asmSWI(instr);    
		//software interrupt    
		break;
	case 'SUB':
		asmSUB(instr);    
		//subtract 
		break;
	case 'TST':
		asmTST(instr);    
		//test bits
		break;
	default:
		handleB(instr);    
		//handle instructions starting with B
		break;
	}
}

function handleB(instr)
{
	var code = substr(0, 2);
	code = code.toUpperCase();
	switch (code) {
	case 'BI':
		asmBIC(instr); 
		//bit clear
		break;
	case 'BL':
		asmBL(instr); 
		//branch and link
		break;
	case 'BX':
		asmBX(instr); 
		//branch and exchange
		break;
	case 'B ':
		asmuncB(instr); 
		//unconditional branch
		break;
	default:
		asmcnB(instr); 
		//conditional branch
		break;
	}
}

function asmADC(instr)
{
	var out = '010000101';
	//var res = str.match(/ain/g);
	var val = instr.match(/[0-9]+/g);
	var rd = Number(val[0]).ToString(2);
	var rm = Number(val[1]).ToString(2);
}

function foo(sign, len, str)
{	
	var res = '';
	if (sign) {
		res = str;	
		for(var i = 0; i < len - str.length - 1; i++)
			res.push('0');
	}
	else {
		res = str.substring(str.length - len, str.length);
	}
	return res;
}

function asmAND(instr)
{
	var code = new Int32Array(1);
	code[0] = (code | 0x1ff) << 6;
	var val = instr.match(/[0-9]+/g);
	var rd = Number(val[0]);
	var rm = Number(val[1]);
	code[0] |= rd;
	code[0] = code[0] | (rm << 3);
	//pass code[0] here
}

function asmASR(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	if (val.length == 3) {
		//ASR(1)
		code[0] = (code | 0x2) << 11;
		var rd = val[0];
		var rm = val[1];
		var imm = val[2];
		code[0] = code[0] | (rd >>> 0);
		code[0] = code[0] | (rm << 3);
		code[0] = code[0] | (imm << 6);
	}
	else {
		//ASR(2)
		code[0] = (code | 0x104) << 6;
		var rd  = val[0];
		var rs = val[1];
		code[0] = code[0] | rd;
		code[0] = code[0] | (rs << 3);
	}
}

function asmCMN(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	code[0] = (code | 0x10b) << 6;
	var rn = val[0];
	var rm = val[1];
	code[0] = code | (rn >>> 0);
	code[0] = code | (rm << 3);
}

function asmEOR(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rd = val[0];
	var rm = val[1];
	code[0] = (code | 0x101) << 6;
	code[0] = code | rm << 3;
	code[0] = code | rd >>> 0;
}

function asmMUL(instr)
{

	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rd = val[0];
	var rm = val[1];
	code[0] = (code | 0x10d) << 6;
	code[0] = code | rm << 3;
	code[0] = code | rd >>> 0;
}

function asmMVN(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rd = val[0];
	var rm = val[1];
	code[0] = (code | 0x10e) << 6;
	code[0] = code | (rm << 3);
	code[0] = code | (rd >>> 0);
}

function asmNEG(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rd = val[0];
	var rm = val[1];
	code[0] = (code | 0x109) << 6;
	code[0] = code | (rm << 3);
	code[0] = code | (rd >>> 0);
}

function asmORR(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rd = val[0];
	var rm = val[1];
	code[0] = (code | 0x10c) << 6;
	code[0] = code | (rm << 3);
	code[0] = code | (rd >>> 0);
}

function asmROR(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rd = val[0];
	var rs = val[1];
	code[0] = (code | 0x107) << 6;
	code[0] = code | (rs << 3);
	code[0] = code | rd >>> 0;
}

function asmSBC(instr)
{
	//need to handle negative
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rd = val[0];
	var rm = val[1];
	code[0] = (code | 0x105) << 6;
	code[0] = code | (rs << 3);
	code[0] = code | (rd >>> 0);
}


function asmSWI(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var imm = val[0];
	code[0] = (code | 0x6e) << 8;
	code[0] = code | (imm >>> 0);
}

function asmTST(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rn = val[0];
	var rm = val[1];
	code[0] = (code | 0x108) << 6;
	code[0] = code | (rm << 3);
	code[0] = code | (rn >>> 0);
}

function asmADD(instr)
{
	var code = new Int32Array(0);
	var val = instr.match(/[0-9]+/g);
	var rNo = instr.match(/R/g);
	switch (rNo.length) {
		case 0:
			//add7
			code[0] = (code[0] | 0x160) << 7;
			var imm = val[0];
			code[0] = code[0] | (imm >>> 0);
			break
		case 1:
			var pc = instr.match)(/PC/g);
			var sp = instr.match)(/SP/g);
			if (val[2] < 0) {
				//sub here
			}
			else
				{
					if (pc.length <  1 && sp.length < 1) 
				//add2
				code[0] = (code[0] | 0x06) << 11;
			else {
					if (sp < 1)
						//add5
						code[0] = (code[0] | 0x14) << 11;
					else
						//add6
						code[0] = (code[0] | 0x15) << 11;
				}
					var rd = val[0];
					var imm = val[1];
					code[0] = code[0] | (imm >>> 0);
					code[0] = code[0] | (rd << 8);
			}
			break;
		case 2:
			if (val.length < 3) {
				//add4
				//need revision
				var rd = val[0];
				var rm = val[1];
				code[0] = (code[0] | 0x084) << 8;
				code[0] = code[0] | ((rd >>> 0) & 0x7);
				code[0] = code[0] | (rn << 3) ;
				code[0] = code[0] | (((rd >>> 0) & 0x8) << 7);
			}
			else {
				//add1
				var rd = val[0];
				var rn = val[1];
				var imm = val[2];
				code[0] = (code[0] | 0x0d) << 9;
				code[0] = code[0] | (rd >>> 0);
				code[0] = code[0] | (rn << 3);
				code[0] = code[0] | (imm << 6);
			}
			break;
		case 3:
			//add3
			code[0] = (code[0] | 0x0c) << 9;
			var rd = val[0];
			var rn = val[1];
			var rm = val[2];
			code[0] = code[0] | (rd >>> 0);
			code[0] = code[0] | (rn << 3);
			code[0] = code[0] | (rn << 6);
			break;
	}
	//pass code[0] here
}

function asmcnB(instr) 
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var simm = val[0];
	var cond;
	//substring cond here
	switch (cond) {
		//encode conditions here
	}
	code[0] = (code[0] | 0x0d) << 12;
	code[0] = code[0] | ((simm >>> 0) & 0xff);
	code[0] = code[0] | (cond << 8);
	//pass code[0] here
} 

function asmuncB(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var simm = val[0];
	code[0] = (code[0] | 0x1c) << 12;
	code[0] = code[0] | ((simm >>> 0) & 0x7ff);
	//pass code[0] here
} 


function asmBIC(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rd = val[0];
	var rm = val[1];
	code[0] = (code[0] | 0x10d) << 6;
	code[0] = code[0] | (rd >>> 0);
	code[0] = code[0] | (rm << 3);
	//pass code[0] here
} 

function asmCMP(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	val rNo = instr.match(/R/g);
	if (rNo == 1) {
		//cmp1
		var rn = val[0];
		var imm = val[1];
		code[0] = (code[0] | 0x05) << 11;
		code[0] = code[0] | (imm >>> 0);
		code[0] = code[0] | (rn << 8);
	}
	else {
		var rn = val[0];
		var rm = val[1];
		if ((rn < 8) && (rm < 8)) {
			//cmp2
			code[0] = (code[0] | 0x10a) << 6;
			code[0] = code[0] | (rn >>> 0);
			code[0] = code[0] | (rm << 3);
		}
		else {
			//cmp3
			code[0] = (code[0] | 0x45) << 8;
			code[0] = code[0] | ((rn >>> 0) & 0x7);
			code[0] = code[0] | (rm << 3);
			code[0] = code[0] | (((rn >>> 0) & 0x8) << 7);
		}
	}
	//pass code[0] here
}

function asmLDR(instr)
{
	var code = new Int32Array(1);
	var val = instr.match(/[0-9]+/g);
	var rNo = instr.match(/R/g);
	switch (rNo) {
		case 1:
			var rd = val[0];
			var imm = val[1];
			var pc = instr.match(/PC/g);
			if (pc.length == 1)  {
				//ldr3
				code[0] = (code[0] | 0x09) << 11; 
			}
			else {
				//ldr4
				code[0] = (code[0] | 0x13) << 11;
			}
			code[0] = code[0] | (imm >>> 0);
			code[0] = code[0] | (rd << 8);
			break;
		case 2:
			//ldr1
			var rd = val[0];
			var rn = val[1];
			var imm = val[2];
			code[0] = (code[0] | 0x0d) << 11;
			code[0] = code[0] | (rd >>> 0);
			code[0] = code[0] | (rn << 3);
			code[0] = code[0] | (imm << 6);
			break;
		case 3:
			//ldr2
			var rd = val[0];
			var rn = val[1];
			var rm = val[2];
			code[0] = (code[0] | 0x2c) << 9;
			code[0] = code[0] | (rd >>> 0);
			code[0] = code[0] | (rn << 3);
			code[0] = code[0] | (rm << 6);
			break;
	}
	//pass code[0] here
}
