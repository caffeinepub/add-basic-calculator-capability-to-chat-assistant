import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

actor {
  // Function to check for positive/thanks patterns in a question.
  func containsThanksPatterns(question : Text) : Bool {
    let patterns = [
      "thank you", "thanks", "thx",
      "nice", "good", "excellent", "great", "awesome", "fantastic", "amazing", "wonderful",
      "superb", "brilliant", "love this", "appreciate", "helpful", "cool", "well done"
    ];

    patterns.any(func(pattern) { question.contains(#text pattern) });
  };

  public query ({ caller }) func answerQuestion(question : Text) : async Text {
    if (question.trim(#char ' ').isEmpty()) {
      return "You must ask a question for me to answer.";
    };

    let lowerQuestion = question.toLower().trim(#char ' ');

    if (containsThanksPatterns(lowerQuestion)) {
      return "You are very welcome! I always try to be helpful. If you have any suggestions how to improve me, feel free to share them. Have a great day!";
    };

    if (lowerQuestion.contains(#text "creat")) {
      return "adoniyas";
    };

    let electricianPatterns = [
      "hire electrician",
      "electrician dusseldorf",
      "get an electrician for my business",
      "find electrician",
    ];
    if (electricianPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "Yes, I offer electrician services in the Düsseldorf area.";
    };

    let costPatterns = [
      "does it cost to use this service",
      "will there be any fees in the future",
      "are you free to use",
      "is there a subscription fee",
      "do I jave to pay for ai logic",
    ];
    if (costPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "No, this service is free.";
    };

    let privacyPatterns = [
      "do you store user questions",
      "are my questions logged",
      "is my data safe",
      "what data do you save",
      "what information do you collect from users",
    ];
    if (privacyPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "No user questions or input are stored at all.";
    };

    let canisterPatterns = [
      "are you an internet computer canister",
      "is this running on ICP",
      "are you hosted on DFINITY",
      "is this a blockchain service",
    ];
    if (canisterPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "Yes, this service runs as a canister on the Internet Computer and is based on blockchain technology.";
    };

    let sourcesPatterns = [
      "where are your answers from",
      "who wrote your responses",
      "what is the source of your information",
      "what dataset do you use",
    ];
    if (sourcesPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "This system is not trained on any external data and simply returns preconfigured responses.";
    };

    if (lowerQuestion == "test" or lowerQuestion == "testing") {
      return "This service works as intended!";
    };

    // Science questions
    let gravityPatterns = [
      "what is gravity",
      "define gravity",
      "explain gravity",
    ];
    if (gravityPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "Gravity is the force by which a planet or other body draws objects toward its center. It is what keeps us on the ground and what causes objects to fall.";
    };

    let speedOfLightPatterns = [
      "what is the speed of light",
      "how fast is light",
      "speed of light in vacuum",
    ];
    if (speedOfLightPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "The speed of light in a vacuum is approximately 299,792 kilometers per second (km/s).";
    };

    let dnaPatterns = [
      "what is dna",
      "define dna",
      "what does dna stand for",
    ];
    if (dnaPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "DNA, or deoxyribonucleic acid, is the molecule that carries the genetic instructions for life. It is present in all living organisms.";
    };

    let planetsPatterns = [
      "how many planets are there in the solar system",
      "number of planets in solar system",
      "planets in solar system",
    ];
    if (planetsPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "There are eight planets in the solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.";
    };

    let waterBoilingPatterns = [
      "what is the boiling point of water",
      "temperature at which water boils",
      "water boiling temperature",
    ];
    if (waterBoilingPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "The boiling point of water is 100°C (212°F) at standard atmospheric pressure.";
    };

    let photosynthesisPatterns = [
      "what is photosynthesis",
      "define photosynthesis",
      "explain photosynthesis",
    ];
    if (photosynthesisPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "Photosynthesis is the process used by plants to convert light energy, carbon dioxide, and water into glucose and oxygen.";
    };

    // Chemistry questions
    let waterChemicalPatterns = [
      "what is the chemical formula for water",
      "chemical name of water",
      "water chemical symbol",
    ];
    if (waterChemicalPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "The chemical formula for water is H₂O, composed of two hydrogen atoms and one oxygen atom.";
    };

    let sodiumChloridePatterns = [
      "what is sodium chloride",
      "define sodium chloride",
      "sodium chloride chemical name",
    ];
    if (sodiumChloridePatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "Sodium chloride is commonly known as table salt. Its chemical formula is NaCl.";
    };

    // Physics questions
    let newtonsFirstLawPatterns = [
      "what is newton's first law",
      "define newton's first law of motion",
      "explain newton's first law",
    ];
    if (newtonsFirstLawPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "Newton's First Law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by a force.";
    };

    // Biology questions
    let mitochondriaPatterns = [
      "what is the mitochondria",
      "function of mitochondria",
      "mitochondria explained",
    ];
    if (mitochondriaPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "The mitochondria is an organelle found in most cells, often referred to as the 'powerhouse' of the cell because it generates most of the cell's energy.";
    };

    // Math questions (newly added)
    let pythagoreanPatterns = [
      "what is the pythagorean theorem",
      "explain the pythagorean theorem",
      "pythagorean theorem definition",
    ];
    if (pythagoreanPatterns.any(func(pattern) { lowerQuestion.contains(#text pattern) })) {
      return "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides. This can be expressed as a² + b² = c².";
    };

    "Sorry, I am not capable of answering this question so far. I can only answer questions that contain the exact keywords I am set up to recognize.";
  };
};
