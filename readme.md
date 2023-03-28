# uFlash*
Photobooth system prepared for mirrored booths [read more](https://apietryga.github.io/projects/uflash)

## Install
Software tested on Rasberry Pi 3 and here's the process of configuring this device:

Install npm
```bash
sudo apt-get update
sudo apt install npm --fix-missing
```

If you natively have node >= 14.15 you can skip this step, if not - install it by node version manager
```bash
sudo npm install -g n
sudo n v14.15
```

Then clone this repository there
```bash
git clone https://github.com/apietryga/uflash
```

Here'll be need to refresh window by reopen bash, then:
```bash
cd uflash
sudo npm cache clean --force
npm i
```

And you're ready to run uFlash* software by
```bash
npm run prod
```