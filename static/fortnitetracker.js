$(function(){
    var submitBtn = $('#submit');
    var platfromDropDownBtn = $('#platform a');
    var epicNickName = $('#epicNickName');
    var results = $('#results');

    // default values
    var dropDownValue = 'pc';

    submitBtn.click(function(){
        var data = {};
        data.epicNickName = epicNickName.val().toLowerCase();
        data.dropDownValue = dropDownValue.toLowerCase();
        $.ajax({
            type: "POST",
            url: '/',
            dataType: 'json',
            data : data,
            success: function(data){
                data = JSON.parse(data);
                displayData(data);
            }
        });
        resetResult();
    });

    platfromDropDownBtn.click(function(){
        dropDownValue = $(this).text();
    });

    function resetResult(){
        results.html('');
        epicNickName.val('');
    }

    function displayData(data){
        var epicUserHandle = data.epicUserHandle;
        var list = '<ul class="list-group">' + 
                        '<li class="list-group-item">' + 'Solo: ' + data.stats.p2.top1.value + '</li>' + 
                        '<li class="list-group-item">' + 'Duos: ' + data.stats.p10.top1.value + '</li>' + 
                        '<li class="list-group-item">' + 'Teams: ' + data.stats.p9.top1.value + '</li>' + 
                    '</ul>';
        var template = '<div class="card text-center">' + 
                            '<h5 class="card-header">' + epicUserHandle + '</h5>' + 
                            '<div class="card-body">' + 
                            '<h5 class="card-title">' + 'Wins' + '</h5>' + 
                            '<p class="card-text">' + list + '</p>' + 
                            '</div>' + 
                        '</div>';
        results.html(template);
    }


});