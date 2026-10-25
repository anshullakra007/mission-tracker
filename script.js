document.addEventListener("DOMContentLoaded", () => {
    // --- 1. STUDY PLAN CONFIGURATION (26 October – 15 November 2026) ---
    const STUDY_PLAN = {
        "2026-10-26": { dsa: "2D Arrays", core: "DBMS", dayIndex: 1 },
        "2026-10-27": { dsa: "Recursion", core: "DBMS", dayIndex: 2 },
        "2026-10-28": { dsa: "Backtracking", core: "OS", dayIndex: 3 },
        "2026-10-29": { dsa: "Linked List (LL)", core: "OS", dayIndex: 4 },
        "2026-10-30": { dsa: "Linked List (LL)", core: "Computer Networks (CN)", dayIndex: 5 },
        "2026-10-31": { dsa: "Linked List (LL)", core: "Computer Networks (CN)", dayIndex: 6 },
        "2026-11-01": { dsa: "Stacks", core: "Computer Networks (CN)", dayIndex: 7 },
        "2026-11-02": { dsa: "Stacks", core: "OOPs", dayIndex: 8 },
        "2026-11-03": { dsa: "Queue", core: "OOPs", dayIndex: 9 },
        "2026-11-04": { dsa: "Trees", core: "SQL", dayIndex: 10 },
        "2026-11-05": { dsa: "Trees", core: "SQL", dayIndex: 11 },
        "2026-11-06": { dsa: "Trees", core: "SQL", dayIndex: 12 },
        "2026-11-07": { dsa: "Graphs", core: "Machine Learning (ML)", dayIndex: 13 },
        "2026-11-08": { dsa: "Graphs", core: "Machine Learning (ML)", dayIndex: 14 },
        "2026-11-09": { dsa: "Graphs", core: "Generative AI", dayIndex: 15 },
        "2026-11-10": { dsa: "Dynamic Programming (DP)", core: "Generative AI", dayIndex: 16 },
        "2026-11-11": { dsa: "Dynamic Programming (DP)", core: "Data Analytics", dayIndex: 17 },
        "2026-11-12": { dsa: "Dynamic Programming (DP)", core: "Data Analytics", dayIndex: 18 },
        "2026-11-13": { dsa: "Dynamic Programming (DP)", core: "Git & Bash", dayIndex: 19 },
        "2026-11-14": { dsa: "Dynamic Programming (DP)", core: "Git & Bash", dayIndex: 20 },
        "2026-11-15": { dsa: "Dynamic Programming (DP)", core: "Linux", dayIndex: 21 }
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

    // Modal Elements
    const viewProfileBtn = document.getElementById("view-profile-btn");
    const profileModal = document.getElementById("profile-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");

    // --- MODAL LOGIC ---
    if (viewProfileBtn && profileModal && closeModalBtn) {
        viewProfileBtn.addEventListener("click", () => {
            profileModal.classList.remove("hidden");
        });

        closeModalBtn.addEventListener("click", () => {
            profileModal.classList.add("hidden");
        });

        window.addEventListener("click", (e) => {
            if (e.target === profileModal) {
                profileModal.classList.add("hidden");
            }
        });
    }

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

    // --- 4. TASK UI STATE SYNC ---
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

    // --- 5. LOCAL STORAGE RESET & RESTORE LOGIC ---
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

    // --- 6. EVENT LISTENERS ---
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

    // --- 7. CALENDAR RENDERER (WITH MONTH SEPARATORS & PLAN TOOLTIPS) ---
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

    // --- 8. HELPER FUNCTIONS ---
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