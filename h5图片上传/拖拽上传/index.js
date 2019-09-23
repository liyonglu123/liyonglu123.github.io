function handleDropover(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  function handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    /***** 访问拖拽文件 *****/
    const files = event.dataTransfer.files;
    console.log(files);
    /**********/
  }
  
  const target = document.querySelector("#container");
  target.addEventListener("dragover", handleDropover);
  target.addEventListener("drop", handleDrop);
  