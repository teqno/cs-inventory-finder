async function getData(steamId) {
  const file = await fetch(`http://localhost:3000/${steamId}`);
  return file.json();
}

function clearView(container_element) {
  container_element.innerHTML = "";
}

async function search() {
  const container_element = document.getElementById("img-container");
  clearView(container_element);
  const steam_id_input_element = document.getElementById("steam-id-input");
  const steamId = steam_id_input_element.value;
  const data = await getData(steamId);
  for (item of data.descriptions) {
    const amount = data.assets.filter(e => e.classid === item.classid).length
    console.log(amount);
    for (let i = 0; i < amount; i++) {
      const image_element = `<img width=100 src="https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}"/>`;
      container_element.innerHTML += image_element;
    }
  }
}