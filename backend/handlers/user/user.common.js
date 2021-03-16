const defaultSettings = {
  autoStartTimer: false,
  showWelcomeModal: true,
  forcedBreaks: true,
  defaultBreakTime: 30,
  defaultStudyTime: 5,
};

const settingsKeys = Object.keys(defaultSettings);

module.exports = {
  defaultSettings,
  settingsKeys,
};