export function scoreAssessment(answers, questions) {
  const controlScores = {};
  const gaps = [];
  let totalWeight = 0;
  let totalEarned = 0;

  questions.forEach((q) => {
    const answer = answers[q.id];
    const weight = q.weight;
    totalWeight += weight;

    let earned = 0;
    if (answer === "yes") earned = weight;
    else if (answer === "partial") earned = weight * 0.5;

    totalEarned += earned;

    if (!controlScores[q.control]) {
      controlScores[q.control] = { weight: 0, earned: 0 };
    }
    controlScores[q.control].weight += weight;
    controlScores[q.control].earned += earned;

    if (answer !== "yes") {
      gaps.push({
        id: q.id,
        control: q.control,
        question: q.question,
        guidance: q.guidance,
        severity: q.weight === 3 ? "critical" : q.weight === 2 ? "medium" : "low",
        answer,
      });
    }
  });

  const overallScore = Math.round((totalEarned / totalWeight) * 100);
  const controlBreakdown = Object.entries(controlScores).map(([name, s]) => ({
    name,
    score: Math.round((s.earned / s.weight) * 100),
  }));
  const readiness =
    overallScore >= 85 ? "CE Ready" :
    overallScore >= 60 ? "Nearly Ready" : "Needs Work";

  return { overallScore, controlBreakdown, gaps, readiness };
}