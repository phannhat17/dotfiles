#!/bin/bash

sudo apt update     
sudo apt upgrade -y

# install git, curl, npm
sudo apt install git -y
sudo apt install curl -y
sudo apt install npm

# install nala
sudo apt install nala -y

# install neofetch
sudo apt install neofetch -y

# install zsh and oh my zsh
sudo apt-get install zsh -y
chsh -s $(which zsh)
yes | sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# mv 
cp .bashrc ~/
cp .zshrc ~/

# run zsh
zsh