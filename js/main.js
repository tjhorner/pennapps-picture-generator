var app = (function(){
  function setImageFromFile(){
    var reader = new FileReader();

    reader.onload = function(e){
      picture.style.backgroundImage = "url(" + e.target.result + ")";
    }

    reader.readAsDataURL(filepick.files[0]);
  }

  function setImageFromUrl(){
    picture.style.backgroundImage = "url(" + url.value + ")";
  }

  function save(){
    html2canvas(picture, {
      allowTaint: true,
      useCORS: true,
      onrendered: function(canvas){
        Canvas2Image.saveAsPNG(canvas);
      }
    });
  }

  function fbLogin(){
    FB.login(function(){
      FB.api("/me/picture?type=large&width=500", function(response){
        if(response && !response.error) picture.style.backgroundImage = "url(" + response.data.url + ")";
      });
    });
  }

  return {
    setImageFromFile: setImageFromFile,
    setImageFromUrl: setImageFromUrl,
    save: save,
    fbLogin: fbLogin
  };
}());
