const sgMail = require('@sendgrid/mail');

const templates = {
  passwordReset: 'd-4edbc5887ea24a54b5ee3d9bac5ce36d',
  verifyAccount: 'd-f0bb5e4519144da2ad3d12d4f008ed5a'
};

const sendMail = async (type, email, name, data) => {
  dotenv.config();
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
  await sgMail.send(msg);
};

module.exports = sendMail
