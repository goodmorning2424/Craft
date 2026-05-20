const materials = [
  {
    id: "fire",
    name: "炎の結晶",
    element: "炎",
    icon: "🔥",
    image: "assets/fire-crystal.png",
    weapon: "炎剣フレアブレード",
    weaponImage: "assets/fire-sword.png"
  },
  {
    id: "water",
    name: "水の雫石",
    element: "水",
    icon: "💧",
    image: "assets/water-stone.png",
    weapon: "水剣アクアブレード",
    weaponImage: "assets/water-sword.png"
  },
  {
    id: "thunder",
    name: "雷鳴のコア",
    element: "雷",
    icon: "⚡",
    image: "assets/thunder-core.png",
    weapon: "雷剣サンダーブレード",
    weaponImage: "assets/thunder-sword.png"
  },
  {
    id: "dark",
    name: "闇の魔石",
    element: "闇",
    icon: "🌑",
    image: "assets/dark-stone.png",
    weapon: "闇剣シャドウブレード",
    weaponImage: "assets/dark-sword.png"
  }
];

const slotEffects = {
  top: { label: "上スロット", attack: 50, durability: 0 },
  right: { label: "右スロット", attack: 0, durability: 20 },
  left: { label: "左スロット", attack: 0, durability: 20 },
  bottom: { label: "下スロット", attack: -20, durability: -15 }
};

const baseStatus = {
  attack: 100,
  durability: 80,
  element: "なし"
};

let selectedMaterialId = null;
let placedMaterials = {
  top: null,
  right: null,
  left: null,
  bottom: null
};
let isSynthesizing = false;

const screens = {
  title: document.getElementById("title-screen"),
  craft: document.getElementById("craft-screen"),
  result: document.getElementById("result-screen")
};

const materialsList = document.getElementById("materials-list");
const message = document.getElementById("message");
const forgeCircle = document.querySelector(".forge-circle");
const fusionStage = document.getElementById("fusion-stage");
const magicCircle = document.getElementById("magic-circle");
const fusionResultImage = document.getElementById("fusion-result-image");
const slotButtons = document.querySelectorAll(".slot");
const startButton = document.getElementById("start-button");
const synthesizeButton = document.getElementById("synthesize-button");
const resetButton = document.getElementById("reset-button");

const resultName = document.getElementById("result-name");
const resultAttack = document.getElementById("result-attack");
const resultDurability = document.getElementById("result-durability");
const resultElement = document.getElementById("result-element");
const resultWeaponImage = document.getElementById("result-weapon-image");
const effectList = document.getElementById("effect-list");

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[screenName].classList.add("is-active");
}

function getMaterialById(id) {
  return materials.find((material) => material.id === id);
}

function getUsedMaterialIds() {
  return Object.values(placedMaterials).filter(Boolean);
}

function renderMaterials() {
  materialsList.innerHTML = "";

  materials.forEach((material) => {
    const isUsed = getUsedMaterialIds().includes(material.id);
    const isSelected = selectedMaterialId === material.id;
    const button = document.createElement("button");

    button.type = "button";
    button.className = "material";
    button.dataset.materialId = material.id;
    button.disabled = isUsed;
    button.setAttribute("aria-pressed", String(isSelected));

    if (isUsed) {
      button.classList.add("is-used");
    }

    if (isSelected) {
      button.classList.add("is-selected");
    }

    button.innerHTML = `
      <img class="material-image" src="${material.image}" alt="" aria-hidden="true">
      <span class="material-text">
        <span class="material-name"><span aria-hidden="true">${material.icon}</span>${material.name}</span>
        <span class="material-meta">属性 ${material.element}</span>
        ${isUsed ? '<span class="material-used">使用済み</span>' : ""}
      </span>
    `;

    button.addEventListener("click", () => selectMaterial(material.id));
    materialsList.appendChild(button);
  });
}

