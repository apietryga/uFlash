
netsh wlan set hostednetwork ssid="uFlash" mode="allow" key="uflash2019"
netsh wlan start hostednetwork
ping 127.0.0.1 -n 6 > nul