const openGroup = document.querySelectorAll(".rows");

openGroup.forEach((item) => {
  item.onclick = (e) => {
    console.log(e.target.id);
  };
});
