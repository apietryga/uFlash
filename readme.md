![uFlash Logo](public/img/logo_bordered.png)
<!-- # uFlash* -->
Photobooth system prepared for mirrored booths [read more](https://apietryga.github.io/projects/uflash)

![Prototype field](https://apietryga.github.io/img/contents/uflash_praca.webp)
## Installation
Software tested on Rasberry Pi 3 and here's the process of configuring this device:

Install npm ( tested on 8.5.1 )
```bash
sudo apt-get update
sudo apt install npm
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
npm i --no-optional
```

And you're ready to run uFlash* software by
```bash
npm run prod
```

## Development
To develop project just clone it, install, as showed above, and then install nodemon and run project

```bash
npm i nodemon -g
npm run dev
```
then, you can see client version on 
[localhost:3000](http://localhost:3000/)
and the development version with all nessesary tools on
[localhost:3000/?dev=on](http://localhost:3000/?dev=on)

## Controller 
On [localhost:3000/control.html](http://localhost:3000/control.html) you can change configuarion, and see captured photos and results.