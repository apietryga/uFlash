const { exec } = require('node:child_process');

module.exports = new class LedsController{

  toggle( { params }, res ){
    // TODO: TEST ON LED BELOW CODE

    return res.json({ message: 'leds: module not tested yet', params })

    if( params.state == 'on' ){
      //  exec('c:\WINDOWS\system32\cmd.exe /c C:\xampp\htdocs\inc\bat\led_on.bat');
        // !HEere is file
        // powershell -executionPolicy Unrestricted "& ""C:\xampp\htdocs\fotolustro\Program\inc\ps1\lightON.ps1"""
        // ! AND THE LightON.PS1:
        // [Byte[]] $powerOn  = 0xA0, 0x01, 0x01, 0xA2
        // [Byte[]] $powerOff = 0xA0, 0x01, 0x00, 0xA1
        // $robojax = new-Object System.IO.Ports.SerialPort COM3,9600,None,8,one
        // $robojax.Open()
        // $robojax.Write($powerOn, 0, $powerOn.Count)
        // $robojax.Close()
        // ! END OF FILE
      return res.json({ message: 'led turned on' })
    }

    if( params.state == 'off' ){
      // 	exec('c:\WINDOWS\system32\cmd.exe /c C:\xampp\htdocs\inc\bat\led_off.bat');
        // !here is LIGHTON FILE:
        // powershell -executionPolicy Unrestricted "& ""C:\xampp\htdocs\fotolustro\Program\inc\ps1\lightOFF.ps1"""
        // ! AND THE LightOFF.PS1:
        // [Byte[]] $powerOn  = 0xA0, 0x01, 0x01, 0xA2
        // [Byte[]] $powerOff = 0xA0, 0x01, 0x00, 0xA1
        // $robojax = new-Object System.IO.Ports.SerialPort COM3,9600,None,8,one
        // $robojax.Open()
        // $robojax.Write($powerOff, 0, $powerOff.Count)
        // $robojax.Close()
        // ! END OF FILE
      return res.json({ message: 'led turned off' })
    }

    return res.json({ message: 'no state specified' })


  }

}


// ! OLD PHP CODE: 
// if(isset($_GET['led'])){
// 	$ac = $_GET['led'];
// 	if($ac == "on"){
// 		exec('c:\WINDOWS\system32\cmd.exe /c C:\xampp\htdocs\inc\bat\led_on.bat');
    // !HEere is file
    // powershell -executionPolicy Unrestricted "& ""C:\xampp\htdocs\fotolustro\Program\inc\ps1\lightON.ps1"""
    // ! AND THE LightON.PS1:
    // [Byte[]] $powerOn  = 0xA0, 0x01, 0x01, 0xA2
    // [Byte[]] $powerOff = 0xA0, 0x01, 0x00, 0xA1
    // $robojax = new-Object System.IO.Ports.SerialPort COM3,9600,None,8,one
    // $robojax.Open()
    // $robojax.Write($powerOn, 0, $powerOn.Count)
    // $robojax.Close()
    // ! END OF FILE
// 	}elseif($ac == "off"){
// 		exec('c:\WINDOWS\system32\cmd.exe /c C:\xampp\htdocs\inc\bat\led_off.bat');
    // !here is LIGHTON FILE:
    // powershell -executionPolicy Unrestricted "& ""C:\xampp\htdocs\fotolustro\Program\inc\ps1\lightOFF.ps1"""
    // ! AND THE LightOFF.PS1:
    // [Byte[]] $powerOn  = 0xA0, 0x01, 0x01, 0xA2
    // [Byte[]] $powerOff = 0xA0, 0x01, 0x00, 0xA1
    // $robojax = new-Object System.IO.Ports.SerialPort COM3,9600,None,8,one
    // $robojax.Open()
    // $robojax.Write($powerOff, 0, $powerOff.Count)
    // $robojax.Close()
    // ! END OF FILE
// 	}
// }