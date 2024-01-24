import { calculateLanguageScore } from "./calculateLanguageScore";

export function generateLeaderboard(language, users) {
  if (!users) {
    console.log("Users not loaded yet");
    return;
  }
  //filtering the user based on the language
  const filteredUsers = users.filter((user) =>
    user.languagePreferences.includes(language)
  );
  //fetching the user score
  const usersWithScores = filteredUsers.map((user) => ({
    username: user.username,
    languageScore: calculateLanguageScore(user, language),
  }));

  //sorting them according to the score
  const sortedUsers = usersWithScores.sort(
    (a, b) => b.languageScore - a.languageScore
  );
  //set the score in the usestate
  return sortedUsers;
}
