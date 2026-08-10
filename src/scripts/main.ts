// Selecting an area (via the map or the text search below) actually filters
// the results list — see setupAreaPicker(). The rest of the filter panel
// (grade slider, style/stars chips, "more filters") stays a static mockup of
// the interaction, not wired up to the results — see spec/README.md.

function setupAreaPicker(): void {
  const root = document.querySelector<HTMLElement>(".area-picker");
  if (!root) return;

  const regionGroups = root.querySelectorAll<SVGGElement>(".area-map-region");
  const selectedLabel = root.querySelector<HTMLElement>(
    "#selected-area-label",
  );
  const clearButton = root.querySelector<HTMLButtonElement>(
    "[data-area-clear]",
  );

  const resultItems = document.querySelectorAll<HTMLLIElement>(
    "li[data-area-id]",
  );
  const resultsCount = document.querySelector<HTMLElement>(
    "[data-results-count]",
  );
  const resultsEmpty = document.querySelector<HTMLElement>(
    "[data-results-empty]",
  );
  const totalRoutes = resultItems.length;

  function applyFilter(regionId: string | null): void {
    let visibleCount = 0;
    resultItems.forEach((item) => {
      const matches = regionId ? item.dataset.regionId === regionId : true;
      item.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (resultsCount) {
      resultsCount.textContent = regionId
        ? `Showing ${visibleCount} of ${totalRoutes} routes`
        : `Showing all ${totalRoutes} routes`;
    }
    if (resultsEmpty) resultsEmpty.hidden = visibleCount > 0;
    if (clearButton) clearButton.hidden = !regionId;
  }

  function selectRegion(regionId: string | null, label: string): void {
    regionGroups.forEach((group) => {
      const ellipse = group.querySelector("ellipse");
      const isMatch = group.dataset.regionId === regionId;
      group.classList.toggle("is-selected", isMatch);
      ellipse?.setAttribute("aria-pressed", String(isMatch));
    });
    if (selectedLabel) {
      selectedLabel.textContent = regionId ? label : "No area selected";
    }
    applyFilter(regionId);
  }

  regionGroups.forEach((group) => {
    const ellipse = group.querySelector<SVGElement>("ellipse");
    if (!ellipse) return;
    const regionId = group.dataset.regionId ?? null;
    const name = ellipse.getAttribute("aria-label") ?? "";

    const activate = (): void => {
      selectRegion(regionId, name);
    };

    ellipse.addEventListener("click", activate);
    ellipse.addEventListener("keydown", (event) => {
      const key = (event as KeyboardEvent).key;
      if (key === "Enter" || key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });

  clearButton?.addEventListener("click", () => {
    selectRegion(null, "");
  });
}

function setupGradeSlider(): void {
  const slider = document.querySelector<HTMLElement>("[data-grade-slider]");
  if (!slider) return;

  const minInput = slider.querySelector<HTMLInputElement>("[data-grade-min]");
  const maxInput = slider.querySelector<HTMLInputElement>("[data-grade-max]");
  const highlight = slider.querySelector<HTMLElement>(
    "[data-grade-highlight]",
  );
  const minOutput = document.querySelector<HTMLOutputElement>(
    "[data-grade-min-output]",
  );
  const maxOutput = document.querySelector<HTMLOutputElement>(
    "[data-grade-max-output]",
  );
  if (!minInput || !maxInput || !highlight) return;

  const update = (): void => {
    const low = Number(minInput.min);
    const high = Number(minInput.max);
    const range = high - low;
    const min = Number(minInput.value);
    const max = Number(maxInput.value);
    const minPercent = ((min - low) / range) * 100;
    const maxPercent = ((max - low) / range) * 100;
    highlight.style.setProperty("--grade-min-percent", `${minPercent}%`);
    highlight.style.setProperty(
      "--grade-max-percent",
      `${100 - maxPercent}%`,
    );
    if (minOutput) minOutput.textContent = String(min);
    if (maxOutput) maxOutput.textContent = String(max);
  };

  minInput.addEventListener("input", () => {
    if (Number(minInput.value) > Number(maxInput.value)) {
      minInput.value = maxInput.value;
    }
    update();
  });

  maxInput.addEventListener("input", () => {
    if (Number(maxInput.value) < Number(minInput.value)) {
      maxInput.value = minInput.value;
    }
    update();
  });

  update();
}

setupAreaPicker();
setupGradeSlider();
