#!/usr/bin/env bash

function has_sudo() {
  if [ -x "$(command -v sudo)" ]; then
    return 0
  else
    return 1
  fi
}

if has_sudo; then
  sudo apt install -y tesseract-ocr;
  sudo apt install -y tesseract-ocr-spa;
else
  # Termux proot-distro
  apt install -y tesseract-ocr;
  apt install -y tesseract-ocr-spa;
fi
