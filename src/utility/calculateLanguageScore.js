export function calculateLanguageScore(user, language) {
  return user.progress.proficiencyLevels[language].score;
}
