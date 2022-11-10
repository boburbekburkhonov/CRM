const deleteBtn = document.querySelectorAll('.delete-btn')

for(let i of deleteBtn){
  i.addEventListener('click', e => {
    fetch(`/admin/course/${e.target.id}`, {
      method: 'DELETE'
    })
    .then(res => res)
    .then(data => {
      if(data.status == 200){
        window.location.reload()
      }
    })
    .catch(err => alert(err))
  })
}
