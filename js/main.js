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

  return {
    setImageFromFile: setImageFromFile,
    setImageFromUrl: setImageFromUrl,
    save: save
  };
}());
