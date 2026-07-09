const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const group = tab.closest(".schedule-tabs") || document;
    group.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
  });
});

const scheduleFilter = document.querySelector("[data-schedule-filter]");

if (scheduleFilter) {
  const periodControls = scheduleFilter.querySelectorAll("[data-period-filter]");
  const classSelect = scheduleFilter.querySelector("[data-class-filter]");
  const rows = scheduleFilter.querySelectorAll(".timetable-table tbody tr");
  const emptyMessage = scheduleFilter.querySelector("[data-schedule-empty]");

  const applyScheduleFilter = () => {
    const periodSelect = scheduleFilter.querySelector("select[data-period-filter]");
    const activePeriod = periodSelect?.value || scheduleFilter.querySelector("[data-period-filter].active")?.dataset.periodFilter || "all";
    const activeClass = classSelect?.value || "all";
    let visibleRows = 0;

    rows.forEach((row) => {
      let visibleCells = 0;
      const classCells = row.querySelectorAll("td[data-period]");

      classCells.forEach((cell) => {
        const period = cell.dataset.period;
        const types = (cell.dataset.types || "").split(/\s+/).filter(Boolean);
        const classEntries = cell.querySelectorAll("[data-class-entry]");
        const periodMatch =
          activePeriod === "all" ||
          period === activePeriod ||
          (activePeriod === "private" && types.includes("private"));
        let classMatch = activeClass === "all" || types.includes(activeClass);

        if (classEntries.length > 0) {
          let visibleEntries = 0;

          classEntries.forEach((entry) => {
            const entryTypes = (entry.dataset.classEntry || "").split(/\s+/).filter(Boolean);
            const showEntry = activeClass === "all" || entryTypes.includes(activeClass);
            entry.classList.toggle("is-filtered", !showEntry);
            if (showEntry) visibleEntries += 1;
          });

          classMatch = activeClass === "all" || visibleEntries > 0;
        }

        const showCell = periodMatch && classMatch && (activeClass === "all" || !cell.classList.contains("empty-slot"));

        cell.classList.toggle("is-filtered", !showCell);
        if (showCell) visibleCells += 1;
      });

      row.classList.toggle("is-filtered", visibleCells === 0);
      if (visibleCells > 0) visibleRows += 1;
    });

    if (emptyMessage) {
      emptyMessage.classList.toggle("is-visible", visibleRows === 0);
    }
  };

  periodControls.forEach((control) => {
    control.addEventListener(control.tagName === "SELECT" ? "change" : "click", applyScheduleFilter);
  });

  classSelect?.addEventListener("change", applyScheduleFilter);
  applyScheduleFilter();
}

const form = document.querySelector("#reservationForm");
const formResult = document.querySelector("#formResult");

if (form && formResult) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formResult.style.display = "block";
    formResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    form.reset();
  });
}
