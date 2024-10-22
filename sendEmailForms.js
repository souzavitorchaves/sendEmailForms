function sendEmailForms() {
  record_array = [];

  let form = FormApp.openById('formID'); // insert Forms ID here
  let formResponses = form.getResponses();
  let formCount = formResponses.length;

  let formResponse = formResponses[formCount - 1];
  let itemResponses = formResponse.getItemResponses();

  for (let j = 0; j < itemResponses.length; j++) {
    let itemResponse = itemResponses[j];
    let title = itemResponse.getItem().getTitle();
    let answer = itemResponse.getResponse()

    Logger.log(title);
    Logger.log(answer);
    record_array.push(answer);
  }

  /*AddRecord(record_array[0],record_array[1],record_array[2],record_array[3],record_array[4],record_array[5],record_array[6]);
  0 = has vpn?
  1 = email
  2 = name 
  3 = phone
  4 = company
  5 = job position
  6 = reason for access
  7 = date
  8 = password */
  sendEmail();
}

function sendEmail() {
  if (record_array[0] === 'YES') {
    var emailBody = `
<h1 style="text-align: center;"><span style="color: red;">${record_array[1]}</span> solicitou acesso à VPN</h1>

<p><b>Reason for Access:</b> ${record_array[2]}</p>
<p><b>Date limit for Access:</b> ${record_array[3]}</p>
`;
  } else {
    var emailBody = `
<h1 style="text-align: center;"><span style="color: red;">${record_array[1]}</span> requested access to VPN</h1>


<p><b>Email:</b> ${record_array[2]}</p>
<p><b>Phone:</b> ${record_array[3]}</p>
<p><b>Company:</b> ${record_array[4]}</p>
<p><b>Job Position:</b> ${record_array[5]}</p>
<p><b>Reason for Access:</b> ${record_array[6]}</p>
<p><b>Date limit for Access:</b> ${record_array[7]}</p>
<p><b>Password</b> ${record_array[8]}</p>
`;
  }
    MailApp.sendEmail({
      to: 'youremail@mail.com',
      subject: 'VPN Access Request',
      htmlBody: emailBody
    });
  }


