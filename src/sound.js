'use strict';

export const bgSound = new Audio('./audio/배경음 톰과제리.WAV');
export const clickSound = new Audio('./audio/뽑을 때 나는 소리.WAV');
export const successSound = new Audio('./audio/성공bgm.WAV');
export const failSound = new Audio('./audio/실패bgm.WAV');


export function play(sound){
  sound.currentTime = 0;
  sound.play();
}

export function stop(sound){
  sound.pause();
}