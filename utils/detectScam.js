module.exports = function detectScam(hostel) {
  let suspicious = false;

  // 🔴 Rule 1: Very low price
  if (hostel.price < 1000) {
    suspicious = true;
  }

  // 🔴 Rule 2: Spam keywords
  const spamWords = ["free", "urgent", "call now", "limited offer"];

  const desc = hostel.description.toLowerCase();

  spamWords.forEach((word) => {
    if (desc.includes(word)) {
      suspicious = true;
    }
  });

  // 🔴 Rule 3: Too many reports
  if (hostel.reportsCount >= 3) {
    suspicious = true;
  }

  return suspicious;
};
