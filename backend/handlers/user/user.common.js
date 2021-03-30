const defaultSettings = {
  autoStartTimer: false,
  showPreStudyModal: true,
  showWelcomeWizard: true,
  forcedBreaks: true,
  defaultBreakTime: 5,
  defaultStudyTime: 30,
  defaultLongBreak: 15,
};

const settingsKeys = Object.keys(defaultSettings);

module.exports = {
  defaultSettings,
  settingsKeys,
};