const $ = (selector, root = document) => root.querySelector(selector);

function updateClock() {
  const now = new Date();
  const full = now.toLocaleTimeString('en-GB', { hour12: false });
  const clock = $('#clock');
  const taskClock = $('#taskClock');
  if (clock) clock.textContent = full;
  if (taskClock) taskClock.textContent = full.slice(0, 5);
}
updateClock();
window.setInterval(updateClock, 1000);

const video = $('video', $('.cz-player'));
const chapterButtons = [...document.querySelectorAll('.chapter')];

function setActiveChapter(activeButton) {
  chapterButtons.forEach((button) => {
    const active = button === activeButton;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'time');
    else button.removeAttribute('aria-current');
  });
}

chapterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const seconds = Number(button.dataset.time);
    if (!video || !Number.isFinite(seconds)) return;

    const seekWhenReady = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : seconds;
      video.currentTime = Math.min(seconds, duration);
    };

    if (video.readyState >= 1) seekWhenReady();
    else video.addEventListener('loadedmetadata', seekWhenReady, { once: true });

    setActiveChapter(button);
  });
});

if (video) {
  const syncChapter = () => {
    let active = chapterButtons[0];
    for (const button of chapterButtons) {
      if (video.currentTime >= Number(button.dataset.time)) active = button;
    }
    if (active) setActiveChapter(active);
  };

  video.addEventListener('timeupdate', syncChapter);
  video.addEventListener('loadedmetadata', syncChapter);
}
