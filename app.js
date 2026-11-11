const player = document.querySelector('video-player');
const video = document.querySelector('video');
const dialog = document.querySelector('#notice-dialog');
const dialogHeading = document.querySelector('#dialog-heading');
const dialogCopy = document.querySelector('#dialog-copy');
const bufferFill = document.querySelector('#buffer-fill');
const bufferPercent = document.querySelector('#buffer-percent');
const statusText = document.querySelector('#status-text');

function notice(title, message) {
  dialogHeading.textContent = title;
  dialogCopy.textContent = message;
  dialog.showModal();
}
document.querySelector('#dialog-ok').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-x').addEventListener('click', () => dialog.close());

document.querySelectorAll('.chapter').forEach((button) => {
  button.addEventListener('click', () => {
    if (!Number.isFinite(video.duration) || !video.duration) {
      notice('FILE NOT READY', 'Wait for the video metadata to load, then try this chapter marker again.');
      return;
    }
    const pct = Number(button.dataset.seek);
    video.currentTime = video.duration * pct / 100;
    document.querySelectorAll('.chapter').forEach((b) => b.classList.toggle('active', b === button));
    statusText.textContent = `JUMPED TO ${button.querySelector('.chapter-number').textContent}`;
  });
});

function applyFilters() {
  const brightness = Number(document.querySelector('#brightness').value);
  const contrast = Number(document.querySelector('#contrast').value);
  video.style.setProperty('--pixel-brightness', brightness / 100);
  video.style.setProperty('--pixel-contrast', contrast / 100);
  document.querySelector('#brightness-value').value = `${brightness}%`;
  document.querySelector('#contrast-value').value = `${contrast}%`;
}
document.querySelector('#brightness').addEventListener('input', applyFilters);
document.querySelector('#contrast').addEventListener('input', applyFilters);
document.querySelector('#reset-fx').addEventListener('click', () => {
  document.querySelector('#brightness').value = 100;
  document.querySelector('#contrast').value = 100;
  applyFilters();
  statusText.textContent = 'DISPLAY RESET';
});
document.querySelector('#save-fx').addEventListener('click', () => {
  const settings = {
    brightness: document.querySelector('#brightness').value,
    contrast: document.querySelector('#contrast').value
  };
  try { localStorage.setItem('playback-exe-settings', JSON.stringify(settings)); } catch {}
  statusText.textContent = 'SETTINGS SAVED';
});
try {
  const saved = JSON.parse(localStorage.getItem('playback-exe-settings') || 'null');
  if (saved) {
    document.querySelector('#brightness').value = saved.brightness || 100;
    document.querySelector('#contrast').value = saved.contrast || 100;
    applyFilters();
  }
} catch {}

video.addEventListener('progress', () => {
  if (!video.duration || !video.buffered.length) return;
  const end = video.buffered.end(video.buffered.length - 1);
  const pct = Math.min(100, Math.round(end / video.duration * 100));
  bufferFill.style.width = `${pct}%`;
  bufferPercent.textContent = `${pct}%`;
});
video.addEventListener('loadedmetadata', () => {
  statusText.textContent = 'FILE LOADED';
  document.querySelector('#file-title').textContent = 'flower_demo.mp4';
});
video.addEventListener('playing', () => statusText.textContent = 'PLAYING');
video.addEventListener('pause', () => statusText.textContent = video.ended ? 'PLAYBACK COMPLETE' : 'PAUSED');
video.addEventListener('waiting', () => statusText.textContent = 'BUFFERING...');
video.addEventListener('error', () => statusText.textContent = 'MEDIA ERROR');

document.querySelector('.minimize').addEventListener('click', () => {
  document.querySelector('.app-window').classList.toggle('minimized');
  const bottom = document.querySelector('.app-bottom');
  const stage = document.querySelector('.player-stage');
  const utility = document.querySelector('.utility-row');
  const hidden = bottom.hidden;
  bottom.hidden = !hidden; stage.hidden = !hidden; utility.hidden = !hidden;
});
document.querySelector('.maximize').addEventListener('click', () => {
  document.querySelector('.app-window').classList.toggle('expanded');
});
document.querySelector('.close').addEventListener('click', () => {
  video.pause(); video.currentTime = 0;
  document.querySelectorAll('.chapter').forEach((b, i) => b.classList.toggle('active', i === 0));
  statusText.textContent = 'PLAYER RESET';
});
document.querySelectorAll('[data-menu]').forEach((button) => {
  button.addEventListener('click', () => {
    const menu = button.dataset.menu;
    const messages = {
      file: ['FILE MENU', 'Open a video by changing the video src in index.html. The demo is configured with a public sample MP4.'],
      view: ['VIEW MENU', 'Use DISPLAY SETTINGS below to adjust brightness and contrast. The settings can be saved locally.'],
      playback: ['PLAYBACK MENU', 'Keyboard shortcuts: Space = play/pause, M = mute, F = fullscreen, Left/Right arrows = seek 5 seconds.'],
      help: ['ABOUT PLAYBACK.EXE', 'A custom retro multimedia skin concept built on the Video.js v10 web components player.']
    };
    notice(...messages[menu]);
  });
});
