#!/bin/bash

# Minimize on Click
gsettings set org.gnome.shell.extensions.dash-to-dock click-action 'minimize'

# download wallpaper
wget https://cdn.discordapp.com/attachments/940990932814282806/1090254486385217587/wallpaper.png

# 
sudo apt update     
sudo apt upgrade -y

# install git, curl, npm
sudo apt install git -y
sudo apt install curl -y
sudo apt install npm


# install tweaks and extensions
sudo apt install gnome-tweaks -y
sudo apt install gnome-shell-extensions -y

# install nala
sudo apt install nala -y

# install neofetch
sudo apt install neofetch -y

# open in code, install chrome
./open_in_code.sh
./install_chrome.sh
./install_docker_desktop.sh

# install zsh and oh my zsh
sudo apt-get install zsh
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# mv 
cp -r .themes ~/
cp .bashrc ~/
cp .zshrc ~/





