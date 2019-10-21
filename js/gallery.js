(function( $ ){
    
    $.fn.gallery = function(settings) {
        if(settings){
            var loop = settings.loop;
            var enableThumbnails = settings.thumbnails;
            var enableCaption = settings.caption;
        } else {
            var loop = false;
            var enableThumbnails = false;
            var enableCaption = false;
        }

        var items = $(this).children();

        if(items.length <= 1 ){
            console.error("Not enough images! Gallery will not be setup!");
            return this;
        }

        $(this).css("position","relative");
        var images = [];
        for(var i = 0; i <= items.length; i++){
            if($(items[i]).prop("tagName") == "IMG"){
                var item = $(items[i]);
                images.push(item);
                if(i > 0){
                    item.hide(); //Hiding everything but the first image
                }
            }
        }

        var currentImage = 0;

        $("<div/>", { //Creating a new arrow left
            "id":"gallery-control-left",
            "class":"gallery-control-button-style",
            "style":"position:absolute; top:calc(50% - 64px); left:6%; z-index:9999; font-size:64px; color:#333; cursor:pointer; opacity:0.2; -moz-user-select: -moz-none;-khtml-user-select: none; -webkit-user-select: none;  -ms-user-select: none; user-select: none;",
            "unselectable":"on",
            "html":"⯇",
        }).appendTo($(this));

        $("<div/>", { //Creating a new arrow right
            "id":"gallery-control-right",
            "class":"gallery-control-button-style",
            "style":"position:absolute; top:calc(50% - 64px); right:6%; z-index:9999; font-size:64px; color:#333; cursor:pointer; opacity:0.2; -moz-user-select: -moz-none;-khtml-user-select: none; -webkit-user-select: none;  -ms-user-select: none; user-select: none;",
            "unselectable":"on",
            "html":"⯈",
        }).appendTo($(this));

        var thumbnails = [];
        if(enableThumbnails){
            if(enableCaption == true) {
                enableCaption = false;
                console.error("Caption cannot be enabled alongside thumbnails. Disabled automatically.");
            }

            $("<div/>", { //Thumbnails container
                "id":"gallery-thumbnails-container",
                "style":"position:absolute; bottom:5%; width:100%; height:20%; z-index:9999",
            }).appendTo($(this));

            for(i = 0; i <= images.length - 1; i++){
                if(i == 0){
                    $("<img/>", {
                        "class":"gallery-thumbnail-image shadow",
                        "src":images[i].attr("src"),
                        "style":"height:64px;width:64px; margin:8px;border:1px solid #ccc; border-radius:4px"
                    }).appendTo($("#gallery-thumbnails-container"));
                } else {
                    $("<img/>", {
                        "class":"gallery-thumbnail-image shadow",
                        "src":images[i].attr("src"),
                        "style":"height:32px;width:32px; margin:8px;border:1px solid #ccc;border-radius:4px"
                    }).appendTo($("#gallery-thumbnails-container"));
                }
            }

            var t = $("#gallery-thumbnails-container").children();

            for(i = 0; i <= t.length - 1; i++){
                if($(t[i]).prop("tagName") == "IMG"){
                    thumbnails.push($(t[i]));
                }
            }
        }
        
        if(enableCaption){
            $("<div/>", {
                "id":"gallery-caption-container",
                "style":"width:100%; position:absolute; bottom:5%; background-color:rgba(30,30,30, 0.6); color:#fff; text-align-center"
            }).appendTo($(this));
        }

        if(images[0].data("gallery-caption") != undefined)
            $("#gallery-caption-container").html("<p style='padding:5px; margin:0'>"+images[0].data("gallery-caption")+"</p>");

        //Listening for input
        $("#gallery-control-left").click(function(){ 
            if(currentImage > 0){
                images[currentImage].hide();
                images[currentImage - 1].show();

                if(enableThumbnails){
                    thumbnails[currentImage - 1].css({"height":"64px", "width":"64px"});
                    thumbnails[currentImage].css({"height":"32px", "width":"32px"});
                }

                currentImage--;
                if(images[currentImage].data("gallery-caption") != undefined) {
                    $("#gallery-caption-container").html("<p style='padding:5px; margin:0'>"+images[currentImage].data("gallery-caption")+"</p>");
                } else {
                    $("#gallery-caption-container").html("");
                }
            } else if(loop){
                images[currentImage].hide();
                images[images.length - 1].show();

                if(enableThumbnails){
                    thumbnails[images.length - 1].css({"height":"64px", "width":"64px"});
                    thumbnails[currentImage].css({"height":"32px", "width":"32px"});
                }

                currentImage = images.length - 1;
                if(images[currentImage].data("gallery-caption") != undefined) {
                    $("#gallery-caption-container").html("<p style='padding:5px; margin:0'>"+images[currentImage].data("gallery-caption")+"</p>");
                } else {
                    $("#gallery-caption-container").html("");
                }    
            }
        });
        $("#gallery-control-right").click(function(){
            if(currentImage < images.length - 1){
                images[currentImage].hide();
                images[currentImage + 1].show();

                if(enableThumbnails){
                    thumbnails[currentImage + 1].css({"height":"64px", "width":"64px"});
                    thumbnails[currentImage].css({"height":"32px", "width":"32px"});
                }
                currentImage++;
                if(images[currentImage].data("gallery-caption") != undefined) {
                    $("#gallery-caption-container").html("<p style='padding:5px; margin:0'>"+images[currentImage].data("gallery-caption")+"</p>");
                } else {
                    $("#gallery-caption-container").html("");
                }
            } else if(loop){
                images[currentImage].hide();
                images[0].show();

                if(enableThumbnails){
                    thumbnails[0].css({"height":"64px", "width":"64px"});
                    thumbnails[currentImage].css({"height":"32px", "width":"32px"});
                }

                if(images[0].data("gallery-caption") != undefined) {
                        $("#gallery-caption-container").html("<p style='padding:5px; margin:0'>"+images[0].data("gallery-caption")+"</p>");
                } else {
                    $("#gallery-caption-container").html("");
                }
                currentImage = 0;
            }
        });
        $(".gallery-control-button-style").hover(function(){$(this).css("opacity", 1)}, function(){$(this).css("opacity",0.2)}); //Change button opacity on hover
    }; 

    return this;
 })( jQuery );