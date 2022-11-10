const deleteBtn = document.querySelectorAll('.delete-group-btn')

deleteBtn.forEach(e =>
  e.onclick = e => {
    fetch(`/admin/group/${e.target.id}`, {
      method: 'DELETE'
    })
    .then(res => res)
    .then(data => {
      if(data.status == 200){
        window.location.reload()
      }
    })
    .catch(err = console.log(err))
  }
)