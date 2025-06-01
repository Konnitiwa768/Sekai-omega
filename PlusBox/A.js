const fs = require("fs");
const path = require("path");

// ▼ 語幹（ユーザー編集可）50個
const stems = [
  "Val", "Luc", "Dom", "Ser", "Car", "Fre", "Wald", "Berg", "Grun", "Dorf",
  "Nov", "Zar", "Vlad", "Mir", "Kos", "Al", "Brun", "Cal", "Dan", "Eld",
  "Thel", "Ost", "West", "Nord", "Sud", "Mar", "Flor", "Ros", "Stras", "Goth",
  "Rein", "Aix", "Rhein", "Franz", "Wil", "Loth", "Bav", "Mainz", "Boch", "Zell",
  "Tarn", "Trev", "Ors", "Stav", "Luz", "Jor", "Tor", "Nym", "Hel", "Erz"
];

// ▼ 接尾辞（ユーザー編集可）10個
const suffixes = [
  "ia", "land", "heim", "grad", "stein",
  "dor", "eria", "mark", "bourg", ""
];

// ▼ 国名生成
function generateName() {
  const s1 = stems[Math.floor(Math.random() * stems.length)];
  const s2 = stems[Math.floor(Math.random() * stems.length)];
  const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
  return s1 + s2 + suf;
}

// ▼ 重複なし150個生成
const names = [];
while (names.length < 150) {
  const n = generateName();
  if (!names.includes(n)) names.push(n);
}

// ▼ JSON変換（culture_name_0 ～ 149）
const result = {};
names.forEach((name, i) => {
  result[`culture_name_${i}`] = name;
});

// ▼ 保存
const outputDir = path.join(__dirname, "languages");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "en.json"), JSON.stringify(result, null, 2), "utf8");

console.log("✅ 150個の国名を生成して languages/en.json に保存しました。");
