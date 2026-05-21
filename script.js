const items = [
  {
    id: "fireCrystal",
    category: "attribute",
    icon: "🔥",
    name: "炎の結晶",
    attribute: "炎",
    weaponName: "炎剣フレアブレード",
    image: "assets/fire-crystal.png",
    weaponImage: "assets/fire-sword.png",
    shortText: "炎の剣になる",
    detail: "剣に炎の力を宿す魔石。力強い炎属性の剣になる。"
  },
  {
    id: "waterStone",
    category: "attribute",
    icon: "💧",
    name: "水の雫石",
    attribute: "水",
    weaponName: "水剣アクアブレード",
    image: "assets/water-stone.png",
    weaponImage: "assets/water-sword.png",
    shortText: "水の剣になる",
    detail: "剣に水の力を宿す魔石。しなやかな水属性の剣になる。"
  },
  {
    id: "thunderCore",
    category: "attribute",
    icon: "⚡",
    name: "雷鳴のコア",
    attribute: "雷",
    weaponName: "雷剣サンダーブレード",
    image: "assets/thunder-core.png",
    weaponImage: "assets/thunder-sword.png",
    shortText: "雷の剣になる",
    detail: "剣に雷の力を宿すコア。鋭い雷属性の剣になる。"
  },
  {
    id: "darkStone",
    category: "attribute",
    icon: "🌑",
    name: "闇の魔石",
    attribute: "闇",
    weaponName: "闇剣シャドウブレード",
    image: "assets/dark-stone.png",
    weaponImage: "assets/dark-sword.png",
    shortText: "闇の剣になる",
    detail: "剣に闇の力を宿す魔石。怪しく強い闇属性の剣になる。"
  },
  {
    id: "reviveFeather",
    category: "skill",
    icon: "🪽",
    name: "復活の羽",
    skillName: "復活付与",
    image: "assets/revive-feather.png",
    shortText: "1回だけ復活",
    effect: "HPが0になった時、1回だけHPを少し回復して復活する。",
    simpleEffect: "1回だけ復活できる！"
  },
  {
    id: "lifeHerb",
    category: "skill",
    icon: "🌿",
    name: "生命の草",
    skillName: "自然回復",
    image: "assets/life-herb.png",
    shortText: "毎ターン回復",
    effect: "毎ターンHPを少し回復する。",
    simpleEffect: "毎ターン少し回復！"
  },
  {
    id: "criticalOrb",
    category: "skill",
    icon: "🔮",
    name: "会心の宝玉",
    skillName: "一閃付与",
    image: "assets/critical-orb.png",
    shortText: "たまに攻撃2倍",
    effect: "攻撃時、30%の確率でダメージが2倍になる。",
    simpleEffect: "たまに攻撃が2倍になる！"
  },
  {
    id: "sharpFang",
    category: "upgrade",
    icon: "🦷",
    name: "鋭い牙",
    stat: "attackRate",
    statLabel: "攻撃率",
    image: "assets/sharp-fang.png",
    shortText: "攻撃アップ",
    bestSlot: "top",
    bestSlotLabel: "上",
    detail: "攻撃率を上げる強化素材。上に付けると最も効果が高い。",
    bonuses: { top: 30, right: 15, left: 10, bottom: 5 }
  },
  {
    id: "hardMetal",
    category: "upgrade",
    icon: "🛡️",
    name: "硬い金属",
    stat: "defenseRate",
    statLabel: "防御率",
    image: "assets/hard-metal.png",
    shortText: "防御アップ",
    bestSlot: "right",
    bestSlotLabel: "右",
    detail: "防御率を上げる強化素材。右に付けると最も安定して守りが高まる。",
    bonuses: { top: 5, right: 30, left: 15, bottom: 10 }
  },
  {
    id: "windFeather",
    category: "upgrade",
    icon: "🪶",
    name: "風の羽",
    stat: "evasionRate",
    statLabel: "回避率",
    image: "assets/wind-feather.png",
    shortText: "回避アップ",
    bestSlot: "left",
    bestSlotLabel: "左",
    detail: "回避率を上げる強化素材。左に付けると剣のバランスが良くなり、回避率が最も上がる。",
    bonuses: { top: 10, right: 5, left: 30, bottom: 15 }
  },
  {
    id: "magicPowder",
    category: "upgrade",
    icon: "✨",
    name: "魔力の粉",
    stat: "elementBoost",
    statLabel: "属性強化",
    image: "assets/magic-powder.png",
    shortText: "属性アップ",
    bestSlot: "bottom",
    bestSlotLabel: "下",
    detail: "属性強化を上げる素材。下に付けると魔力が剣全体に流れ、属性強化が最も上がる。",
    bonuses: { top: 15, right: 10, left: 5, bottom: 30 }
  }
];

