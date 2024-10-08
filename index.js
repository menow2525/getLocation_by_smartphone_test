var lat;
var long;

function displayMap() {
  var map = L.map("map", {
    zoomDelta: 0.01, // ズームの変化量を調整
    zoomSnap: 0.01, // ズームスナップの設定
  }).setView([lat, long], 15);

  L.marker([lat, long]).addTo(map).bindPopup("now location!");

  //OpenStreetMapの地図
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

navigator.geolocation.watchPosition(
  (position) => {
    lat = position.coords.latitude; // 緯度を取得
    long = position.coords.longitude; // 経度を取得

    displayMap();
  },
  (error) => {
    // エラー処理（今回は特に何もしない）
    error;
  },
  {
    enableHighAccuracy: true, // 高精度で測定するオプション
  }
);
