let plusboxManualMode = false;
let plusboxAutoMode = false;
let plusboxNames = [];
let originalNames = [];

function loadPlusboxNames() {
    let jsonText = mod.getResource("languages/en.json");
    let data = JSON.parse(jsonText);
    plusboxNames = [];
    for (let i = 0; i < 150; i++) {
        let key = `culture_name_${i}`;
        if (data[key]) plusboxNames.push(data[key]);
    }
}

function storeOriginalNames() {
    originalNames = [];
    for (let i = 0; i < cultures.all.length; i++) {
        originalNames.push(cultures.all[i].name);
    }
}

function applyPlusboxNames() {
    for (let i = 0; i < cultures.all.length; i++) {
        cultures.all[i].name = plusboxNames[i % plusboxNames.length];
    }
}

function restoreOriginalNames() {
    for (let i = 0; i < cultures.all.length; i++) {
        cultures.all[i].name = originalNames[i] || cultures.all[i].name;
    }
}

// ▼ 手動切り替えモード
function toggleManualMode() {
    if (plusboxAutoMode) {
        ui.showPopup("❌ 自動適用モード中です。先に解除してください。");
        return;
    }

    if (!plusboxManualMode) {
        storeOriginalNames();
        applyPlusboxNames();
        plusboxManualMode = true;
        ui.showPopup("✅ Plusboxモード（手動）：ON");
    } else {
        restoreOriginalNames();
        plusboxManualMode = false;
        ui.showPopup("↩️ Plusboxモード（手動）：OFF");
    }
}

// ▼ 自動適用モード（on culture created）
function toggleAutoMode() {
    if (plusboxManualMode) {
        ui.showPopup("❌ 手動モード中です。先に解除してください。");
        return;
    }

    plusboxAutoMode = !plusboxAutoMode;
    let status = plusboxAutoMode ? "ON（文化に自動適用）" : "OFF";
    ui.showPopup(`🛠️ Plusbox自動適用モード：${status}`);
}

// ▼ 文化生成イベントに適用
events.on("cultureCreated", (c) => {
    if (plusboxAutoMode) {
        let name = plusboxNames[Math.floor(Math.random() * plusboxNames.length)];
        c.name = name;
    }
});

function initPlusbox() {
    loadPlusboxNames();

    let btn1 = ui.createButton("手動切替", toggleManualMode);
    let btn2 = ui.createButton("自動適用", toggleAutoMode);

    ui.placeButton(btn1, "bottomRight");
    ui.placeButton(btn2, "bottomRight", 1);
}

events.on("modLoaded", initPlusbox);
