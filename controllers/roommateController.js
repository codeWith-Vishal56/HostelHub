const Roommate = require("../models/Roommate");

// ================== MATCHING FUNCTION ==================

function calculateMatch(user, other) {
  let score = 0;
  let total = 5;

  if (
    user.sleepSchedule &&
    other.sleepSchedule &&
    user.sleepSchedule === other.sleepSchedule
  )
    score++;

  if (
    user.smokingHabit &&
    other.smokingHabit &&
    user.smokingHabit === other.smokingHabit
  )
    score++;

  if (
    user.drinkingHabit &&
    other.drinkingHabit &&
    user.drinkingHabit === other.drinkingHabit
  )
    score++;

  if (
    user.studyStyle &&
    other.studyStyle &&
    user.studyStyle === other.studyStyle
  )
    score++;

  if (
    user.cleanlinessLevel &&
    other.cleanlinessLevel &&
    user.cleanlinessLevel === other.cleanlinessLevel
  )
    score++;

  return Math.round((score / total) * 100);
}

// ================== CONTROLLERS ==================

module.exports.index = async (req, res) => {
  const posts = await Roommate.find({}).populate("createdBy");
  res.render("roommates/index", { posts });
};

module.exports.newForm = (req, res) => {
  res.render("roommates/new");
};

module.exports.createPost = async (req, res) => {
  try {
    const post = new Roommate(req.body);

    post.createdBy = req.user._id;

    await post.save();

    req.flash("success", "Roommate post created");

    res.redirect("/roommates");
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    res.redirect("/roommates/new");
  }
};

// ================== MATCH FEATURE ==================

module.exports.getMatches = async (req, res) => {
  try {
    // get latest profile of current user
    const currentUserProfile = await Roommate.findOne({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    if (!currentUserProfile) {
      req.flash("error", "Create your roommate profile first");
      return res.redirect("/roommates/new");
    }

    // find other users (exclude current user)
    const others = await Roommate.find({
      createdBy: { $ne: req.user._id },
    });

    // calculate match score
    let matches = others.map((profile) => {
      const matchScore = calculateMatch(currentUserProfile, profile);

      return {
        profile,
        matchScore,
      };
    });

    // sort by highest match
    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.render("roommates/match", { matches });
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong");
    res.redirect("/roommates");
  }
};
