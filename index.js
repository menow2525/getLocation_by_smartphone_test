let map;
var lat = 0;
var long = 0;

var accuracy = 0;
var avgAccuracyArray = [];
var avgAccuracy = 0;

var speed = 0;
var avgSpeedArray = [];
var avgSpeed = 0;

var pulsingIcon2 = L.icon.pulse({
    iconSize:[20,20]
   ,color:'#57c6fd'
   ,fillColor:'#57c6fd'
   ,heartbeat: 2
});
let marker;

function getNowLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude; // 緯度を取得
        long = position.coords.longitude; // 経度を取得
      },
      (error) => {
        // エラー処理（今回は特に何もしない）
        alert(error);
        error;
      },
      {
        enableHighAccuracy: true, // 高精度で測定するオプション
        maximumAge: 60000,
        timeout: 30000, // GPS取得のタイムアウト時間を設定するオプション。(ミリ秒)これを過ぎるとエラーになる。
      }
    );
}

window.onload = function() {
  getNowLocation();
    
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }

  map = L.map("map", {
    zoomDelta: 0.2, // ズームの変化量を調整
    zoomSnap: 0.2, // ズームスナップの設定
  }).setView([lat, long], 18);
    
    //OpenStreetMapの地図
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

function displayMap() {
  map.setView([lat, long], 18);
    
  if (!marker) {
      marker = L.marker([lat, long], {icon:pulsingIcon2}).addTo(map).bindPopup("now location!");
  } else {
  // 既存のマーカーの位置を更新
      marker.setLatLng([lat, long]).bindPopup("now location!");
  }
}

function displayLogData() {
  console.log(avgAccuracyArray.length);
  document.getElementById("accuracy").textContent = accuracy.toFixed(3) + "m";
  document.getElementById("avgAccuracy").textContent = avgAccuracy.toFixed(3) + "m (AVG)"
  document.getElementById("speed").textContent = speed.toFixed(0) + "km/h";
  document.getElementById("avgSpeed").textContent = avgSpeed.toFixed(2) + "km/h (AVG)"
}

navigator.geolocation.watchPosition(
  (position) => {
    lat = position.coords.latitude; // 緯度を取得
    long = position.coords.longitude; // 経度を取得
    accuracy = position.coords.accuracy; // 位置の精度取得(何メートルほど誤差があるか)

    if (accuracy == null) {
      accuracy = 999.9;
    }
    
    avgAccuracyArray.push(parseFloat(accuracy.toFixed(3))); // 取得した精度を配列に追加する
    avgAccuracy = avgAccuracyArray.reduce(function(sum, element) {
        return sum + element
    }, 0);
    avgAccuracy = (avgAccuracy / avgAccuracyArray.length);

    if (avgAccuracyArray.length > 20) {
        avgAccuracyArray = [];
        avgAccuracyArray.push(avgAccuracy);
    }
      
    speed = position.coords.speed // 速度を取得
    
    if (speed != null) {
        speed = (speed * 3600) / 1000;
        avgSpeedArray.push(parseInt(speed.toFixed(0)));　// 取得した速度を配列に追加する

        avgSpeed = avgSpeedArray.reduce(function(sum, element) {
            return sum + element
        }, 0);
    avgSpeed = (avgSpeed / avgSpeedArray.length);
    } else {
        speed = 0;
    }
    
    
      
    if (avgSpeedArray.length > 20) {
        avgSpeedArray = [];
        avgSpeedArray.push(avgSpeed);
    }

    displayMap();
    displayLogData();
  },
  (error) => {
    // エラー処理（今回は特に何もしない）
    alert(error);
    error;
  },
  {
    enableHighAccuracy: true, // 高精度で測定するオプション
    maximumAge: 60000,
    timeout: 30000, // GPS取得のタイムアウト時間を設定するオプション。(ミリ秒)これを過ぎるとエラーになる。
  }
);