function renderSlots() {
  slotButtons.forEach((slotButton) => {
    const slotName = slotButton.dataset.slot;
    const materialId = placedMaterials[slotName];
    const value = slotButton.querySelector(".slot-value");

    if (materialId) {
      const material = getMaterialById(materialId);
      value.innerHTML = `<img class="slot-material-image" src="${material.image}" alt="" aria-hidden="true"><span>${material.icon} ${material.element}</span>`;
      slotButton.classList.add("is-filled");
      slotButton.setAttribute("aria-label", `${slotEffects[slotName].label}、${material.name}を配置済み`);
    } else {
      value.textContent = "空";
      slotButton.classList.remove("is-filled");
      slotButton.setAttribute("aria-label", slotEffects[slotName].label);
    }
  });
}

function setMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("is-error", isError);
}

function selectMaterial(materialId) {
  if (isSynthesizing) {
    return;
  }

  if (getUsedMaterialIds().includes(materialId)) {
    return;
  }

  selectedMaterialId = materialId;
  const material = getMaterialById(materialId);
  setMessage(`${material.name}を選択中。置きたいスロットをタップしてください。`);
  renderMaterials();
}

function placeMaterial(slotName) {
  if (isSynthesizing) {
    return;
  }

  if (!selectedMaterialId) {
    setMessage("先に左の素材をタップして選択してください。", true);
    return;
  }

  const oldMaterialId = placedMaterials[slotName];
  placedMaterials[slotName] = selectedMaterialId;
  const placedMaterial = getMaterialById(selectedMaterialId);
  selectedMaterialId = null;

  if (oldMaterialId) {
    const oldMaterial = getMaterialById(oldMaterialId);
    setMessage(`${slotEffects[slotName].label}の${oldMaterial.name}を外し、${placedMaterial.name}を配置しました。`);
  } else {
    setMessage(`${slotEffects[slotName].label}に${placedMaterial.name}を配置しました。`);
  }

  renderMaterials();
  renderSlots();
}

function formatSignedNumber(number) {
  if (number > 0) {
    return `+${number}`;
  }

  if (number < 0) {
    return `${number}`;
  }

  return "±0";
}

function buildSynthesisResult() {
  const topMaterialId = placedMaterials.top;

  if (!topMaterialId) {
    setMessage("属性を決めるため、上スロットに素材を置いてください。", true);
    return null;
  }

  let attack = baseStatus.attack;
  let durability = baseStatus.durability;
  const topMaterial = getMaterialById(topMaterialId);
  const effects = [];

  Object.entries(placedMaterials).forEach(([slotName, materialId]) => {
    if (!materialId) {
      return;
    }

    const material = getMaterialById(materialId);
    const effect = slotEffects[slotName];
    attack += effect.attack;
    durability += effect.durability;

    effects.push(`${effect.label}：${material.name}を配置。攻撃力 ${formatSignedNumber(effect.attack)}、耐久力 ${formatSignedNumber(effect.durability)}`);
  });

  return {
    attack,
    durability,
    element: topMaterial.element,
    weapon: topMaterial.weapon,
    weaponImage: topMaterial.weaponImage,
    effects
  };
}

