document.addEventListener("DOMContentLoaded", () => {
    // Configuration
    const TASK_IDS = ["task-tuf", "task-cp31", "task-vc"];
    
    // DOM Elements
    const saveBtn = document.getElementById("save-btn");
    const currentDateEl = document.getElementById("current-date");
    const statusBadge = document.getElementById("daily-status");
    
    // Modal Elements
    const viewProfileBtn = document.getElementById("view-profile-btn");
    const profileModal = document.getElementById("profile-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");

    // --- MODAL LOGIC ---
    viewProfileBtn.addEventListener("click", () => {
        profileModal.classList.remove("hidden");
    });

    closeModalBtn.addEventListener("click", () => {
        profileModal.classList.add("hidden");
    });

    // Close modal when clicking outside the photo container
    window.addEventListener("click", (e) => {
        if (e.target === profileModal) {
            profileModal.classList.add("hidden");
        }
    });

    // --- 1. DATE MANAGEMENT ---
    const now = new Date();
    // Use ISO string (YYYY-MM-DD) as the unique key for today
    const todayKey = now.toISOString().split('T')[0]; 
    currentDateEl.innerText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    // --- 2. LOCAL STORAGE RESET LOGIC ---
    // We check the "last visited date" stored in browser
    const lastVisitKey = localStorage.getItem("mission_last_visit");

    if (lastVisitKey !== todayKey) {
        // NEW DAY DETECTED: 
        // 1. Uncheck all boxes
        TASK_IDS.forEach(id => {
            localStorage.setItem(id, "false"); 
            document.getElementById(id).checked = false;
        });
        
        // 2. If yesterday wasn't logged, mark it as 'failed' in history
        if (lastVisitKey) {
            checkAndAutoFailPreviousDay(lastVisitKey);
        }

        // 3. Update 'last visit' to today
        localStorage.setItem("mission_last_visit", todayKey);
        updateStatusBadge("PENDING");
    } else {
        // SAME DAY: RESTORE STATE
        TASK_IDS.forEach(id => {
            const isChecked = localStorage.getItem(id) === "true";
            document.getElementById(id).checked = isChecked;
        });
        
        // Restore status if already logged today
        const history = getHistory();
        if (history[todayKey]) {
            updateStatusBadge(history[todayKey]);
        }
    }

    // --- 3. EVENT LISTENERS ---
    
    // Save checkbox state immediately when clicked
    TASK_IDS.forEach(id => {
        document.getElementById(id).addEventListener("change", (e) => {
            localStorage.setItem(id, e.target.checked);
        });
    });

    // "COMPLETE DAY" Button Logic
    saveBtn.addEventListener("click", () => {
        const allChecked = TASK_IDS.every(id => document.getElementById(id).checked);
        const status = allChecked ? "SUCCESS" : "FAILED";
        
        // Save to History
        const history = getHistory();
        history[todayKey] = status;
        localStorage.setItem("mission_history", JSON.stringify(history));

        // Visual Feedback
        updateStatusBadge(status);
        renderCalendar();
        
        if (allChecked) {
            alert("✅ Mission Accomplished. See you tomorrow.");
        } else {
            alert("❌ Day Logged as Incomplete. Do not make this a habit.");
        }
    });

    // --- 4. CALENDAR RENDERER ---
    function renderCalendar() {
        const grid = document.getElementById("calendar-grid");
        grid.innerHTML = "";
        const history = getHistory();

        // Show last 28 days (4 weeks)
        for (let i = 27; i >= 0; i--) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            const dKey = d.toISOString().split('T')[0];
            const dayNum = d.getDate();

            const dayEl = document.createElement("div");
            dayEl.classList.add("day-box");
            dayEl.innerText = dayNum;

            // Mark Today
            if (dKey === todayKey) {
                dayEl.classList.add("today");
            }

            // Apply Colors based on History
            if (history[dKey] === "SUCCESS") {
                dayEl.classList.add("success");
            } else if (history[dKey] === "FAILED") {
                dayEl.classList.add("failed");
            }

            grid.appendChild(dayEl);
        }
    }

    // --- HELPER FUNCTIONS ---
    function getHistory() {
        return JSON.parse(localStorage.getItem("mission_history") || "{}");
    }

    function updateStatusBadge(status) {
        statusBadge.innerText = status;
        if (status === "SUCCESS") {
            statusBadge.style.color = "var(--accent-green)";
        } else if (status === "FAILED") {
            statusBadge.style.color = "var(--accent-red)";
        } else {
            statusBadge.style.color = "var(--text-muted)";
        }
    }

    // If user forgot to log yesterday, mark it red automatically
    function checkAndAutoFailPreviousDay(prevDateKey) {
        const history = getHistory();
        if (!history[prevDateKey]) {
            history[prevDateKey] = "FAILED"; // Auto-fail
            localStorage.setItem("mission_history", JSON.stringify(history));
        }
    }

    // Initial Render
    renderCalendar();
});