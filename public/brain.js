/**
 * @file brain.js
 * @description Election Guide AI - Data Layer containing structured knowledge base.
 * @version 1.0.0
 * @author Senior Engineer
 * @date 2026-05-03
 */

(function(global) {
  'use strict';

  // ── DATA LAYER ──────────────────────────────────────────────
  
  /**
   * Structured knowledge blocks for election topics.
   * Alphabetically sorted by topic key.
   * @constant {Object}
   */
  const KNOWLEDGE = {
    by_election: {
      keywords: ["by-election","bypoll","mid-term election","vacant seat","byelection"],
      quickAnswer: "A by-election (or bypoll) is an election held to fill a political office that has become vacant between general elections.",
      steps: [
        "A seat becomes vacant if a sitting MP/MLA dies, resigns, or is disqualified.",
        "The Election Commission must hold a by-election within 6 months of the vacancy.",
        "Only the voters of that specific constituency vote in a bypoll.",
        "The winner serves only for the remainder of the original 5-year term.",
        "It does not affect the timeline of the next General Election."
      ],
      whyItMatters: "It ensures that constituencies do not remain unrepresented for long periods if their representative leaves office.",
      commonConfusions: "People confuse by-elections with mid-term elections. Mid-terms happen when the entire government falls; bypolls are for individual seats.",
      followUp: "Have you ever heard of Delimitation?"
    },
    campaigning_mcc: {
      keywords: ["campaigning","campaign rules","model code of conduct","mcc","election rallies"],
      quickAnswer: "Campaigning is how candidates ask for votes. The Model Code of Conduct (MCC) is a set of rules they must follow to ensure fair play.",
      steps: [
        "No appealing to caste or communal feelings to secure votes.",
        "No bribing or intimidating voters.",
        "No using government machinery or transport for campaigning.",
        "Ministers cannot announce financial grants or lay foundation stones after the MCC is active.",
        "Campaigning must stop 48 hours before polling begins (the silent period)."
      ],
      whyItMatters: "The MCC creates a level playing field so the ruling party doesn't have an unfair advantage over the opposition.",
      commonConfusions: "The MCC is not a law passed by Parliament; it is a consensus agreement between political parties enforced by the Election Commission.",
      followUp: "Should we look at what happens on polling day?"
    },
    candidate_nomination: {
      keywords: ["nomination","file nomination","candidate registration","how to contest","become a candidate"],
      quickAnswer: "Candidate nomination is the process where individuals officially register to run for an election in a specific constituency.",
      steps: [
        "Candidate fills out the nomination form and an affidavit detailing their assets and criminal records.",
        "They submit the form and a security deposit to the Returning Officer.",
        "The Election Commission scrutinizes the forms to ensure they meet eligibility criteria.",
        "Candidates have a window to withdraw their nomination if they change their minds.",
        "The final list of contesting candidates is published."
      ],
      whyItMatters: "This ensures that voters have full transparency about who they are voting for and that candidates meet constitutional requirements.",
      commonConfusions: "People think anyone can just start campaigning. You must be officially cleared by the Election Commission first.",
      followUp: "Would you like to learn about the campaigning rules (Model Code of Conduct)?"
    },
    coalition_government: {
      keywords: ["coalition","alliance","no majority","hung parliament","coalition government"],
      quickAnswer: "A coalition government is formed when no single political party achieves an absolute majority in the election.",
      steps: [
        "No single party crosses the 50% seat mark.",
        "Two or more parties agree to join together to combine their seat counts.",
        "They draft a Common Minimum Programme outlining their shared goals.",
        "They present their combined strength to the President/Governor.",
        "If accepted, they form a government together, usually sharing ministerial portfolios."
      ],
      whyItMatters: "Coalitions ensure that a government can still function even when the public mandate is fractured, forcing parties to compromise.",
      commonConfusions: "Coalitions are not inherently unstable; many successful governments have completed full terms as coalitions.",
      followUp: "Would you like to understand the difference between a majority and minority government?"
    },
    constituencies: {
      keywords: ["constituency","constituencies","voting district","seat","ward"],
      quickAnswer: "A constituency is a specific geographical area whose residents elect a representative to a legislative body.",
      steps: [
        "For Lok Sabha (National), the country is divided into Parliamentary Constituencies (MPs).",
        "For Vidhan Sabha (State), states are divided into smaller Assembly Constituencies (MLAs).",
        "For local bodies, cities/villages are divided into Wards (Corporators/Panchs).",
        "You can only vote in the constituency where you officially live.",
        "Candidates can contest from a constituency even if they don't live there (with some exceptions)."
      ],
      whyItMatters: "It ensures that every geographic region gets a voice in the government.",
      commonConfusions: "People often think their city is one constituency. Large cities like Delhi or Mumbai are broken down into multiple separate constituencies.",
      followUp: "Shall we zoom out and define Democracy itself?"
    },
    delimitation: {
      keywords: ["delimitation","boundaries","constituency drawing","redrawing boundaries"],
      quickAnswer: "Delimitation is the act of redrawing the boundaries of assembly or parliamentary constituencies to reflect population changes.",
      steps: [
        "A Delimitation Commission is set up by the government.",
        "They use the latest census data to analyze population shifts.",
        "Boundaries are redrawn so that every constituency has roughly an equal population.",
        "This ensures the principle of \"One Person, One Vote, One Value.\"",
        "The Commission's orders have the force of law and cannot be challenged in court."
      ],
      whyItMatters: "Without delimitation, a city with 3 million people and a town with 100,000 people might both elect just one MP, which is unfair.",
      commonConfusions: "Delimitation does not change the total number of states, but it changes the borders of the voting districts within them.",
      followUp: "Would you like a simple explanation of Constituencies?"
    },
    democracy: {
      keywords: ["democracy","what is democracy","why elections happen","purpose of elections"],
      quickAnswer: "Democracy is a system of government where power is vested in the people, who rule either directly or through freely elected representatives.",
      steps: [
        "The word comes from Greek: \"Demos\" (people) and \"Kratos\" (power).",
        "Citizens have the right to choose their leaders through regular, free, and fair elections.",
        "It relies on the protection of human rights and the rule of law.",
        "Every citizen's vote holds equal value (One Person, One Vote).",
        "Leaders are accountable to the public and can be voted out of power."
      ],
      whyItMatters: "It prevents dictatorships and ensures that the government works for the welfare of the public, not just a select few.",
      commonConfusions: "Democracy is not just about holding elections; it also requires a free press, independent courts, and protected civil rights.",
      followUp: "Would you like to look at some common election myths?"
    },
    election_commission: {
      keywords: ["election commission","eci","who conducts elections","role of ec","chief election commissioner"],
      quickAnswer: "The Election Commission of India (ECI) is an independent constitutional body responsible for conducting free and fair elections.",
      steps: [
        "It prepares and updates the voter rolls.",
        "It announces election schedules and implements the Model Code of Conduct.",
        "It registers political parties and allocates their symbols.",
        "It oversees polling stations, EVMs, and the counting process.",
        "It ensures that no political party in power misuses its position."
      ],
      whyItMatters: "An independent Election Commission is the backbone of democracy, ensuring elections are not rigged by the ruling government.",
      commonConfusions: "The ECI is independent of the government; the Prime Minister cannot direct its actions.",
      followUp: "Would you like to learn about the machines used to vote (EVMs)?"
    },
    election_myths: {
      keywords: ["myths","election myth","fake news","rumors","reality","is it true","secret vote","hacking"],
      quickAnswer: "Many myths circulate during elections. Here are the facts verified by the Election Commission.",
      myths: [
        { myth: "My vote is not secret, parties can find out.", reality: "Completely false. The system ensures 100% anonymity." },
        { myth: "EVMs can be hacked via Bluetooth/WiFi.", reality: "EVMs have no internet or wireless components. They are offline standalone devices." },
        { myth: "If I don't vote, someone else will use my vote.", reality: "Identity theft is a crime. Use the 'Tendered Vote' right if this happens." },
        { myth: "Voting twice is possible in different cities.", reality: "Registered in two places is an offense. Indelible ink prevents double voting." }
      ],
      whyItMatters: "Misinformation can discourage people from voting or damage trust in democracy.",
      followUp: "Want to see the full Voter Rights list?"
    },
    election_process_general: {
      keywords: ["election process","how do elections work","general process","process of election","steps of election"],
      quickAnswer: "The election process is the democratic method by which citizens choose their representatives for government. It involves several stages from announcement to result declaration.",
      steps: [
        "Election Commission announces the schedule.",
        "Candidates file their nominations.",
        "Political parties and candidates campaign for votes.",
        "Citizens vote on Polling Day.",
        "Votes are counted and results are declared."
      ],
      whyItMatters: "A structured process ensures that elections are free, fair, and transparent, which is the foundation of a healthy democracy.",
      commonConfusions: "People often think the process starts on voting day, but it actually begins months earlier with voter registration and schedule announcements.",
      followUp: "Would you like to know more about the candidate nomination process?"
    },
    evm: {
      keywords: ["evm","electronic voting machine","voting machine","how do evms work"],
      quickAnswer: "An Electronic Voting Machine (EVM) is a secure, standalone device used to cast and record votes electronically instead of using paper ballots.",
      steps: [
        "It has two units: the Control Unit (with the officer) and the Ballot Unit (with the voter).",
        "The officer presses a button on the Control Unit to unlock the Ballot Unit.",
        "The voter presses the blue button next to their candidate's name and symbol.",
        "A red light flashes and a long beep sounds to confirm the vote.",
        "EVMs run on batteries and cannot be hacked remotely as they have no internet or wireless connectivity."
      ],
      whyItMatters: "EVMs prevent invalid votes, make counting extremely fast, and stop the historical problem of \"booth capturing\" (stuffing ballot boxes).",
      commonConfusions: "A major myth is that EVMs can be hacked via WiFi. EVMs have no networking chips whatsoever.",
      followUp: "Do you know how you can verify your EVM vote using VVPAT?"
    },
    government_formation: {
      keywords: ["government formation","form government","who becomes pm","who becomes cm","how government is made"],
      quickAnswer: "After results are declared, the party or group with a majority of seats in the legislature gets to form the government.",
      steps: [
        "The Election Commission submits the final list of winning candidates.",
        "The party (or alliance) that wins more than 50% of the seats claims the majority.",
        "They elect a leader among their winning MPs/MLAs.",
        "The President (or Governor for states) invites this leader to form the government.",
        "The leader takes the oath as Prime Minister (or Chief Minister)."
      ],
      whyItMatters: "This process translates the individual votes of millions of people into a functioning executive leadership.",
      commonConfusions: "Voters do not directly elect the Prime Minister. They elect local MPs, and the majority of those MPs choose the Prime Minister.",
      followUp: "What happens if no single party gets a majority? (Coalition government)"
    },
    india_timeline: {
      keywords: ["timeline","schedule","announcement to result","election calendar","election dates"],
      quickAnswer: "The Indian General Election is a massive exercise that usually takes a few months to complete.",
      steps: [
        "I will generate a chronological timeline for you in the response renderer."
      ],
      whyItMatters: "The staggered timeline allows security forces to move across the country to ensure peaceful voting.",
      commonConfusions: "Results are not announced immediately after a state votes; all counting happens nationwide on a single day to prevent influencing later voters.",
      followUp: "Do you have any other questions about the election process?"
    },
    lok_sabha: {
      keywords: ["lok sabha","lower house","house of the people","mp election","national election"],
      quickAnswer: "The Lok Sabha (House of the People) is the lower house of India's Parliament. Its members are elected directly by the public.",
      steps: [
        "The country is divided into 543 constituencies.",
        "Citizens directly vote for their representative (Member of Parliament or MP).",
        "Elections are normally held every 5 years.",
        "The party with the majority in Lok Sabha forms the central government.",
        "The Prime Minister is usually a member of the Lok Sabha."
      ],
      whyItMatters: "The Lok Sabha represents the direct will of the people and holds the central government accountable.",
      commonConfusions: "People confuse it with the Rajya Sabha. Lok Sabha members are directly elected; Rajya Sabha members are indirectly elected.",
      followUp: "Would you like to see a comparison between Lok Sabha and Rajya Sabha?"
    },
    lok_sabha_vs_rajya_sabha: {
      keywords: ["lok sabha vs rajya sabha","difference between lok sabha and rajya sabha","compare houses"],
      quickAnswer: "The Lok Sabha is the House of the People (directly elected), while the Rajya Sabha is the Council of States (indirectly elected).",
      comparisonTable: {
        headers: ["Feature", "Lok Sabha", "Rajya Sabha"],
        rows: [
          ["Election", "Direct (By People)", "Indirect (By MLAs)"],
          ["Term", "5 Years", "Permanent (1/3 retire every 2 yrs)"],
          ["Strength", "543 Members", "245 Members"],
          ["Power", "More (Money Bills)", "Reviewer (Special Powers on States)"]
        ]
      },
      whyItMatters: "Understanding both houses is key to understanding how laws are passed in India.",
      commonConfusions: "People think both houses have equal power. Lok Sabha has more power, especially regarding money and budgets.",
      followUp: "Shall we discuss the role of the Election Commission?"
    },
    majority_minority_gov: {
      keywords: ["majority","minority government","simple majority","absolute majority"],
      quickAnswer: "These terms describe how much control a ruling party has over the legislature (like the Lok Sabha).",
      steps: [
        "Absolute Majority: A single party wins more than 50% of the total seats.",
        "Simple Majority: The party has the most seats and passes laws because more members are present and voting for it than against it.",
        "Minority Government: The ruling party has less than 50% of seats, but stays in power because outside parties agree not to vote against them (confidence supply).",
        "If a minority government loses a \"No Confidence Motion,\" it must resign."
      ],
      whyItMatters: "A majority allows a government to pass laws easily. A minority government must constantly negotiate to survive.",
      commonConfusions: "A party can win the most seats (be the largest party) but still not have a majority if they are under the 50% mark.",
      followUp: "Should we explore how the Lok Sabha works?"
    },
    nota: {
      keywords: ["nota","none of the above","reject all candidates","don't like any candidate"],
      quickAnswer: "NOTA stands for \"None Of The Above.\" It is an option on the voting machine allowing voters to officially reject all contesting candidates.",
      steps: [
        "NOTA is always the last button on the EVM Ballot Unit.",
        "Pressing it records a neutral vote, showing you participated but chose no one.",
        "NOTA votes are counted and announced with the results.",
        "However, even if NOTA gets the highest votes, the candidate with the second-highest votes is declared the winner.",
        "There is no rule (currently) that forces a re-election if NOTA \"wins\"."
      ],
      whyItMatters: "It protects the secrecy of a voter who wishes to reject candidates and puts moral pressure on parties to field better candidates.",
      commonConfusions: "Many think NOTA can disqualify candidates or trigger a re-election. In India, it is currently just a way to express dissent.",
      followUp: "Would you like to know about the Secret Ballot system?"
    },
    rajya_sabha: {
      keywords: ["rajya sabha","upper house","council of states"],
      quickAnswer: "The Rajya Sabha (Council of States) is the upper house of India's Parliament. It represents the states of India at the central level.",
      steps: [
        "Members are NOT elected directly by the public.",
        "They are elected by the Members of the Legislative Assemblies (MLAs) of states.",
        "It is a permanent body and is never fully dissolved.",
        "One-third of its members retire every 2 years, with members serving 6-year terms.",
        "The Vice President of India acts as its Chairman."
      ],
      whyItMatters: "It acts as a reviewing body for laws passed by the Lok Sabha and ensures state interests are protected in Parliament.",
      commonConfusions: "Rajya Sabha cannot bring down the government; only the Lok Sabha can pass a No Confidence Motion.",
      followUp: "Would you like to know about Vidhan Sabha (State Assemblies)?"
    },
    secret_ballot: {
      keywords: ["secret ballot","vote secrecy","can anyone know who i voted for"],
      quickAnswer: "The secret ballot is a voting method ensuring that a voter's choice is completely anonymous.",
      steps: [
        "You vote inside an enclosed cardboard/plastic compartment.",
        "No cameras or mobile phones are allowed inside the polling booth.",
        "The EVM does not record your name or Voter ID alongside your vote.",
        "When votes are counted, they are mixed together from the machine.",
        "It is impossible to trace which button a specific voter pressed."
      ],
      whyItMatters: "Secrecy prevents voter intimidation, bribery, and coercion, allowing citizens to vote their true conscience without fear.",
      commonConfusions: "Some fear political parties can find out who voted for them by looking at machine data. This is impossible as the data is anonymous.",
      followUp: "Do you want to check the rules for voter eligibility?"
    },
    vidhan_sabha: {
      keywords: ["vidhan sabha","state assembly","mla election","state election"],
      quickAnswer: "The Vidhan Sabha (Legislative Assembly) is the lower house of a state's legislature in India.",
      steps: [
        "A state is divided into assembly constituencies.",
        "Citizens directly vote for their Member of Legislative Assembly (MLA).",
        "Elections are held every 5 years.",
        "The party with the majority forms the State Government.",
        "Their leader becomes the Chief Minister of the state."
      ],
      whyItMatters: "Vidhan Sabhas make laws on state-level subjects like police, public health, and agriculture.",
      commonConfusions: "Many confuse MPs and MLAs. MPs go to Delhi (Parliament), MLAs go to the state capital (Vidhan Sabha).",
      followUp: "Do you want to learn about Constituencies?"
    },
    vote_counting: {
      keywords: ["counting","vote counting","result declaration","who won","how results are announced"],
      quickAnswer: "Vote counting is the final step where votes from EVMs are tallied under strict security to declare the winner.",
      steps: [
        "Sealed EVMs are brought to highly secure counting centers.",
        "On counting day, seals are broken in the presence of candidate representatives.",
        "Votes from EVMs are tallied round by round.",
        "A random sample of VVPAT slips is matched with EVM counts to ensure accuracy.",
        "The Returning Officer declares the candidate with the most votes as the winner."
      ],
      whyItMatters: "Accurate and transparent counting is crucial for the public to accept the election results.",
      commonConfusions: "People sometimes think postal ballots are counted last, but they are actually counted first, before the EVMs are opened.",
      followUp: "Would you like to know how the government is formed after the results?"
    },
    voter_eligibility: {
      keywords: ["voter eligibility","who can vote","voting age","eligible to vote"],
      quickAnswer: "In India, voter eligibility is based on Universal Adult Suffrage, meaning every adult citizen has the right to vote.",
      steps: [
        "You must be a citizen of India.",
        "You must be 18 years of age or older on the qualifying date (usually Jan 1st of that year).",
        "You must be enrolled in the electoral roll (voter list) of your constituency.",
        "You must hold a valid Voter ID (EPIC) or other approved identification.",
        "You must not be disqualified under any law (e.g., certain criminal convictions)."
      ],
      whyItMatters: "It ensures that the government is chosen by a broad, inclusive representation of the adult population.",
      commonConfusions: "Having a Voter ID is not enough; your name MUST be on the current voter list at the polling booth on election day.",
      followUp: "Would you like to know your fundamental Voter Rights?"
    },
    voter_rights: {
      keywords: ["voter rights","rights of a voter","my rights","voting rights"],
      quickAnswer: "As a voter, you have constitutional and legal rights to ensure your participation is free, fair, and informed.",
      steps: [
        "Right to Know: You have the right to know the criminal background and financial assets of candidates.",
        "Right Not to Vote: You can choose not to vote, or choose NOTA to reject all candidates.",
        "Tendered Vote Right: If someone else falsely cast a vote in your name, you have the right to cast a \"tendered\" paper ballot.",
        "Right to Secrecy: No one can force you to reveal who you voted for.",
        "Assistance Right: Blind or infirm voters have the right to take a companion into the booth."
      ],
      whyItMatters: "These rights empower citizens and protect them from manipulation by political parties.",
      commonConfusions: "A Tendered Vote is often confused with a normal vote. It is a special paper ballot used only in cases of identity theft at the booth.",
      followUp: "Shall we look at what a By-election is?"
    },
    voting_procedure: {
      keywords: ["how to vote","voting procedure","polling day","vote steps","cast my vote","voting process"],
      quickAnswer: "Voting is a simple process done at your designated polling booth using an Electronic Voting Machine (EVM).",
      steps: [
        "Check your name on the voter list and find your polling booth.",
        "Show your Voter ID (EPIC) or approved ID to the polling officer.",
        "The officer will mark your finger with indelible ink and give you a slip.",
        "Go to the voting compartment, press the button next to your chosen candidate on the EVM.",
        "Check the VVPAT slip to verify your vote was recorded correctly."
      ],
      whyItMatters: "Following the correct procedure ensures your vote is valid, secret, and counted correctly.",
      commonConfusions: "Many believe you can vote anywhere; however, you must vote at your specifically assigned polling booth.",
      followUp: "Do you want to know what documents are valid for voting besides the Voter ID?"
    },
    vvpat: {
      keywords: ["vvpat","voter verifiable paper audit trail","paper trail","verify vote"],
      quickAnswer: "VVPAT stands for Voter Verifiable Paper Audit Trail. It is a printer attached to the EVM that lets voters verify their vote.",
      steps: [
        "You press the button on the EVM for your candidate.",
        "The VVPAT machine prints a slip containing the serial number, name, and symbol of your chosen candidate.",
        "This printed slip is visible behind a glass window for 7 seconds.",
        "The slip then automatically cuts and drops into a sealed drop box below.",
        "During counting, a random sample of VVPAT slips is manually counted to verify the EVM totals."
      ],
      whyItMatters: "VVPAT builds trust by giving voters visual proof that the machine recorded their exact choice.",
      commonConfusions: "You cannot take the VVPAT slip home with you; it must remain in the sealed box for security.",
      followUp: "What happens if you don't want to vote for any candidate? (Learn about NOTA)"
    },
    voting_documents: {
      keywords: ["documents","id proof","valid id","what to bring to vote","voter id","aadhaar"],
      quickAnswer: "Besides the Voter ID (EPIC), the Election Commission accepts several other photo identity documents for voting.",
      steps: [
        "Aadhaar Card",
        "PAN Card",
        "Passport",
        "Driving Licence",
        "Service Identity Cards (Central/State/PSU)",
        "Passbooks with photograph (Bank/Post Office)",
        "Smart Card issued by RGI under NPR",
        "MNREGA Job Card",
        "Health Insurance Smart Card (Ministry of Labour)",
        "Pension document with photograph"
      ],
      whyItMatters: "Ensuring you have the right documents prevents any delays or denials at the polling station.",
      commonConfusions: "The Voter Slip alone is NOT identity proof. You must bring one of the official photo IDs listed.",
      followUp: "Do you want to know about your Voter Rights?"
    }
  };

  // Export to global scope safely
  global.ELECTION_KNOWLEDGE = KNOWLEDGE;
})(window);
