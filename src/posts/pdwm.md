---
title: "PDWM - Personal DWM Fork"
date: "2021-03-20" 
description: "My customized dwm setup with patches for a more practical and visually pleasing Linux window manager"
tags: ["dwm", "linux", "window-manager", "suckless", "customization"]
published: true
---

# pdwm

A personal dwm fork with a more practical and visually pleasing setup. It's just a bunch of patches and a few personal changes to the source. My [fork](https://github.com/lawRathod/pdwm).

---

## Brief

Suckless's dwm is a dynamic window manager for Linux. It's one of the most popular window managers, but because of the suckless mentality, the default dwm is very minimal. It's reasonable and functional but lacks extra features. Luckily, the way patches work with dwm means you can transform it to look like other window managers. There are patches for the core and the bar. I've been using dwm for almost six months and have updated my fork with patches and customized the config. This post describes my dwm setup.

---

## What I've Got

Here are the patches I've applied, in the order I applied them. (You can find a "how-to apply a patch" section at the end of this post.)

- **[systray](https://dwm.suckless.org/patches/systray/)** - Adds the system tray to the right corner of the status bar.
- **[autostart](https://dwm.suckless.org/patches/autostart/)** - Lets you have a script called `~/.dwm/autostart.sh` that dwm runs every time it starts.
- **[vanitygaps](https://dwm.suckless.org/patches/vanitygaps/)** - An eye-candy patch that adds gaps between windows in tile mode.
- **[hide_vacant_tags](https://dwm.suckless.org/patches/hide_vacant_tags/)** - Hides vacant tags in the status bar.
- **[quickswitch](https://github.com/lawRathod/pdwm/commit/83e517141f3d063e3bad285ca388294ae9f2e052#diff-62eebf5eaf0e6a76a21dfed9da6556ee5413ddb49f06013bd83403cc1a485d98)** - I made changes to the `dwm.c` file for this feature. This lets you switch between two windows next to each other with **Alt+Tab** (or whatever keybinding you set). This makes it more comfortable to transition from Windows to Linux and back. I'll try to create a patch from this to submit to suckless.

These are the patches I've applied. Some other useful patches are **[colorbar](https://dwm.suckless.org/patches/colorbar/)** and most of the patches related to the status bar. I highly suggest looking at the patches yourself to get the most out of dwm. Linux encourages customization, and dwm is highly customizable, so you can make it whatever you want.

Here are some of my scripts for the statusbar and the autostart script:

### autostart.sh

```bash
 #! /bin/bash
 dunst &
 copyq &
 xss-lock -v -l xsecurelock &
 picom &
 nm-applet &
 feh --bg-scale /home/law/Downloads/wallpaper.jpg
 /home/law/apps/scripts/statusbar.sh &
```

### statusbar.sh

```bash
 #!/bin/sh

 while :
 do
 /home/law/apps/scripts/statusbarnoloop.sh
 sleep 60
 done
```

### statusbarnoloop.sh

```bash
 #!/bin/sh

 time=$(date "+ %a, %d  %H:%M")
 mute=$(pactl list sinks | awk '/Mute:/{ print $2 }' | head -n 1)
 bat=$(acpi -b | awk '{ print $4}' | sed 's/%,//')
 batStat=$(acpi -b | awk '{ print $3}' | sed 's/,//')

 if [ $bat -lt 15 ] && [ $batStat = 'Discharging' ]
 then
 notify-send 'Battery Low!' "Plug in the charger."

 elif ( [ $bat = 30 ] || [ $bat = 25 ] ) && [ $batStat = 'Discharging' ]
 then
 notify-send 'Battery Low!' "Plug in the charger."

 elif ( [ $bat = 90 ] || [ $bat = 85 ] ) && [ $batStat = 'Charging' ]
 then
 notify-send 'Charged!' "Remove the charger."

 elif [ $bat -gt 95 ] && [ $batStat = 'Charging' ]
 then
 notify-send 'Charged!' "Remove the charger."

 fi

 if [ $batStat = 'Charging' ]
 then
 bat=$bat" "
 else
 bat=$bat" "
 fi

 volume=$(amixer -c 1 -M -D pulse get Master | grep -o -E [[:digit:]]+% | awk "FNR <= 1")

 if [[ $1 = "--ref" ]]
 then
 temp=$(curl "api.openweathermap.org/data/2.5/weather?q=Jaisalmer&appid={YOU_USE_YOURS}&units=metric" | jq .main.temp)
 if [[ $temp = "" ]]
 then
 temp=" "
 else
 temp=$(printf %0.f $temp)"°C"
 fi
 echo "$temp" > /home/law/apps/scripts/temp
 fi

 temp=$(cat /home/law/apps/scripts/temp)

 if [[ $mute = "yes" ]]
 then
 xsetroot -name "  $bat  $temp 婢 mute $time "
 else
 xsetroot -name "  $bat  $temp 墳 $volume $time "
 fi
```

---

## How to Apply Patches

To apply a patch, use the following command in the project directory (in this case, dwm):

```bash
 patch < NAME_OF_THE_DIFF_FILE
```

#### Did it fail for you?

Patching rarely succeeds on its own. A **.diff** file contains the location of the code that needs to change and what to replace it with. If you've modified those lines of code before, the patch will fail. You'll then have to manually look at the diff file and change the code yourself.

---

That's my dwm fork, available on my [GitHub](https://github.com/lawRathod/). I've tried all the major window managers, but dwm feels the simplest and most extensible. I'm not a fan of the suckless mentality, but you should definitely give dwm a try; it's a great window manager.

---

Thanks for reading\! Have a great day.
