$(document).ready(() => {
  $.get('/userdata', (data) => {
    $('#user').append(data.name);
  });

  $.get('/getSecrets', (data) => {
    data.forEach(secret => {
      $('#password-table tbody').append(`
      <tr>
        <td>${secret.source}</td>
        <td>${secret.password}</td>
        <td>
          <button class="delete-btn" name="delete" value="${secret.id}">X</button>
        </td>
      </tr>`);
    });
  });
  
  $('#password-table tbody').on('click', 'button', (button) => {
    const secretid = button.target.value;
    $.post('/deleteSecret');
  });
});