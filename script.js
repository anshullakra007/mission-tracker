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

    window.addEventListener("click", (e) => {
        if (e.target === profileModal) {
            profileModal.classList.add("hidden");
        }
    });

    // --- 1. DATE MANAGEMENT ---
    const now = new Date();
    const todayKey = now.toISOString().split('T')[0]; 
    currentDateEl.innerText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    // 🟢 CHANGED FUNCTION: AUTO-MARK ABSENT DAYS 🟢
    function markPastDaysAsAbsent() {
        const history = getHistory();
        let hasChanges = false;

        // Start Date: Dec 22, 2025 (The day you started tracking)
        const startDate = new Date("2025-12-22");
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0); // Normalize to midnight

        // Loop from Start Date -> Yesterday
        for (let d = new Date(startDate); d < todayDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0];
            
            // If this date has NO status in history, mark it ABSENT (Yellow)
            if (!history[dateKey]) {
                history[dateKey] = "ABSENT"; // 🟢 CHANGED from "FAILED" to "ABSENT"
                hasChanges = true;
                console.log(`⚠️ Auto-marked absent day: ${dateKey}`);
            }
        }

        // Save only if we found missed days
        if (hasChanges) {
            localStorage.setItem("mission_history", JSON.stringify(history));
        }
    }

    // Call this IMMEDIATELY to fix history before rendering
    markPastDaysAsAbsent();

    // --- 2. LOCAL STORAGE RESET LOGIC ---
    const lastVisitKey = localStorage.getItem("mission_last_visit");

    if (lastVisitKey !== todayKey) {
        // NEW DAY DETECTED
        TASK_IDS.forEach(id => {
            localStorage.setItem(id, "false"); 
            document.getElementById(id).checked = false;
        });
        
        localStorage.setItem("mission_last_visit", todayKey);
        updateStatusBadge("PENDING");
    } else {
        // SAME DAY: RESTORE STATE
        TASK_IDS.forEach(id => {
            const isChecked = localStorage.getItem(id) === "true";
            document.getElementById(id).checked = isChecked;
        });
        
        const history = getHistory();
        if (history[todayKey]) {
            updateStatusBadge(history[todayKey]);
        }
    }

    // --- 3. EVENT LISTENERS ---
    TASK_IDS.forEach(id => {
        document.getElementById(id).addEventListener("change", (e) => {
            localStorage.setItem(id, e.target.checked);
        });
    });

    saveBtn.addEventListener("click", () => {
        const allChecked = TASK_IDS.every(id => document.getElementById(id).checked);
        // Note: When clicking save, it's either SUCCESS (green) or FAILED (red/incomplete work)
        const status = allChecked ? "SUCCESS" : "FAILED"; 
        
        const history = getHistory();
        history[todayKey] = status;
        localStorage.setItem("mission_history", JSON.stringify(history));

        updateStatusBadge(status);
        renderCalendar();
        
        if (allChecked) {
            alert("✅ Mission Accomplished. See you tomorrow.");
        } else {
            alert("❌ Day Logged as Incomplete. Do not make this a habit.");
        }
    });

    // --- 4. CALENDAR RENDERER (WITH MONTH SEPARATORS) ---
    function renderCalendar() {
        const grid = document.getElementById("calendar-grid");
        grid.innerHTML = "";
        const history = getHistory();
        
        let lastMonthLabel = "";

        // Loop through last 365 days
        for (let i = 0; i < 365; i++) {
            // Logic: 0 = 1 year ago, 364 = Today
            const d = new Date();
            d.setDate(now.getDate() - (364 - i)); 
            
            const dKey = d.toISOString().split('T')[0];
            const dayNum = d.getDate();
            
            // Format Month (e.g., "January 2026")
            const monthLabel = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

            // INJECT HEADER IF MONTH CHANGED
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
            dayEl.title = d.toDateString(); // Tooltip

            // Mark Today
            if (dKey === todayKey) {
                dayEl.classList.add("today");
            }

            // 🟢 CHANGED: Apply Colors based on status
            const status = history[dKey];
            if (status === "SUCCESS") {
                dayEl.classList.add("success");
            } else if (status === "FAILED") {
                dayEl.classList.add("failed");
            } else if (status === "ABSENT") {
                // 🟢 NEW CONDITION for Yellow
                dayEl.classList.add("absent");
            }

            grid.appendChild(dayEl);
        }

        // Auto-scroll to bottom
        requestAnimationFrame(() => {
            grid.scrollTop = grid.scrollHeight;
        });
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
        } else if (status === "ABSENT") {
            // 🟢 NEW COLOR for badge
            statusBadge.style.color = "var(--accent-yellow)";
        } else {
            statusBadge.style.color = "var(--text-muted)";
        }
    }

    // Initial Render
    renderCalendar();
});