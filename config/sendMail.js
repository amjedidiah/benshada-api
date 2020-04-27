const sgMail = require('@sendgrid/mail');

const templates = {
  passwordReset: 'd-4edbc5887ea24a54b5ee3d9bac5ce36d',
  verifyAccount: 'd-f0bb5e4519144da2ad3d12d4f008ed5a'
};

const sendMail = async (type, email, name, data, res) => {
  try {
    const SENDGRID_KEY = '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';
    sgMail.setApiKey(SENDGRID_KEY);

    const msg = {
      to: email,
      from: 'Benshada Place <contact@benshada.com>',
      subject: '',
      templateId: templates[type],
      dynamic_template_data: {
        ...data,
        name,
      },
    };
    const send = await sgMail.send(msg);
    console.log(send)
  } catch (err) {
    return res.status(500).send({
      data: null,
      message: err.message,
      error: true
    })
  }
};

module.exports = sendMail
