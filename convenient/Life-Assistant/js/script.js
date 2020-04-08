
function loadData() {
    var $nytHeaderElem = $('#nytimes-header');
    var $greeting = $('#greeting');
    var addressStr = $('#address').val();
    $greeting.text('So, you want to go to ' + addressStr + ' ?');
    $nytHeaderElem.text('Search results about ' + addressStr);
    return false;
};
$('#form-container').submit(loadData);
