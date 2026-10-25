module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const token = process.env.GITHUB_TOKEN;
  const gistId = process.env.GIST_ID;

  if (!token || !gistId) {
    return res.status(500).json({ error: "Cloud sync credentials not configured on server" });
  }

  try {
    const rawKey = (req.query && req.query.key) || (req.body && req.body.key);
    if (!rawKey || typeof rawKey !== "string" || rawKey.trim().length < 3) {
      return res.status(400).json({ error: "A valid Sync Key of at least 3 characters is required" });
    }
    const syncKey = rawKey.trim().toLowerCase();

    // 1. Fetch current Gist content
    const gistRes = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "MissionTracker-Sync"
      }
    });

    if (!gistRes.ok) {
      return res.status(500).json({ error: "Failed to access cloud storage" });
    }

    const gistJson = await gistRes.json();
    let currentStore = { rooms: {} };

    try {
      if (gistJson.files && gistJson.files["mission_sync.json"] && gistJson.files["mission_sync.json"].content) {
        currentStore = JSON.parse(gistJson.files["mission_sync.json"].content);
        if (!currentStore.rooms) currentStore.rooms = {};
      }
    } catch (e) {
      currentStore = { rooms: {} };
    }

    // 2. Handle GET (Pull)
    if (req.method === "GET") {
      const roomData = currentStore.rooms[syncKey] || null;
      return res.status(200).json({
        success: true,
        data: roomData
      });
    }

    // 3. Handle POST (Push / Merge)
    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch (e) {
          body = {};
        }
      }
      const { history = {}, tasks = {}, updatedAt = Date.now() } = body || {};
      const existing = currentStore.rooms[syncKey] || { history: {}, tasks: {}, updatedAt: 0 };

      // Intelligent Merge
      const mergedHistory = { ...existing.history };
      for (const [date, status] of Object.entries(history)) {
        if (status === "SUCCESS" || !mergedHistory[date]) {
          mergedHistory[date] = status;
        }
      }

      const mergedTasks = { ...existing.tasks };
      for (const [tKey, isChecked] of Object.entries(tasks)) {
        if (isChecked || mergedTasks[tKey] === undefined) {
          mergedTasks[tKey] = isChecked;
        }
      }

      const mergedRoom = {
        history: mergedHistory,
        tasks: mergedTasks,
        updatedAt: Math.max(existing.updatedAt || 0, updatedAt)
      };

      currentStore.rooms[syncKey] = mergedRoom;

      // Update Gist
      const patchRes = await fetch(`https://api.github.com/gists/${gistId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "MissionTracker-Sync",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          files: {
            "mission_sync.json": {
              content: JSON.stringify(currentStore, null, 2)
            }
          }
        })
      });

      if (!patchRes.ok) {
        return res.status(500).json({ error: "Failed to persist cloud updates" });
      }

      return res.status(200).json({
        success: true,
        data: mergedRoom
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Sync API Error:", err);
    return res.status(500).json({ error: "Internal sync error: " + err.message });
  }
};