const categoryLabels = {
  attribute: "属性素材",
  skill: "固有スキル",
  upgrade: "武器強化"
};

const statInfo = {
  attackRate: { label: "攻撃率", icon: "⚔️", className: "attack" },
  defenseRate: { label: "防御率", icon: "🛡️", className: "defense" },
  evasionRate: { label: "回避率", icon: "🌪️", className: "evasion" },
  elementBoost: { label: "属性強化", icon: "✨", className: "element" }
};

const slotLabels = {
  attribute: "属性スロット",
  skill: "固有スキルスロット",
  top: "上",
  right: "右",
  left: "左",
  bottom: "下"
};

let slots = {
  attribute: null,
  skill: null,
  top: null,
  right: null,
  left: null,
  bottom: null
};

let activeDrag = null;
let isSynthesizing = false;

const screens = {
  title: document.getElementById("title-screen"),
  craft: document.getElementById("craft-screen"),
  result: document.getElementById("result-screen")
};

const startButton = document.getElementById("start-button");
const craftLayout = document.getElementById("craft-layout");
const inventoryPanel = document.getElementById("inventory-panel");
const inventoryToggle = document.getElementById("inventory-toggle");
const inventoryList = document.getElementById("inventory-list");
const craftMessage = document.getElementById("craft-message");
const titleMessage = document.getElementById("title-message");
const workbench = document.getElementById("workbench");
const slotElements = Array.from(document.querySelectorAll(".craft-slot"));
const boostList = document.getElementById("boost-list");
const attributeSummary = document.getElementById("attribute-summary");
const skillSummary = document.getElementById("skill-summary");
const synthesizeButton = document.getElementById("synthesize-button");
const resetButton = document.getElementById("reset-button");
const againButton = document.getElementById("again-button");
const fullscreenButtons = Array.from(document.querySelectorAll(".fullscreen-button"));

const modal = document.getElementById("item-modal");
const modalIcon = document.getElementById("modal-icon");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

const magicCircle = document.getElementById("magic-circle");
const fusionStage = document.getElementById("fusion-stage");
const fusionResultImage = document.getElementById("fusion-result-image");

const resultWeaponImage = document.getElementById("result-weapon-image");
const resultName = document.getElementById("result-name");
const resultAttribute = document.getElementById("result-attribute");
const resultSkill = document.getElementById("result-skill");
const resultSkillEffect = document.getElementById("result-skill-effect");
const resultAttack = document.getElementById("result-attack");
const resultDefense = document.getElementById("result-defense");
const resultEvasion = document.getElementById("result-evasion");
const resultElementBoost = document.getElementById("result-element-boost");
const resultType = document.getElementById("result-type");
const resultDescriptionList = document.getElementById("result-description-list");

function getItem(id) {
  return items.find((item) => item.id === id);
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[name].classList.add("is-active");
}

function setMessage(target, text, type = "") {
  target.textContent = text;
  target.classList.toggle("is-error", type === "error");
  target.classList.toggle("is-success", type === "success");
}

function imageMarkup(item, extraClass = "") {
  if (!item.image) {
    return `<span class="${extraClass}">${item.icon}</span>`;
  }

  return `<img class="${extraClass}" src="${item.image}" alt="" aria-hidden="true" data-fallback-icon="${item.icon}">`;
}

function installImageFallbacks(root = document) {
  root.querySelectorAll("img[data-fallback-icon]").forEach((image) => {
    if (image.dataset.fallbackBound === "true") {
      return;
    }

    image.dataset.fallbackBound = "true";
    image.addEventListener("error", () => {
      if (image.nextElementSibling && image.nextElementSibling.classList.contains("image-fallback")) {
        return;
      }

      const fallback = document.createElement("span");
      fallback.textContent = image.dataset.fallbackIcon || "✨";
      fallback.className = `${image.className} image-fallback`.trim();
      fallback.setAttribute("aria-hidden", "true");
      image.style.display = "none";
      image.insertAdjacentElement("afterend", fallback);
    });
  });

  root.querySelectorAll("img[data-fallback]").forEach((image) => {
    if (image.dataset.fallbackBound === "true") {
      return;
    }

    image.dataset.fallbackBound = "true";
    image.addEventListener("error", () => {
      if (image.nextElementSibling && image.nextElementSibling.classList.contains("image-fallback")) {
        return;
      }

      const fallback = document.createElement("span");
      fallback.textContent = image.dataset.fallback || "✨";
      fallback.className = `${image.className} image-fallback`.trim();
      fallback.setAttribute("aria-hidden", "true");
      image.style.display = "none";
      image.insertAdjacentElement("afterend", fallback);
    });
  });
}

