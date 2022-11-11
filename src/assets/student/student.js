const homeworkBtn = document.querySelectorAll(".homework");

homeworkBtn.forEach((item) => {
  item.onclick = (e) => {
    fetch(`/student/homework/${e.target.id}`, {
      method: "POST",
    })
      .then((res) => res)
      .then((data) => {
        if (data.status == 200) {
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };
});
