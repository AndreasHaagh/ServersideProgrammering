$(document).ready(() => {
  $.get('/userdata', (data) => {
    $('#user').append(data.name);
  });

  var getSecrets = (url) => {
    $.get(url, (data) => {
      data.forEach(secret => {
        $('#password-table tbody').append(`
        <tr class="tablerow">
          <td>${secret.source}</td>
          <td>${secret.password}</td>
          <td>
            <form class="deleteForm" action="deleteSecret" method="POST">
              <input type="hidden" name="id" value="${secret.id}"/>
              <input type="submit" name="submit" value="X"/>
            </form>
          </td>
          <td>
            <form class="updateForm" action="updateSecret" method="POST">
              <input type="hidden" name="id" value="${secret.id}"/>
              <input type="text" name="source" value="${secret.source}"/>
              <input type="text" name="password" value="${secret.password}"/>
              <input type="submit" name="submit" value="edit"/>
            </form>
          </td>
        </tr>`);
      });
    });
  }

  getSecrets('/getSecrets');

  $('#search-btn').click(() => {
    console.log("hallo");
    $('#password-table > tbody > tr').remove();
    var searched = $('#search-text').val();
    getSecrets(`getSecrets?source=${searched}`)
  })
});