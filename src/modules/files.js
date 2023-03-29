const fs = require('fs');

module.exports = new class filesModule {

  getMaxFileNumber( dir ){
    const files = fs.readdirSync(dir);
    const file_numbers = files.map( file => file.split("_")[1].split(".")[0] * 1)
    file_numbers.sort()
    // const max_file_number = Math.max(...file_numbers)
    return Math.max(...file_numbers)
    // const last_file = "img_" + max_file_number + ".jpg";
  }


}