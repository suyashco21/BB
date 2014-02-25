$(document).on('pageinit', '#login', function(){  
        $(document).on('click', '#submit', function() { // catch the form's submit event
        if($('#username').val().length > 0 && $('#password').val().length > 0){
            // Send data to server through ajax call
            // action is functionality we want to call and outputJSON is our data
                $.ajax({url: 'http://192.168.1.105/bb3/check.php',
                    data: { username : $('#username').val(), password : $('#password').val()}, // Convert a form to a JSON string representation
                    type: 'post',
                    async: 'true', dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete
                        $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                    },
                    success: function (result) {
                                       if(result.status)
                                       { $.mobile.changePage("#page4");
                                            //alert(result.message);
                                       }

                                    else
                                    {
                                        alert(result.message);
                                    }
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action      
                        console.log(error);
                        console.log(request);          
                        console.log(result);
                        alert('Network error has occurred please try again!');
                        console.log(error);
                    }
                });                   
        } else {
            alert('Please fill all necessary fields');
        }           
            return false; // cancel original event to prevent form submitting
        });    
});


$(document).on('pageinit', '#signup', function(){
    $(document).on('click', '#register', function(){
        if($('#SignUpEmail').val().length > 0) //&& $('#SignUpmobileno').val().length > 0 && $('#SignUpUsername').val().length > 0 && $('#SignUpPassword').val().length > 0)
        {
            $.ajax({url : 'http://192.168.1.105/bb3/SignUp.php',
                   data : { SignUpEmail : $('#SignUpEmail').val(), SignUpmobileno : $('#SignUpmobileno').val(), SignUpUsername : $('#SignUpUsername').val(), SignUpPassword : $('#SignUpPassword').val()},
                    type: 'post',
                    async: 'true', dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete
                        $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                    },
                    success: function (result) {
                                       if(result.status)
                                       { 
                                            $.mobile.changePage('#login');
                                            alert(result.message);
                                       }
                                       else
                                       {
                                            alert(result.message);
                                       }
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action      
                        console.log(error);
                        console.log(request);          
                        
                        alert('Network error has occurred please try again!');
                        
                    }
        });
        }
        else {
                     alert('Please fill all necessary fields');
             }           
        return false;
    });
});



$(document).on('pageinit', '#NewProjectWindow', function(){

     var destinationType; 
     var CameraImage;
     var GalleryImage;
    //launch the camera
    $.getScript('cordova.js');

     document.addEventListener("deviceready",onDeviceReady,false);

     function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    $(document).on('click', '#CameraButton', function(){

        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
        
        function onPhotoDataSuccess(imageData) {
    	  
      	CameraImage = "data:image/jpeg;base64," + imageData;
  	  }
  	  
  	  function onFail(message) {
      alert('Failed because: ' + message);
    }
  	  
    });

    $(document).on('click','#GalleryButton', function(){

        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: pictureSource.SAVEDPHOTOALBUM });

         function onPhotoURISuccess(imageURI) {
      
        GalleryImage = imageURI; 
         }

        function onFail(message) {
        alert('Failed because: ' + message);
    }
    });

    $(document).on('click', '#SubmitNewProjectWindow', function(){

        alert(CameraImage);
/*
      $.ajax({url : 'http://192.168.1.105/bb3/Camera.php',
                   data : { cameraData : CameraImage},
                    type: 'post',
                    async: 'true', dataType: 'json',
                    beforeSend: function() {
                        // This callback function will trigger before data is sent
                        $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                    },
                    complete: function() {
                        // This callback function will trigger on data sent/received complete
                        $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                    },
                    success: function (result) {
                                       if(result)
                                       { 
                                           // $.mobile.changePage('#login');
                                            alert(result);
                                       }
                                       else
                                       {
                                            alert('Your Fucked');
                                       }
                    },
                    error: function (request,error) {
                        // This callback function will trigger on unsuccessful action      
                        console.log(error);
                        console.log(request);          
                        
                        alert('Network error has occurred please try again!');
                        
                    }
        });*/

    });

});


//$(document).on('pagebeforeshow', '#page4', function(){     
   // $('#second [data-role="content"]').append('This is a result of form submition: ' + resultObject.formSubmitionResult);  
//});

//var resultObject = {
  //  formSubmitionResult : null  
//}