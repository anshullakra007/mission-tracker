document.addEventListener("DOMContentLoaded", () => {
    // --- 1. STUDY PLAN CONFIGURATION (26 October – 15 November 2026) ---
    // Curated high-yield interview practice & revision sources
    const STUDY_PLAN = {
        "2026-10-26": {
            dsa: "2D Arrays",
            core: "DBMS",
            dayIndex: 1,
            dsaLinks: [
                { title: "LeetCode Matrix / 2D Arrays Problem Set", url: "https://leetcode.com/tag/matrix/", type: "Practice" },
                { title: "Striver's A2Z Sheet — Arrays & Matrix Problems", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", type: "SDE Sheet" },
                { title: "NeetCode 150 — Arrays & Hashing Roadmap", url: "https://neetcode.io/practice", type: "Curated" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks Top 50 DBMS Interview Questions", url: "https://www.geeksforgeeks.org/dbms-interview-questions/", type: "Interview Q&A" },
                { title: "InterviewBit DBMS Interview Preparation Guide", url: "https://www.interviewbit.com/dbms-interview-questions/", type: "Study Guide" }
            ]
        },
        "2026-10-27": {
            dsa: "Recursion",
            core: "DBMS",
            dayIndex: 2,
            dsaLinks: [
                { title: "LeetCode Recursion Practice Set", url: "https://leetcode.com/tag/recursion/", type: "Practice" },
                { title: "Striver's A2Z Course — Recursion Series & Patterns", url: "https://takeuforward.org/recursion/strivers-a2z-dsa-course-recursion/", type: "Tutorial & Problems" },
                { title: "NeetCode Recursion Problem List", url: "https://neetcode.io/practice", type: "Curated" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks ACID Properties & Transactions in DBMS", url: "https://www.geeksforgeeks.org/acid-properties-in-dbms/", type: "Key Concepts" },
                { title: "Javatpoint Comprehensive DBMS Interview Questions", url: "https://www.javatpoint.com/dbms-interview-questions", type: "Interview Q&A" }
            ]
        },
        "2026-10-28": {
            dsa: "Backtracking",
            core: "OS",
            dayIndex: 3,
            dsaLinks: [
                { title: "LeetCode Backtracking Tag (Subsets, Permutations, N-Queens)", url: "https://leetcode.com/tag/backtracking/", type: "Practice" },
                { title: "NeetCode 150 — Backtracking Roadmap", url: "https://neetcode.io/practice", type: "Curated" },
                { title: "Striver's Recursion & Backtracking SDE Sheet", url: "https://takeuforward.org/data-structure/recursion-and-backtracking/", type: "SDE Sheet" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks Top Operating Systems Interview Questions", url: "https://www.geeksforgeeks.org/operating-systems-interview-questions/", type: "Interview Q&A" },
                { title: "InterviewBit Operating System Interview Guide", url: "https://www.interviewbit.com/operating-system-interview-questions/", type: "Study Guide" }
            ]
        },
        "2026-10-29": {
            dsa: "Linked List (LL)",
            core: "OS",
            dayIndex: 4,
            dsaLinks: [
                { title: "LeetCode Linked List Tagged Problems", url: "https://leetcode.com/tag/linked-list/", type: "Practice" },
                { title: "Striver's A2Z Linked List Mastery Sheet", url: "https://takeuforward.org/linked-list/strivers-a2z-dsa-course-linked-list/", type: "SDE Sheet" },
                { title: "NeetCode 150 — Linked List Section", url: "https://neetcode.io/practice", type: "Curated" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks Concurrency, Threads & Deadlocks in OS", url: "https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/", type: "Deep Dive" },
                { title: "Sanfoundry 1000 Operating Systems Interview Questions", url: "https://www.sanfoundry.com/1000-operating-system-questions-answers/", type: "Practice MCQs" }
            ]
        },
        "2026-10-30": {
            dsa: "Linked List (LL)",
            core: "Computer Networks (CN)",
            dayIndex: 5,
            dsaLinks: [
                { title: "LeetCode Top Interview Questions — Linked List", url: "https://leetcode.com/tag/linked-list/", type: "Practice" },
                { title: "Striver's SDE Sheet — Top Coding Interview Linked Lists", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/", type: "SDE Sheet" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks Top 50 Computer Networks Interview Questions", url: "https://www.geeksforgeeks.org/networking-interview-questions/", type: "Interview Q&A" },
                { title: "InterviewBit Computer Networks Preparation Guide", url: "https://www.interviewbit.com/networking-interview-questions/", type: "Study Guide" }
            ]
        },
        "2026-10-31": {
            dsa: "Linked List (LL)",
            core: "Computer Networks (CN)",
            dayIndex: 6,
            dsaLinks: [
                { title: "LeetCode Advanced LL (LRU Cache, Reverse K-Group, Merge K Lists)", url: "https://leetcode.com/tag/linked-list/", type: "Advanced" },
                { title: "NeetCode 150 — In-Depth Linked List Walkthroughs", url: "https://neetcode.io/practice", type: "Video Solutions" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks TCP/IP vs OSI Model & Layers", url: "https://www.geeksforgeeks.org/tcp-ip-model/", type: "Core Concept" },
                { title: "High Performance Browser Networking (HTTP/HTTPS, TCP, TLS)", url: "https://hpbn.co/", type: "In-Depth Book" }
            ]
        },
        "2026-11-01": {
            dsa: "Stacks",
            core: "Computer Networks (CN)",
            dayIndex: 7,
            dsaLinks: [
                { title: "LeetCode Stack Tagged Problems", url: "https://leetcode.com/tag/stack/", type: "Practice" },
                { title: "Striver's Stack & Queue A2Z Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", type: "SDE Sheet" },
                { title: "NeetCode 150 — Stack Patterns (Valid Parentheses, Daily Temperatures)", url: "https://neetcode.io/practice", type: "Curated" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks Network Layer, Subnetting & Routing Questions", url: "https://www.geeksforgeeks.org/network-layer-services-packetizing-routing-and-forwarding/", type: "Theory" },
                { title: "InterviewBit DNS, DHCP, ARP & Protocol Cheatsheet", url: "https://www.interviewbit.com/networking-interview-questions/", type: "Protocols" }
            ]
        },
        "2026-11-02": {
            dsa: "Stacks",
            core: "OOPs",
            dayIndex: 8,
            dsaLinks: [
                { title: "LeetCode Monotonic Stack Problems (Next Greater Element)", url: "https://leetcode.com/tag/monotonic-stack/", type: "Pattern Practice" },
                { title: "Striver's Monotonic Stack Guide & Questions", url: "https://takeuforward.org/data-structure/monotonic-stack/", type: "SDE Sheet" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks Top 50 OOPs Interview Questions (4 Pillars & Examples)", url: "https://www.geeksforgeeks.org/oops-interview-questions/", type: "Interview Q&A" },
                { title: "InterviewBit Object-Oriented Programming Prep", url: "https://www.interviewbit.com/oops-interview-questions/", type: "Study Guide" }
            ]
        },
        "2026-11-03": {
            dsa: "Queue",
            core: "OOPs",
            dayIndex: 9,
            dsaLinks: [
                { title: "LeetCode Queue & Priority Queue / Deque Tag", url: "https://leetcode.com/tag/queue/", type: "Practice" },
                { title: "NeetCode 150 Sliding Window & Queue Problems", url: "https://neetcode.io/practice", type: "Curated" }
            ],
            coreLinks: [
                { title: "Refactoring Guru — Gang of Four Design Patterns Explained", url: "https://refactoring.guru/design-patterns", type: "Design Patterns" },
                { title: "GeeksforGeeks SOLID Principles in Programming", url: "https://www.geeksforgeeks.org/solid-principles-in-programming/", type: "Architecture" }
            ]
        },
        "2026-11-04": {
            dsa: "Trees",
            core: "SQL",
            dayIndex: 10,
            dsaLinks: [
                { title: "LeetCode Binary Tree Tagged Problem Set", url: "https://leetcode.com/tag/tree/", type: "Practice" },
                { title: "Striver's Tree Series & Sheet (Traversals, Depth, Diameter)", url: "https://takeuforward.org/data-structure/strivers-tree-series/", type: "SDE Sheet" },
                { title: "NeetCode 150 — Trees Section", url: "https://neetcode.io/practice", type: "Curated" }
            ],
            coreLinks: [
                { title: "LeetCode Top 50 SQL Study Plan (Essential Interview Queries)", url: "https://leetcode.com/studyplan/top-sql-50/", type: "Interactive Practice" },
                { title: "Mode Analytics Complete Interactive SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "Tutorial" }
            ]
        },
        "2026-11-05": {
            dsa: "Trees",
            core: "SQL",
            dayIndex: 11,
            dsaLinks: [
                { title: "LeetCode Binary Search Tree (BST) Tag", url: "https://leetcode.com/tag/binary-search-tree/", type: "Practice" },
                { title: "Striver's BST Course — Search, Insert, LCA & Validate", url: "https://takeuforward.org/data-structure/binary-search-tree/", type: "SDE Sheet" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks Top SQL Interview Questions (Joins, Aggregations)", url: "https://www.geeksforgeeks.org/sql-interview-questions/", type: "Interview Q&A" },
                { title: "InterviewBit SQL Query Interview Practice", url: "https://www.interviewbit.com/sql-interview-questions/", type: "Study Guide" }
            ]
        },
        "2026-11-06": {
            dsa: "Trees",
            core: "SQL",
            dayIndex: 12,
            dsaLinks: [
                { title: "LeetCode Hard Tree Problems (Serialize, Maximum Path Sum)", url: "https://leetcode.com/tag/tree/", type: "Advanced" },
                { title: "Striver's SDE Sheet — Top Coding Interview Tree Questions", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/", type: "SDE Sheet" }
            ],
            coreLinks: [
                { title: "Use The Index, Luke — SQL Indexing & Performance Tuning Guide", url: "https://use-the-index-luke.com/", type: "Performance" },
                { title: "StrataScratch Real FAANG SQL Interview Questions", url: "https://www.stratascratch.com/", type: "Interview Queries" }
            ]
        },
        "2026-11-07": {
            dsa: "Graphs",
            core: "Machine Learning (ML)",
            dayIndex: 13,
            dsaLinks: [
                { title: "LeetCode Graph Tag (BFS, DFS, Matrix Traversal)", url: "https://leetcode.com/tag/graph/", type: "Practice" },
                { title: "Striver's Graph Series — Master Graph Algorithms", url: "https://takeuforward.org/graph/striver-graph-series-top-graph-interview-questions/", type: "SDE Sheet" },
                { title: "NeetCode 150 — Graphs Roadmap", url: "https://neetcode.io/practice", type: "Curated" }
            ],
            coreLinks: [
                { title: "Chip Huyen — Machine Learning Interviews Guide", url: "https://huyenchip.com/ml-interviews-book/", type: "Free Book" },
                { title: "GeeksforGeeks Top 50 Machine Learning Interview Questions", url: "https://www.geeksforgeeks.org/machine-learning-interview-questions/", type: "Interview Q&A" }
            ]
        },
        "2026-11-08": {
            dsa: "Graphs",
            core: "Machine Learning (ML)",
            dayIndex: 14,
            dsaLinks: [
                { title: "Striver's Shortest Path Algorithms (Dijkstra, Bellman-Ford, DSU)", url: "https://takeuforward.org/data-structure/dijkstras-algorithm-shortest-distance/", type: "SDE Sheet" },
                { title: "LeetCode Shortest Path Problem Set", url: "https://leetcode.com/tag/shortest-path/", type: "Practice" }
            ],
            coreLinks: [
                { title: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", type: "Tutorial" },
                { title: "GeeksforGeeks Deep Learning & Neural Network Interview Questions", url: "https://www.geeksforgeeks.org/deep-learning-interview-questions/", type: "Interview Q&A" }
            ]
        },
        "2026-11-09": {
            dsa: "Graphs",
            core: "Generative AI",
            dayIndex: 15,
            dsaLinks: [
                { title: "LeetCode Topological Sort Problems (Course Schedule)", url: "https://leetcode.com/tag/topological-sort/", type: "Practice" },
                { title: "Striver's Minimum Spanning Tree (Prim's & Kruskal's)", url: "https://takeuforward.org/data-structure/prims-algorithm-minimum-spanning-tree/", type: "SDE Sheet" }
            ],
            coreLinks: [
                { title: "Jay Alammar — The Illustrated Transformer (Attention & LLMs)", url: "https://jalammar.github.io/illustrated-transformer/", type: "Visual Guide" },
                { title: "GeeksforGeeks Top Generative AI & LLM Interview Questions", url: "https://www.geeksforgeeks.org/generative-ai-interview-questions/", type: "Interview Q&A" }
            ]
        },
        "2026-11-10": {
            dsa: "Dynamic Programming (DP)",
            core: "Generative AI",
            dayIndex: 16,
            dsaLinks: [
                { title: "LeetCode Dynamic Programming Problem Set", url: "https://leetcode.com/tag/dynamic-programming/", type: "Practice" },
                { title: "Striver's DP Series — 1D DP (Climbing Stairs, Frog Jump)", url: "https://takeuforward.org/data-structure/dynamic-programming-introduction/", type: "SDE Sheet" },
                { title: "NeetCode 150 — 1-D Dynamic Programming", url: "https://neetcode.io/practice", type: "Curated" }
            ],
            coreLinks: [
                { title: "DeepLearning.AI — Prompt Engineering & LLM Application Courses", url: "https://www.deeplearning.ai/short-courses/", type: "Video Course" },
                { title: "Pinecone — Comprehensive Guide to RAG (Retrieval-Augmented Generation)", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/", type: "Architecture" }
            ]
        },
        "2026-11-11": {
            dsa: "Dynamic Programming (DP)",
            core: "Data Analytics",
            dayIndex: 17,
            dsaLinks: [
                { title: "Striver's Grid / 2D DP (Unique Paths, Minimum Path Sum)", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", type: "SDE Sheet" },
                { title: "LeetCode 2D Dynamic Programming Problems", url: "https://leetcode.com/tag/dynamic-programming/", type: "Practice" }
            ],
            coreLinks: [
                { title: "LeetCode 30 Days of Pandas (Essential Analytics Practice)", url: "https://leetcode.com/studyplan/30-days-of-pandas/", type: "Interactive Practice" },
                { title: "GeeksforGeeks Top Data Analyst Interview Questions & Answers", url: "https://www.geeksforgeeks.org/data-analyst-interview-questions/", type: "Interview Q&A" }
            ]
        },
        "2026-11-12": {
            dsa: "Dynamic Programming (DP)",
            core: "Data Analytics",
            dayIndex: 18,
            dsaLinks: [
                { title: "Striver's DP on Subsequences & Strings (LCS, Edit Distance)", url: "https://takeuforward.org/data-structure/longest-common-subsequence-dp-25/", type: "SDE Sheet" },
                { title: "NeetCode 150 — 2-D Dynamic Programming Roadmap", url: "https://neetcode.io/practice", type: "Curated" }
            ],
            coreLinks: [
                { title: "InterviewQuery Data Analytics & Case Study Interview Prep", url: "https://www.interviewquery.com/", type: "Case Studies" },
                { title: "GeeksforGeeks A/B Testing & Product Analytics Metrics", url: "https://www.geeksforgeeks.org/ab-testing/", type: "Concepts" }
            ]
        },
        "2026-11-13": {
            dsa: "Dynamic Programming (DP)",
            core: "Git & Bash",
            dayIndex: 19,
            dsaLinks: [
                { title: "Striver's DP on Stocks & Knapsack Problems", url: "https://takeuforward.org/data-structure/best-time-to-buy-and-sell-stock-dp-35/", type: "SDE Sheet" },
                { title: "LeetCode Coin Change & Target Sum DP Practice", url: "https://leetcode.com/tag/dynamic-programming/", type: "Practice" }
            ],
            coreLinks: [
                { title: "Learn Git Branching — Interactive Visual Git Sandbox", url: "https://learngitbranching.js.org/", type: "Interactive Sandbox" },
                { title: "Atlassian Comprehensive Git Tutorials & Workflows", url: "https://www.atlassian.com/git/tutorials", type: "Tutorial" }
            ]
        },
        "2026-11-14": {
            dsa: "Dynamic Programming (DP)",
            core: "Git & Bash",
            dayIndex: 20,
            dsaLinks: [
                { title: "Striver's Partition DP (Matrix Chain Multiplication, Palindrome Partitioning)", url: "https://takeuforward.org/data-structure/matrix-chain-multiplication-dp-48/", type: "SDE Sheet" },
                { title: "LeetCode Hard DP Interview Questions", url: "https://leetcode.com/tag/dynamic-programming/", type: "Advanced" }
            ],
            coreLinks: [
                { title: "MIT Missing Semester of CS Education — Shell Tools & Scripting", url: "https://missing.csail.mit.edu/2020/shell-tools/", type: "MIT Lecture Notes" },
                { title: "Devhints Bash Scripting & CLI Commands Cheatsheet", url: "https://devhints.io/bash", type: "Cheatsheet" }
            ]
        },
        "2026-11-15": {
            dsa: "Dynamic Programming (DP)",
            core: "Linux",
            dayIndex: 21,
            dsaLinks: [
                { title: "Striver's DP Grand Master Revision & SDE Cheat Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", type: "Final Review" },
                { title: "NeetCode Complete Dynamic Programming Problem List", url: "https://neetcode.io/practice", type: "All Patterns" }
            ],
            coreLinks: [
                { title: "GeeksforGeeks Top 50 Linux Interview Questions", url: "https://www.geeksforgeeks.org/linux-interview-questions/", type: "Interview Q&A" },
                { title: "Linux Journey — Interactive Guide from Command Line to Kernel", url: "https://linuxjourney.com/", type: "Interactive Guide" }
            ]
        }
    };

    const TASK_IDS = ["task-dsa", "task-core"];

    // DOM Elements
    const saveBtn = document.getElementById("save-btn");
    const currentDateEl = document.getElementById("current-date");
    const planTagEl = document.getElementById("plan-tag");
    const statusBadge = document.getElementById("daily-status");
    const dsaNameEl = document.getElementById("task-dsa-name");
    const coreNameEl = document.getElementById("task-core-name");
    const dsaModeBadge = document.getElementById("dsa-mode-badge");
    const coreModeBadge = document.getElementById("core-mode-badge");
    const dsaQuickLink = document.getElementById("dsa-quick-link");
    const coreQuickLink = document.getElementById("core-quick-link");

    // Modal Elements
    const todaySourcesBtn = document.getElementById("today-sources-btn");
    const sourcesModal = document.getElementById("sources-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalPlanDay = document.getElementById("modal-plan-day");
    const modalTitle = document.getElementById("modal-title");
    const modalDsaTopic = document.getElementById("modal-dsa-topic");
    const modalDsaLinks = document.getElementById("modal-dsa-links");
    const modalCoreTopic = document.getElementById("modal-core-topic");
    const modalCoreLinks = document.getElementById("modal-core-links");

    // --- 2. LOCAL DATE UTILITIES ---
    function getLocalDateKey(d) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getPreviousDateKey(dateKey) {
        const [y, m, d] = dateKey.split("-").map(Number);
        const prev = new Date(y, m - 1, d - 1);
        return getLocalDateKey(prev);
    }

    const now = new Date();
    const todayKey = getLocalDateKey(now);
    currentDateEl.innerText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    // --- 3. DYNAMIC STUDY PLAN RESOLUTION ---
    function resolvePlan(dateKey) {
        if (STUDY_PLAN[dateKey]) {
            return {
                ...STUDY_PLAN[dateKey],
                tag: `Study Plan • Day ${STUDY_PLAN[dateKey].dayIndex} of 21`,
                isLive: true
            };
        }
        if (dateKey < "2026-10-26") {
            return {
                ...STUDY_PLAN["2026-10-26"],
                tag: "Starts Oct 26 • Day 1 Ready",
                isLive: false
            };
        }
        return {
            ...STUDY_PLAN["2026-11-15"],
            tag: "Study Plan Completed • Review Mode",
            isLive: false
        };
    }

    const todayPlan = resolvePlan(todayKey);
    const prevKey = getPreviousDateKey(todayKey);
    const prevPlan = STUDY_PLAN[prevKey];

    // Populate Dynamic Task Labels
    if (dsaNameEl) dsaNameEl.innerText = todayPlan.dsa;
    if (coreNameEl) coreNameEl.innerText = todayPlan.core;
    if (planTagEl) planTagEl.innerText = todayPlan.tag;

    // Set Quick Resource Links on Checklist items
    if (dsaQuickLink && todayPlan.dsaLinks && todayPlan.dsaLinks.length > 0) {
        dsaQuickLink.href = todayPlan.dsaLinks[0].url;
        dsaQuickLink.title = `Practice ${todayPlan.dsa} on ${todayPlan.dsaLinks[0].title}`;
    }
    if (coreQuickLink && todayPlan.coreLinks && todayPlan.coreLinks.length > 0) {
        coreQuickLink.href = todayPlan.coreLinks[0].url;
        coreQuickLink.title = `Study ${todayPlan.core} on ${todayPlan.coreLinks[0].title}`;
    }

    // Determine Topic Repetition / Continuity
    const isContinuedDsa = Boolean(prevPlan && prevPlan.dsa === todayPlan.dsa);
    if (dsaModeBadge) {
        if (isContinuedDsa) {
            dsaModeBadge.innerText = "Continued Practice";
            dsaModeBadge.className = "task-mode-badge";
        } else {
            dsaModeBadge.innerText = "New Topic";
            dsaModeBadge.className = "task-mode-badge new";
        }
    }

    if (coreModeBadge) {
        const isContinuedCore = Boolean(prevPlan && prevPlan.core === todayPlan.core);
        coreModeBadge.innerText = isContinuedCore ? "Continued Subject" : "Core Subject";
    }

    // --- 4. POPULATE & CONTROL SOURCES MODAL ---
    function renderModalSources() {
        if (modalPlanDay) {
            modalPlanDay.innerText = `DAY ${todayPlan.dayIndex} OF 21 • ${todayPlan.tag.toUpperCase()}`;
        }
        if (modalTitle) {
            modalTitle.innerText = `${todayPlan.dsa} & ${todayPlan.core} Sources`;
        }
        if (modalDsaTopic) {
            modalDsaTopic.innerText = todayPlan.dsa;
        }
        if (modalCoreTopic) {
            modalCoreTopic.innerText = todayPlan.core;
        }

        // Render DSA Links
        if (modalDsaLinks) {
            modalDsaLinks.innerHTML = "";
            (todayPlan.dsaLinks || []).forEach(link => {
                const a = document.createElement("a");
                a.className = "source-link-item";
                a.href = link.url;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.innerHTML = `
                    <span>${link.title}</span>
                    <span class="source-link-badge">${link.type} ↗</span>
                `;
                modalDsaLinks.appendChild(a);
            });
        }

        // Render Core CS Links
        if (modalCoreLinks) {
            modalCoreLinks.innerHTML = "";
            (todayPlan.coreLinks || []).forEach(link => {
                const a = document.createElement("a");
                a.className = "source-link-item";
                a.href = link.url;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.innerHTML = `
                    <span>${link.title}</span>
                    <span class="source-link-badge">${link.type} ↗</span>
                `;
                modalCoreLinks.appendChild(a);
            });
        }
    }

    // Render modal content immediately
    renderModalSources();

    if (todaySourcesBtn && sourcesModal && closeModalBtn) {
        todaySourcesBtn.addEventListener("click", () => {
            renderModalSources();
            sourcesModal.classList.remove("hidden");
        });

        closeModalBtn.addEventListener("click", () => {
            sourcesModal.classList.add("hidden");
        });

        window.addEventListener("click", (e) => {
            if (e.target === sourcesModal) {
                sourcesModal.classList.add("hidden");
            }
        });
    }

    // --- 5. TASK UI STATE SYNC ---
    function updateTaskRowState(id, isChecked) {
        const row = document.getElementById(`item-${id}`);
        if (row) {
            if (isChecked) {
                row.classList.add("checked");
            } else {
                row.classList.remove("checked");
            }
        }
    }

    // --- 6. LOCAL STORAGE RESET & RESTORE LOGIC ---
    const lastVisitKey = localStorage.getItem("mission_last_visit");

    if (lastVisitKey !== todayKey) {
        // NEW DAY DETECTED
        TASK_IDS.forEach(id => {
            localStorage.setItem(`${todayKey}_${id}`, "false");
            localStorage.setItem(id, "false");
            const el = document.getElementById(id);
            if (el) {
                el.checked = false;
                updateTaskRowState(id, false);
            }
        });

        // Auto-fail previous unlogged visit
        if (lastVisitKey) {
            checkAndAutoFailPreviousDay(lastVisitKey);
        }

        localStorage.setItem("mission_last_visit", todayKey);
        updateStatusBadge("PENDING");
    } else {
        // SAME DAY: RESTORE CHECKED STATE
        TASK_IDS.forEach(id => {
            const isChecked = (localStorage.getItem(`${todayKey}_${id}`) ?? localStorage.getItem(id)) === "true";
            const el = document.getElementById(id);
            if (el) {
                el.checked = isChecked;
                updateTaskRowState(id, isChecked);
            }
        });

        const history = getHistory();
        if (history[todayKey]) {
            updateStatusBadge(history[todayKey]);
        }
    }

    // --- 7. EVENT LISTENERS ---
    TASK_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", (e) => {
                const checked = e.target.checked;
                localStorage.setItem(`${todayKey}_${id}`, String(checked));
                localStorage.setItem(id, String(checked));
                updateTaskRowState(id, checked);
            });
        }
    });

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const allChecked = TASK_IDS.every(id => {
                const el = document.getElementById(id);
                return el && el.checked;
            });
            const status = allChecked ? "SUCCESS" : "FAILED";

            const history = getHistory();
            history[todayKey] = status;
            localStorage.setItem("mission_history", JSON.stringify(history));

            updateStatusBadge(status);
            renderCalendar();

            if (allChecked) {
                alert(`✅ Mission Accomplished!\n\nBoth today's DSA (${todayPlan.dsa}) and Core Subject (${todayPlan.core}) are completed. Keep up the consistency!`);
            } else {
                alert("❌ Day Logged as Incomplete.\n\nMake sure to complete both the DSA topic and Core Subject before the day ends.");
            }
        });
    }

    // --- 8. CALENDAR RENDERER (WITH MONTH SEPARATORS & PLAN TOOLTIPS) ---
    function renderCalendar() {
        const grid = document.getElementById("calendar-grid");
        if (!grid) return;
        grid.innerHTML = "";
        const history = getHistory();

        let lastMonthLabel = "";

        // Loop through last 365 days up to today
        for (let i = 0; i < 365; i++) {
            const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (364 - i));
            const dKey = getLocalDateKey(d);
            const dayNum = d.getDate();

            // Month Label (e.g., "October 2026")
            const monthLabel = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

            if (monthLabel !== lastMonthLabel) {
                const headerEl = document.createElement("div");
                headerEl.classList.add("month-header");
                headerEl.innerText = monthLabel;
                grid.appendChild(headerEl);
                lastMonthLabel = monthLabel;
            }

            const dayEl = document.createElement("div");
            dayEl.classList.add("day-box");
            dayEl.innerText = dayNum;

            // Study Plan Annotation
            if (STUDY_PLAN[dKey]) {
                const sp = STUDY_PLAN[dKey];
                dayEl.title = `${d.toDateString()} (Day ${sp.dayIndex} of 21)\nDSA: ${sp.dsa}\nCore: ${sp.core}`;
                dayEl.classList.add("has-plan");
            } else {
                dayEl.title = d.toDateString();
            }

            // Mark Today
            if (dKey === todayKey) {
                dayEl.classList.add("today");
            }

            // Apply History Status
            if (history[dKey] === "SUCCESS") {
                dayEl.classList.add("success");
            } else if (history[dKey] === "FAILED") {
                dayEl.classList.add("failed");
            }

            grid.appendChild(dayEl);
        }

        // Auto-scroll to bottom
        requestAnimationFrame(() => {
            grid.scrollTop = grid.scrollHeight;
        });
    }

    // --- 9. HELPER FUNCTIONS ---
    function getHistory() {
        return JSON.parse(localStorage.getItem("mission_history") || "{}");
    }

    function updateStatusBadge(status) {
        if (!statusBadge) return;
        statusBadge.innerText = status;
        if (status === "SUCCESS") {
            statusBadge.style.color = "var(--accent-green)";
        } else if (status === "FAILED") {
            statusBadge.style.color = "var(--accent-red)";
        } else {
            statusBadge.style.color = "var(--text-muted)";
        }
    }

    function checkAndAutoFailPreviousDay(prevDateKey) {
        const history = getHistory();
        if (!history[prevDateKey]) {
            history[prevDateKey] = "FAILED";
            localStorage.setItem("mission_history", JSON.stringify(history));
        }
    }

    // Initial Calendar Render
    renderCalendar();
});