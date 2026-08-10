// This prototype's search is deliberately non-functional: nothing below
// changes what's shown in the results list. It's a static UI/UX mockup of a
// better filtering experience, not a working search — see spec/README.md.

function setupAreaPicker(): void {
  const root = document.querySelector<HTMLElement>(".area-picker");
  if (!root) return;

  const regionGroups = root.querySelectorAll<SVGGElement>(".area-map-region");
  const searchInput = root.querySelector<HTMLInputElement>("#area-search");
  const selectedLabel = root.querySelector<HTMLElement>(
    "#selected-area-label",
  );
  const options = root.querySelectorAll<HTMLOptionElement>(
    "#area-options option",
  );

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
  }

  regionGroups.forEach((group) => {
    const ellipse = group.querySelector<SVGElement>("ellipse");
    if (!ellipse) return;
    const regionId = group.dataset.regionId ?? null;
    const name = ellipse.getAttribute("aria-label") ?? "";

    const activate = (): void => {
      selectRegion(regionId, name);
      if (searchInput) searchInput.value = name;
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

  const goButton = root.querySelector<HTMLButtonElement>(
    "[data-area-search-go]",
  );

  const lookupTypedArea = (): void => {
    if (!searchInput) return;
    const value = searchInput.value.trim().toLowerCase();
    const match = [...options].find(
      (option) => option.value.toLowerCase() === value,
    );
    if (match) {
      selectRegion(match.dataset.regionId ?? null, match.value);
    }
  };

  searchInput?.addEventListener("input", lookupTypedArea);
  goButton?.addEventListener("click", lookupTypedArea);
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
