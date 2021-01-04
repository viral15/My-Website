<script>
$(document).ready(function(){
debugger
    var required = document.getElementById('administrative_area_level_1').textContent;
var verified = document.getElementById('Victoria').textContent;
alert(verified);
alert(required);
if(required = 'victoria'){
    debugger
   alert('emails do not match');
   return false;
}else{
   return true;
}
});

$("#administrative_area_level_1").change(function(){
debugger

})

</script>