/* =========================================================
   MATCHCRAFT — ABOUT & HELP
   File: help.js
   Features:
   1. Bangla / English language toggle
   2. Nine expandable help cards
   3. Responsive-compatible existing CSS classes
   4. Single-card expand / collapse
   5. Safe page creation and navigation compatibility
========================================================= */

(() => {
    "use strict";

    /* Prevent duplicate initialization. */
    if (window.MatchCraftHelp && window.MatchCraftHelp.initialized) {
        return;
    }

    const mainBox = document.querySelector(".main-box");

    if (!mainBox) {
        console.error("MATCHCRAFT: .main-box was not found.");
        return;
    }

    /*
     * Remove only the previous Help section.
     * Other application pages and LocalStorage remain untouched.
     */
    const previousHelpPage = document.getElementById("help");

    if (previousHelpPage) {
        previousHelpPage.remove();
    }

    /* =====================================================
       HELP CONTENT — BANGLA
    ===================================================== */

    const helpData = [
        {
            id: "dashboard",
            icon: "fa-house",
            title: "Dashboard",
            subtitle: "টুর্নামেন্টের সামগ্রিক চিত্র",
            description:
                "Dashboard হলো MATCHCRAFT-এর প্রধান পৃষ্ঠা। এখানে টুর্নামেন্ট, টিম, খেলোয়াড় ও ম্যাচের সংখ্যা দেখানো হয়।",
            blocks: [
                [
                    "এই পেজে কী আছে",
                    "Total Tournaments, Total Teams, Total Players এবং Total Matches-এর সারসংক্ষেপ। এছাড়া Quick Actions ও Recent Matches অংশ রয়েছে।"
                ],
                [
                    "কী করা যাবে",
                    "Create Tournament, Add Team, Add Player এবং Schedule Match বাটন ব্যবহার করে সংশ্লিষ্ট ব্যবস্থাপনা পেজে যাওয়া যায়।"
                ],
                [
                    "কীভাবে ব্যবহার করবেন",
                    "Dashboard খুলে সারসংক্ষেপ দেখুন। দ্রুত কোনো কাজ শুরু করতে প্রয়োজনীয় Quick Action নির্বাচন করুন।"
                ],
                [
                    "গুরুত্বপূর্ণ বিষয়",
                    "বর্তমান HTML-এ Recent Matches অংশের জন্য একটি প্রাথমিক খালি অবস্থা রয়েছে। সেখানে প্রকৃত ম্যাচের তালিকা দেখানোর ব্যবস্থা আলাদাভাবে যুক্ত থাকতে হবে।"
                ]
            ]
        },
        {
            id: "tournaments",
            icon: "fa-trophy",
            title: "Tournaments & Seasons",
            subtitle: "টুর্নামেন্ট তৈরি ও পরিচালনা",
            description:
                "এই পেজে ফুটবল প্রতিযোগিতা তৈরি, সংরক্ষণ, সম্পাদনা, বিস্তারিত দেখা এবং মুছে ফেলার ইন্টারফেস রয়েছে।",
            blocks: [
                [
                    "টুর্নামেন্ট তৈরির তথ্য",
                    "Tournament Name, Tournament Type, Total Teams, Season, Start Date, End Date এবং Status নির্ধারণ করা যায়।"
                ],
                [
                    "Tournament Type",
                    "বর্তমান ফর্মে League, Knockout, Group Stage এবং League & Knockout অপশন রয়েছে। Group Stage নির্বাচন করলে Number of Groups দেওয়ার ফিল্ড দেখানো হয়।"
                ],
                [
                    "সংরক্ষণ ও সম্পাদনা",
                    "Save Tournament দিয়ে নতুন টুর্নামেন্ট সংরক্ষণ করা যায়। তালিকার Edit বাটন দিয়ে তথ্য পরিবর্তন এবং View Details দিয়ে টুর্নামেন্টের বিবরণ দেখা যায়।"
                ],
                [
                    "মুছে ফেলার আগে",
                    "Delete করলে নিশ্চিতকরণ চাওয়া হয়। সংশ্লিষ্ট কিছু LocalStorage রেকর্ডও মুছে ফেলার কোড আছে। গুরুত্বপূর্ণ তথ্য মুছতে যাওয়ার আগে ব্যাকআপ রাখুন।"
                ],
                [
                    "সংরক্ষণের নিয়ম",
                    "বর্তমান কোডে টুর্নামেন্টের তথ্য matchcraft_tournaments নামের LocalStorage key-তে রাখা হয়। এটি একই ব্রাউজার ও সাইটের স্থানীয় ডেটা; সার্ভারে স্বয়ংক্রিয়ভাবে সংরক্ষিত হয় না।"
                ],
                [
                    "সীমাবদ্ধতা",
                    "টুর্নামেন্টের ফরম্যাট নির্বাচন করলেই সব ধরনের ম্যাচ বা ব্র্যাকেট স্বয়ংক্রিয়ভাবে তৈরি হয় কি না, তা সংশ্লিষ্ট Fixtures ও Bracket কোডের ওপর নির্ভর করে।"
                ]
            ]
        },
        {
            id: "teams",
            icon: "fa-shield-halved",
            title: "Teams & Squads",
            subtitle: "টিম নিবন্ধন ও ব্যবস্থাপনা",
            description:
                "এই পেজে টিমের পরিচিতি, অবস্থান, কোচ, খেলোয়াড় ধারণক্ষমতা এবং প্রোফাইল ছবি সংক্রান্ত তথ্য দেওয়ার ফর্ম রয়েছে।",
            blocks: [
                [
                    "কী কী তথ্য দেওয়া যায়",
                    "Team Name, Short Name, City / Location, Coach Name, Player Limit, Team Profile এবং Tournament নির্বাচন।"
                ],
                [
                    "টিম যোগ করা",
                    "Add Team বাটনে ক্লিক করে ফর্ম খুলুন। প্রয়োজনীয় তথ্য দিয়ে Save Team নির্বাচন করুন।"
                ],
                [
                    "টিম প্রোফাইল",
                    "Team Profile ফিল্ডে ডিভাইস থেকে একটি ছবি নির্বাচন করা যায়। ছবিটি স্থায়ীভাবে সংরক্ষিত হচ্ছে কি না, তা teams.js-এর বাস্তবায়নের ওপর নির্ভর করে।"
                ],
                [
                    "টিম তালিকা",
                    "Registered Teams অংশে সংরক্ষিত টিমগুলো দেখানোর জন্য তালিকা রয়েছে।"
                ],
                [
                    "Player Limit",
                    "এই ফিল্ডে একটি টিমে কতজন খেলোয়াড় রাখার সীমা নির্ধারণ করা হয়। সীমাটি বাস্তবে যাচাই করা হচ্ছে কি না, তা teams.js-এ পরীক্ষা করতে হবে।"
                ]
            ]
        },
        {
            id: "players",
            icon: "fa-users",
            title: "Players",
            subtitle: "খেলোয়াড় নিবন্ধন ও পরিচিতি",
            description:
                "এই পেজে খেলোয়াড়ের পরিচিতিমূলক তথ্য, টিম, পজিশন এবং প্রোফাইল ছবি দেওয়ার ব্যবস্থা রয়েছে।",
            blocks: [
                [
                    "খেলোয়াড়ের তথ্য",
                    "Player ID, Player Name, Jersey Number, Position, Team, Nationality এবং Age দেওয়ার ফিল্ড রয়েছে।"
                ],
                [
                    "খেলার পজিশন",
                    "Goalkeeper, Centre-Back, Left-Back, Right-Back, Defensive Midfielder, Central Midfielder, Attacking Midfielder, Left Winger, Right Winger ও Striker নির্বাচন করা যায়।"
                ],
                [
                    "প্রোফাইল ছবি",
                    "Player Profile Photo ফিল্ডে ডিভাইসের গ্যালারি থেকে ছবি নির্বাচন করা যায়।"
                ],
                [
                    "নিবন্ধন",
                    "Add Player বাটনে ফর্ম খুলে তথ্য পূরণ করুন এবং Save Player নির্বাচন করুন। Registered Players অংশে সংরক্ষিত খেলোয়াড় দেখানোর ব্যবস্থা রয়েছে।"
                ],
                [
                    "টিমের সঙ্গে সম্পর্ক",
                    "Player ফর্মে Team নির্বাচন করা যায়। একজন খেলোয়াড়কে সঠিক টিমের সঙ্গে যুক্ত রাখার নিয়ম এবং Jersey Number-এর ইউনিক যাচাই players.js-এর ওপর নির্ভর করে।"
                ]
            ]
        },
        {
            id: "matches",
            icon: "fa-futbol",
            title: "Matches & Live Score",
            subtitle: "ম্যাচ ও স্কোর পরিচালনা",
            description:
                "এই পেজের মূল HTML সেকশনটি matches.js দ্বারা তৈরি হওয়ার জন্য রাখা হয়েছে।",
            blocks: [
                [
                    "পেজের কাঠামো",
                    "index.html-এ matches নামে একটি সেকশন আছে। এর ভেতরে মন্তব্য অনুযায়ী matches.js সম্পূর্ণ পেজ তৈরি করবে।"
                ],
                [
                    "কীভাবে ব্যবহার করবেন",
                    "Sidebar থেকে Matches & Live Score নির্বাচন করুন। এরপর পেজে যে ফর্ম ও নিয়ন্ত্রণগুলো দেখা যায়, সেগুলো ব্যবহার করুন।"
                ],
                [
                    "স্কোর ও ম্যাচের তথ্য",
                    "স্কোর আপডেট, ম্যাচের সময়, ইভেন্ট, Full Time এবং ফলাফল সংরক্ষণের সঠিক নিয়ম matches.js-এর কোড দেখে নিশ্চিত করতে হবে।"
                ],
                [
                    "সতর্কতা",
                    "শুধু এই HTML দেখে সব Live Score ফিচার সক্রিয় আছে বলে নিশ্চিত হওয়া যায় না।"
                ]
            ]
        },
        {
            id: "fixtures",
            icon: "fa-calendar-days",
            title: "Fixtures & Results",
            subtitle: "ম্যাচের সময়সূচি ও ফলাফল",
            description:
                "এই পেজে ম্যাচের সময়সূচি, মাঠের তথ্য এবং নির্ধারিত ম্যাচের তালিকা পরিচালনার ইন্টারফেস রয়েছে।",
            blocks: [
                [
                    "Ground & Venue Management",
                    "মাঠের নাম, অবস্থান ও ধারণক্ষমতা ব্যবস্থাপনার জন্য অংশ রয়েছে। Add Ground বাটন দিয়ে মাঠ যোগ করার ইন্টারফেস খোলা যায়।"
                ],
                [
                    "Schedule a Match",
                    "Tournament, Ground / Venue, Home Team, Away Team, Match Date, Kick-off Time এবং ঐচ্ছিক Match Notes দেওয়া যায়।"
                ],
                [
                    "ম্যাচ সম্পাদনা",
                    "ম্যাচ সম্পাদনা ও বাতিল করার নিয়ন্ত্রণের পাশাপাশি Cancel Edit ও Reset Form বাটন রয়েছে।"
                ],
                [
                    "Fixtures তালিকা",
                    "Search ফিল্ডে টিম, টুর্নামেন্ট বা মাঠের নাম খোঁজার ব্যবস্থা এবং All Matches, Upcoming, Completed ও Cancelled ফিল্টার রয়েছে।"
                ],
                [
                    "গুরুত্বপূর্ণ বিষয়",
                    "HTML-এ এই নিয়ন্ত্রণগুলো রয়েছে; সেগুলোর কার্যকারিতা এবং ম্যাচের ফলাফল কীভাবে সংরক্ষণ হয়, তা fixtures.js ও match.js-এর কোডের ওপর নির্ভর করে।"
                ]
            ]
        },
        {
            id: "standings",
            icon: "fa-list-ol",
            title: "Standings & Brackets",
            subtitle: "পয়েন্ট টেবিল ও নকআউট কাঠামো",
            description:
                "এই পেজের মূল বিষয়বস্তু bracat.js ফাইল দ্বারা তৈরি হওয়ার জন্য নির্ধারিত।",
            blocks: [
                [
                    "পেজের উদ্দেশ্য",
                    "টুর্নামেন্টের অবস্থান, ব্র্যাকেট বা প্রতিযোগিতার অগ্রগতির তথ্য দেখানোর জন্য এই পেজ রয়েছে।"
                ],
                [
                    "কীভাবে খুলবেন",
                    "Sidebar-এর Standings & Brackets মেনু নির্বাচন করুন।"
                ],
                [
                    "পয়েন্ট ও ব্র্যাকেট",
                    "জয়, ড্র, হার, পয়েন্ট, গোল ব্যবধান, কোয়ালিফিকেশন ও পরবর্তী রাউন্ডের নিয়ম bracat.js-এর বাস্তবায়ন অনুযায়ী কাজ করবে।"
                ],
                [
                    "সতর্কতা",
                    "বর্তমান index.html-এ সেকশনটি খালি রাখা হয়েছে। তাই নির্দিষ্ট পয়েন্ট গণনা বা ব্র্যাকেটের নিয়ম নিশ্চিত করতে bracat.js পরীক্ষা করা প্রয়োজন।"
                ]
            ]
        },
        {
            id: "statistics",
            icon: "fa-chart-column",
            title: "Statistics & Awards",
            subtitle: "পরিসংখ্যান ও পুরস্কার",
            description:
                "এই পেজের বিষয়বস্তু status.js দ্বারা তৈরি হওয়ার জন্য নির্ধারিত।",
            blocks: [
                [
                    "পেজের উদ্দেশ্য",
                    "টুর্নামেন্ট ও খেলোয়াড়দের পরিসংখ্যান এবং পুরস্কার-সংক্রান্ত তথ্য দেখানোর জন্য এই পেজ রয়েছে।"
                ],
                [
                    "কীভাবে ব্যবহার করবেন",
                    "Sidebar-এর Statistics & Awards মেনু নির্বাচন করে পেজটি খুলুন।"
                ],
                [
                    "পরিসংখ্যানের নির্ভুলতা",
                    "গোল, অ্যাসিস্ট, খেলোয়াড়ের র‍্যাঙ্কিং, পুরস্কার বা অন্য কোনো পরিসংখ্যানের গণনা status.js-এর প্রকৃত কোডের ওপর নির্ভর করে।"
                ],
                [
                    "সতর্কতা",
                    "এই পেজের JavaScript না দেখে কোন পুরস্কার স্বয়ংক্রিয়ভাবে নির্ধারিত হয়, তা নিশ্চিত করে বলা যাবে না।"
                ]
            ]
        },
        {
            id: "storage",
            icon: "fa-database",
            title: "ডেটা সংরক্ষণ ও নিরাপত্তা",
            subtitle: "LocalStorage ও ব্যাকআপ সম্পর্কে জানুন",
            description:
                "বর্তমান অ্যাপের কিছু তথ্য ব্রাউজারের LocalStorage-এ রাখা হয়।",
            blocks: [
                [
                    "LocalStorage কী",
                    "এটি ব্রাউজারে সাইটের জন্য ডেটা রাখার একটি স্থানীয় ব্যবস্থা। একই ডিভাইস ও ব্রাউজারে সাইটের ডেটা মুছে না গেলে তথ্য সাধারণত পরবর্তী সময়েও পাওয়া যায়।"
                ],
                [
                    "কী কী তথ্য রয়েছে",
                    "app.js-এ Dashboard-এর সংখ্যা matchcraft_tournaments, matchcraft_teams, matchcraft_players এবং matchcraft_matches key থেকে পড়া হয়।"
                ],
                [
                    "সতর্কতা",
                    "ব্রাউজারের ডেটা মুছে ফেললে বা অন্য ডিভাইসে গেলে স্থানীয় তথ্য হারিয়ে যেতে পারে বা সেখানে পাওয়া নাও যেতে পারে।"
                ],
                [
                    "ব্যাকআপ",
                    "গুরুত্বপূর্ণ টুর্নামেন্টের তথ্য নিয়মিত ব্যাকআপ রাখুন। Settings & Backup পেজ বাস্তবে না থাকলে বা ব্যাকআপ ব্যবস্থা নিশ্চিত না হলে ম্যানুয়াল ব্যাকআপের ওপর নির্ভর করুন।"
                ]
            ]
        }
    ];

    /* =====================================================
       HELP CONTENT — ENGLISH
       Index and block order must match helpData.
    ===================================================== */

    const helpEnglish = [
        {
            subtitle: "An overview of your tournaments",
            description:
                "Dashboard is the main page of MATCHCRAFT. It displays tournament, team, player, and match counts.",
            blocks: [
                ["What's on this page", "A summary of Total Tournaments, Total Teams, Total Players, and Total Matches. Quick Actions and Recent Matches are also included."],
                ["What you can do", "Use Create Tournament, Add Team, Add Player, and Schedule Match to navigate to the relevant management pages."],
                ["How to use it", "Review the dashboard summary and select a Quick Action to begin a task."],
                ["Important note", "Recent Matches currently has a basic empty state. Displaying actual matches requires a separate implementation."]
            ]
        },
        {
            subtitle: "Create and manage tournaments",
            description:
                "This page provides an interface to create, save, edit, view, and delete football tournaments.",
            blocks: [
                ["Tournament details", "You can set Tournament Name, Tournament Type, Total Teams, Season, Start Date, End Date, and Status."],
                ["Tournament type", "The form offers League, Knockout, Group Stage, and League & Knockout. Selecting Group Stage reveals the Number of Groups field."],
                ["Save and edit", "Use Save Tournament to create a tournament, Edit to change its information, and View Details to review it."],
                ["Before deleting", "Deletion requires confirmation. Some related LocalStorage records may also be deleted. Back up important data first."],
                ["Data storage", "Tournament information is stored under the matchcraft_tournaments LocalStorage key. It is stored locally in this browser and is not automatically saved to a server."],
                ["Limitations", "Automatic fixture or bracket generation depends on the implementation of the Fixtures and Bracket code."]
            ]
        },
        {
            subtitle: "Register and manage teams",
            description:
                "This page provides fields for team identity, location, coach, player capacity, and profile image.",
            blocks: [
                ["Available information", "Team Name, Short Name, City / Location, Coach Name, Player Limit, Team Profile, and Tournament."],
                ["Add a team", "Click Add Team, complete the required information, and select Save Team."],
                ["Team profile", "You can select an image from your device. Persistent image storage depends on teams.js."],
                ["Team list", "The Registered Teams area is intended to display saved teams."],
                ["Player limit", "This field sets the intended squad size. Whether the limit is enforced depends on teams.js."]
            ]
        },
        {
            subtitle: "Player registration and profiles",
            description:
                "This page provides player details, team selection, playing position, and profile image options.",
            blocks: [
                ["Player information", "Fields include Player ID, Player Name, Jersey Number, Position, Team, Nationality, and Age."],
                ["Playing positions", "Available positions include Goalkeeper, Centre-Back, Left-Back, Right-Back, Defensive Midfielder, Central Midfielder, Attacking Midfielder, Left Winger, Right Winger, and Striker."],
                ["Profile photo", "Select a player photo from your device gallery using Player Profile Photo."],
                ["Registration", "Click Add Player, complete the form, and select Save Player. Registered Players is intended to display saved players."],
                ["Team association", "You can select a team. Correct team assignment and unique jersey-number validation depend on players.js."]
            ]
        },
        {
            subtitle: "Match and score management",
            description:
                "The main content of this page is intended to be generated by matches.js.",
            blocks: [
                ["Page structure", "index.html contains a section with the ID matches. Its main interface is intended to be created by JavaScript."],
                ["How to use it", "Select Matches & Live Score in the sidebar and use the controls displayed on the page."],
                ["Scores and match data", "Score updates, match time, events, Full Time, and result-saving behavior must be verified in the relevant JavaScript."],
                ["Important note", "The HTML alone does not confirm that every live-score feature is operational."]
            ]
        },
        {
            subtitle: "Match schedules and results",
            description:
                "This page provides an interface for managing fixtures, venues, and scheduled matches.",
            blocks: [
                ["Ground and venue management", "A venue section includes fields for ground name, location, and capacity. Add Ground opens the venue-entry interface."],
                ["Schedule a match", "Fields include Tournament, Ground / Venue, Home Team, Away Team, Match Date, Kick-off Time, and optional Match Notes."],
                ["Edit matches", "Controls are provided for editing and cancelling matches, alongside Cancel Edit and Reset Form."],
                ["Fixtures list", "Search matches by team, tournament, or venue. Filters include All Matches, Upcoming, Completed, and Cancelled."],
                ["Important note", "Actual behavior and result storage depend on fixtures.js and match.js."]
            ]
        },
        {
            subtitle: "League tables and knockout structure",
            description:
                "The main content of this page is intended to be generated by bracat.js.",
            blocks: [
                ["Purpose", "This page is intended to display tournament standings, brackets, and competition progress."],
                ["How to open it", "Select Standings & Brackets from the sidebar."],
                ["Standings and brackets", "Wins, draws, losses, points, goal difference, qualification, and progression depend on the implementation in bracat.js."],
                ["Important note", "The section is empty in the current index.html. The exact points calculation and bracket rules must be verified in bracat.js."]
            ]
        },
        {
            subtitle: "Statistics and tournament awards",
            description:
                "The content of this page is intended to be generated by status.js.",
            blocks: [
                ["Purpose", "This page is intended to display tournament and player statistics and award-related information."],
                ["How to use it", "Select Statistics & Awards from the sidebar."],
                ["Statistical accuracy", "Goals, assists, player rankings, awards, and other calculations depend on the actual implementation in status.js."],
                ["Important note", "Automatic award selection cannot be confirmed without reviewing the JavaScript."]
            ]
        },
        {
            subtitle: "Learn about LocalStorage and backups",
            description:
                "Some app information is stored in the browser's LocalStorage.",
            blocks: [
                ["What is LocalStorage?", "It is a local browser storage mechanism. Data usually remains available in the same browser and on the same device unless site data is cleared."],
                ["Stored information", "Dashboard counts are read from the matchcraft_tournaments, matchcraft_teams, matchcraft_players, and matchcraft_matches keys."],
                ["Important warning", "Clearing browser data or switching devices may make local information unavailable or cause data loss."],
                ["Backups", "Back up important tournament data regularly. If a working Settings & Backup feature has not been confirmed, use a verified manual backup method."]
            ]
        }
    ];

    /* =====================================================
       CREATE HELP PAGE
    ===================================================== */

    const page = document.createElement("section");
    page.id = "help";
    page.className = "help-content";
    page.hidden = true;

    page.innerHTML = `
        <div class="help-container">

            <header class="help-hero">
                <div class="help-hero-icon">
                    <i class="fa-solid fa-book-open-reader"></i>
                </div>

                <div class="help-hero-copy">
                    <span class="help-eyebrow" id="helpEyebrow">
                        MATCHCRAFT DOCUMENTATION
                    </span>

                    <h1 id="helpMainTitle">About &amp; Help</h1>

                    <p id="helpHeroDescription">
                        MATCHCRAFT-এর প্রতিটি পেজ, ফিচার এবং ব্যবহারের
                        নিয়ম সম্পর্কে সহজ নির্দেশিকা।
                    </p>
                </div>

                <div class="help-hero-badge">
                    <i class="fa-solid fa-circle-info"></i>
                    <span id="helpHeroBadgeText">ব্যবহার নির্দেশিকা</span>
                </div>
            </header>

            <section class="help-intro-panel">
                <div class="help-intro-icon">
                    <i class="fa-solid fa-compass"></i>
                </div>

                <div>
                    <h2 id="helpWelcomeTitle">স্বাগতম MATCHCRAFT-এ</h2>

                    <p id="helpWelcomeDescription">
                        এই নির্দেশিকা থেকে Sidebar-এর প্রতিটি পেজের
                        উদ্দেশ্য, দৃশ্যমান অপশন, ব্যবহারের নিয়ম এবং
                        প্রয়োজনীয় সতর্কতা জানতে পারবেন। বিস্তারিত
                        পড়তে যেকোনো কার্ডে ক্লিক করুন।
                    </p>
                </div>
            </section>

            <div class="help-section-heading">
                <div>
                    <span class="help-eyebrow" id="helpSectionEyebrow">
                        PAGE GUIDE
                    </span>

                    <h2 id="helpGuideTitle">পেজভিত্তিক নির্দেশিকা</h2>
                </div>

                <span class="help-count" id="helpCount"></span>

                <button
                    type="button"
                    id="helpLanguageToggle"
                    class="help-language-toggle"
                    aria-label="Switch to English"
                >
                    <i class="fa-solid fa-language"></i>
                    <span>English</span>
                </button>
            </div>

            <div class="help-accordion" id="helpAccordion"></div>

            <section class="help-bottom-note">
                <i class="fa-solid fa-lightbulb"></i>

                <div>
                    <h3 id="helpTipTitle">একটি গুরুত্বপূর্ণ পরামর্শ</h3>

                    <p id="helpTipDescription">
                        কোনো ফিচার কাজ না করলে প্রথমে সংশ্লিষ্ট পেজের
                        JavaScript ফাইল, ব্রাউজারের Console এবং
                        সংরক্ষিত ডেটা পরীক্ষা করুন। নির্দেশিকায় কোনো
                        ফিচারের উল্লেখ থাকা মানেই সেটি ইতিমধ্যে
                        সম্পূর্ণভাবে কার্যকর—এমন নয়।
                    </p>
                </div>
            </section>

            <footer class="help-footer">
                <span>MATCHCRAFT</span>
                <span id="helpFooterText">Football Tournament Manager</span>
            </footer>

        </div>
    `;

    /*
     * Insert before the main page footer when possible.
     * The application navigation can find this section by ID.
     */
    const footer = mainBox.querySelector(":scope > footer");

    if (footer) {
        mainBox.insertBefore(page, footer);
    } else {
        mainBox.appendChild(page);
    }

    const accordion = page.querySelector("#helpAccordion");
    const languageButton = page.querySelector("#helpLanguageToggle");

    let currentLanguage = "bn";

    /* =====================================================
       CREATE EXPANDABLE CARDS
    ===================================================== */

    function createCard(section, index) {
        const article = document.createElement("article");
        article.className = "help-card";
        article.dataset.section = section.id;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "help-card-trigger";
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", `help-panel-${section.id}`);

        button.innerHTML = `
            <span class="help-card-number">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <span class="help-card-icon">
                <i class="fa-solid ${section.icon}"></i>
            </span>

            <span class="help-card-heading">
                <strong class="help-card-title"></strong>
                <small class="help-card-subtitle"></small>
            </span>

            <span class="help-card-chevron">
                <i class="fa-solid fa-chevron-down"></i>
            </span>
        `;

        button.querySelector(".help-card-title").textContent = section.title;
        button.querySelector(".help-card-subtitle").textContent = section.subtitle;

        const panel = document.createElement("div");
        panel.className = "help-card-panel";
        panel.id = `help-panel-${section.id}`;
        panel.hidden = true;

        const inner = document.createElement("div");
        inner.className = "help-card-inner";

        const intro = document.createElement("p");
        intro.className = "help-card-description help-card-description-text";
        intro.textContent = section.description;

        inner.appendChild(intro);

        const blocks = document.createElement("div");
        blocks.className = "help-detail-grid";

        section.blocks.forEach(([heading, text]) => {
            const detail = document.createElement("section");
            detail.className = "help-detail";

            const title = document.createElement("h4");
            title.className = "help-detail-title";
            title.textContent = heading;

            const paragraph = document.createElement("p");
            paragraph.className = "help-detail-text";
            paragraph.textContent = text;

            detail.append(title, paragraph);
            blocks.appendChild(detail);
        });

        inner.appendChild(blocks);
        panel.appendChild(inner);
        article.append(button, panel);

        button.addEventListener("click", () => {
            const isOpen = button.getAttribute("aria-expanded") === "true";

            /* Close all cards before toggling the selected card. */
            accordion.querySelectorAll(".help-card").forEach((card) => {
                const trigger = card.querySelector(".help-card-trigger");
                const cardPanel = card.querySelector(".help-card-panel");

                trigger.setAttribute("aria-expanded", "false");
                cardPanel.hidden = true;
                card.classList.remove("is-open");
            });

            /* Clicking an open card closes it. */
            if (!isOpen) {
                button.setAttribute("aria-expanded", "true");
                panel.hidden = false;
                article.classList.add("is-open");
            }
        });

        return article;
    }

    helpData.forEach((section, index) => {
        accordion.appendChild(createCard(section, index));
    });

    /* =====================================================
       LANGUAGE TOGGLE
    ===================================================== */

    function applyHelpLanguage(language) {
        currentLanguage = language === "en" ? "en" : "bn";

        const isEnglish = currentLanguage === "en";
        const content = isEnglish ? helpEnglish : helpData;

        page.querySelector("#helpEyebrow").textContent =
            "MATCHCRAFT DOCUMENTATION";

        page.querySelector("#helpMainTitle").textContent = "About & Help";

        page.querySelector("#helpHeroDescription").textContent =
            isEnglish
                ? "A simple guide to MATCHCRAFT pages, features, and usage."
                : "MATCHCRAFT-এর প্রতিটি পেজ, ফিচার এবং ব্যবহারের নিয়ম সম্পর্কে সহজ নির্দেশিকা।";

        page.querySelector("#helpHeroBadgeText").textContent =
            isEnglish ? "User Guide" : "ব্যবহার নির্দেশিকা";

        page.querySelector("#helpWelcomeTitle").textContent =
            isEnglish ? "Welcome to MATCHCRAFT" : "স্বাগতম MATCHCRAFT-এ";

        page.querySelector("#helpWelcomeDescription").textContent =
            isEnglish
                ? "Learn the purpose, available options, usage, and important notes for each sidebar page. Click a card to read more."
                : "এই নির্দেশিকা থেকে Sidebar-এর প্রতিটি পেজের উদ্দেশ্য, দৃশ্যমান অপশন, ব্যবহারের নিয়ম এবং প্রয়োজনীয় সতর্কতা জানতে পারবেন। বিস্তারিত পড়তে যেকোনো কার্ডে ক্লিক করুন।";

        page.querySelector("#helpSectionEyebrow").textContent =
            "PAGE GUIDE";

        page.querySelector("#helpGuideTitle").textContent =
            isEnglish ? "Page Guides" : "পেজভিত্তিক নির্দেশিকা";

        page.querySelector("#helpCount").textContent =
            isEnglish
                ? `${helpData.length} guides`
                : `${helpData.length}টি নির্দেশিকা`;

        languageButton.querySelector("span").textContent =
            isEnglish ? "বাংলা" : "English";

        languageButton.setAttribute(
            "aria-label",
            isEnglish ? "Switch to Bangla" : "Switch to English"
        );

        page.querySelector("#helpTipTitle").textContent =
            isEnglish ? "Helpful Tip" : "একটি গুরুত্বপূর্ণ পরামর্শ";

        page.querySelector("#helpTipDescription").textContent =
            isEnglish
                ? "If a feature does not work, check the relevant JavaScript file, browser console, and stored data. Mentioning a feature in this guide does not guarantee that it is fully operational."
                : "কোনো ফিচার কাজ না করলে প্রথমে সংশ্লিষ্ট পেজের JavaScript ফাইল, ব্রাউজারের Console এবং সংরক্ষিত ডেটা পরীক্ষা করুন। নির্দেশিকায় কোনো ফিচারের উল্লেখ থাকা মানেই সেটি ইতিমধ্যে সম্পূর্ণভাবে কার্যকর—এমন নয়।";

        page.querySelector("#helpFooterText").textContent =
            "Football Tournament Manager";

        /*
         * Update all card text without rebuilding the cards.
         * Open/closed states and click handlers remain intact.
         */
        accordion.querySelectorAll(".help-card").forEach((card, index) => {
            const original = helpData[index];
            const translated = content[index];

            card.querySelector(".help-card-title").textContent =
                original.title;

            card.querySelector(".help-card-subtitle").textContent =
                isEnglish ? translated.subtitle : original.subtitle;

            card.querySelector(".help-card-description-text").textContent =
                isEnglish ? translated.description : original.description;

            const headings = card.querySelectorAll(".help-detail-title");
            const paragraphs = card.querySelectorAll(".help-detail-text");

            original.blocks.forEach((block, blockIndex) => {
                headings[blockIndex].textContent =
                    isEnglish
                        ? translated.blocks[blockIndex][0]
                        : block[0];

                paragraphs[blockIndex].textContent =
                    isEnglish
                        ? translated.blocks[blockIndex][1]
                        : block[1];
            });
        });
    }

    languageButton.addEventListener("click", () => {
        applyHelpLanguage(currentLanguage === "bn" ? "en" : "bn");
    });

    /* Public helper for future updates, if needed. */
    window.MatchCraftHelp = {
        initialized: true,

        refresh() {
            applyHelpLanguage(currentLanguage);
            return true;
        },

        setLanguage(language) {
            applyHelpLanguage(language);
            return currentLanguage;
        },

        getLanguage() {
            return currentLanguage;
        }
    };

    /* Start in Bangla. */
    applyHelpLanguage("bn");

})();