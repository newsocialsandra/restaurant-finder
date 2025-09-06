console.log("App loaded ✅");

// Emoji-mappning för vegomat
function getEmoji(category) {
  switch (category) {
    case "Vegansk": return "🌱";
    case "Vegetarisk": return "🥗";
    default: return "🍴";
  }
}

// Uppdaterad lista med bara veganska/vegetariska restauranger
const defaultPlaces = [
  { name: "Hermans", category: "Vegansk", area: "Södermalm", desc: "Legendarisk vegansk buffé med magisk utsikt.", likes: 76 },
  { name: "Växthuset", category: "Vegansk", area: "Hornstull", desc: "Kreativ vegansk fine dining i mysig miljö.", likes: 52 },
  { name: "Mahalo", category: "Vegansk", area: "Vasastan", desc: "Färgstarka bowls, wraps & smoothiebowls.", likes: 41 },
  { name: "Delivore", category: "Vegansk", area: "Södermalm", desc: "Fika, lunch och mys – allt 100% växtbaserat.", likes: 38 },
  { name: "Chutney", category: "Vegetarisk", area: "Södermalm", desc: "Vegetarisk restaurang med många veganalternativ.", likes: 40 },
  { name: "Chewie's Bar", category: "Vegansk", area: "Kungsholmen", desc: "Bar och restaurang med street food-style rätter.", likes: 15 },
  { name: "Falafelbaren", category: "Vegansk", area: "Södermalm", desc: "Stockholms bästa falafel – helt vegansk!", likes: 34 },
  { name: "La Piccola Nonna", category: "Vegansk", area: "Södermalm", desc: "Äkta italienska pizzor med vegansk ost.", likes: 21 },
  { name: "Kalf & Hansen", category: "Vegetarisk", area: "Norrmalm", desc: "Nordisk snabbmat, vegetariskt & ofta veganskt.", likes: 29 },
  { name: "Bastard Burgers", category: "Vegansk", area: "Odenplan", desc: "Fantastiska veganska burgare och shakes.", likes: 44 }
];

let places = [...defaultPlaces];

// DOM-referenser
const els = {
  grid: document.getElementById("cards"),
  search: document.getElementById("search"),
  cat: document.getElementById("categoryFilter"),
  area: document.getElementById("areaFilter"),
  addForm: document.getElementById("addForm"),
  name: document.getElementById("placeName"),
  category: document.getElementById("placeCategory"),
  areaInput: document.getElementById("placeArea"),
  desc: document.getElementById("placeDesc")
};

// Render-funktion
function render() {
  let list = [...places];
  const q = els.search.value.toLowerCase();
  const cat = els.cat.value;
  const area = els.area.value;

  if (q) {
    list = list.filter(x =>
      x.name.toLowerCase().includes(q) ||
      x.area.toLowerCase().includes(q) ||
      x.desc.toLowerCase().includes(q)
    );
  }
  if (cat !== "all") {
    list = list.filter(x => x.category === cat);
  }
  if (area !== "all") {
    list = list.filter(x => x.area === area);
  }
  els.grid.innerHTML = "";

  const tmpl = document.getElementById("cardTemplate");
  if (list.length === 0) {
    els.grid.innerHTML = "<div style='grid-column: 1/-1; text-align:center; color:#999;'>Inga resultat hittades.</div>";
    return;
  }
  for (const x of list) {
    const node = tmpl.content.cloneNode(true);
    node.querySelector(".title").textContent = `${getEmoji(x.category)} ${x.name}`;
    node.querySelector(".area").textContent = `${x.area} · ${x.category}`;
    node.querySelector(".desc").textContent = x.desc;
    node.querySelector(".likes-bubble").textContent = `${x.likes} likes`;
    node.querySelector(".like-btn").addEventListener("click", () => {
      x.likes++;
      render();
    });
    els.grid.appendChild(node);
  }
}

// Add form
els.addForm.addEventListener("submit", e => {
  e.preventDefault();
  const newPlace = {
    name: els.name.value,
    category: els.category.value,
    area: els.areaInput.value,
    desc: els.desc.value,
    likes: 0
  };
  places.push(newPlace);
  render();
  els.addForm.reset();
});

// Event listeners
els.search.addEventListener("input", render);
els.cat.addEventListener("change", render);
els.area.addEventListener("change", render);

// Prerendera efter DOM laddad
window.addEventListener("DOMContentLoaded", render);
