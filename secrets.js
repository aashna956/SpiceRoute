module.exports = {

  db: process.env.DATABASE_URL || "postgres://aashna956:Charu@956@localhost:5432/spiceroute",

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  mailgun: {
    user: process.env.MAILGUN_USER || 'postmaster@sandbox697fcddc09814c6b83718b9fd5d4e5dc.mailgun.org',
    password: process.env.MAILGUN_PASSWORD || '29eldds1uri6'
  },


};
