logout.onclick = () => {
  document.cookie = `token=; ${new Date()}`;
  window.location.href = '/'
}
