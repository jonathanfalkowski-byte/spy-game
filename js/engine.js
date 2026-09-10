(function () {
  const SAVE_KEY = "revelations-save-v2";

  const els = {
    stats: document.getElementById("stats"),
    dossier: document.getElementById("dossier"),
    location: document.getElementById("location"),
    speaker: document.getElementById("speaker"),
    text: document.getElementById("text"),
    choices: document.getElementById("choices"),
    silhouette: document.getElementById("silhouette"),
    whoName: document.getElementById("who-name"),
    whoStart: document.getElementById("who-start"),
    whoGender: document.getElementById("who-gender"),
    whoStatus: document.getElementById("who-status"),
    chapter: document.getElementById("who-chapter"),
    cover: document.getElementById("stat-cover"),
    integrity: document.getElementById("stat-integrity"),
    corruption: document.getElementById("stat-corruption"),
    heat: document.getElementById("stat-heat"),
    body: document.getElementById("stat-body"),
    journalBtn: document.getElementById("journal-btn"),
    journal: document.getElementById("journal"),
    art: document.getElementById("scene-art"),
  };

  let state = defaultState();
  let nodeId = "warning";
  let pendingName = "";
  let pageIndex = 0;

  function defaultState() {
    return {
      name: "Alex",
      startGender: "male",
      gender: "male",
      cover: 55,
      integrity: 60,
      corruption: 8,
      heat: 0,
      body: 0,
      flags: {},
      journal: [],
      wordsRead: 0,
    };
  }

  function clamp(n) {
    return Math.max(0, Math.min(100, n));
  }

  function pronoun(kind) {
    const f = state.gender === "female";
    if (kind === "he") return f ? "she" : "he";
    if (kind === "him") return f ? "her" : "him";
    if (kind === "his") return f ? "her" : "his";
    if (kind === "himself") return f ? "herself" : "himself";
    return f ? "she" : "he";
  }

  function interpolate(text) {
    return String(text)
      .replaceAll("{{name}}", state.name)
      .replaceAll("{{he}}", pronoun("he"))
      .replaceAll("{{him}}", pronoun("him"))
      .replaceAll("{{his}}", pronoun("his"))
      .replaceAll("{{himself}}", pronoun("himself"));
  }

  function applyEffects(effects) {
    if (!effects) return;
    ["cover", "integrity", "corruption", "heat", "body"].forEach((key) => {
      if (typeof effects[key] === "number") {
        state[key] = clamp(state[key] + effects[key]);
      }
    });
    if (effects.gender) state.gender = effects.gender;
    if (effects.startGender) state.startGender = effects.startGender;
    if (effects.name) state.name = effects.name;
    if (effects.flags) Object.assign(state.flags, effects.flags);
    if (effects.set) Object.assign(state, effects.set);
    if (effects.journal) addJournal(effects.journal);
  }

  function addJournal(entry) {
    if (!state.journal.includes(entry)) state.journal.push(entry);
  }

  function chapterMeta(node) {
    const id = (node && node.chapter) || (nodeId && nodeId.slice(0, 3));
    const list = (window.CAMPAIGN && window.CAMPAIGN.chapters) || [];
    return list.find((c) => c.id === id) || list[0];
  }

  function statusLine() {
    if (state.flags.owned) return "Owned asset";
    if (state.flags.double) return "Burned double";
    if (state.flags.transitioned) return "Converted legend";
    if (state.heat >= 60) return "Compromised";
    if (state.corruption >= 55) return "Sliding";
    return "Field operative";
  }

  function showHud(show) {
    els.stats.hidden = !show;
    els.dossier.hidden = !show;
  }

  function renderHud() {
    const ch = chapterMeta(window.STORY[nodeId]);
    els.cover.style.width = state.cover + "%";
    els.integrity.style.width = state.integrity + "%";
    els.corruption.style.width = state.corruption + "%";
    els.heat.style.width = state.heat + "%";
    els.body.style.width = state.body + "%";
    els.whoName.textContent = state.name;
    els.whoStart.textContent = state.startGender;
    els.whoGender.textContent = state.gender;
    els.whoStatus.textContent = statusLine();
    if (els.chapter) {
      els.chapter.textContent = ch && ch.num ? "Ch. " + ch.num + " · " + ch.title : "Clearance";
    }
    els.silhouette.dataset.gender = state.gender;
  }

  function choiceVisible(choice) {
    if (!choice.require) return true;
    const r = choice.require;
    if (r.flag && !state.flags[r.flag]) return false;
    if (r.notFlag && state.flags[r.notFlag]) return false;
    if (r.anyFlag && !r.anyFlag.some((f) => state.flags[f])) return false;
    if (r.startGender && state.startGender !== r.startGender) return false;
    if (r.gender && state.gender !== r.gender) return false;
    if (r.min && Object.entries(r.min).some(([k, v]) => state[k] < v)) return false;
    if (r.max && Object.entries(r.max).some(([k, v]) => state[k] > v)) return false;
    return true;
  }

  function endingId() {
    if (state.cover <= 8 && state.heat >= 70) return "c22_dead";
    if (state.flags.owned || (state.corruption >= 70 && state.body >= 55 && state.integrity <= 25)) {
      return "c22_owned";
    }
    if (state.startGender === "male" && state.gender === "female" && state.body >= 40) {
      return "c22_converted";
    }
    if (state.flags.double || (state.corruption >= 45 && state.integrity >= 40 && state.cover >= 40)) {
      return "c22_double";
    }
    return "c22_identity";
  }

  function pagesOf(node) {
    if (Array.isArray(node.pages)) return node.pages;
    const raw = typeof node.text === "function" ? node.text(state) : node.text;
    return [raw || ""];
  }

  function go(id, resetPage) {
    if (id === "ENDING") id = endingId();
    if (!window.STORY[id]) {
      els.speaker.textContent = "System";
      els.text.textContent = "Missing scene: " + id;
      els.choices.innerHTML = "";
      return;
    }
    if (resetPage !== false) pageIndex = 0;
    nodeId = id;
    const node = window.STORY[id];
    if (pageIndex === 0) applyEffects(node.effects);
    if (node.journal && pageIndex === 0) addJournal(node.journal);
    showHud(!node.hideHud);
    renderHud();
    if (els.art && typeof window.artFor === "function") {
      const src = window.artFor(node, id);
      if (els.art.getAttribute("data-src") !== src) {
        els.art.src = src;
        els.art.setAttribute("data-src", src);
        els.art.alt = node.location || "Scene";
      }
    }
    const ch = chapterMeta(node);
    const loc = node.location || "";
    els.location.textContent = ch && ch.num ? "Chapter " + ch.num + " · " + ch.title + (loc ? " · " + loc : "") : loc;
    els.speaker.textContent = node.speaker ? interpolate(node.speaker) : "";
    const pages = pagesOf(node);
    const page = pages[Math.min(pageIndex, pages.length - 1)];
    const shown = interpolate(page);
    els.text.textContent = shown;
    const pageKey = nodeId + "#" + pageIndex;
    state._readPages = state._readPages || {};
    if (!state._readPages[pageKey]) {
      state._readPages[pageKey] = true;
      state.wordsRead += String(shown).split(/\s+/).filter(Boolean).length;
    }
    els.choices.innerHTML = "";

    if (pageIndex < pages.length - 1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Continue";
      btn.addEventListener("click", () => {
        pageIndex += 1;
        go(nodeId, false);
      });
      els.choices.appendChild(btn);
      return;
    }

    if (node.input === "name") {
      const field = document.createElement("input");
      field.type = "text";
      field.maxLength = 24;
      field.placeholder = "Operative name";
      field.value = pendingName || state.name;
      field.style.cssText =
        "width:100%;margin-bottom:10px;padding:10px;background:#0d1118;color:#e8e4d8;border:1px solid #3a4558;font:inherit";
      els.choices.appendChild(field);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Confirm name";
      btn.addEventListener("click", () => {
        const value = (field.value || "Alex").trim() || "Alex";
        pendingName = value;
        state.name = value;
        go(node.next);
      });
      els.choices.appendChild(btn);
      field.focus();
      return;
    }

    const choices = (node.choices || []).filter(choiceVisible);
    if (choices.length) {
      choices.forEach((choice, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = i + 1 + ". " + interpolate(choice.text);
        btn.addEventListener("click", () => {
          applyEffects(choice.effects);
          go(choice.to);
        });
        els.choices.appendChild(btn);
      });
      return;
    }

    if (node.next) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Continue";
      btn.addEventListener("click", () => go(node.next));
      els.choices.appendChild(btn);
    }
  }

  function save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ state, nodeId, pageIndex }));
    els.text.textContent += "\n\n[Saved. Chapter progress is in this browser.]";
  }

  function load() {
    const raw = localStorage.getItem(SAVE_KEY) || localStorage.getItem("revelations-save-v1");
    if (!raw) return;
    const data = JSON.parse(raw);
    state = Object.assign(defaultState(), data.state);
    pageIndex = data.pageIndex || 0;
    go(data.nodeId, false);
  }

  function restart() {
    state = defaultState();
    pendingName = "";
    go("warning");
  }

  function toggleJournal() {
    if (els.journal.hidden) {
      els.journal.hidden = false;
      els.journal.innerHTML =
        "<h2>Dossier</h2>" +
        (state.journal.length
          ? "<ul>" + state.journal.map((j) => "<li>" + interpolate(j) + "</li>").join("") + "</ul>"
          : "<p>No entries yet.</p>") +
        "<p class='hint'>Approx. words read this playthrough: " +
        state.wordsRead.toLocaleString() +
        "</p>";
    } else {
      els.journal.hidden = true;
    }
  }

  document.getElementById("save-btn").addEventListener("click", save);
  document.getElementById("load-btn").addEventListener("click", load);
  document.getElementById("restart-btn").addEventListener("click", restart);
  if (els.journalBtn) els.journalBtn.addEventListener("click", toggleJournal);

  document.addEventListener("keydown", (event) => {
    if (event.target && event.target.tagName === "INPUT") return;
    const buttons = [...els.choices.querySelectorAll("button")];
    if (event.key === " " || event.key === "Enter") {
      if (buttons.length === 1) {
        event.preventDefault();
        buttons[0].click();
      }
    }
    const n = Number(event.key);
    if (n >= 1 && n <= 9 && buttons[n - 1]) buttons[n - 1].click();
  });

  go("warning");
})();
