function loadData(){

    let url = 'https://proxy.hxlstandard.org/data.json?filter01=merge&merge-url01=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1qEB53VLEDQ8i2Huy5_090t8NksRmn0XvbpiT93ARhCo%2Fedit%23gid%3D1557160770&merge-keys01=%23adm1%2Bcode&merge-tags01=%23region&filter02=count&count-tags02=%23region&count-type02-01=sum&count-pattern02-01=%23capacity%2Bvols&count-header02-01=vol_total&count-column02-01=%23capacity%2Blabel&count-type02-02=sum&count-pattern02-02=%23capacity%2Bsocorr&count-header02-02=socorr&count-column02-02=%23capacity%2Blabel&count-type02-03=sum&count-pattern02-03=%23capacity%2Bmedi&count-header02-03=medi&count-column02-03=%23capacity%2Blabel&count-type02-04=sum&count-pattern02-04=%23capacity%2Benfe&count-header02-04=enfe&count-column02-04=%23capacity%2Blabel&count-type02-05=sum&count-pattern02-05=%23capacity%2Bpsic&count-header02-05=psic&count-column02-05=%23capacity%2Blabel&filter03=explode&explode-header-att03=indicator&explode-value-att03=value&strip-headers=on&force=on&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1qEB53VLEDQ8i2Huy5_090t8NksRmn0XvbpiT93ARhCo%2Fedit%23gid%3D0';
    $.ajax({
        url: url,
        success: function(result){
            updateViz(hxlProxyToJSON(result));
        }
    }); 
}

function updateViz(data){
    console.log(data);
    data.forEach(function(d){
        let id = '#' + d['#region'].toLowerCase()+'_'+d['#capacity+indicator'];
        console.log(id);
        $(id).html(d['#capacity+value']);
    });
}

function hxlProxyToJSON(input,headers){
    var output = [];
    var keys=[]
    input.forEach(function(e,i){
        if(i==0){
            e.forEach(function(e2,i2){
                var parts = e2.split('+');
                var key = parts[0]
                if(parts.length>1){
                    var atts = parts.splice(1,parts.length);
                    atts.sort();                    
                    atts.forEach(function(att){
                        key +='+'+att
                    });
                }
                keys.push(key);
            });
        } else {
            var row = {};
            e.forEach(function(e2,i2){
                row[keys[i2]] = e2;
            });
            output.push(row);
        }
    });
    return output;
}

$('.sp-circle').remove();
loadData();