const AWS = require('aws-sdk')

const ses = new AWS.SES()

module.exports = function({ to, subject, data, replyTo }) {
  return ses
    .sendEmail({
      Destination: { ToAddresses: [to] },
      Message: {
        Body: {
          Text: { Charset: 'UTF-8', Data: data },
        },
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
      },
      Source: 'Significa <hello@significa.co>',
      ReplyToAddresses: [replyTo],
    })
    .promise()
}
