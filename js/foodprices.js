function initMap(){
    
    var base_osm = L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: '&copy; OpenStreetMap contributors'}
    );
    
    var world_style = {
        color: "#fff",
        fillColor: "#2a93fc",
        fillOpacity:0.8,
        opacity:0.8,
        weight:1
    };
    
    var results = [170,271,1];
    
    for(i = world.features.length-1; i >= 0; i--){
        if( $.inArray(world.features[i].properties.ADM0_CODE, results) === -1 ){
            world.features.splice(i, 1);
        }        
    }
    
    var overlay_world = L.geoJson(world.features,{
        style:world_style,
        onEachFeature: function(feature, layer){
            layer.on('click', function (e) {
                console.log(feature.properties.ADM0_CODE);
            });
        }  
    });
      
    var map = L.map('map', {
        center: [0,0],
        zoom: 2,
        layers: [base_osm, overlay_world]
    });
    
    return map;
}

function initCountry(embedded){
    
}

function datastoretest(){

    var sql = 'select * from "7ba02906-3a84-4eb4-8064-21365d5d45ee" limit 100';

    var data = encodeURIComponent(JSON.stringify({sql: sql}));

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: 'https://test-data.hdx.rwlabs.org/api/3/action/datastore_search_sql',
      data: data,
      success: function(data) {
          console.log(data);
      }
    });    
}

function parseGet(val) {
    var result = "Not found",
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    }
    return result;
}


console.log(parseGet("embedded"));

initMap();