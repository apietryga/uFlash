const fs = require('fs');
const path = require('path');

module.exports = new class filesModule {

  getMaxFileNumber( dir ){
    const files = fs.readdirSync(dir);
    const file_numbers = files.map( file => file.split("_")[1].split(".")[0] * 1)
    file_numbers.sort()
    if(file_numbers.length == 0){
      return 0
    }
    return Math.max(...file_numbers)
  }

  createDirIfNotExists(dir) {
    if (!fs.existsSync(dir)){ 
      if( !fs.existsSync(path.dirname(dir)) ){
        this.createDirIfNotExists(path.dirname(dir))
      }
      fs.mkdirSync(dir) 
    }
    return dir
  }

}