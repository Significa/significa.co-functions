const rp = require('request-promise')
const sendEmail = require('./sendEmail')

module.exports.run = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  const { name, email, portfolio, message, attachment, position } = body

  if (!name) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'Name is required' }),
    })
  }

  if (!email) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email address is required' }),
    })
  }

  if (!message) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'Message is required' }),
    })
  }

  if (!position) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'Position is required' }),
    })
  }

  return Promise.all([
    sendEmail({
      to: 'Significa <hello@significa.co>',
      subject: `[Careers - ${position}] New application received`,
      data:
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Position: ${position}\n` +
        `Portfolio: ${portfolio || 'n/a'}\n` +
        `Attachment: ${attachment || 'n/a'}\n` +
        `\n${message}`,
    }),
    sendEmail({
      to: `${name} <${email}>`,
      subject: 'Your application was received at Significa',
      data:
        'Your application is in safe hands.\n' +
        'Somebody from our team will be reviewing your application as soon as possible. We won’t leave you hanging so either way you will hear from us.\n' +
        '\n' +
        'While you wait, check out our Playbook (https://significa.co/handbook/playbook) and get a sneak peek inside our office!\n' +
        'We have a lot of content there so feel free to explore as you please.\n' +
        '\n' +
        'Have a great day,\n' +
        'Significa\n',
    }),
    rp({
      method: 'POST',
      uri: `https://hooks.slack.com/${process.env.SLACK_PATH}`,
      json: true,
      body: {
        text: `<!channel> New ${position} application received`,
        attachments: [
          {
            fallback: 'Information:',
            pretext: 'Information:',
            color: '#0154FF',
            fields: [
              { title: 'Name', value: name, short: false },
              { title: 'Email', value: email, short: false },
              { title: 'Position', value: position, short: false },
              { title: 'Portfolio', value: portfolio || 'n/a', short: false },
              { title: 'Attachment', value: attachment || 'n/a', short: false },
              { title: 'Message', value: message || 'n/a', short: false },
            ],
          },
        ],
      },
    }),
  ])
    .then(() => {
      return callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Great success' }),
      })
    })
    .catch(err => {
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Oh no :( Message not delivered',
          error: err,
        }),
      })
    })
}