function renderInventory() {
  inventoryList.innerHTML = "";

  Object.entries(categoryLabels).forEach(([category, label]) => {
    const section = document.createElement("section");
    section.className = "item-category";
    section.innerHTML = `<h4 class="item-category-title">${label}</h4>`;

    items.filter((item) => item.category === category).forEach((item) => {
      const card = document.createElement("div");
      card.className = `item-card item-${item.category}`;
      card.dataset.itemId = item.id;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${item.name}、${item.shortText}、ドラッグして使う`);
      card.innerHTML = `
        <span class="item-visual">${imageMarkup(item)}</span>
        <span class="item-text">
          <span class="item-name">${item.icon} ${item.name}</span>
          <span class="item-short">${item.shortText}</span>
        </span>
        <button class="info-button" type="button" data-info-id="${item.id}" aria-label="${item.name}の説明">i</button>
      `;
      section.appendChild(card);
    });

    inventoryList.appendChild(section);
  });

  installImageFallbacks(inventoryList);
}

function calculateBoosts() {
  const boosts = {
    attackRate: 0,
    defenseRate: 0,
    evasionRate: 0,
    elementBoost: 0
  };

  ["top", "right", "left", "bottom"].forEach((slotName) => {
    const item = getItem(slots[slotName]);

    if (!item || item.category !== "upgrade") {
      return;
    }

    boosts[item.stat] += item.bonuses[slotName] || 0;
  });

  return boosts;
}

function formatPercent(value) {
  return `+${value}%`;
}

function renderBoosts() {
  const boosts = calculateBoosts();
  boostList.innerHTML = "";

  Object.entries(statInfo).forEach(([key, info]) => {
    const row = document.createElement("div");
    row.className = `boost-row ${info.className}`;
    row.innerHTML = `
      <span class="boost-icon" aria-hidden="true">${info.icon}</span>
      <span class="boost-label">${info.label}</span>
      <span class="boost-value">${formatPercent(boosts[key])}</span>
    `;
    boostList.appendChild(row);
  });
}

function renderSlots() {
  slotElements.forEach((slotElement) => {
    const slotName = slotElement.dataset.slot;
    const item = getItem(slots[slotName]);
    const content = slotElement.querySelector(".slot-content");

    slotElement.classList.toggle("is-filled", Boolean(item));

    if (!item) {
      content.textContent = "空";
      return;
    }

    content.innerHTML = `
      <span class="slot-icon" aria-hidden="true">${imageMarkup(item)}</span>
      <span class="slot-item-name">${item.name}</span>
    `;
    installImageFallbacks(content);
  });

  const attributeItem = getItem(slots.attribute);
  const skillItem = getItem(slots.skill);
  attributeSummary.textContent = attributeItem ? `属性：${attributeItem.attribute}（${attributeItem.name}）` : "属性：未設定";
  skillSummary.textContent = skillItem ? `スキル：${skillItem.skillName}（${skillItem.name}）` : "スキル：未設定";
}

function renderAll() {
  renderSlots();
  renderBoosts();
}

function detailHtml(item) {
  if (item.category === "attribute") {
    return `
      <p><strong>属性：</strong>${item.attribute}</p>
      <p><strong>完成武器：</strong>${item.weaponName}</p>
      <p><strong>説明：</strong>${item.detail}</p>
    `;
  }

  if (item.category === "skill") {
    return `
      <p><strong>固有スキル：</strong>${item.skillName}</p>
      <p><strong>効果：</strong>${item.effect}</p>
      <p><strong>かんたん説明：</strong>${item.simpleEffect}</p>
    `;
  }

  return `
    <p><strong>特化：</strong>${item.statLabel}</p>
    <p><strong>上：</strong>+${item.bonuses.top}%　<strong>右：</strong>+${item.bonuses.right}%</p>
    <p><strong>左：</strong>+${item.bonuses.left}%　<strong>下：</strong>+${item.bonuses.bottom}%</p>
    <p><strong>相性最高：</strong>${item.bestSlotLabel}スロット</p>
    <p><strong>説明：</strong>${item.detail}</p>
  `;
}

function openModal(itemId) {
  const item = getItem(itemId);

  if (!item) {
    return;
  }

  modalIcon.textContent = item.icon;
  modalTitle.textContent = item.name;
  modalBody.innerHTML = detailHtml(item);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function canDrop(item, slotElement) {
  return Boolean(item && slotElement && item.category === slotElement.dataset.accept);
}

function clearDropHighlights() {
  slotElements.forEach((slotElement) => {
    slotElement.classList.remove("is-valid-drop", "is-invalid-drop", "is-drop-target");
  });
}

function highlightDropZones(item) {
  slotElements.forEach((slotElement) => {
    slotElement.classList.toggle("is-valid-drop", canDrop(item, slotElement));
    slotElement.classList.toggle("is-invalid-drop", !canDrop(item, slotElement));
  });
}

function createDragGhost(item) {
  const ghost = document.createElement("div");
  ghost.className = "drag-ghost";
  ghost.innerHTML = `
    <span class="item-visual">${imageMarkup(item)}</span>
    <span class="item-text">
      <span class="item-name">${item.icon} ${item.name}</span>
      <span class="item-short">${item.shortText}</span>
    </span>
  `;
  document.body.appendChild(ghost);
  installImageFallbacks(ghost);
  return ghost;
}

function moveGhost(x, y) {
  if (!activeDrag) {
    return;
  }

  activeDrag.ghost.style.left = `${x}px`;
  activeDrag.ghost.style.top = `${y}px`;
}

function updateHoveredSlot(x, y) {
  if (!activeDrag) {
    return null;
  }

  slotElements.forEach((slotElement) => slotElement.classList.remove("is-drop-target"));
  const element = document.elementFromPoint(x, y);
  const slotElement = element ? element.closest(".craft-slot") : null;

  if (slotElement) {
    slotElement.classList.add("is-drop-target");
  }

  return slotElement;
}

function beginDrag(event, card) {
  if (isSynthesizing || event.button === 2) {
    return;
  }

  const item = getItem(card.dataset.itemId);

  if (!item) {
    return;
  }

  event.preventDefault();
  card.classList.add("is-drag-source");
  activeDrag = {
    item,
    sourceCard: card,
    ghost: createDragGhost(item)
  };

  highlightDropZones(item);
  moveGhost(event.clientX, event.clientY);
  updateHoveredSlot(event.clientX, event.clientY);
  setMessage(craftMessage, `${item.name}をつかみました。光っているスロットへ置いてください。`);
}

function moveDrag(event) {
  if (!activeDrag) {
    return;
  }

  event.preventDefault();
  moveGhost(event.clientX, event.clientY);
  updateHoveredSlot(event.clientX, event.clientY);
}

function endDrag(event) {
  if (!activeDrag) {
    return;
  }

  event.preventDefault();
  const slotElement = updateHoveredSlot(event.clientX, event.clientY);
  const { item, sourceCard, ghost } = activeDrag;

  if (canDrop(item, slotElement)) {
    const slotName = slotElement.dataset.slot;
    slots[slotName] = item.id;
    renderAll();
    setMessage(craftMessage, `${slotLabels[slotName]}に${item.name}をセットしました。`, "success");
  } else if (slotElement) {
    setMessage(craftMessage, `${item.name}はそのスロットには置けません。`, "error");
  } else {
    setMessage(craftMessage, `${item.name}を作業台のスロットへ運んでください。`, "error");
  }

  sourceCard.classList.remove("is-drag-source");
  ghost.remove();
  activeDrag = null;
  clearDropHighlights();
}

function removeSlot(slotName) {
  if (!slots[slotName]) {
    return;
  }

  const item = getItem(slots[slotName]);
  slots[slotName] = null;
  renderAll();
  setMessage(craftMessage, `${slotLabels[slotName]}から${item.name}を外しました。`);
}

function resetCraft() {
  slots = {
    attribute: null,
    skill: null,
    top: null,
    right: null,
    left: null,
    bottom: null
  };
  isSynthesizing = false;
  synthesizeButton.disabled = false;
  resetButton.disabled = false;
  resetFusionEffects();
  renderAll();
  setMessage(craftMessage, "素材カタログからアイテムをドラッグしてください。");
}

function validateSynthesis() {
  if (!slots.attribute && !slots.skill) {
    return "属性素材と固有スキル素材をセットしてください。";
  }

  if (!slots.attribute) {
    return "属性を決めるため、属性スロットに素材を置いてください。";
  }

  if (!slots.skill) {
    return "固有スキルを決めるため、固有スキルスロットに素材を置いてください。";
  }

  return "";
}

function getWeaponType(boosts) {
  if (boosts.attackRate >= 30 && boosts.elementBoost >= 30) {
    return "魔攻型";
  }

  if (boosts.attackRate >= 30) {
    return "攻撃型";
  }

  if (boosts.defenseRate >= 30) {
    return "防御型";
  }

  if (boosts.evasionRate >= 30) {
    return "回避型";
  }

  if (boosts.elementBoost >= 30) {
    return "属性型";
  }

  return "バランス型";
}

function buildUpgradeDescriptions() {
  const descriptions = [];

  ["top", "right", "left", "bottom"].forEach((slotName) => {
    const item = getItem(slots[slotName]);

    if (!item || item.category !== "upgrade") {
      return;
    }

    const bonus = item.bonuses[slotName] || 0;
    const prefix = item.bestSlot === slotName ? "相性抜群！ " : "";
    descriptions.push(`${prefix}${item.name}を${slotLabels[slotName]}に付けたため、${item.statLabel}が +${bonus}% 上がった。`);
  });

  return descriptions;
}

function buildSynthesisResult() {
  const attributeItem = getItem(slots.attribute);
  const skillItem = getItem(slots.skill);
  const boosts = calculateBoosts();

  return {
    attributeItem,
    skillItem,
    boosts,
    type: getWeaponType(boosts),
    descriptions: [
      `${attributeItem.attribute}の力を宿した剣が完成した！`,
      `${skillItem.skillName}により、${skillItem.simpleEffect}`,
      ...buildUpgradeDescriptions()
    ]
  };
}

function applyResult(result) {
  const fallbackWeapon = result.attributeItem.weaponImage || "assets/old-sword.png";
  if (resultWeaponImage.nextElementSibling && resultWeaponImage.nextElementSibling.classList.contains("image-fallback")) {
    resultWeaponImage.nextElementSibling.remove();
  }
  resultWeaponImage.style.display = "block";
  resultWeaponImage.src = fallbackWeapon;
  resultWeaponImage.alt = result.attributeItem.weaponName;
  resultName.textContent = result.attributeItem.weaponName;
  resultAttribute.textContent = result.attributeItem.attribute;
  resultSkill.textContent = result.skillItem.skillName;
  resultSkillEffect.textContent = result.skillItem.effect;
  resultAttack.textContent = formatPercent(result.boosts.attackRate);
  resultDefense.textContent = formatPercent(result.boosts.defenseRate);
  resultEvasion.textContent = formatPercent(result.boosts.evasionRate);
  resultElementBoost.textContent = formatPercent(result.boosts.elementBoost);
  resultType.textContent = result.type;
  resultDescriptionList.innerHTML = "";

  result.descriptions.forEach((description) => {
    const listItem = document.createElement("li");
    listItem.textContent = description;
    resultDescriptionList.appendChild(listItem);
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
  workbench.classList.remove("is-fusing");
}

function makeSpiralKeyframes(startX, startY, centerX, centerY) {
  const dx = startX - centerX;
  const dy = startY - centerY;
  const startRadius = Math.max(80, Math.hypot(dx, dy));
  const startAngle = Math.atan2(dy, dx);
  const frames = [];

  for (let index = 0; index <= 8; index += 1) {
    const progress = index / 8;
    const radius = startRadius * (1 - progress);
    const angle = startAngle + progress * Math.PI * 3.4;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    frames.push({
      left: `${x}px`,
      top: `${y}px`,
      opacity: progress > 0.9 ? 0.18 : 1,
      transform: `translate(-50%, -50%) scale(${1 - progress * 0.42}) rotate(${progress * 680}deg)`,
      offset: progress
    });
  }

  return frames;
}

function createFusionOrb(item, x, y) {
  const orb = document.createElement("div");
  orb.className = "fusion-orb";
  orb.style.left = `${x}px`;
  orb.style.top = `${y}px`;
  orb.innerHTML = item.image ? imageMarkup(item) : item.icon;
  fusionStage.appendChild(orb);
  installImageFallbacks(orb);
  return orb;
}

async function playFusionAnimation(result) {
  resetFusionEffects();
  workbench.classList.add("is-fusing");
  magicCircle.classList.add("is-active");
  fusionResultImage.src = result.attributeItem.weaponImage || "assets/old-sword.png";

  const workbenchRect = workbench.getBoundingClientRect();
  const centerX = workbenchRect.width / 2;
  const centerY = workbenchRect.height / 2;
  const animations = [];

  Object.entries(slots).forEach(([slotName, itemId], index) => {
    const item = getItem(itemId);
    const slotElement = document.querySelector(`.craft-slot[data-slot="${slotName}"]`);

    if (!item || !slotElement) {
      return;
    }

    const slotRect = slotElement.getBoundingClientRect();
    const startX = slotRect.left - workbenchRect.left + slotRect.width / 2;
    const startY = slotRect.top - workbenchRect.top + slotRect.height / 2;
    const orb = createFusionOrb(item, startX, startY);

    if (typeof orb.animate === "function") {
      const animation = orb.animate(
        makeSpiralKeyframes(startX, startY, centerX, centerY),
        {
          duration: 1400,
          delay: index * 95,
          easing: "cubic-bezier(0.24, 0.78, 0.25, 1)",
          fill: "forwards"
        }
      );
      animations.push(animation.finished.catch(() => {}));
    } else {
      orb.style.left = `${centerX}px`;
      orb.style.top = `${centerY}px`;
      animations.push(wait(1400 + index * 95));
    }
  });

  await Promise.all(animations);
  fusionResultImage.classList.add("is-active");
  await wait(950);
  resetFusionEffects();
}

async function synthesize() {
  if (isSynthesizing) {
    return;
  }

  const error = validateSynthesis();

  if (error) {
    setMessage(craftMessage, error, "error");
    return;
  }

  const result = buildSynthesisResult();
  applyResult(result);
  isSynthesizing = true;
  synthesizeButton.disabled = true;
  resetButton.disabled = true;
  setMessage(craftMessage, "素材が魔法陣へ集まっています...");
  await playFusionAnimation(result);
  isSynthesizing = false;
  synthesizeButton.disabled = false;
  resetButton.disabled = false;
  showScreen("result");
}

async function requestFullscreen() {
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    const activeMessage = screens.craft.classList.contains("is-active") ? craftMessage : titleMessage;
    setMessage(activeMessage, "この端末では全画面表示に対応していない場合があります。", "error");
  }
}

function toggleInventory() {
  const willCollapse = !inventoryPanel.classList.contains("is-collapsed");
  inventoryPanel.classList.toggle("is-collapsed", willCollapse);
  craftLayout.classList.toggle("inventory-collapsed", willCollapse);
  inventoryToggle.textContent = willCollapse ? "▶ 開く" : "◀ 閉じる";
  inventoryToggle.setAttribute("aria-expanded", String(!willCollapse));
}

function bindEvents() {
  startButton.addEventListener("click", () => {
    showScreen("craft");
    setMessage(craftMessage, "アイテムを指で持って、作業台のスロットに置こう！");
  });

  inventoryToggle.addEventListener("click", toggleInventory);

  fullscreenButtons.forEach((button) => {
    button.addEventListener("click", requestFullscreen);
  });

  inventoryList.addEventListener("pointerdown", (event) => {
    const infoButton = event.target.closest(".info-button");
    const card = event.target.closest(".item-card");

    if (infoButton) {
      event.stopPropagation();
      return;
    }

    if (card) {
      beginDrag(event, card);
    }
  });

  inventoryList.addEventListener("click", (event) => {
    const infoButton = event.target.closest(".info-button");

    if (infoButton) {
      openModal(infoButton.dataset.infoId);
    }
  });

  inventoryList.addEventListener("keydown", (event) => {
    const card = event.target.closest(".item-card");

    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openModal(card.dataset.itemId);
    }
  });

  window.addEventListener("pointermove", moveDrag, { passive: false });
  window.addEventListener("pointerup", endDrag, { passive: false });
  window.addEventListener("pointercancel", endDrag, { passive: false });

  workbench.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-slot-button");

    if (!removeButton || isSynthesizing) {
      return;
    }

    const slotElement = removeButton.closest(".craft-slot");
    removeSlot(slotElement.dataset.slot);
  });

  synthesizeButton.addEventListener("click", synthesize);
  resetButton.addEventListener("click", resetCraft);

  againButton.addEventListener("click", () => {
    resetCraft();
    showScreen("title");
  });

  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

renderInventory();
renderAll();
installImageFallbacks(document);
bindEvents();
