(() => {
  "use strict";
  const cards = document.querySelectorAll("[data-server-status]");
  if (!cards.length) return;

  const setText = (selector, value) => cards.forEach((card) => {
    card.querySelectorAll(selector).forEach((node) => { node.textContent = value; });
  });
  const setStatus = (value) => setText("[data-status-text]", value);

  const load = async () => {
    try {
      const response = await fetch("https://api.mcsrvstat.us/3/delfinia.win", { cache: "no-store" });
      if (!response.ok) throw new Error("status");
      const data = await response.json();
      if (!data.online) {
        setStatus("Офлайн");
        setText("[data-status-players]", "0 игроков");
        return;
      }
      const online = data.players?.online ?? 0;
      const max = data.players?.max ?? "—";
      setStatus("Онлайн");
      setText("[data-status-players]", `${online} / ${max} игроков`);
    } catch {
      setStatus("Статус недоступен");
      setText("[data-status-players]", "—");
    }
  };
  window.setTimeout(load, 500);
})();
