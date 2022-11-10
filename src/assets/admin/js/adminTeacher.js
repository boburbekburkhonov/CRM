const deleteBtn = document.querySelectorAll('.delete-group-btn')

deleteBtn.forEach(item => {
  item.addEventListener('click', (e) => {
    fetch(`/admin/teacher/${e.target.id}`, {
      method: 'DELETE'
    })
    .then(res => res)
    .then(data => {
      if(data.status == 200){
        window.location.reload()
      }
    })
    .catch(err => console.error(err))
  })
})