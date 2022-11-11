const openGroup = document.querySelectorAll(".rows");

openGroup.forEach((item) => {
  item.onclick = (e) => {
    fetch(`/teacher/groups/${e.target.id}`)
      .then((res) => res)
      .then((data) => {
        if (data.status == 200) {
          window.location.href = `/teacher/groups/${e.target.id}`;
        }
      })
      .catch((err) => console.log(err));
  };
});
