var app = (function(){
  function updateDownload(){
    // just in case...
    setTimeout(function(){
      html2canvas(picture, {
        allowTaint: true,
        useCORS: true,
        onrendered: function(canvas){
          dl.href = Canvas2Image.convertToPNG(canvas).src;
        }
      });
    }, 500);
  }

  function setImageFromFile(){
    var reader = new FileReader();

    reader.onload = function(e){
      picture.style.backgroundImage = "url(" + e.target.result + ")";
      updateDownload();
    }

    reader.readAsDataURL(filepick.files[0]);
  }

  function setImageFromUrl(){
    picture.style.backgroundImage = "url(" + url.value + ")";
    updateDownload();
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
        updateDownload();
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