function applySynthesisResult(result) {
  resultName.textContent = result.weapon;
  resultAttack.textContent = result.attack;
  resultDurability.textContent = result.durability;
  resultElement.textContent = result.element;
  resultWeaponImage.src = result.weaponImage;
  resultWeaponImage.alt = result.weapon;

  effectList.innerHTML = "";
  result.effects.forEach((effectText) => {
    const item = document.createElement("li");
    item.textContent = effectText;
    effectList.appendChild(item);
  });
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function resetFusionEffects() {
  fusionStage.querySelectorAll(".fusion-orb").forEach((orb) => orb.remove());
  magicCircle.classList.remove("is-active");
  fusionResultImage.classList.remove("is-active");
  fusionResultImage.src = "assets/old-sword.png";
}

function makeSpiralKeyframes(startX, startY, centerX, centerY) {
  const dx = startX - centerX;
  const dy = startY - centerY;
  const startRadius = Math.max(70, Math.hypot(dx, dy));
  const startAngle = Math.atan2(dy, dx);
  const frames = [];

  for (let index = 0; index <= 8; index += 1) {
    const progress = index / 8;
    const radius = startRadius * (1 - progress);
    const angle = startAngle + progress * Math.PI * 3.35;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    frames.push({
      left: `${x}px`,
      top: `${y}px`,
      opacity: progress > 0.9 ? 0.18 : 1,
      transform: `translate(-50%, -50%) scale(${1 - progress * 0.46}) rotate(${progress * 640}deg)`,
      offset: progress
    });
  }

  return frames;
}

async function playFusionAnimation(result) {
  resetFusionEffects();
  forgeCircle.classList.add("is-fusing");
  magicCircle.classList.add("is-active");
  fusionResultImage.src = result.weaponImage;

  const forgeRect = forgeCircle.getBoundingClientRect();
  const centerX = forgeRect.width / 2;
  const centerY = forgeRect.height / 2;
  const animations = [];

  Object.entries(placedMaterials).forEach(([slotName, materialId], index) => {
    if (!materialId) {
      return;
    }

    const slotButton = document.querySelector(`[data-slot="${slotName}"]`);
    const slotRect = slotButton.getBoundingClientRect();
    const material = getMaterialById(materialId);
    const orb = document.createElement("img");

    orb.className = "fusion-orb";
    orb.src = material.image;
    orb.alt = "";
    orb.setAttribute("aria-hidden", "true");
    orb.style.left = `${slotRect.left - forgeRect.left + slotRect.width / 2}px`;
    orb.style.top = `${slotRect.top - forgeRect.top + slotRect.height / 2}px`;
    fusionStage.appendChild(orb);

    if (typeof orb.animate === "function") {
      const animation = orb.animate(
        makeSpiralKeyframes(
          slotRect.left - forgeRect.left + slotRect.width / 2,
          slotRect.top - forgeRect.top + slotRect.height / 2,
          centerX,
          centerY
        ),
        {
          duration: 1450,
          delay: index * 120,
          easing: "cubic-bezier(0.24, 0.78, 0.25, 1)",
          fill: "forwards"
        }
      );

      animations.push(animation.finished.catch(() => {}));
    } else {
      orb.style.left = `${centerX}px`;
      orb.style.top = `${centerY}px`;
      animations.push(wait(1450 + index * 120));
    }
  });

  await Promise.all(animations);
  fusionResultImage.classList.add("is-active");
  setMessage("合成成功！完成した武器が出現しました。");
  await wait(950);
  forgeCircle.classList.remove("is-fusing");
  resetFusionEffects();
}

async function synthesize() {
  if (isSynthesizing) {
    return;
  }

  const result = buildSynthesisResult();

  if (!result) {
    return;
  }

  isSynthesizing = true;
  synthesizeButton.disabled = true;
  setMessage("素材が魔法陣へ集まっています...");
  applySynthesisResult(result);
  await playFusionAnimation(result);
  isSynthesizing = false;
  synthesizeButton.disabled = false;

  showScreen("result");
}

function resetApp() {
  isSynthesizing = false;
  synthesizeButton.disabled = false;
  selectedMaterialId = null;
  placedMaterials = {
    top: null,
    right: null,
    left: null,
    bottom: null
  };

  setMessage("素材をタップして選択してください。");
  resetFusionEffects();
  renderMaterials();
  renderSlots();
  showScreen("title");
}

startButton.addEventListener("click", () => {
  showScreen("craft");
  setMessage("素材をタップして選択してください。");
});

slotButtons.forEach((slotButton) => {
  slotButton.addEventListener("click", () => placeMaterial(slotButton.dataset.slot));
});

synthesizeButton.addEventListener("click", synthesize);
resetButton.addEventListener("click", resetApp);

renderMaterials();
renderSlots();
