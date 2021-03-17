const defaultSettings = {
  autoStartTimer: false,
  showWelcomeModal: true,
  forcedBreaks: true,
  defaultBreakTime: 5,
  defaultStudyTime: 30,
};

const settingsKeys = Object.keys(defaultSettings);

module.exports = {
  defaultSettings,
  settingsKeys,
};